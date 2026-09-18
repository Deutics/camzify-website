#!/usr/bin/env python3
"""On-page audit for every route.

Static checks read app/**/page.tsx: title (50 source chars or fewer), description
(163 or fewer per docs/ADDING-PAGES.md, 70 or more), duplicate titles, an inbound link count of at least two,
and whether the title's phrase appears in the page body. Rendered checks, when the dev
server is up on port 3411, read each route: one H1, a canonical, FAQPage schema, and
the rendered title (62 or fewer) and description (70 to 158).

    python3 scripts/check-pages.py            # static + rendered
    python3 scripts/check-pages.py --static   # static only
"""
import collections, glob, html, os, re, sys, time, urllib.request

STOP = set('a an the and or of for on in to with by from at vs your you how what is are it its & ai'.split())
NO_FAQ_BY_DESIGN = {'/about', '/about/muhammad-talha', '/blog', '/book-a-demo', '/contact', '/free-trial', '/sitemap-page'}


def pages():
    out = {}
    for p in sorted(glob.glob('app/**/page.tsx', recursive=True)):
        if '/api/' in p or '[slug]' in p:
            continue
        route = '/' + os.path.dirname(p)[4:]
        s = open(p).read()
        m = re.search(r'const pageMeta\s*=\s*\{(.*?)\n\};', s, re.S)
        meta = m.group(1) if m else ''
        t = re.search(r'title:\s*(["\'])(.+?)\1\s*,', meta)
        d = re.search(r'description:\s*(["\'])(.+?)\1\s*,', meta)
        out[route] = {'file': p, 'src': s, 'title': t.group(2) if t else '', 'desc': d.group(2) if d else ''}
    return out


def static_checks(P):
    issues = collections.defaultdict(list)
    inbound = collections.Counter()
    for f in glob.glob('app/**/*.tsx', recursive=True) + glob.glob('components/**/*.tsx', recursive=True) + glob.glob('lib/**/*.ts', recursive=True):
        s = open(f).read()
        for h in set(re.findall(r'href[=:]\s*["\'{`]+\s*["\']?(/[a-z0-9\-/]*)', s)):
            h = h.rstrip('/') or '/'
            if h in P and not f.startswith(os.path.dirname(P[h]['file']) + '/page'):
                inbound[h] += 1
    titles = collections.Counter(p['title'] for p in P.values())
    for r, p in P.items():
        if r == '/':
            continue
        if len(p['title']) > 50:
            issues['title over 50'].append((r, len(p['title'])))
        if p['desc'] and not 70 <= len(p['desc']) <= 163:
            issues['description outside 70-163'].append((r, len(p['desc'])))
        if p['title'] and titles[p['title']] > 1:
            issues['duplicate title'].append(r)
        if inbound[r] < 2 and not r.startswith('/glossary'):
            issues['fewer than 2 inbound links'].append((r, inbound[r]))
        head = html.unescape(p['title'].split('|')[0]).strip().lower().replace('&', 'and')
        body = html.unescape(re.sub(r'<[^>]+>', ' ', p['src'][p['src'].find('const pageMeta'):])).lower().replace('&apos;', "'")
        body = re.sub(r'[\-\u2011]', ' ', body)
        words = re.findall(r'[a-z0-9]+', head.replace('-', ' '))
        missing = [w for w in words if w not in STOP and len(w) > 2 and w not in body and w.rstrip('s') not in body]
        if missing:
            issues['title words absent from body'].append((r, missing))
    return issues


def rendered_checks(P):
    base = 'http://localhost:3411'
    def get(r):
        return urllib.request.urlopen(base + r, timeout=60).read().decode()
    try:
        get('/')
    except Exception:
        return None
    issues = collections.defaultdict(list)
    for r in P:
        try:
            h = get(r)
        except Exception:
            issues['fetch failed'].append(r); continue
        t = html.unescape(re.search(r'<title>(.*?)</title>', h, re.S).group(1))
        d = re.search(r'<meta name="description" content="([^"]*)"', h)
        d = html.unescape(d.group(1)) if d else ''
        if len(t) > 62:
            issues['rendered title over 62'].append((r, len(t)))
        if not 70 <= len(d) <= 158:
            issues['rendered description outside 70-158'].append((r, len(d)))
        if len(re.findall(r'<h1[\s>]', h)) != 1:
            issues['h1 count not 1'].append(r)
        if '"FAQPage"' not in h and r not in NO_FAQ_BY_DESIGN:
            issues['no FAQPage schema'].append(r)
        if 'rel="canonical"' not in h:
            issues['no canonical'].append(r)
    return issues


def report(title, issues):
    print(f'\n### {title}')
    if not issues:
        print('clean'); return
    for k, v in issues.items():
        print(f'\n{k} ({len(v)})')
        for x in v:
            print('  ', x)


if __name__ == '__main__':
    P = pages()
    print(f'{len(P)} routes')
    report('static', static_checks(P))
    if '--static' not in sys.argv:
        r = rendered_checks(P)
        report('rendered', r if r is not None else {'dev server not running on 3411': ['start it with the preview tooling and rerun']})
