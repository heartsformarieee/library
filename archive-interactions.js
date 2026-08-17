// THE ARCHIVE 2.0.2 — STANDALONE CONTROL SYSTEM
(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
let shelfMode='all',genreMode='All';
const genreTests={
 All:()=>true,
 Horror:b=>/horror|haunt|ghost|dead|uncanny|liminal|nightmare|dread|radiator|drowned/.test(searchText(b)),
 'Dark Romance':b=>/dark romance|romance|slow burn|obsess|possessive|forbidden|enemies to|lover/.test(searchText(b)),
 Fantasy:b=>/fantasy|magic|kingdom|royal|witch|crown|cathedral|spell|myth|folklore/.test(searchText(b)),
 'Sci-Fi':b=>/sci-fi|science fiction|cyber|space|time travel|future|orbit|technology/.test(searchText(b)),
 Mystery:b=>/mystery|murder|investig|detective|secret|museum|case|missing/.test(searchText(b)),
 Vampires:b=>/vampire|cullen|twilight|volturi|forks|red eyes/.test(searchText(b)),
 Gothic:b=>/gothic|cathedral|garden|manor|house|velvet|blackwood|coastal gothic/.test(searchText(b)),
 Fanfic:b=>!!b.fanfic||/fanfic|fanfiction|twilight/.test(searchText(b))
};
function library(){try{return typeof books!=='undefined'&&Array.isArray(books)?books:[]}catch{return[]}}
function searchText(b){return `${b.title||''} ${b.author||''} ${b.fandom||''} ${b.genre||''} ${(b.tags||[]).join(' ')} ${b.summary||''} ${b.tagline||''}`.toLowerCase()}
function safe(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function cardCover(b){if(b.cover)return `<img class="real-cover" src="${safe(b.cover)}" alt="Cover of ${safe(b.title)}">`;return `<span>${safe(b.title)}</span><i>${b.favorite?'♡':'✦'}</i>`}
function visibleBooks(){const q=($('#search')?.value||'').trim().toLowerCase();return library().filter(b=>{
 const shelfOK=shelfMode==='all'||(shelfMode==='favorite'?!!b.favorite:b.shelf===shelfMode);
 const genreOK=(genreTests[genreMode]||genreTests.All)(b);
 const qOK=!q||searchText(b).includes(q);
 return shelfOK&&genreOK&&qOK;
})}
function renderShelf(){const shelf=$('#shelf');if(!shelf)return;const arr=visibleBooks();shelf.innerHTML=arr.map(b=>`<div class="book-card ${b.official?'official-book':''}" data-control-book="${safe(b.id)}"><div class="book">${cardCover(b)}</div><b>${safe(b.title)}</b><small>${safe(b.author||'')}</small><div class="progressbar"><i style="width:${Math.max(0,Math.min(100,b.progress||0))}%"></i></div></div>`).join('')||'<div style="grid-column:1/-1;padding:34px 10px;text-align:center;color:#9f9083">Nothing on this shelf yet.</div>';
 const count=$('#count');if(count)count.textContent=`${arr.length} title${arr.length===1?'':'s'}`;
 const heading=$('.section-title h2');if(heading)heading.textContent=shelfMode==='all'?'Library':shelfMode==='favorite'?'Favorites':shelfMode==='reading'?'Reading':shelfMode==='tbr'?'TBR':'Library';
 $$('[data-control-book]',shelf).forEach(card=>card.onclick=()=>openBook(card.dataset.controlBook));
 try{if(typeof updateStats==='function')updateStats()}catch{}
}
function openBook(id){try{if(typeof openDetail==='function'){openDetail(id);return}}catch{} const legacy=$(`.book-card[data-id="${CSS.escape(id)}"]`);legacy?.click()}
function openHero(){const title=$('#heroTitle')?.textContent?.trim();let b=library().find(x=>x.title===title)||library().find(x=>x.shelf==='reading')||library()[0];if(!b)return;try{if(typeof openDetail==='function'){openDetail(b.id);setTimeout(()=>$('#readBtn')?.click(),60);return}}catch{}openBook(b.id)}
function collections(){let o=$('#controlCollections');if(!o){o=document.createElement('div');o.id='controlCollections';o.className='overlay hidden';o.style.zIndex='190';o.innerHTML='<article class="sheet"><button class="close" data-x>×</button><small>COLLECTIONS</small><h2 style="font-size:35px;margin:7px 0 18px">Every door in one place.</h2><div data-body></div></article>';document.body.appendChild(o);$('[data-x]',o).onclick=()=>o.classList.add('hidden');o.onclick=e=>{if(e.target===o)o.classList.add('hidden')}}const defs=[['Reading now',b=>b.shelf==='reading'],['To be read',b=>b.shelf==='tbr'],['Favorites',b=>b.favorite],['Horror',genreTests.Horror],['Dark Romance',genreTests['Dark Romance']],['Fantasy',genreTests.Fantasy],['Vampires',genreTests.Vampires],['Fanfiction',genreTests.Fanfic],['Finished',b=>(b.progress||0)>=100]];const body=$('[data-body]',o);body.innerHTML=defs.map(([n,fn])=>{const a=library().filter(fn);return `<section style="margin:20px 0"><h3 style="font-family:Cormorant Garamond,serif;font-size:27px;margin:0 0 4px">${n}</h3><small>${a.length} books</small><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:10px">${a.map(b=>`<button data-cbook="${safe(b.id)}" style="border:1px solid #4b392e;background:#17110e;color:#f0e5d8;border-radius:13px;padding:11px;text-align:left"><b>${safe(b.title)}</b><span style="display:block;font-size:9px;color:#96887b;margin-top:3px">${safe(b.author||'')}</span></button>`).join('')||'<span style="color:#8d8075">Empty for now.</span>'}</div></section>`}).join('');$$('[data-cbook]',body).forEach(x=>x.onclick=()=>{o.classList.add('hidden');openBook(x.dataset.cbook)});o.classList.remove('hidden')}
function setShelf(mode,button){shelfMode=mode;$$('nav button[data-filter]').forEach(x=>x.classList.toggle('active',x===button));renderShelf()}
function setGenre(name,button){genreMode=name;$$('.archive-genres [data-genre]').forEach(x=>x.classList.toggle('active',x===button));renderShelf()}
function install(){if(!$('#shelf')||library().length===0)return setTimeout(install,180);document.addEventListener('click',e=>{
 const nav=e.target.closest('nav button[data-filter]');if(nav){e.preventDefault();e.stopImmediatePropagation();setShelf(nav.dataset.filter,nav);return}
 const genre=e.target.closest('.archive-genres [data-genre]');if(genre){e.preventDefault();e.stopImmediatePropagation();setGenre(genre.dataset.genre,genre);return}
 const collection=e.target.closest('nav button[data-mega="collections"]');if(collection){e.preventDefault();e.stopImmediatePropagation();collections();return}
 const hero=e.target.closest('#heroRead');if(hero){e.preventDefault();e.stopImmediatePropagation();openHero();return}
},true);
 const search=$('#search');if(search)search.addEventListener('input',renderShelf);
 renderShelf();console.info('Archive 2.0.2 standalone controls active');
}
setTimeout(install,500);window.addEventListener('pageshow',()=>setTimeout(renderShelf,150));
})();