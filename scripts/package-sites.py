"""Build independent Netlify uploads. Optional argument: pace or boketta-intl."""
from pathlib import Path
import base64, mimetypes, re, sys, zipfile
ROOT = Path(__file__).resolve().parents[1]

def package(source, destination):
    with zipfile.ZipFile(ROOT / 'downloads' / destination, 'w', zipfile.ZIP_DEFLATED) as archive:
        for page in sorted(source.glob('*.html')):
            html = page.read_text()
            html = re.sub(r'<link rel="stylesheet" href="([^"/]+\.css)">',
                          lambda m: '<style>' + (source / m[1]).read_text() + '</style>', html)
            html = re.sub(r'<script src="([^"/]+\.js)"></script>',
                          lambda m: '<script>' + (source / m[1]).read_text() + '</script>', html)
            def embed(match):
                path = source / match[0]
                return 'data:' + mimetypes.guess_type(path)[0] + ';base64,' + base64.b64encode(path.read_bytes()).decode()
            html = re.sub(r'assets/[a-z-]+\.png', embed, html)
            archive.writestr(page.name, html)
    print(destination)

if __name__ == '__main__':
    selection = sys.argv[1:]
    if selection and selection not in [['pace'], ['boketta-intl']]:
        raise SystemExit('Usage: python3 scripts/package-sites.py [pace|boketta-intl]')
    if not selection or selection == ['boketta-intl']:
        package(ROOT, 'boketta-intl-netlify.zip')
    if not selection or selection == ['pace']:
        package(ROOT / 'sites/pace', 'pace-netlify.zip')
