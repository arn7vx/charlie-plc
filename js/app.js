(() => {
  const C = window.SITE_CONTENT;
  const CFG = window.SITE_CONFIG;
  const app = document.getElementById('app');
  const progressBar = document.getElementById('progressBar');
  const progressLabel = document.getElementById('progressLabel');
  const brandButton = document.getElementById('brandButton');
  const toast = document.getElementById('toast');

  const stages = ['landing', 'screening', 'due', 'overview', 'scenarios', 'market', 'position', 'close'];
  let stage = 0;
  let screeningIndex = 0;
  let screeningAnswers = [];
  let quizIndex = 0;
  let scenarioIndex = 0;

  const esc = (v = '') => String(v)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  function updateProgress() {
    const total = stages.length;
    const current = stage + 1;
    progressBar.style.width = `${(current / total) * 100}%`;
    progressLabel.textContent = `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  }

  function setStage(index) {
    stage = Math.max(0, Math.min(stages.length - 1, index));
    screeningIndex = 0;
    quizIndex = 0;
    scenarioIndex = 0;
    updateProgress();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function transitionOut(callback, delay = 190) {
    const current = app.querySelector('.stage');
    if (!current) { callback(); return; }
    current.classList.add('stage--exit');
    window.setTimeout(callback, delay);
  }

  function nextStage() { transitionOut(() => setStage(stage + 1)); }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function stageShell(inner, top = false) {
    return `<section class="stage ${top ? 'stage--top' : ''}"><div class="stage-inner">${inner}</div></section>`;
  }

  function factsGrid(items) {
    return `<div class="facts-grid">${items.map(([label, value]) => `
      <div class="fact"><span class="fact-label">${esc(label)}</span><span class="fact-value">${esc(value)}</span></div>`).join('')}</div>`;
  }

  function renderLanding() {
    const d = C.landing;
    const team = CFG.hiringTeam.map(p => `
      <div class="hiring-person"><img src="${esc(p.image)}" alt="Placeholder for ${esc(p.name)}"><span>${esc(p.name)}</span></div>`).join('');
    app.innerHTML = stageShell(`
      <p class="eyebrow">${esc(d.eyebrow)}</p>
      <h1 class="display">${esc(d.title)}</h1>
      <p class="lede">${esc(d.body)}</p>
      ${factsGrid(d.facts)}
      <p class="micro">${esc(d.note)}</p>
      <div class="hiring-title">Independent hiring committee</div>
      <div class="hiring-grid">${team}</div>
      <p class="micro" style="text-align:center;margin:8px 0 24px">Their qualifications remain unclear.</p>
      <button class="primary-btn" id="startBtn">${esc(d.button)}</button>
      <p class="micro button-note">${d.footnotes.map(esc).join(' · ')}</p>
    `);
    document.getElementById('startBtn').addEventListener('click', nextStage);
  }

  function renderScreening() {
    const d = C.screening;
    if (screeningIndex >= d.questions.length) return renderScreeningResult();
    const q = d.questions[screeningIndex];
    const dots = d.questions.map((_, i) => `<i class="${i === screeningIndex ? 'active' : ''}"></i>`).join('');
    const options = q.options.map((o, i) => `
      <button class="answer-btn" data-index="${i}"><span class="letter">${String.fromCharCode(65+i)}</span><span>${esc(o)}</span></button>`).join('');

    app.innerHTML = stageShell(`
      <div class="question-header"><span class="question-count">Question ${screeningIndex + 1} of ${d.questions.length}</span><span class="dots">${dots}</span></div>
      ${screeningIndex === 0 ? `<p class="eyebrow">${esc(d.title)}</p><p class="micro" style="margin:-5px 0 24px">${esc(d.intro)}</p>` : ''}
      <h2 class="question">${esc(q.question)}</h2>
      <div class="answers">${options}</div>
    `);

    let answered = false;
    app.querySelectorAll('.answer-btn').forEach(btn => btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      screeningAnswers[screeningIndex] = Number(btn.dataset.index);
      btn.classList.add('selected');
      app.querySelectorAll('.answer-btn').forEach(b => { b.disabled = true; });
      window.setTimeout(() => transitionOut(() => {
        screeningIndex += 1;
        renderScreening();
      }, 150), 160);
    }));
  }

  function renderScreeningResult() {
    const r = C.screening.result;
    app.innerHTML = stageShell(`
      <div class="result-stamp">Passed</div>
      <h2 class="display" style="font-size:clamp(36px,10vw,52px)">${esc(r.title)}</h2>
      <p class="lede">${esc(r.body)}</p>
      <div class="soft-card" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <span class="fact-label">${esc(r.statLabel)}</span><strong style="font-family:Georgia,serif;font-size:20px">${esc(r.statValue)}</strong>
      </div>
      <button class="primary-btn" id="screeningContinue">${esc(r.button)}</button>
      <p class="micro" style="margin-top:14px">${esc(r.footnote)}</p>
    `);
    document.getElementById('screeningContinue').addEventListener('click', nextStage);
  }

  function redIndex() {
    const rows = [
      ['Normal conversation', 1],
      ['Mild compliment', 3],
      ['Someone attractive calls him cute', 5]
    ];
    return `<div class="redness">${rows.map(([label,n]) => `<div class="red-row"><span>${esc(label)}</span><span class="red-bar">${[1,2,3,4,5].map(i=>`<i class="${i<=n?'on':''}"></i>`).join('')}</span></div>`).join('')}</div>`;
  }

  function renderInteractiveCards(section, kind) {
    const index = kind === 'quiz' ? quizIndex : scenarioIndex;
    const cards = section.cards;
    if (index >= cards.length) return nextStage();
    const item = cards[index];
    const imageShape = ['portrait', 'square', 'landscape'].includes(item.imageShape) ? item.imageShape : 'landscape';
    const imagePosition = item.imagePosition || '50% 50%';
    const options = item.options.map((o, i) => `
      <button class="answer-btn" data-index="${i}"><span class="letter">${String.fromCharCode(65+i)}</span><span>${esc(o)}</span></button>`).join('');

    app.innerHTML = stageShell(`
      <div class="question-header"><span class="question-count">${esc(section.eyebrow)} · ${index + 1}/${cards.length}</span><span class="dots">${cards.map((_,i)=>`<i class="${i===index?'active':''}"></i>`).join('')}</span></div>
      ${index === 0 ? `<h2 class="section-title">${esc(section.title)}</h2><p class="micro" style="margin:0 0 18px">${esc(section.intro)}</p>` : ''}
      ${item.image
        ? `<img class="quiz-photo quiz-photo--${imageShape}" src="${esc(item.image)}" alt="${esc(item.imageAlt)}" style="object-position:${esc(imagePosition)}" data-photo>`
        : `<div class="quiz-photo quiz-photo--${imageShape} photo-placeholder" role="img" aria-label="${esc(item.imageAlt)}"><span>${esc(item.placeholderLabel || 'Photo coming soon')}</span></div>`}
      <h3 class="question" style="font-size:clamp(24px,7vw,34px)">${esc(item.question)}</h3>
      <div class="answers" id="answers">${options}</div>
      <div id="revealSlot"></div>
    `, true);

    const activePhoto = app.querySelector('img[data-photo]');
    if (activePhoto) {
      activePhoto.addEventListener('error', () => {
        const fallback = document.createElement('div');
        fallback.className = activePhoto.className + ' photo-placeholder';
        fallback.setAttribute('role', 'img');
        fallback.setAttribute('aria-label', activePhoto.alt || 'Photo unavailable');
        fallback.innerHTML = '<span>Photo unavailable</span>';
        activePhoto.replaceWith(fallback);
      }, { once: true });
    }

    let answered = false;
    app.querySelectorAll('.answer-btn').forEach(btn => btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const selected = Number(btn.dataset.index);
      app.querySelectorAll('.answer-btn').forEach((b, i) => {
        if (i === item.correct) b.classList.add('correct');
        else if (i === selected) b.classList.add('wrong');
        b.disabled = true;
      });
      document.getElementById('revealSlot').innerHTML = `
        <div class="reveal">
          <h3>${esc(item.revealTitle)}</h3>
          <p>${esc(item.reveal)}</p>
          ${item.redness ? redIndex() : ''}
        </div>
        <button class="primary-btn" id="cardNext" style="margin-top:14px">${index === cards.length - 1 ? 'Continue' : 'Next'}</button>`;
      document.getElementById('cardNext').addEventListener('click', () => {
        if (index === cards.length - 1) {
          nextStage();
          return;
        }
        transitionOut(() => {
          if (kind === 'quiz') quizIndex += 1; else scenarioIndex += 1;
          renderInteractiveCards(section, kind);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
      setTimeout(() => document.getElementById('revealSlot').scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
    }));
  }

  function renderOverview() {
    const d = C.overview;
    const imageShape = ['portrait', 'square', 'landscape'].includes(d.imageShape) ? d.imageShape : 'portrait';
    const imagePosition = d.imagePosition || '50% 50%';
    app.innerHTML = stageShell(`
      <div class="card hero-card">
        <img class="hero-image hero-image--${imageShape}" src="${esc(d.image)}" alt="${esc(d.imageAlt)}" style="object-position:${esc(imagePosition)}">
        <div class="photo-caption"><span>${esc(d.ticker)}</span><span>Prospectus portrait</span></div>
      </div>
      <div class="status-pill"><i></i>${esc(d.status)}</div>
      <p class="eyebrow">${esc(d.subtitle)}</p>
      <h2 class="display">${esc(d.name)}</h2>
      <div style="margin-bottom:10px">${d.roles.map(r=>`<span class="overview-role">${esc(r)}</span>`).join('')}</div>
      <p class="micro" style="font-style:italic;margin:0 0 18px">${esc(d.punchline)}</p>
      <p class="lede">${esc(d.body)}</p>
      ${factsGrid(d.facts)}
      <button class="primary-btn" id="overviewNext">Run scenario modelling</button>
    `, true);
    const heroPhoto = app.querySelector('.hero-image');
    if (heroPhoto) {
      heroPhoto.addEventListener('error', () => {
        const fallback = document.createElement('div');
        fallback.className = 'hero-image hero-image--' + imageShape + ' photo-placeholder';
        fallback.setAttribute('role', 'img');
        fallback.setAttribute('aria-label', heroPhoto.alt || 'Photo unavailable');
        fallback.innerHTML = '<span>Photo unavailable</span>';
        heroPhoto.replaceWith(fallback);
      }, { once: true });
    }
    document.getElementById('overviewNext').addEventListener('click', nextStage);
  }

  function renderMarket() {
    const d = C.market;
    app.innerHTML = stageShell(`
      <p class="eyebrow">${esc(d.eyebrow)}</p>
      <h2 class="display">${esc(d.title)}</h2>
      <div class="meta-strip">${d.meta.map(([a,b])=>`<div class="meta-item"><small>${esc(a)}</small><strong>${esc(b)}</strong></div>`).join('')}</div>
      <h3 class="section-title" style="font-size:23px">Fundamentals</h3>
      <div class="metric-list">${d.metrics.map(([label,value,n])=>`
        <div class="metric"><div class="metric-head"><span>${esc(label)}</span><strong>${esc(value)}</strong></div><div class="metric-track"><span style="--value:${Math.max(2,n)}%"></span></div></div>`).join('')}</div>
      <h3 class="section-title" style="font-size:23px">Material risks</h3>
      <div class="risk-list">${d.risks.map(([a,b])=>`<div class="risk"><span>${esc(a)}</span><span>${esc(b)}</span></div>`).join('')}</div>
      <p class="micro" style="margin:16px 0 22px">${esc(d.disclaimer)}</p>
      <button class="primary-btn" id="marketNext">View position</button>
    `, true);
    document.getElementById('marketNext').addEventListener('click', nextStage);
  }

  function renderPosition() {
    const d = C.position;
    app.innerHTML = stageShell(`
      <p class="eyebrow">${esc(d.eyebrow)}</p>
      <h2 class="display">${esc(d.title)}</h2>
      <p class="micro" style="margin:-8px 0 20px">${esc(d.subtitle)}</p>
      <div class="meta-strip">${d.meta.map(([a,b])=>`<div class="meta-item"><small>${esc(a)}</small><strong>${esc(b)}</strong></div>`).join('')}</div>
      <h3 class="section-title" style="font-size:23px">Role description</h3>
      <ul class="position-list">${d.responsibilities.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
      <p class="lede" style="font-size:13px">${esc(d.requirements)}</p>
      <div class="spacer-16"></div>
      <p class="eyebrow">Analyst coverage</p>
      <h3 class="section-title">${esc(d.testimonialsTitle)}</h3>
      <div class="testimonial-stack">${d.testimonials.map(t=>{
        const sentiment = /SELL|UNDERPERFORM|AVOID/i.test(t.rating) ? 'negative' : 'positive';
        const reviewer = t.reviewerKey && CFG.testimonialReviewers ? CFG.testimonialReviewers[t.reviewerKey] : null;
        const portrait = reviewer?.image
          ? `<img class="testimonial-avatar testimonial-avatar--photo" src="${esc(reviewer.image)}" alt="Portrait of ${esc(t.author)}" loading="lazy" data-avatar-fallback>`
          : `<div class="testimonial-avatar testimonial-avatar--anonymous" aria-hidden="true">?</div>`;
        return `
        <article class="testimonial testimonial--${sentiment}">
          <div class="testimonial-head">
            <div class="testimonial-person">
              ${portrait}
              <div>
                <strong class="testimonial-author">${esc(t.author)}</strong>
                <span class="testimonial-role">${esc(t.relationship || 'Independent reviewer')}</span>
              </div>
            </div>
            <span class="rating">${esc(t.rating)}</span>
          </div>
          <blockquote>“${esc(t.quote)}”</blockquote>
          ${t.note ? `<footer><span>${esc(t.note)}</span></footer>` : ''}
        </article>`;
      }).join('')}</div>
      <button class="primary-btn" id="positionNext" style="margin-top:22px">Review long-term outlook</button>
    `, true);
    app.querySelectorAll('img[data-avatar-fallback]').forEach(img => {
      img.addEventListener('error', () => {
        const fallback = document.createElement('div');
        fallback.className = 'testimonial-avatar testimonial-avatar--anonymous';
        fallback.setAttribute('aria-hidden', 'true');
        fallback.textContent = '?';
        img.replaceWith(fallback);
      }, { once: true });
    });
    document.getElementById('positionNext').addEventListener('click', nextStage);
  }

  function renderClose() {
    const d = C.close;
    app.innerHTML = stageShell(`
      <p class="eyebrow">${esc(d.eyebrow)}</p>
      <h2 class="display">${esc(d.title)}</h2>
      <p class="lede">${esc(d.body)}</p>
      <div class="soft-card">
        <h3 class="section-title" style="font-size:27px">${esc(d.ctaTitle)}</h3>
        <p class="micro">${esc(d.ctaBody)}</p>
        <div class="cta-cluster">
          <a class="primary-btn" style="display:grid;place-items:center;text-decoration:none" href="${esc(CFG.instagramUrl)}" target="_blank" rel="noopener">${esc(d.instagramLabel)}</a>
          <p class="micro button-note" style="margin-top:-4px">${esc(d.instagramNote)}</p>
          <div class="referral-copy">
            <strong>${esc(d.referralTitle)}</strong>
            <span>${esc(d.referralBody)}</span>
          </div>
          <button class="secondary-btn" id="shareBtn">${esc(d.referralLabel)}</button>
          <p class="micro button-note" style="margin-top:-4px">${esc(d.referralNote)}</p>
        </div>
      </div>
      <div class="spacer-16"></div>
      <p class="eyebrow">Investor relations</p>
      <div class="faq">${d.faq.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
      <p class="legal">© 2026 Charlie PLC · ${esc(d.legal)}</p>
    `, true);
    document.getElementById('shareBtn').addEventListener('click', shareSite);
  }

  async function shareSite() {
    const url = CFG.siteUrl || window.location.href.split('#')[0];
    const payload = { title: CFG.shareTitle, text: CFG.shareText, url };
    if (navigator.share) {
      try { await navigator.share(payload); return; } catch (err) { if (err?.name === 'AbortError') return; }
    }
    try {
      await navigator.clipboard.writeText(`${CFG.shareText} ${url}`);
      showToast('Referral link copied');
    } catch {
      showToast('Copy the page link to refer a friend');
    }
  }

  function render() {
    const id = stages[stage];
    if (id === 'landing') renderLanding();
    else if (id === 'screening') renderScreening();
    else if (id === 'due') renderInteractiveCards(C.dueDiligence, 'quiz');
    else if (id === 'overview') renderOverview();
    else if (id === 'scenarios') renderInteractiveCards(C.scenarios, 'scenario');
    else if (id === 'market') renderMarket();
    else if (id === 'position') renderPosition();
    else if (id === 'close') renderClose();
  }

  brandButton.addEventListener('click', () => setStage(0));
  updateProgress();
  render();
})();
