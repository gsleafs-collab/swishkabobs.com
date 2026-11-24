#!/usr/bin/env python3
"""Launch swishkabobs.com: the team page becomes the home page and the coming-soon page goes away.

Run from the root of a checkout of main. It:
  1. builds index.html from court.html, minus the front-door gate, the noindex tag and the "Lock the gym" button,
  2. turns court.html into a tiny redirect to the home page, so old links and bookmarks still work,
  3. tells search engines the site is open (robots meta removed).
It refuses to run twice and checks its own work before writing anything.
"""
import re, sys, pathlib

root = pathlib.Path('.')
court = (root / 'court.html').read_text()
if 'Redirecting to <a href' in court:
    sys.exit('Already launched: court.html is a redirect. Nothing to do.')

s = court
# 1. the front-door gate at the top of <head>
gate = re.search(r"<script>\s*// Hidden for now: only people who came through the front door get in.*?</script>\n", s, re.S)
assert gate, 'gate script not found'
s = s[:gate.start()] + s[gate.end():]
# 2. noindex
assert s.count('<meta name="robots" content="noindex, nofollow">') == 1, 'robots tag not found'
s = s.replace('<meta name="robots" content="noindex, nofollow">\n', '')
s = s.replace('<title>Swish Kabobs</title>', '<title>Swish Kabobs</title>\n<meta name="description" content="Swish Kabobs, Toronto rec basketball since 2022. Schedule, stats, roster, film and the history books.">', 1)
# 3. the "Lock the gym" button and its handler
btn = re.search(r'[ \t]*<button id="lock" type="button">Lock the gym</button>\n', s)
assert btn, 'lock button not found'
s = s[:btn.start()] + s[btn.end():]
h = re.search(r"[ \t]*\$\('lock'\)\.addEventListener\('click'.*?\n", s)
assert h, 'lock handler not found'
s = s[:h.start()] + s[h.end():]

for bad in ("sk-court", "noindex", 'id="lock"', "$('lock')"):
    assert bad not in s, f'leftover: {bad}'
assert s.lstrip().lower().startswith('<!doctype html>') and '</html>' in s[-200:], 'page looks truncated'

redirect = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Swish Kabobs</title>
<meta http-equiv="refresh" content="0; url=./">
<link rel="canonical" href="https://swishkabobs.com/">
<script>location.replace('./' + location.search + location.hash);</script>
</head>
<body>Redirecting to <a href="./">swishkabobs.com</a></body>
</html>
"""
(root / 'index.html').write_text(s)
(root / 'court.html').write_text(redirect)
print('index.html is now the team page (%d bytes); court.html redirects home.' % len(s))
