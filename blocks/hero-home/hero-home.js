import { createTag } from '../../scripts/shared.js';

/**
 * Splits the heading into stacked "bands". Emphasized text becomes its own
 * accent band, so authors control the line break by italicizing the second line.
 * @param {Element} heading
 */
function buildBands(heading) {
  const bands = [];
  let current = [];
  const flush = (accent = false) => {
    const text = current.map((n) => n.textContent).join('').trim();
    if (text) {
      const band = createTag('span', { class: `hero-home-band${accent ? ' hero-home-band-accent' : ''}` });
      band.append(createTag('span', { class: 'hero-home-band-text' }, text));
      bands.push(band);
    }
    current = [];
  };

  [...heading.childNodes].forEach((node) => {
    if (node.nodeName === 'EM' || node.nodeName === 'I') {
      flush();
      current = [node];
      flush(true);
    } else if (node.nodeName === 'BR') {
      flush();
    } else {
      current.push(node);
    }
  });
  flush();

  if (bands.length) heading.replaceChildren(...bands);
}

/** @param {Element} block */
export default function decorate(block) {
  const content = block.querySelector(':scope > div > div') || block;
  content.classList.add('hero-home-content');

  const heading = content.querySelector('h1, h2');
  if (heading) buildBands(heading);

  block.replaceChildren(content);
}
