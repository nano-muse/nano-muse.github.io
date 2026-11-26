import { _ as _export_sfc, o as openBlock, c as createElementBlock, a3 as createStaticVNode, j as createBaseVNode } from "./chunks/framework.CeQPPbnY.js";
const __pageData = JSON.parse('{"title":"nanoMuse docs","description":"","frontmatter":{"layout":"home","title":"nanoMuse docs","hero":{"text":"An open-source personal agent for every device you own.","tagline":"One agent on your phone, your computer and the web, one account across them. It does things instead of answering questions, keeps going when the app is closed, remembers you in files you can read, and asks before anything you could not undo. The whole set is one repository under GPL-3.0-or-later, and the same relay runs on a server of yours.","actions":[{"theme":"brand","text":"Install","link":"/android"},{"theme":"alt","text":"Try it in the browser","link":"https://demo.nanomuse.dev/"},{"theme":"alt","text":"Run it yourself","link":"/self-hosting"},{"theme":"alt","text":"GitHub","link":"https://github.com/nano-muse/nanoMuse"},{"theme":"alt","text":"Paper","link":"https://arxiv.org/abs/2610.08699"}]}},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const _sfc_main = { name: "index.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createStaticVNode("", 5),
    createBaseVNode("video", {
      controls: "",
      playsinline: "",
      preload: "metadata",
      poster: "https://nanomuse.cn/media/film/poster-en.png",
      style: { "width": "100%", "max-width": "960px", "border-radius": "12px", "display": "block", "margin": "0 auto" }
    }, [
      createBaseVNode("source", {
        src: "https://nanomuse.cn/media/film/nanomuse-film-en-web.mp4",
        type: "video/mp4"
      })
    ], -1),
    createStaticVNode("", 5)
  ])]);
}
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  index as default
};
