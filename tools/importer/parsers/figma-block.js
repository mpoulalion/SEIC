/* global WebImporter */

/**
 * Parser for Figma-transcribed source markup: replaces an element marked
 * data-block="Block Name" with a block table. Each direct [data-row] child is a
 * row and each of its direct [data-cell] children is a cell.
 * @param {Element} element
 * @param {{ document: Document }} context
 */
export default function parse(element, { document }) {
  const cells = [...element.querySelectorAll(':scope > [data-row]')].map((row) => (
    [...row.querySelectorAll(':scope > [data-cell]')].map((cell) => {
      const frag = document.createElement('div');
      frag.append(...cell.childNodes);
      return frag;
    })
  ));
  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: element.dataset.block, cells }));
}
