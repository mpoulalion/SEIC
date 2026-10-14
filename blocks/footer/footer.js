import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Links made of an icon plus text (logo, social links) keep the text as the
 * accessible name but hide it visually.
 * @param {Element} root
 */
function labelIconLinks(root) {
  root.querySelectorAll('a').forEach((link) => {
    if (!link.querySelector('.icon')) return;
    link.classList.add('footer-icon-link');
    [...link.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const label = document.createElement('span');
        label.className = 'footer-label';
        label.textContent = node.textContent.trim();
        node.replaceWith(label);
      }
    });
  });
}

/**
 * Section 1: each heading and the list after it become one link column.
 * @param {Element} section
 */
function buildColumns(section) {
  const wrapper = section.querySelector('.default-content-wrapper');
  if (!wrapper) return;
  const columns = [];
  [...wrapper.children].forEach((el) => {
    if (/^H[1-6]$/.test(el.tagName) || !columns.length) {
      const column = document.createElement('div');
      column.className = 'footer-column';
      columns.push(column);
    }
    columns[columns.length - 1].append(el);
  });
  wrapper.replaceChildren(...columns);
}

/**
 * loads and decorates the footer
 * Sections: link columns | logo, links and social icons | copyright and legal links
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment (skip if aem-embed already provided content)
  if (block.textContent === '') {
    const footerMeta = getMetadata('footer');
    const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
    const fragment = await loadFragment(footerPath);

    block.textContent = '';
    const footer = document.createElement('div');
    while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
    block.append(footer);
  }

  const [links, brand, legal] = block.querySelectorAll('.section');
  if (links) {
    links.classList.add('footer-links');
    buildColumns(links);
  }
  if (brand) {
    brand.classList.add('footer-brand');
    brand.querySelectorAll('ul').forEach((ul) => {
      ul.classList.add(ul.querySelector('.icon') ? 'footer-social' : 'footer-nav');
    });
  }
  if (legal) legal.classList.add('footer-legal');

  // footer links are plain text links, not buttons
  block.querySelectorAll('.button').forEach((a) => a.classList.remove('button'));
  block.querySelectorAll('.button-container').forEach((p) => p.classList.remove('button-container'));
  labelIconLinks(block);
}
