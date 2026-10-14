import { createTag } from '../../scripts/shared.js';

/**
 * Each row: photo | person name and role, then the headline and summary.
 * Everything before the first heading is shown over the photo.
 * @param {Element} block
 */
export default function decorate(block) {
  const list = createTag('ul');

  [...block.children].forEach((row) => {
    const card = createTag('li', { class: 'cards-perspectives-card' });
    const media = createTag('div', { class: 'cards-perspectives-media' });
    const person = createTag('div', { class: 'cards-perspectives-person' });
    const body = createTag('div', { class: 'cards-perspectives-body' });

    [...row.children].forEach((cell) => {
      const picture = cell.querySelector('picture');
      if (picture && cell.textContent.trim() === '') {
        media.prepend(picture);
        return;
      }
      let target = person;
      [...cell.children].forEach((el) => {
        if (/^H[1-6]$/.test(el.tagName)) target = body;
        target.append(el);
      });
    });

    if (person.children.length) {
      person.firstElementChild.classList.add('cards-perspectives-name');
      media.append(person);
    }
    card.append(media, body);
    list.append(card);
  });

  block.replaceChildren(list);
}
