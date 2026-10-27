# Design references

- Boketta Social Media Management: `Boketta-ki-Dashboards/tiktokcontentmaker`, commit `e5cfeefad809ca23a01415b5006dd0d9f0d2fd8a`. Glass surface treatment, ambient mint/lilac palette, system type and light/dark UI based on `src/app/boketta.css`.
- Pace: `Boketta-ki-Dashboards/pace`, branch `claude/gallant-brahmagupta-hvvp13`, commit `bc02cf312d262b819fd1caa228722bbae8555dd1`. Original wordmark and app icon copied from the asset catalogs. `pace.css` uses the exact light/dark color tokens in `PaceColor.swift`. The landing page is a new web composition; its phone illustration contains example data and represents documented app features, not a live app or screenshot.
- Boketta Intl. header: transparent derivative of the repository's `logo-boketta-intl..jpeg`.
- Live Netlify reference pages were inaccessible from this environment (proxy HTTP 403). Exact AI Dashboard navigation parity could not be inspected.

Run locally: `python3 -m http.server 8000 --bind 127.0.0.1` from this directory. No build step or dependencies. `index.html` is the collection; `pace.html` is the linked Pace landing page. Theme defaults to dark and persists under `boketta-intl-theme` in localStorage.
