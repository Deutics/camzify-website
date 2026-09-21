#!/usr/bin/env python3
"""Whole-site verification against a live host.

Fetches every route in the sitemap and checks: HTTP 200, canonical equal to the URL,
exactly one H1, a title and description, valid JSON-LD, no image without alt text
(empty counts as missing, as Bing scores it), and no internal link whose target is
not a 200 (a permanent redirect to a 200 is reported separately so it can be fixed
at the source). Prints a summary and exits non-zero on any hard failure.

    python3 scripts/verify-site.py                       # https://camzify.com
    SITE=http://localhost:3411 python3 scripts/verify-site.py
"""
import collections, html, json, os, re, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser

SITE = os.environ.get('SITE', 'https://camzify.com').rstrip('/')
# Canonicals always point at the public origin, whichever host is being verified.
CANON = os.environ.get('CANONICAL_ORIGIN', 'https://camzify.com').rstrip('/')
UA = {'User-Agent': 'camzify-verify'}


def get(url, method='GET'):
    req = urllib.request.Request(url, headers=UA, method=method)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, r.geturl(), r.read().decode('utf-8', 'replace') if method == 'GET' else ''
    except urllib.error.HTTPError as e:
        return e.code, url, ''
    except Exception as e:
        return 0, url, str(e)


class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.title = ''; self.desc = ''; self.canonical = ''; self.h1 = 0; self.links = set(); self.imgs_bad = []; self.ld = []; self._t = None; self._ld = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title': self._t = 'title'
        if tag == 'h1': self.h1 += 1
        if tag == 'meta' and a.get('name') == 'description': self.desc = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href', '')
        if tag == 'script' and a.get('type') == 'application/ld+json': self._ld = True
        if tag == 'a' and a.get('href', '').startswith('/'): self.links.add(a['href'].split('#')[0].split('?')[0])
        if tag == 'img' and not (a.get('alt') or '').strip(): self.imgs_bad.append(a.get('src', '?'))
    def handle_endtag(self, tag):
        if tag == 'title': self._t = None
        if tag == 'script': self._ld = False
    def handle_data(self, d):
        if self._t == 'title': self.title += d
        if self._ld: self.ld.append(d)


def check(route):
    url = SITE + route
    status, final, body = get(url)
    out = {'route': route, 'status': status, 'problems': [], 'links': set()}
    if status != 200:
        out['problems'].append(f'status {status}'); return out
    p = Page(); p.feed(body)
    out['links'] = p.links
    if not p.title.strip(): out['problems'].append('no title')
    if not p.desc.strip(): out['problems'].append('no description')
    if p.h1 != 1: out['problems'].append(f'h1 x{p.h1}')
    want = (CANON + route).rstrip('/')
    if p.canonical.rstrip('/') != want: out['problems'].append(f'canonical {p.canonical}')
    for blob in p.ld:
        try: json.loads(blob)
        except Exception: out['problems'].append('invalid JSON-LD')
    if p.imgs_bad: out['problems'].append(f'{len(p.imgs_bad)} img without alt: ' + ', '.join(sorted(set(p.imgs_bad))[:3]))
    return out


def main():
    status, _, sm = get(SITE + '/sitemap.xml')
    routes = sorted({(r or '/').rstrip('/') or '/' for r in re.findall(r'<loc>https?://[^<]*?camzify\.com(/[^<]*)?</loc>', sm)})
    print(f'{len(routes)} routes in sitemap ({SITE})')
    with ThreadPoolExecutor(8) as ex:
        results = list(ex.map(check, routes))
    bad = [r for r in results if r['problems']]
    for r in bad: print('  FAIL', r['route'], '|', '; '.join(r['problems']))
    print(f'pages: {len(results) - len(bad)} clean, {len(bad)} with problems')
    # every internal link target, deduplicated, must resolve
    targets = sorted({l.rstrip('/') or '/' for r in results for l in r['links']})
    known = set(routes)
    unknown = [t for t in targets if t not in known and not t.startswith('/api/')]
    def probe(t):
        s, final, _ = get(SITE + t, 'HEAD'); return t, s, final
    with ThreadPoolExecutor(8) as ex:
        probed = list(ex.map(probe, unknown))
    broken = [(t, s) for t, s, f in probed if s != 200]
    redirected = [(t, f) for t, s, f in probed if s == 200 and f.rstrip('/') != (SITE + t).rstrip('/')]
    print(f'internal link targets: {len(targets)} unique, {len(unknown)} outside the sitemap, {len(broken)} broken, {len(redirected)} reached through a redirect')
    for t, s in broken: print('  BROKEN', t, s)
    for t, f in redirected[:20]: print('  REDIRECT', t, '->', f.replace(SITE, ''))
    sys.exit(1 if bad or broken else 0)


if __name__ == '__main__':
    main()
