#!/usr/bin/env python3
"""Site-wide SEO / AEO / GEO audit of the rendered site.

Reads every route in the sitemap from the dev server (default http://localhost:3411,
override with SITE=https://www.camzify.com) and writes docs/seo/04-site-audit.csv with
one row per route, plus a summary on stdout. Everything is measured from the rendered
HTML that a crawler or an answer engine actually receives, not from the source.

Columns: route, title, title_len, desc_len, h1_count, h1, h2_count, words, faq_count,
schema_types, has_article_dates, has_author, has_sources, first_para_len,
definition_lede, internal_links_out, inbound_links, images_missing_alt, canonical_ok,
seo_score, aeo_score, geo_score, flags.

Scores are 0 to 100 and mean "how many of the checks this page type should pass does
it pass"; they rank pages for attention, they are not a promise about rankings.

    python3 scripts/seo-audit.py                 # dev server on :3411
    SITE=https://www.camzify.com python3 scripts/seo-audit.py
"""
import collections, csv, html, json, os, re, sys, urllib.request
from html.parser import HTMLParser

SITE = os.environ.get('SITE', 'http://localhost:3411').rstrip('/')
OUT = 'docs/seo/04-site-audit.csv'
NO_FAQ_BY_DESIGN = {'/about', '/about/muhammad-talha', '/blog', '/book-a-demo', '/contact', '/free-trial', '/sitemap-page', '/privacy-policy', '/terms-of-service', '/cookie-policy', '/accessibility', '/', '/llms.txt'}
THIN_OK = {'/blog', '/book-a-demo', '/contact', '/free-trial', '/sitemap-page', '/'}
CITE_KINDS = ('/compare/camzify-vs-', '/alternatives/', '/guides/best-')  # pages that name a vendor must list Sources


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'camzify-seo-audit'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode('utf-8', 'replace')


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []; self.title = ''; self.desc = ''; self.canonical = ''; self.h = collections.defaultdict(list)
        self.text = []; self.links = set(); self.jsonld = []; self.imgs_no_alt = 0; self.paras = []; self._cur = None; self._ld = False
        self.in_main = False; self.skip = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title': self._cur = 'title'
        if tag == 'meta' and a.get('name') == 'description': self.desc = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href', '')
        if tag == 'script' and a.get('type') == 'application/ld+json': self._ld = True
        if tag in ('script', 'style', 'svg', 'noscript'): self.skip += 1
        if tag == 'main': self.in_main = True
        if tag in ('h1', 'h2', 'h3'): self._cur = tag; self.h[tag].append('')
        if tag == 'p' and self.in_main: self._cur = 'p'; self.paras.append('')
        if tag == 'a' and a.get('href', '').startswith('/'): self.links.add(a['href'].split('#')[0].split('?')[0].rstrip('/') or '/')
        if tag == 'img' and 'alt' not in a: self.imgs_no_alt += 1  # alt="" is a valid decorative image
    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'svg', 'noscript'): self.skip = max(0, self.skip - 1)
        if tag == 'script': self._ld = False
        if tag == 'main': self.in_main = False
        if tag in ('title', 'h1', 'h2', 'h3', 'p'): self._cur = None
    def handle_data(self, d):
        if self._ld:
            self.jsonld.append(d); return
        if self.skip: return
        if self._cur == 'title': self.title += d
        elif self._cur in ('h1', 'h2', 'h3'): self.h[self._cur][-1] += d
        if self._cur == 'p' and self.paras: self.paras[-1] += d
        if self.in_main: self.text.append(d)


def audit(route):
    p = Page(); p.feed(fetch(SITE + route))
    text = re.sub(r'\s+', ' ', ' '.join(p.text)).strip()
    words = len(text.split())
    types, faqs, dates, author, = set(), 0, False, False
    for blob in p.jsonld:
        try:
            data = json.loads(blob)
        except Exception:
            continue
        nodes = data if isinstance(data, list) else [data]
        nodes = [n for d in nodes for n in (d.get('@graph', [d]) if isinstance(d, dict) else [])]
        for n in nodes:
            t = n.get('@type'); types.update(t if isinstance(t, list) else [t])
            if n.get('@type') == 'FAQPage': faqs += len(n.get('mainEntity', []))
            if n.get('dateModified') or n.get('datePublished'): dates = True
            if n.get('author'): author = True
    title = html.unescape(p.title.strip()); h1s = [h.strip() for h in p.h['h1'] if h.strip()]
    first = next((re.sub(r'\s+', ' ', x).strip() for x in p.paras if len(x.split()) > 12), '')
    subject = re.sub(r'\s*\|.*$', '', title).lower()
    definition = bool(re.match(r'^(a|an|the)?\s*[\w\s\-()]{2,60}\b(is|are|means|refers to)\b', first.lower())) or first.lower().startswith(subject.split()[0]) if first else False
    sources = 'sources' in ' '.join(p.h['h2']).lower()
    canonical_ok = p.canonical.rstrip('/').endswith(route.rstrip('/')) if route != '/' else p.canonical.rstrip('/').endswith('camzify.com')
    return dict(route=route, title=title, title_len=len(title), desc_len=len(p.desc), h1_count=len(h1s), h1=h1s[0] if h1s else '',
                h2_count=len([h for h in p.h['h2'] if h]), words=words, faq_count=faqs, schema_types=' '.join(sorted(t for t in types if t)),
                has_article_dates=dates, has_author=author, has_sources=sources, first_para_len=len(first.split()), definition_lede=definition,
                internal_links_out=len(p.links), links=p.links, images_missing_alt=p.imgs_no_alt, canonical_ok=canonical_ok)


