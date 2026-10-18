// Mentor Files Viewer
const FILES = [
    { file: 'MASTER_ROADMAP.md',        label: 'Master Roadmap',      icon: 'fa-map' },
    { file: '60_DAY_PLAN.md',           label: '60-Day Plan',         icon: 'fa-calendar-days' },
    { file: 'WEEK_01_PLAN.md',          label: 'Week 01 Plan',        icon: 'fa-calendar-week' },
    { file: 'DAY_1_ACTION_PLAN.md',     label: 'Day 1 Action Plan',   icon: 'fa-play-circle' },
    { file: 'DAILY_TASK_TEMPLATE.md',   label: 'Daily Task Template', icon: 'fa-clipboard-list' },
    { file: 'GOVT_SYLLABUS_SUMMARY.md', label: 'Govt Syllabus',       icon: 'fa-university' },
    { file: 'TECH_PROJECTS.md',         label: 'Tech Projects',       icon: 'fa-laptop-code' },
    { file: 'PROGRESS_TRACKER.md',      label: 'Progress Tracker',    icon: 'fa-chart-line' },
    { file: 'ERROR_NOTEBOOK.md',        label: 'Error Notebook',      icon: 'fa-exclamation-circle' },
    { file: 'WEAK_TOPICS.md',           label: 'Weak Topics',         icon: 'fa-list-ul' },
    { file: 'DAILY_LOG.md',             label: 'Daily Log',           icon: 'fa-book' },
    { file: 'STUDY_RULES.md',           label: 'Study Rules',         icon: 'fa-check-circle' },
    { file: 'RESOURCE_HUB.md',          label: 'Resource Hub',        icon: 'fa-link' }
];

const navEl = document.getElementById('docs-nav');
const bodyEl = document.getElementById('markdown-body');
const sidebarEl = document.getElementById('docs-sidebar');

function renderNav(activeFile) {
    navEl.innerHTML = '';
    FILES.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'docs-nav-btn' + (item.file === activeFile ? ' active' : '');
        btn.innerHTML = '<i class="fas ' + item.icon + ' file-icon"></i><span>' + item.label + '</span>';
        btn.addEventListener('click', () => loadFile(item.file));
        navEl.appendChild(btn);
    });
}

async function loadFile(fileName) {
    renderNav(fileName);
    sidebarEl.classList.remove('active');
    bodyEl.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i><p>Loading ' + fileName + '...</p></div>';

    try {
        const res = await fetch('mentor-files/' + fileName + '?t=' + Date.now());
        if (!res.ok) throw new Error('File not found (' + res.status + ')');
        const text = await res.text();

        marked.setOptions({ gfm: true, breaks: false, headerIds: true, mangle: false });
        let html = marked.parse(text);
        html = html.replace(/<a /g, '<a target="_blank" rel="noopener" ');

        bodyEl.innerHTML = '<h2 class="doc-filename"><i class="fas fa-file-alt"></i> ' + fileName + '</h2>' + html;

        window.scrollTo({ top: 0, behavior: 'smooth' });
        try { history.replaceState(null, '', '?file=' + fileName); } catch (e) {}
    } catch (err) {
        bodyEl.innerHTML = '<div class="loading"><i class="fas fa-triangle-exclamation" style="color:#dc2626"></i><p>Could not load <b>' + fileName + '</b>.<br>' + err.message + '</p><p style="margin-top:1rem">If you opened this file directly (file://), run it through a local server:</p><pre>python -m http.server 8000</pre></div>';
    }
}

function getFileFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('file')) return params.get('file');
    const hash = window.location.hash.replace('#', '');
    return hash || FILES[0].file;
}

document.getElementById('sidebar-toggle').addEventListener('click', () => {
    sidebarEl.classList.toggle('active');
});

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

window.addEventListener('DOMContentLoaded', () => {
    loadFile(getFileFromURL());
});
