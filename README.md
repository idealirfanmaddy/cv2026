# Ahmad Adil Irfan — Portfolio

Cinematic portfolio site: showreel hero, horizontal "Now showing" reel with looping clips, a filterable index of all 25 projects with hover previews, and an in-page video player.

Plain static HTML/CSS/JS — no build step.

## Preview locally

```bash
python3 -m http.server 8743
```

Then open http://localhost:8743

## Deploy on GitHub Pages

1. Create a new **public** repository on GitHub, e.g. `portfolio` (or `<your-username>.github.io` for a root URL).
2. Push this folder:
   ```bash
   git init -b main
   git add .
   git commit -m "Portfolio site"
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)` → Save**.
4. After about a minute the site is live at `https://<your-username>.github.io/portfolio/`.

## Editing

- **Projects:** the `PROJECTS` list at the top of `assets/main.js`. `media: "video"` uses `media/<id>.mp4` + `media/<id>.jpg`; `media: "image"` uses `media/<id>.jpg`; no `media` shows an animated title card in the `hue` you set.
- **Links:** `yt:<YouTube id>`, `vm:<Vimeo id>`, or `fb:<full Facebook video URL>`.
- **CV download:** replace `assets/Ahmad-Adil-Irfan-CV.pdf`.
- **Showreel:** replace `media/showreel.mp4` (and `media/showreel.jpg` poster / share image).
