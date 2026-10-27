# Design references

- Boketta Social Media Management: `Boketta-ki-Dashboards/tiktokcontentmaker`, commit `e5cfeefad809ca23a01415b5006dd0d9f0d2fd8a`. Glass surface treatment, ambient mint/lilac palette, system type and light/dark UI based on `src/app/boketta.css`.
- Pace: `Boketta-ki-Dashboards/pace`, branch `claude/gallant-brahmagupta-hvvp13`, commit `bc02cf312d262b819fd1caa228722bbae8555dd1`. Original wordmark and app icon copied from the asset catalogs. `pace.css` uses the exact light/dark color tokens in `PaceColor.swift`. The independent landing page uses the original dark/light Home screenshots from docs/previews/auftrag5/01-home-statusleiste-*.png, explicitly identified as app screenshots with test data.
- Boketta Intl. header: transparent derivative of the repository's `logo-boketta-intl..jpeg`.
- Live Netlify reference pages were inaccessible from this environment (proxy HTTP 403). Exact AI Dashboard navigation parity could not be inspected.

Run locally: `python3 -m http.server 8000 --bind 127.0.0.1` from this directory. No build step or dependencies. `index.html` is Intl. It links externally to https://pace.netlify.app/. `sites/pace/index.html` is the independent Pace website source. Build separate deployment packages with `python3 scripts/package-sites.py`. Each ZIP contains its own self-contained index.html; deploy each to its respective Netlify project. Theme defaults to dark and persists under `boketta-intl-theme` in localStorage.

Pace Free/Pro copy and planned prices were supplied by the owner in this conversation. Pro, the PACE1 launch promotion and future running/community features are explicitly marked as planned. No purchase or redemption is implemented. Only the Boketta Intl. repository is changed; the Pace app repository was read as a reference.

Validation: start the local server on port 8000, then run `node scripts/check-sites.cjs` with Playwright and Chromium available. It checks carousel navigation/filtering, calculators, the external Pace link, Pace's menu and theme, Pro text, image loading and responsive widths 320/390/768/1440. Both ZIPs were also extracted and browser-tested as independent sites.

Deploy `downloads/boketta-intl-netlify.zip` to Boketta Intl. and `downloads/pace-netlify.zip` to the separate Pace Netlify project (extract each ZIP and upload its folder). Both contain an `index.html` with embedded local assets. The code links to `https://pace.netlify.app/`; this does not create or reserve that Netlify domain.
