"""Check server-rendered sitemap pages and compare existing SEO with production."""
import argparse
import json
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from urllib.parse import urlsplit


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.canonical = []
        self.alternates = {}
        self.meta = {}
        self.lang = None
        self.h1 = 0
        self.title = ''
        self.in_title = False
        self.in_json = False
        self.json_text = ''
        self.schemas = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html':
            self.lang = a.get('lang')
        if tag == 'h1':
            self.h1 += 1
        if tag == 'title':
            self.in_title = True
        if tag == 'meta':
            self.meta[a.get('name', a.get('property'))] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical.append(a.get('href'))
        if tag == 'link' and a.get('rel') == 'alternate' and 'hreflang' in a:
            self.alternates[a['hreflang']] = a.get('href')
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self.in_json = True
            self.json_text = ''

    def handle_data(self, text):
        if self.in_title:
            self.title += text
        if self.in_json:
            self.json_text += text

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'script' and self.in_json:
            self.schemas.append(json.loads(self.json_text))
            self.in_json = False


def fetch(url):
    with tempfile.NamedTemporaryFile() as headers:
        result = subprocess.run(['curl', '--fail', '--silent', '--show-error', '--max-time', '45', '--retry', '2', '-D', headers.name, url], capture_output=True, check=True)
        header_text = headers.read().decode().lower()
        assert ' 200 ' in header_text, (url, header_text)
        assert not any('noindex' in line for line in header_text.splitlines() if line.startswith('x-robots-tag:')), url
        return result.stdout.decode()


def sitemap(base):
    root = ET.fromstring(fetch(base + '/sitemap.xml'))
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'x': 'http://www.w3.org/1999/xhtml'}
    return {node.find('s:loc', ns).text: {a.attrib['hreflang']: a.attrib['href'] for a in node.findall('x:link', ns)} for node in root.findall('s:url', ns)}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('target')
    parser.add_argument('--baseline')
    parser.add_argument('--report-differences', action='store_true')
    args = parser.parse_args()
    urls = sitemap(args.target.rstrip('/'))
    baseline = sitemap(args.baseline.rstrip('/')) if args.baseline else {}
    assert set(baseline).issubset(urls), 'Existing sitemap URLs were removed'
    differences = []

    def check(item):
        url, alternatives = item
        path = urlsplit(url).path
        page = Page(fetch(args.target.rstrip('/') + path))
        assert page.canonical == [url], (path, 'canonical', page.canonical)
        assert page.h1 == 1, (path, 'h1', page.h1)
        assert page.title and page.meta.get('description'), (path, 'metadata')
        assert 'noindex' not in page.meta.get('robots', '').lower(), path
        assert page.alternates == alternatives, (path, 'hreflang mismatch')
        for lang, alt in alternatives.items():
            assert alt in urls and urls[alt] == alternatives, (path, lang, 'nonreciprocal')
        if url in baseline:
            old = Page(fetch(args.baseline.rstrip('/') + path))
            for key, current, previous in [('title', page.title, old.title), ('description', page.meta['description'], old.meta['description']), ('lang', page.lang, old.lang), ('alternates', page.alternates, old.alternates)]:
                if current != previous:
                    differences.append({'path': path, 'field': key, 'before': previous, 'after': current})
                    assert args.report_differences, (path, key, 'existing SEO changed')
        return path

    with ThreadPoolExecutor(max_workers=4) as pool:
        paths = list(pool.map(check, urls.items()))
    print(json.dumps({'pages_passed': len(paths), 'baseline_urls_preserved': len(baseline), 'differences': differences, 'paths': paths}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
