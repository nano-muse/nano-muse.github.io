# nano-muse.github.io

The project homepage of [nanoMuse](https://github.com/nano-muse/nanoMuse), served at <https://nanomuse.cn/> — a server that pulls this repository every minute — and by GitHub Pages at <https://nano-muse.github.io/>. A push to `main` updates both within a minute.

One plain page, `index.html` with `style.css`: what nanoMuse is, the downloads of the current version, links and the last three releases, in English and 简体中文 (the switch keeps its choice in `localStorage`; without JavaScript both languages show). Static, no build step, no third-party scripts or fonts. `own-key/` and `privacy/` are the small pages the apps link to; `docs/` is the built documentation site, written by the release.
