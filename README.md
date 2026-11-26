# Sakshi Deokar – UI/UX Portfolio

My personal portfolio website: hero, project case studies, "Beyond UI/UX" work, about, resume and contact.

## What this project is

**Plain HTML, CSS and JavaScript.** It does **not** use React, Vite, Next.js or any other framework, and it has **no build step** and no `npm install`. What you see in this folder is exactly what gets published.

```
index.html      the whole page (all sections and case-study viewers)
styles.css      all styling and animations
script.js       scroll animation of the hero, image lightbox, keyboard support
favicon.svg     browser-tab icon
assets/img/     every image used on the site
assets/docs/    resume and HealthMate PDFs
.nojekyll       tells GitHub Pages to serve the files as they are
```

The only thing loaded from the internet is the typefaces (Anton, Inter, Instrument Serif, Mrs Saint Delafield) from Google Fonts, through one `<link>` in the `<head>` of `index.html`. Everything else is local.

## Run it on your computer

Just double-click `index.html` and it opens in your browser.

If you prefer a local web server (closer to how it will behave online), open a terminal in this folder and run one of:

```
python3 -m http.server 8000      # then open http://localhost:8000
npx serve .                      # if you have Node.js
```

## Publish it on GitHub Pages (free)

1. Create a GitHub account if needed, then click **New repository**.
   - For a site at `https://<your-username>.github.io`, name the repository exactly `<your-username>.github.io`.
   - Any other name also works; the site will then be at `https://<your-username>.github.io/<repo-name>/`.
2. Upload the **contents of this folder** (so `index.html` is at the top level of the repository, not inside another folder). On github.com: *Add file → Upload files*, drag everything in (including the `assets` folder), then *Commit changes*.
   Or with git:
   ```
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repository go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, select branch **main** and folder **/ (root)**, then **Save**.
4. Wait a minute or two. The address appears at the top of the Pages settings.

All links inside the site are relative, so it works both at the root of a domain and inside a repository sub-path.

### Other free hosts (drag and drop, no settings needed)
- **Netlify**: https://app.netlify.com/drop – drag this folder in.
- **Vercel / Cloudflare Pages**: import the repository, framework preset "Other", leave build command and output directory empty (or output `.`).

## Making changes

- Text and layout: edit `index.html` (content) and `styles.css` (design).
- Replace an image: overwrite the file in `assets/img/` with another one of the **same file name**, or change the name in `index.html`.
- Replace the resume: overwrite `assets/docs/Sakshi_Deokar_Resume.pdf`.
- After you publish a social-sharing preview you may want to change `og:image` in `index.html` to a full address, e.g. `https://<your-username>.github.io/assets/img/8e1a38adcb5dc88576acc19a75f8b9d7.webp`, because some platforms ignore relative image links.

## How it behaves

- Case studies, the resume and the "Beyond UI/UX" cards open as full-screen viewers using plain CSS (hidden checkboxes), so they work even without JavaScript. **Esc** closes a viewer; **← / →** and **Esc** work in the image preview.
- The hero "ABOUT → photo → signature" animation is driven by scrolling in `script.js` and is switched off for visitors who set *reduce motion* in their system.
- Some reveal animations use `animation-timeline: view()`, which is currently supported in Chrome and Edge; other browsers simply show the content without that effect.
- The layout adapts to phones, tablets and desktops.

## Licences and credits

See `THIRD-PARTY-NOTICES.md`.
