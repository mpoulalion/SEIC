import { createTag } from '../../scripts/shared.js';

/**
 * Wraps the text after each stat's bold number so number and label can sit side by side.
 * @param {Element} p
 */
function decorateStat(p) {
  const number = p.querySelector('strong');
  if (!number) return;
  const label = createTag('span', { class: 'columns-reach-label' });
  let node = number.nextSibling;
  while (node) {
    const next = node.nextSibling;
    label.append(node);
    node = next;
  }
  number.classList.add('columns-reach-number');
  p.append(label);
}

/**
 * Rows: an optional image-only row (background) and a row of
 * stats | highlight.
 * @param {Element} block
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const onlyPicture = cells.length === 1 && cells[0].querySelector('picture')
      && cells[0].textContent.trim() === '';
    if (onlyPicture) {
      row.className = 'columns-reach-bg';
      const img = row.querySelector('img');
      if (img) img.alt = '';
      return;
    }
    row.className = 'columns-reach-row';
    const [stats, highlight] = cells;
    if (stats) {
      stats.className = 'columns-reach-stats';
      stats.querySelectorAll('p').forEach(decorateStat);
    }
    if (highlight) highlight.className = 'columns-reach-highlight';
  });
}
