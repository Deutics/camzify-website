#!/usr/bin/env python3
"""Check the English <-> German page pairs declared in lib/i18n.ts.

For every pair it checks that both page files exist, and compares the English page's
current source hash with the `sourceHash` recorded when the German page was last
brought in line with it. A mismatch means the English page changed after translation:
the German page may now say something the English one no longer does, or miss what it
now says.

    python3 scripts/check-translations.py                 # report; exit 1 on a missing file
    python3 scripts/check-translations.py --strict        # also exit 1 on stale or unstamped pairs
    python3 scripts/check-translations.py --stamp /de/x   # record the English hash for one pair
    python3 scripts/check-translations.py --stamp-all     # stamp every pair (after a full review only)

The hash covers the English page.tsx only, not the components it imports: a change to a
shared component shows up on both languages at once, so it needs no translation step.
Stamp only after the German page has been updated; see docs/I18N.md.
"""
import hashlib
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REGISTRY = os.path.join(ROOT, 'lib', 'i18n.ts')
PAIR_RE = re.compile(r"\{ en: '([^']*)', de: '([^']*)', sourceHash: '([0-9a-f]*)' \}")


def page_file(path):
    rel = 'app/page.tsx' if path == '/' else f'app{path}/page.tsx'
    return os.path.join(ROOT, rel)


def source_hash(path):
    with open(page_file(path), 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()[:12]


def load():
    with open(REGISTRY, encoding='utf-8') as f:
        text = f.read()
    return text, PAIR_RE.findall(text)


def stamp(targets):
    text, pairs = load()
    done = 0
    for en, de, _old in pairs:
        if targets != 'all' and de not in targets and en not in targets:
            continue
        if not (os.path.exists(page_file(en)) and os.path.exists(page_file(de))):
            print(f'  skip {de}: a page file is missing')
            continue
        h = source_hash(en)
        text = re.sub(
            r"\{ en: '" + re.escape(en) + r"', de: '" + re.escape(de) + r"', sourceHash: '[0-9a-f]*' \}",
            f"{{ en: '{en}', de: '{de}', sourceHash: '{h}' }}",
            text,
        )
        done += 1
        print(f'  stamped {de} <- {en} @ {h}')
    with open(REGISTRY, 'w', encoding='utf-8') as f:
        f.write(text)
    if targets != 'all' and done == 0:
        print('  no pair matched', ', '.join(targets))
        return 1
    return 0


def check(strict):
    _text, pairs = load()
    missing, stale, unstamped, ok = [], [], [], 0
    for en, de, recorded in pairs:
        gone = [p for p in (en, de) if not os.path.exists(page_file(p))]
        if gone:
            missing.append((en, de, gone))
            continue
        if not recorded:
            unstamped.append((en, de))
        elif recorded != source_hash(en):
            stale.append((en, de))
        else:
            ok += 1
    print(f'{len(pairs)} pairs: {ok} current, {len(stale)} stale, {len(unstamped)} unstamped, {len(missing)} missing a file')
    for en, de, gone in missing:
        print(f'  MISSING  {de} <- {en}: no page for {", ".join(gone)}')
    for en, de in stale:
        print(f'  STALE    {de} <- {en}: the English page changed since the German one was stamped')
    for en, de in unstamped:
        print(f'  UNSTAMPED {de} <- {en}')
    if missing or (strict and (stale or unstamped)):
        return 1
    return 0


if __name__ == '__main__':
    args = sys.argv[1:]
    if '--stamp-all' in args:
        sys.exit(stamp('all'))
    if '--stamp' in args:
        sys.exit(stamp([a for a in args if a.startswith('/')]))
    sys.exit(check('--strict' in args))
