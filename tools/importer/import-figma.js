/* global WebImporter */
import parseFigmaBlock from './parsers/figma-block.js';

/**
 * Import script for pages and fragments transcribed from Figma into
 * tools/importer/figma/*.html. Elements marked data-block become block tables,
 * each <section> becomes an EDS section, and <meta name> tags in the source
 * head become the page's metadata block.
 */

const IGNORED_META = ['viewport'];

function getPageMetadata(document) {
  const meta = {};
  document.head.querySelectorAll('meta[name][content]').forEach((m) => {
    if (!IGNORED_META.includes(m.name.toLowerCase())) meta[m.name] = m.content;
  });
  return meta;
}

export default {
  transformDOM: ({ document }) => {
    const metadata = getPageMetadata(document);
    const main = document.querySelector('main');
    const sections = [...main.querySelectorAll(':scope > section')];

    const out = document.createElement('div');
    sections.forEach((section, i) => {
      if (i > 0) out.append(document.createElement('hr'));
      section.querySelectorAll('[data-block]').forEach((el) => parseFigmaBlock(el, { document }));
      out.append(...section.childNodes);
    });

    if (Object.keys(metadata).length) {
      out.append(WebImporter.Blocks.getMetadataBlock(document, metadata));
    }
    return out;
  },

  generateDocumentPath: ({ url }) => {
    const pageName = new URL(url).pathname.split('/').pop().replace(/\.html$/, '');
    return `/${pageName}`;
  },
};