def score(r, inbound):
    flags = []
    seo = [r['title_len'] <= 62, 70 <= r['desc_len'] <= 158, r['h1_count'] == 1, r['h2_count'] >= 3 or r['route'] in THIN_OK,
           r['words'] >= 600 or r['route'] in THIN_OK or r['route'].startswith('/glossary'), inbound >= 3, r['canonical_ok'], r['images_missing_alt'] == 0]
    aeo = [r['faq_count'] >= 3 or r['route'] in NO_FAQ_BY_DESIGN or (r['route'].startswith('/glossary/') and r['faq_count'] >= 2), r['definition_lede'] or r['route'] in THIN_OK, 20 <= r['first_para_len'] <= 90 or r['route'] in THIN_OK,
           any(h.endswith('?') for h in [r['h1']]) or r['h2_count'] >= 3, 'BreadcrumbList' in r['schema_types']]
    geo = [r['has_author'] or not r['route'].startswith('/guides/'), r['has_article_dates'] or not r['route'].startswith('/guides/'),
           r['has_sources'] or not r['route'].startswith(CITE_KINDS) or r['route'] in ('/alternatives', '/compare/camzify-vs-traditional-vms'), r['words'] >= 300 or r['route'] in THIN_OK, r['internal_links_out'] >= 5]
    if r['title_len'] > 62: flags.append('title>62')
    if not 70 <= r['desc_len'] <= 158: flags.append('desc-length')
    if r['h1_count'] != 1: flags.append(f"h1x{r['h1_count']}")
    if r['words'] < 600 and r['route'] not in THIN_OK and not r['route'].startswith('/glossary'): flags.append(f"thin:{r['words']}w")
    if r['faq_count'] < 3 and r['route'] not in NO_FAQ_BY_DESIGN and not (r['route'].startswith('/glossary/') and r['faq_count'] >= 2): flags.append('faq<3')
    if not r['definition_lede'] and r['route'] not in THIN_OK: flags.append('lede-not-definition')
    if inbound < 3: flags.append(f'inbound:{inbound}')
    if r['route'].startswith('/guides/') and not r['has_author']: flags.append('no-author')
    if r['route'].startswith('/guides/') and not r['has_article_dates']: flags.append('no-dates')
    if r['route'].startswith(CITE_KINDS) and r['route'] not in ('/alternatives', '/compare/camzify-vs-traditional-vms') and not r['has_sources']: flags.append('no-sources')  # traditional VMS is a category, not a vendor
    if r['images_missing_alt']: flags.append(f"alt-missing:{r['images_missing_alt']}")
    if not r['canonical_ok']: flags.append('canonical')
    pct = lambda xs: round(100 * sum(xs) / len(xs))
    return pct(seo), pct(aeo), pct(geo), ' '.join(flags)


def main():
    routes = re.findall(r'<loc>https?://[^<]*?camzify\.com(/[^<]*)?</loc>', fetch(SITE + '/sitemap.xml'))
    routes = sorted({(r or '/').rstrip('/') or '/' for r in routes})
    rows = {}
    for i, r in enumerate(routes, 1):
        try:
            rows[r] = audit(r)
        except Exception as e:
            print('ERR', r, e, file=sys.stderr)
        print(f'\r{i}/{len(routes)}', end='', file=sys.stderr)
    print(file=sys.stderr)
    inbound = collections.Counter()
    for r, d in rows.items():
        for l in d['links']:
            if l != r and l in rows: inbound[l] += 1
    out = []
    for r, d in rows.items():
        d['inbound_links'] = inbound[r]
        d['seo_score'], d['aeo_score'], d['geo_score'], d['flags'] = score(d, inbound[r])
        d.pop('links'); out.append(d)
    cols = ['route', 'title', 'title_len', 'desc_len', 'h1_count', 'h1', 'h2_count', 'words', 'faq_count', 'schema_types', 'has_article_dates', 'has_author', 'has_sources', 'first_para_len', 'definition_lede', 'internal_links_out', 'inbound_links', 'images_missing_alt', 'canonical_ok', 'seo_score', 'aeo_score', 'geo_score', 'flags']
    with open(OUT, 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=cols); w.writeheader(); w.writerows(out)
    n = len(out)
    avg = lambda k: round(sum(d[k] for d in out) / n)
    print(f'{n} routes audited from {SITE} -> {OUT}')
    print(f'average scores  SEO {avg("seo_score")}  AEO {avg("aeo_score")}  GEO {avg("geo_score")}')
    print(f'words: median {sorted(d["words"] for d in out)[n//2]}, under 600: {sum(d["words"] < 600 for d in out)}')
    flagc = collections.Counter(f.split(":")[0] for d in out for f in d['flags'].split() if f)
    print('flags:', dict(flagc.most_common()))
    print('lowest 15 by combined score:')
    for d in sorted(out, key=lambda d: d['seo_score'] + d['aeo_score'] + d['geo_score'])[:15]:
        print(f"  {d['seo_score']:3} {d['aeo_score']:3} {d['geo_score']:3}  {d['route']}  [{d['flags']}]")


if __name__ == '__main__':
    main()
