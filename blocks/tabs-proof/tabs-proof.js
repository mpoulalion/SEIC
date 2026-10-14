import { createTag } from '../../scripts/shared.js';

const LONG_STAT = 8;

let instance = 0;

function selectTab(tabs, panels, index, focus = false) {
  tabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute('aria-selected', selected);
    tab.tabIndex = selected ? 0 : -1;
    panels[i].hidden = !selected;
  });
  if (focus) tabs[index].focus();
}

/**
 * Each row is one client: logo | summary + link | one or more stats.
 * @param {Element} block
 */
export default function decorate(block) {
  instance += 1;
  const tablist = createTag('div', { class: 'tabs-proof-list', role: 'tablist' });
  const tabs = [];
  const panels = [];

  [...block.children].forEach((row, i) => {
    const [logoCell, ...contentCells] = [...row.children];
    const id = `tabs-proof-${instance}-${i}`;
    const label = logoCell.querySelector('img')?.alt || logoCell.textContent.trim();

    const tab = createTag('button', {
      type: 'button',
      class: 'tabs-proof-tab',
      role: 'tab',
      id: `${id}-tab`,
      'aria-controls': `${id}-panel`,
      'aria-label': label,
    });
    tab.append(...logoCell.childNodes);
    tablist.append(tab);
    tabs.push(tab);

    const panel = createTag('div', {
      class: 'tabs-proof-panel',
      role: 'tabpanel',
      id: `${id}-panel`,
      'aria-labelledby': `${id}-tab`,
    });
    contentCells.forEach((cell, c) => {
      cell.className = c === 0 ? 'tabs-proof-summary' : 'tabs-proof-stat';
      // word-based stats ("Multi-custodian access") use a smaller size than figures
      const value = cell.querySelector('strong')?.textContent.trim() || '';
      if (c > 0 && value.length > LONG_STAT) cell.classList.add('is-long');
      panel.append(cell);
    });
    panels.push(panel);
  });

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tabs, panels, i));
    tab.addEventListener('keydown', (e) => {
      const keys = {
        ArrowRight: (i + 1) % tabs.length,
        ArrowLeft: (i - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      if (e.key in keys) {
        e.preventDefault();
        selectTab(tabs, panels, keys[e.key], true);
      }
    });
  });

  block.replaceChildren(tablist, ...panels);
  if (tabs.length) selectTab(tabs, panels, 0);
}
