import { createTag } from '../../scripts/shared.js';

const LIGHT_THRESHOLD = 170;

/**
 * Switches the card to dark text when the top of its background image is light,
 * so authors don't have to pick a text color per card.
 * @param {HTMLImageElement} img
 * @param {Element} card
 */
function matchTextToImage(img, card) {
  const sample = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 8;
      canvas.height = 4;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight / 2, 0, 0, 8, 4);
      const { data } = ctx.getImageData(0, 0, 8, 4);
      let total = 0;
      for (let i = 0; i < data.length; i += 4) {
        total += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      }
      card.classList.toggle('is-light', total / (data.length / 4) > LIGHT_THRESHOLD);
    } catch (e) {
      // cross-origin image: keep the default light text
    }
  };
  if (img.complete && img.naturalWidth) sample();
  else img.addEventListener('load', sample, { once: true });
}

/** @param {Element} block */
export default function decorate(block) {
  const list = createTag('ul');

  [...block.children].forEach((row) => {
    const card = createTag('li', { class: 'cards-highlights-card' });
    [...row.children].forEach((cell) => {
      const picture = cell.querySelector('picture');
      if (picture && cell.textContent.trim() === '') {
        cell.className = 'cards-highlights-image';
        const img = picture.querySelector('img');
        if (img) {
          img.alt = '';
          matchTextToImage(img, card);
        }
      } else {
        cell.className = 'cards-highlights-body';
      }
      card.append(cell);
    });
    list.append(card);
  });

  block.replaceChildren(list);
}
