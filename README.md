# Charlie PLC

Mobile-first static microsite for the Charlie PLC girlfriend acquisition initiative.

## The files you will actually edit

- `data/content.js` — **all website copy**, questions, reveals, market metrics, testimonials and FAQ.
- `data/config.js` — Charlie's Instagram URL, sharing text and hiring-team image paths.
- `assets/images/` — replace placeholder SVGs with Charlie / hiring-team photos.
- `styles.css` — colours, spacing and visual design.
- `js/app.js` — interaction/rendering logic. You should rarely need to touch this.

## Replacing photos

You can either:

1. Replace an existing SVG file with a JPG/WEBP and update its path in `content.js` / `config.js`, or
2. Keep the filenames conceptually named, e.g. `charlie-hero.webp`, `charlie-beach.webp`, `hiring-arnav.webp`.

For mobile performance, export photos around 1200–1600 px on the long edge and use WebP where convenient.

## Preview locally

Do not just double-click `index.html`. Run a tiny local server from this folder:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

To test mobile layout in Chrome desktop, open DevTools and toggle the device toolbar.

## Publish with GitHub Pages (simplest setup)

1. Create a GitHub repository, e.g. `charlie-plc`.
2. Upload/commit the contents of this folder to the `main` branch.
3. In the repo open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/(root)`, then Save.
6. GitHub will publish the site at a URL similar to:
   `https://YOUR-USERNAME.github.io/charlie-plc/`
7. Once live, put that final URL into the QR code.

No npm, React, Vite, build pipeline or server is required.

## Custom domain later

A custom domain is optional. If you buy something short (for example a Charlie-themed `.com`/`.au`), add it in **Settings → Pages → Custom domain**, then configure the DNS records with your registrar and enable **Enforce HTTPS** once GitHub has provisioned the certificate.

## QR code workflow

Only print the business cards after the final URL is stable. If you think the URL may change, use a domain you control or a redirect URL as the QR target so you can repoint it later without reprinting cards.
