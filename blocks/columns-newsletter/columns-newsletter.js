import { createTag } from '../../scripts/shared.js';

let instance = 0;

/**
 * Builds the sign-up form from the authored cell:
 * field label, placeholder, a link (button text + form action), then any notes.
 * @param {Element} cell
 */
function buildForm(cell) {
  const link = cell.querySelector('a');
  if (!link) return;

  instance += 1;
  const id = `columns-newsletter-email-${instance}`;
  const paragraphs = [...cell.querySelectorAll(':scope > p')];
  const linkPara = link.closest('p');
  const before = paragraphs.slice(0, paragraphs.indexOf(linkPara));
  const after = paragraphs.slice(paragraphs.indexOf(linkPara) + 1);
  const [labelText, placeholder] = before.map((p) => p.textContent.trim());

  const form = createTag('form', {
    class: 'columns-newsletter-form',
    action: link.href,
    method: 'post',
  });
  const label = createTag('label', { for: id }, labelText || '');
  const input = createTag('input', {
    type: 'email',
    id,
    name: 'email',
    required: '',
    autocomplete: 'email',
    placeholder: placeholder || '',
  });
  const submit = createTag('button', { type: 'submit', class: 'columns-newsletter-submit' }, link.textContent.trim());

  form.append(label, input, submit);
  after.forEach((p) => {
    p.classList.add('columns-newsletter-note');
    form.append(p);
  });
  cell.replaceChildren(form);
}

/** @param {Element} block */
export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  const [intro, signup] = [...row.children];

  if (intro) {
    intro.className = 'columns-newsletter-intro';
    const heading = intro.querySelector('h1, h2, h3');
    const eyebrow = heading?.previousElementSibling;
    if (eyebrow?.tagName === 'P') eyebrow.classList.add('columns-newsletter-eyebrow');
  }

  if (signup) {
    signup.className = 'columns-newsletter-signup';
    buildForm(signup);
  }
}
