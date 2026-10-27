"""Build two independent, self-contained Netlify uploads. Python standard library only."""
from pathlib import Path
import base64, mimetypes, re, zipfile
ROOT = Path(__file__).resolve().parents[1]

def package(source, destination):
    html = (source / 'index.html').read_text()
    html = re.sub(r'<link rel="stylesheet" href="([^"/]+\.css)">',
                  lambda m: '<style>' + (source / m[1]).read_text() + '</style>', html)
    html = re.sub(r'<script src="([^"/]+\.js)"></script>',
                  lambda m: '<script>' + (source / m[1]).read_text() + '</script>', html)
    def embed(match):
        path = source / match[0]
        return 'data:' + mimetypes.guess_type(path)[0] + ';base64,' + base64.b64encode(path.read_bytes()).decode()
    html = re.sub(r'assets/[a-z-]+\.png', embed, html)
    with zipfile.ZipFile(ROOT / 'downloads' / destination, 'w', zipfile.ZIP_DEFLATED) as archive:
        archive.writestr('index.html', html)
    print(destination)

package(ROOT, 'boketta-intl-netlify.zip')
package(ROOT / 'sites/pace', 'pace-netlify.zip')
