# Diffusion Without Equations

An intuitive, equation-free introduction to diffusion MRI, plus an interactive course with quizzes.

**Live site:** https://qmrlab.org/diffusion-without-equations/

This series first ran in 2017–2018 on ISMRM's *MR Pulse* blog (blog.ismrm.org). After that WordPress site broke in 2026, qMRLab restored the series here as a static GitHub Pages site.

| Page | Originally published | Original URL |
|---|---|---|
| [Part 1: The beginning](part-1/) | 2017-04-07 | `blog.ismrm.org/2017/04/07/diffusion/` |
| [Part 2: How do we capture the diffusion process?](part-2/) | 2017-06-06 | `blog.ismrm.org/2017/06/06/dwe-part-2/` |
| [Interlude: the community survey](survey/) | 2017-07-28 | `blog.ismrm.org/2017/07/28/571/` |
| [Part 3: The future of diffusion MRI](part-3/) | 2018-03-20 | `blog.ismrm.org/2018/03/20/diffusion-without-equations-3/` |
| [… and now for some equations (interactive course)](course/) | 2018-04-03 | `blog.ismrm.org/2018/04/03/interactive-diffusion-course/` |

## Structure

Plain HTML, CSS and JavaScript. There is no build step and nothing to install.

```
index.html            series landing page
part-1/ part-2/ part-3/ survey/ course/   one folder per post (index.html)
assets/css/style.css  all styles (light and dark mode)
assets/js/site.js     quiz logic, lazy YouTube players, scaled animation embed
assets/img/           figures, downloaded at original resolution from the old blog
archive/              provenance: the raw WordPress post exports and the recovered quiz data
```

`.nojekyll` tells GitHub Pages to serve the files as they are.

To preview locally, run `python3 -m http.server` in the repo root and open http://localhost:8000.

## Notes on the restoration

- **Text** comes from the WordPress post exports in `archive/wordpress-export/`. A few typos were fixed and some headings were reworded lightly.
- **Images** were downloaded from the old server's `wp-content/uploads` folder, which still serves static files. The large timeline (Part 1, Fig. 3) is shown as a JPEG, and the link opens the full-resolution PNG.
- **Quizzes** (course page): the WordPress export held only `[wp_quiz id=…]` shortcodes. The 29 questions, their answer options and the correct answers were recovered from Wayback Machine snapshots of the rendered page and are stored in `archive/quizzes.json`.
- **Part 3, Figure 3**: in the original post, the image for this figure was a duplicate of Figure 1. It has been redrawn as an HTML bar chart from the percentages quoted in the text.
- **Part 2 animation** is embedded from https://tommyboshkovski.github.io/diffusion-animation/.
- WordPress-only features (collapsible shortcodes, the quiz plugin, the comments section) were replaced with native `<details>` elements and a small script.
