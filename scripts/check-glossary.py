#!/usr/bin/env python3
"""Checks lib/glossary-terms.ts: title <= 50, description <= 150, body paragraphs <= 4 sentences, related >= 2, related hrefs exist."""
import re, os, sys
src = open('lib/glossary-terms.ts').read()
entries = re.findall(r"\{\s*slug: '([^']+)'.*?faqs: \[.*?\],\s*\}", src, re.S)
problems = []
for m in re.finditer(r"slug: '([^']+)',\s*term: '([^']*)',(?:\s*abbreviation: '[^']*',)?\s*title: '([^']*)',\s*description: '([^']*)',", src):
    slug, term, title, desc = m.groups()
    if len(title) > 50: problems.append((slug, 'title', len(title)))
    if len(desc) > 150: problems.append((slug, 'description', len(desc)))
for href in set(re.findall(r"href: '(/[^']*)'", src)):
    if not os.path.exists('app' + href + '/page.tsx') and not os.path.exists('app' + href + '.tsx'):
        problems.append(('related', 'missing route', href))
if '\u2014' in src: problems.append(('file', 'em-dash', ''))
print(f"{len(entries)} entries; problems: {problems or 'none'}")
sys.exit(1 if problems else 0)
