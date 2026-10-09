(() => {
  'use strict';
  const { events, eras } = window.NEURON_HISTORY;
  const terms = window.NEURON_TERMS.items;
  const M = window.NEURON_MEDIA;
  const $ = id => document.getElementById(id);
  const esc = M.escape;
  const periods = [
    { id:'ancient', label:'Ancient world', range:'c. 700 BCE–216 CE', end:300, title:'The first questions', description:'What are nerves, and where do sensation and thought begin?' },
    { id:'anatomists', label:'1500–1739', range:'1543–1717', end:1740, title:'Looking beneath the surface', description:'Dissection and microscopy transform the view of the nervous system.' },
    { id:'electric', label:'1740–1799', range:'1740–1799', end:1800, title:'An age of experiments', description:'Muscles, natural membranes and electric animals raise parallel questions.' },
    { id:'nineteenth', label:'1800–1899', range:'1800–1899', end:1900, title:'Cells, sheaths & invisible forces', description:'Microscopy, electrical recording and physical chemistry develop side by side.' },
    { id:'twentieth', label:'1900–1938', range:'1900–1938', end:1939, title:'From observations to mechanisms', description:'Selective membranes, glial cells and physical models offer new explanations.' },
    { id:'modern', label:'1939–1962', range:'1939–1962', end:Infinity, title:'The electrical cell comes into focus', description:'Ionic currents and saltatory conduction converge; myelin formation follows.' }
  ];
  const names = { roots:'Early ideas & language', anatomy:'Anatomy & function', electricity:'Bioelectricity', cell:'The neuron as a cell', myelin:'Myelin & conduction', ions:'Membranes & ions' };
  const essential = new Set(['alcmaeon','galen','vesalius','galvani','du-bois-reymond','helmholtz','golgi','cajal-waldeyer','overton','bernstein','hodgkin-huxley-1952','myelin-wave-1952']);
  const kinds = { language:new Set(['word-before-cell','names','virchow-myelin']), theory:new Set(['alcmaeon','sacred-disease','aristotle','nernst','bernstein','lillie-model','hodgkin-huxley-1952']), anatomy:new Set(['herophilus','vesalius','willis','leeuwenhoek-fontana','remak-schwann','deiters','golgi','cajal-waldeyer','ranvier-nodes','rio-oligodendrocytes','ben-geren','bunge-central']) };
  const kindNames = { language:'Naming & language', theory:'Theory & model', anatomy:'Anatomy & observation', experiment:'Experiment & measurement' };
  const state = { view:'timeline', period:'all', thread:'all', kind:'all', essential:false, query:'' };
  function readState() { try { const value=JSON.parse(localStorage.getItem('neuron-reading-v1')); return value && typeof value === 'object' ? value : {opened:[]}; } catch { return {opened:[]}; } }
  const reading = readState();
  const validReadingKeys = new Set([...events.map(e=>'event:'+e.id),...terms.map(t=>'term:'+t.id)]);
  const opened = new Set((Array.isArray(reading.opened) ? reading.opened : []).filter(key=>validReadingKeys.has(key)));
  const periodFor = item => periods.find(p => item.sort < p.end);
  const kindFor = event => Object.keys(kinds).find(k => kinds[k].has(event.id)) || 'experiment';
  function matches(item, word = false) {
    const event = word ? events.find(e => e.id === item.anchor) : item;
    const q = state.query.trim().toLocaleLowerCase();
    return (state.period === 'all' || periodFor(item).id === state.period)
      && (state.thread === 'all' || event.era === state.thread)
      && (state.kind === 'all' || (word ? state.kind === 'language' : kindFor(item) === state.kind))
      && (!state.essential || essential.has(event.id))
      && (!q || [item.date,item.title,item.person,item.summary,item.question,item.word,item.former,item.current,item.origin,names[event.era]].filter(Boolean).join(' ').toLocaleLowerCase().includes(q));
  }
  function card(event) {
    const media = M.event(event.id), kind = kindFor(event), color = eras.find(e=>e.id===event.era).color;
    const url = `event.html?id=${encodeURIComponent(event.id)}`;
    return `<article class="story-card" id="event-${event.id}" style="--thread:${color}">${opened.has('event:'+event.id)?'<span class="read-badge">✓ Opened</span>':''}<a class="card-picture" href="${url}" tabindex="-1" aria-hidden="true"><img src="${esc(M.url(media,640))}" alt="" loading="lazy" decoding="async"><span class="image-label">${esc(media.type)}</span></a><div class="card-body"><div class="card-meta"><time class="card-date">${esc(event.date)}</time><span class="kind-badge">${kindNames[kind]}</span></div><h4><a href="${url}">${esc(event.title)}</a></h4><p class="card-person">${esc(event.person)}</p><p class="card-summary">${esc(event.summary)}</p><div class="card-footer"><span class="card-thread"><i class="thread-dot"></i>${names[event.era]}</span><a class="read-link" href="${url}" aria-label="Read ${esc(event.title)}">Read the story ↗</a></div></div><a class="card-source" href="${esc(M.source(media))}" target="_blank" rel="noopener noreferrer">Image: ${esc(media.credit)} ↗</a></article>`;
  }
  function wordCard(term) {
    const media = M.term(term.id), url = `term.html?id=${encodeURIComponent(term.id)}`;
    return `<article class="story-card word-card" id="term-${term.id}">${opened.has('term:'+term.id)?'<span class="read-badge">✓ Opened</span>':''}<a class="card-picture" href="${url}" tabindex="-1" aria-hidden="true"><img src="${esc(M.url(media,640))}" alt="" loading="lazy" decoding="async"><span class="image-label">${esc(media.type)}</span></a><div class="card-body"><div class="card-meta"><time class="card-date">${esc(term.date)}</time><span class="kind-badge">Word history</span></div><h4><a href="${url}">${esc(term.word)}</a></h4><p class="card-summary">${esc(term.former)} <span aria-hidden="true">→</span> ${esc(term.current)}</p><div class="card-footer"><span>${term.exactDate?'Documented usage':'Approximate / evolving usage'}</span><a class="read-link" href="${url}">Trace the word ↗</a></div></div><a class="card-source" href="${esc(M.source(media))}" target="_blank" rel="noopener noreferrer">Image: ${esc(media.credit)} ↗</a></article>`;
  }
  function laneCard(event) { const media=M.event(event.id);return `<a class="lane-card" href="event.html?id=${event.id}"><img src="${esc(M.url(media,320))}" alt="${esc(media.caption)}" loading="lazy"><time>${esc(event.date)}</time><b>${esc(event.title)}</b><span>${esc(event.person)}</span></a>`; }
  function convergence(ids, target, title, subtitle) {
    const node = events.find(e=>e.id===target);
    return `<section class="confluence"><span class="overline">WHERE QUESTIONS MEET</span><h3>${title}</h3><div class="confluence-inputs">${ids.map(id=>{const e=events.find(e=>e.id===id);return `<a href="event.html?id=${id}"><small>${esc(e.date)} · ${names[e.era]}</small>${esc(e.title)} ↗</a>`;}).join('')}</div><a class="confluence-output" href="event.html?id=${target}"><small>${esc(node.date)}</small>${esc(node.title)} ↗</a><p>${subtitle}</p></section>`;
  }
  function render() {
    $('periods').innerHTML = [{id:'all',label:'All periods'},...periods].map(p=>`<button data-period="${p.id}" aria-pressed="${state.period===p.id}">${p.label}</button>`).join('');
    $('threadFilters').innerHTML = `<button class="thread-button" data-thread="all" aria-pressed="${state.thread==='all'}"><i style="--thread:#879276"></i><span>All research threads</span><small>47</small></button>`+eras.map(e=>`<button class="thread-button" data-thread="${e.id}" aria-pressed="${state.thread===e.id}"><i style="--thread:${e.color}"></i><span>${names[e.id]}</span><small>${events.filter(x=>x.era===e.id).length}</small></button>`).join('');
    document.querySelectorAll('.view-switch button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===state.view)));
    $('kindFilter').value=state.kind; $('essentialOnly').checked=state.essential;
    const word=state.view==='words';
    const items=(word ? terms : events).filter(item=>matches(item,word)).slice().sort((a,b)=>a.sort-b.sort);
    $('resultCount').textContent=`${items.length} ${word?'word histories':'milestones'}${state.essential?' · essential journey':''}`;
    $('viewNote').textContent=state.view==='paths'?'Read down each thread · compare across threads':'Chronological order · earliest first';
    let html='';
    if(state.view==='paths') {
      html='<div class="path-intro"><h3>Different questions. The same era.</h3><p>Each column follows a research topic within one period. Dates keep the ordering visible. The meeting points below connect related evidence; they do not assert direct personal influence or equal time intervals.</p></div>';
      if(state.thread==='all' && !state.query && state.kind==='all' && !state.essential){
        if(['all','electric'].includes(state.period))html+=convergence(['electrical-medicine','haller-irritability','walsh-electric-fish'],'galvani-deliberate','What makes a muscle contract?','Three earlier research contexts help explain the question behind Galvani’s deliberate experiments.');
        if(['all','twentieth'].includes(state.period))html+=convergence(['bernstein-rheotome','overton','nernst'],'bernstein','A membrane meets an ion gradient','Measurement, cell permeability and electrochemistry meet in the 1902 membrane model.');
        if(['all','modern'].includes(state.period))html+=convergence(['hodgkin-huxley-1952','huxley-stampfli'],'myelin-wave-1952','Two routes to understanding propagation','An educational synthesis of distinct preparations: unmyelinated squid axons and myelinated peripheral fibers.');
      }
    }
    for(const [index,p] of periods.entries()) {
      const group=items.filter(item=>periodFor(item).id===p.id);
      if(!group.length)continue;
      html+=`<section class="timeline-section"><header class="era-heading"><h3><span class="era-number">0${index+1}</span>${p.title}</h3><p>${p.range} · ${group.length} ${word?'words':'milestones'}</p></header>`;
      if(state.view==='paths')html+=`<div class="lanes">${eras.map(era=>{const lane=group.filter(e=>e.era===era.id);return lane.length?`<section class="lane" style="--thread:${era.color}"><h4>${names[era.id]}</h4>${lane.map(laneCard).join('')}</section>`:'';}).join('')}</div>`;
      else html+=`<div class="cards">${group.map(word?wordCard:card).join('')}</div>`;
      html+='</section>';
    }
    if(!items.length)html='<section class="empty-state"><span class="overline">NO MATCHES IN THIS VIEW</span><h3>Try a wider lens.</h3><p>Choose another period or clear the filters to see more stories.</p><button data-reset>Clear all filters</button></section>';
    $('results').innerHTML=html;
    $('results').querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>img.parentElement.classList.add('image-failed'),{once:true}));
    saveURL();
  }
  function saveURL(){const params=new URLSearchParams();for(const [key,value]of Object.entries(state))if(value!==({view:'timeline',period:'all',thread:'all',kind:'all',essential:false,query:''})[key])params.set(key,String(value));history.replaceState(null,'',location.pathname+(params.size?'?'+params:'')+location.hash);}
  function restoreURL(){const p=new URLSearchParams(location.search);for(const key of ['view','period','thread','kind','query'])if(p.has(key))state[key]=p.get(key);state.essential=p.get('essential')==='true';if(!['timeline','paths','words'].includes(state.view))state.view='timeline';if(!['all',...periods.map(p=>p.id)].includes(state.period))state.period='all';if(!['all',...eras.map(e=>e.id)].includes(state.thread))state.thread='all';if(!['all',...Object.keys(kindNames)].includes(state.kind))state.kind='all';$('search').value=state.query;}
  function clearAnchor(){if(location.hash.startsWith('#event-')||location.hash.startsWith('#term-'))history.replaceState(null,'',location.pathname+location.search);}
  function reset(){clearAnchor();Object.assign(state,{period:'all',thread:'all',kind:'all',essential:false,query:''});$('search').value='';render();}
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-view],[data-period],[data-thread],[data-reset],[data-guide]');if(!b)return;clearAnchor();
    if(b.dataset.view){state.view=b.dataset.view;if(state.view==='words'){state.essential=false;state.kind='all';}render();}
    if(b.dataset.period){state.period=b.dataset.period;render();}
    if(b.dataset.thread){state.thread=b.dataset.thread;render();}
    if(b.hasAttribute('data-reset'))reset();
    if(b.hasAttribute('data-guide')){reset();state.view='timeline';state.essential=true;render();}
  });
  $('search').addEventListener('input',e=>{clearAnchor();state.query=e.target.value;render();});
  $('kindFilter').addEventListener('change',e=>{clearAnchor();state.kind=e.target.value;render();});
  $('essentialOnly').addEventListener('change',e=>{clearAnchor();state.essential=e.target.checked;render();});
  $('resetFilters').addEventListener('click',reset);
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();$('search').focus();}});
  $('backToTop').addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});});
  const hero=M.event('names');$('heroImage').src=M.url(hero,1000);$('heroCredit').href=M.source(hero);
  $('heroImage').addEventListener('error',()=>{$('heroImage').parentElement.classList.add('image-failed');});
  $('readCount').textContent=opened.size;$('readProgress').value=opened.size;
  if(typeof reading.last==='string'){const [type,id]=reading.last.split(':');const item=(type==='event'?events:terms).find(x=>x.id===id);if(item){$('continueReading').href=`${type}.html?id=${encodeURIComponent(id)}`;$('continueReading').hidden=false;}}
  restoreURL();
  const hash=decodeURIComponent(location.hash.slice(1));
  if(hash.startsWith('term-')||hash.startsWith('event-')){Object.assign(state,{view:hash.startsWith('term-')?'words':'timeline',period:'all',thread:'all',kind:'all',essential:false,query:''});$('search').value='';}
  render();
  if(hash.startsWith('term-')||hash.startsWith('event-'))requestAnimationFrame(()=>{const target=document.getElementById(hash);if(target){target.classList.add('highlight-target');target.scrollIntoView({block:'center',behavior:'instant'});}});
  window.addEventListener('popstate',()=>{restoreURL();render();});
})();
