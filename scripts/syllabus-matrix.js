/* Padhaispace syllabus matrix: plain JSON in, plain HTML out.
 * No framework or backend. Edit decisions stay in this browser until exported.
 * Original data: data/syllabi/structured/matrix.json
 */
(() => {
  'use strict';

  const MATRIX_PATH = '../../data/syllabi/structured/matrix.json';
  const SOURCES_PATH = '../../data/syllabi/sources/source-register.json';
  const DRAFT_KEY = 'padhaispace-syllabus-draft-v1';
  const ORDER = ['pending', 'included', 'partial', 'excluded'];
  const LABELS = {
    pending: { symbol: '?', description: 'Unreviewed' },
    included: { symbol: '✓', description: 'In syllabus (draft)' },
    partial: { symbol: '◐', description: 'Partly covered (draft)' },
    excluded: { symbol: '—', description: 'Not included (draft)' }
  };

  const el = (id) => document.getElementById(id);
  const subjectButtons = { physics: el('physics-tab'), chemistry: el('chemistry-tab') };
  const regionSelect = el('region-select');
  const searchInput = el('topic-search');
  const tableHeader = el('matrix-header');
  const tableBody = el('matrix-body');
  const sourcesBody = el('sources-body');
  const editStatus = el('edit-status');
  const stats = el('matrix-stats');
  const exportButton = el('export-button');
  const resetButton = el('reset-button');

  let matrix;
  let drafts = {};
  let subject = new URLSearchParams(location.search).get('subject') === 'chemistry' ? 'chemistry' : 'physics';
  let region = 'ap';

  function loadDrafts() {
    try {
      const value = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch (_) { return {}; }
  }

  function saveDrafts() {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts)); return true; }
    catch (_) { editStatus.textContent = 'Browser storage unavailable. Export your changes before closing.'; return false; }
  }

  function getExamKey(column) {
    return column.regional ? column.regional[region] : column.id;
  }

  function getCoverage(topic, key) {
    const draftKey = `${subject}/${topic.id}/${key}`;
    if (Object.prototype.hasOwnProperty.call(drafts, draftKey)) return drafts[draftKey];
    return (topic.coverage || {})[key] || 'pending';
  }

  function isDraft(topic, key) {
    return Object.prototype.hasOwnProperty.call(drafts, `${subject}/${topic.id}/${key}`);
  }

  function create(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function renderSources(sources) {
    sourcesBody.replaceChildren();
    for (const source of sources.sources) {
      const tr = create('tr');
      tr.append(create('td', source.exam));
      tr.append(create('td', source.year));
      tr.append(create('td', source.authority));
      const urlCell = create('td');
      if (source.url) {
        const link = create('a', source.kind === 'portal' ? 'Official portal ↗' : 'Official syllabus ↗');
        link.href = source.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        urlCell.append(link);
      } else { urlCell.textContent = 'Not located'; }
      tr.append(urlCell);
      tr.append(create('td', source.stage, 'stage'));
      sourcesBody.append(tr);
    }
  }

  function updateStatus() {
    const count = Object.keys(drafts).length;
    editStatus.textContent = count
      ? `${count} local draft change${count === 1 ? '' : 's'}. Export JSON and replace data/syllabi/structured/matrix.json to save in Git.`
      : 'No unsaved browser edits. Original matrix.json remains the source of truth.';
    resetButton.disabled = count === 0;
  }

  function changeCoverage(topic, examKey) {
    const current = getCoverage(topic, examKey);
    const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
    const draftKey = `${subject}/${topic.id}/${examKey}`;
    const original = (topic.coverage || {})[examKey] || 'pending';
    if (next === original) delete drafts[draftKey];
    else drafts[draftKey] = next;
    saveDrafts();
    renderMatrix();
  }

  function renderMatrix() {
    const columns = matrix.columns;
    const term = searchInput.value.trim().toLocaleLowerCase();
    const topics = matrix.subjects[subject].filter((t) => `${t.group} ${t.name}`.toLocaleLowerCase().includes(term));
    const allTopics = matrix.subjects[subject];

    for (const [key, button] of Object.entries(subjectButtons)) {
      const selected = key === subject;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    }

    tableHeader.replaceChildren();
    tableHeader.append(create('th', 'Topic'));
    tableHeader.firstElementChild.scope = 'col';
    for (const column of columns) {
      const th = create('th', column.label);
      th.scope = 'col';
      if (column.regional) th.append(create('small', region === 'ap' ? 'Andhra Pradesh' : 'Telangana'));
      tableHeader.append(th);
    }

    tableBody.replaceChildren();
    let previousGroup = '';
    let reviewed = 0;
    for (const topic of allTopics) for (const column of columns) if (getCoverage(topic, getExamKey(column)) !== 'pending') reviewed++;
    stats.textContent = `${allTopics.length} topics · ${reviewed} / ${allTopics.length * columns.length} cells mapped`;

    for (const topic of topics) {
      if (topic.group !== previousGroup) {
        previousGroup = topic.group;
        const groupRow = create('tr', undefined, 'group-row');
        const groupCell = create('th', previousGroup);
        groupCell.colSpan = columns.length + 1;
        groupCell.scope = 'rowgroup';
        groupRow.append(groupCell);
        tableBody.append(groupRow);
      }
      const row = create('tr');
      const topicCell = create('th', topic.name, 'topic-cell');
      topicCell.scope = 'row';
      row.append(topicCell);
      for (const column of columns) {
        const key = getExamKey(column);
        const status = getCoverage(topic, key);
        const td = create('td', undefined, 'coverage-cell');
        const button = create('button', LABELS[status].symbol, `coverage-button ${status}`);
        button.type = 'button';
        button.setAttribute('aria-label', `${topic.name}, ${column.label}${column.regional ? ` ${region === 'ap' ? 'Andhra Pradesh' : 'Telangana'}` : ''}: ${LABELS[status].description}. Click to change draft.`);
        button.title = `${LABELS[status].description}${isDraft(topic, key) ? ' · local edit' : ''} · click to change`;
        button.addEventListener('click', () => changeCoverage(topic, key));
        td.append(button);
        row.append(td);
      }
      tableBody.append(row);
    }
    el('empty-search').hidden = topics.length !== 0;
    updateStatus();
  }

  function exportMatrix() {
    const updated = structuredClone(matrix);
    for (const [key, status] of Object.entries(drafts)) {
      const bits = key.split('/');
      if (bits.length !== 3) continue;
      const [s, topicId, examKey] = bits;
      const topic = updated.subjects[s]?.find((t) => t.id === topicId);
      if (!topic) continue;
      if (!topic.coverage) topic.coverage = {};
      if (status === 'pending') delete topic.coverage[examKey];
      else topic.coverage[examKey] = status;
      if (!Object.keys(topic.coverage).length) delete topic.coverage;
    }
    const blob = new Blob([JSON.stringify(updated, null, 2) + '\n'], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const a = create('a');
    a.href = href;
    a.download = 'matrix.json';
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
  }

  subjectButtons.physics.addEventListener('click', () => { subject = 'physics'; renderMatrix(); });
  subjectButtons.chemistry.addEventListener('click', () => { subject = 'chemistry'; renderMatrix(); });
  regionSelect.addEventListener('change', () => { region = regionSelect.value; renderMatrix(); });
  searchInput.addEventListener('input', renderMatrix);
  exportButton.addEventListener('click', exportMatrix);
  resetButton.addEventListener('click', () => {
    if (!confirm('Discard all locally edited syllabus mappings in this browser? Your original JSON file will not change.')) return;
    drafts = {};
    saveDrafts();
    renderMatrix();
  });

  async function init() {
    try {
      const [m, s] = await Promise.all([
        fetch(MATRIX_PATH).then((r) => { if (!r.ok) throw new Error(`Matrix fetch: ${r.status}`); return r.json(); }),
        fetch(SOURCES_PATH).then((r) => { if (!r.ok) throw new Error(`Sources fetch: ${r.status}`); return r.json(); })
      ]);
      if (!m.columns || !m.subjects?.physics || !m.subjects?.chemistry) throw new Error('Invalid matrix format');
      matrix = m;
      drafts = loadDrafts();
      renderSources(s);
      exportButton.disabled = false;
      renderMatrix();
    } catch (error) {
      stats.textContent = 'Unable to load data';
      tableBody.replaceChildren();
      const tr = create('tr');
      const td = create('td', 'Could not load JSON. Open this site using VS Code Live Server or: python3 -m http.server 8000');
      td.colSpan = 8;
      tr.append(td);
      tableBody.append(tr);
      sourcesBody.replaceChildren();
      editStatus.textContent = error.message;
    }
  }
  init();
})();
