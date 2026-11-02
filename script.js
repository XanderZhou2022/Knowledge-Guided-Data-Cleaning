'use strict';
const evidence = {
  rule: {index:'01 / 03', label:'A consistency rule', content:'<p class="decision-question">Change the city <em>or</em> change the ZIP?</p><div class="candidate-pair"><span>10001 <b>New York</b></span><span><b>02108</b> Boston</span></div>', explanation:'A conflict alone does not tell us which value is wrong.'},
  reference: {index:'02 / 03', label:'A confirmed ZIP + trusted reference', content:'<p class="decision-question">The reference supports a correction.</p><div class="single-candidate"><span>10001</span><b>New York</b></div>', explanation:'A confirmed key connects the record to the relevant fact.'},
  uncertain: {index:'03 / 03', label:'Conflicting or insufficient evidence', content:'<p class="decision-question">Which source applies here?</p><p class="abstain-message">Keep the value · ask · acquire more evidence</p>', explanation:'An unresolved decision can call for information instead of a change.'}
};
document.querySelectorAll('[data-evidence]').forEach(button=>button.addEventListener('click',()=>{
  const state=evidence[button.dataset.evidence];
  document.querySelectorAll('[data-evidence]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  document.querySelector('.example-index').textContent=state.index;
  document.getElementById('evidence-label').textContent=state.label;
  document.getElementById('decision-area').innerHTML=state.content;
  document.getElementById('example-explanation').textContent=state.explanation;
}));
const categoryNames={acquisition:'Knowledge acquisition',repair:'Repair decisions',reliability:'Reliability',preparation:'Data preparation'};
let studies=[],category='all',expanded=false;
const list=document.getElementById('study-list'), search=document.getElementById('study-search'), showAll=document.getElementById('show-all'), count=document.getElementById('study-count');
function renderStudies(){
  const query=search.value.trim().toLowerCase();
  const selected=studies.filter(s=>(category==='all'||s.category===category)&&[s.paper,s.knowledge,s.summary,s.venue,String(s.year)].join(' ').toLowerCase().includes(query));
  const visible=expanded||query||category!=='all'?selected:selected.slice(0,8);
  list.replaceChildren();
  if(!visible.length){const p=document.createElement('p');p.className='empty-state';p.textContent='No studies match this search. Try another name, year or type of evidence.';list.append(p);}
  for(const study of visible){
    const row=document.createElement('details');row.className='study';
    const summary=document.createElement('summary');
    const first=document.createElement('span');
    const name=document.createElement('span');name.className='study-name';name.textContent=study.paper;
    const ref=document.createElement('span');ref.className='study-reference';ref.textContent='['+study.reference+']';name.append(ref);
    const publication=document.createElement('span');publication.className='study-publication';publication.textContent=study.venue+' · '+study.year;first.append(name,publication);
    const knowledge=document.createElement('span');knowledge.className='study-knowledge';knowledge.textContent=study.knowledge;
    const toggle=document.createElement('span');toggle.className='study-toggle';toggle.setAttribute('aria-hidden','true');summary.append(first,knowledge,toggle);
    const detail=document.createElement('div');detail.className='study-detail';
    const label=document.createElement('span');label.className='study-category';label.textContent=categoryNames[study.category];
    const description=document.createElement('p');description.textContent=study.summary;
    const links=document.createElement('div');links.className='study-links';
    const primary=document.createElement('a');primary.href=study.url;primary.target='_blank';primary.rel='noopener';primary.textContent=study.url.startsWith('https:')?'Original publication ↗':'Reference details ↗';
    const slide=document.createElement('a');slide.href='slides.pdf#page='+study.slide;slide.target='_blank';slide.rel='noopener';slide.textContent='Slide '+study.slide+' ↗';
    links.append(primary,slide);detail.append(label,description,links);row.append(summary,detail);list.append(row);
  }
  count.textContent=selected.length===0?'No matching studies':(visible.length<selected.length?'Showing '+visible.length+' of '+selected.length+' studies':selected.length+' '+(selected.length===1?'study':'studies')+(category==='all'&&!query?' in the survey':''));
  showAll.hidden=!(category==='all'&&!query&&selected.length>8);
  showAll.textContent=expanded?'Show fewer studies ↑':'Show all 30 studies ↓';
}
function selectCategory(next){category=next;expanded=false;document.querySelectorAll('[data-category]').forEach(b=>{const active=b.dataset.category===category;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});renderStudies();}
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>selectCategory(b.dataset.category)));
document.querySelectorAll('[data-jump-category]').forEach(a=>a.addEventListener('click',()=>{search.value='';selectCategory(a.dataset.jumpCategory);}));
search.addEventListener('input',renderStudies);showAll.addEventListener('click',()=>{expanded=!expanded;renderStudies();if(!expanded)document.querySelector('.literature-toolbar').scrollIntoView({block:'start'});});
fetch('studies.json').then(response=>{if(!response.ok)throw new Error('Literature data unavailable');return response.json();}).then(data=>{studies=data;renderStudies();}).catch(()=>{list.innerHTML='<p class="empty-state">The literature index could not load. <a href="paper.pdf#page=7">Read all references in the paper.</a></p>';count.textContent='';});
const bibtex='@misc{zhou2026knowledgeguided,\n  title = {Knowledge-Guided Data Cleaning: From Knowledge Acquisition to Reliable Decisions},\n  author = {Zhou, Yixi},\n  year = {2026},\n  note = {Survey, Hong Kong Baptist University},\n  url = {https://xanderzhou2022.github.io/Knowledge-Guided-Data-Cleaning/}\n}';
document.getElementById('copy-citation').addEventListener('click',async()=>{
  const button=document.getElementById('copy-citation'), status=document.getElementById('copy-status');
  try{await navigator.clipboard.writeText(bibtex);button.textContent='BibTeX copied ✓';status.textContent='BibTeX citation copied to clipboard.';setTimeout(()=>{button.innerHTML='Copy BibTeX <span aria-hidden="true">⧉</span>';},2200);}catch{const blob=new Blob([bibtex+'\n'],{type:'text/plain'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='survey.bib';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='BibTeX downloaded as survey.bib.';}
});
