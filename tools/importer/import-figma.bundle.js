/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-figma.js
  var import_figma_exports = {};
  __export(import_figma_exports, {
    default: () => import_figma_default
  });

  // tools/importer/parsers/figma-block.js
  function parse(element, { document }) {
    const cells = [...element.querySelectorAll(":scope > [data-row]")].map((row) => [...row.querySelectorAll(":scope > [data-cell]")].map((cell) => {
      const frag = document.createElement("div");
      frag.append(...cell.childNodes);
      return frag;
    }));
    element.replaceWith(WebImporter.Blocks.createBlock(document, { name: element.dataset.block, cells }));
  }

  // tools/importer/import-figma.js
  var IGNORED_META = ["viewport"];
  function getPageMetadata(document) {
    const meta = {};
    document.head.querySelectorAll("meta[name][content]").forEach((m) => {
      if (!IGNORED_META.includes(m.name.toLowerCase())) meta[m.name] = m.content;
    });
    return meta;
  }
  var import_figma_default = {
    transformDOM: ({ document }) => {
      const metadata = getPageMetadata(document);
      const main = document.querySelector("main");
      const sections = [...main.querySelectorAll(":scope > section")];
      const out = document.createElement("div");
      sections.forEach((section, i) => {
        if (i > 0) out.append(document.createElement("hr"));
        section.querySelectorAll("[data-block]").forEach((el) => parse(el, { document }));
        out.append(...section.childNodes);
      });
      if (Object.keys(metadata).length) {
        out.append(WebImporter.Blocks.getMetadataBlock(document, metadata));
      }
      return out;
    },
    generateDocumentPath: ({ url }) => {
      const pageName = new URL(url).pathname.split("/").pop().replace(/\.html$/, "");
      return `/${pageName}`;
    }
  };
  return __toCommonJS(import_figma_exports);
})();
