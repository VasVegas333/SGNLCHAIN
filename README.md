# SGNLCHAIN showcase
Responsive, buildless music showcase. Serve `dist/` with any static host. No installation or build step required.

Includes a full-height tunable canvas signal, pause/reduced-motion support, artist filters, and a staggered scroll-reveal cascade of all 16 Beatport catalogue entries as of October 6, 2026 (15 released and 1 preorder). Artwork is stored locally and every card links to its Beatport release. Audio is never autoplayed; release links open the original music platforms.

Content sources: https://linktr.ee/sgnlchain and https://www.beatport.com/label/sgnlchain/181221, accessed October 6, 2026. This is a showcase concept; brand assets and music artwork belong to their respective owners. The catalogue is a verified snapshot, not automatically synchronized.

GitHub Pages: current publication uses the main branch repository root. Root index.html references dist assets; .nojekyll prevents README rendering. The manual Actions workflow can publish dist/ if Pages is later switched to Actions. No secrets required.
