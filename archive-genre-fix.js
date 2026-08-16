(()=>{
const KEY='archive-platform-v1';
let current='All',busy=false;
try{current=JSON.parse(localStorage.getItem(KEY)||'{}').genre||'All'}catch{}
const norm=v=>String(v||'').toLowerCase();
function text(b){return norm([b.title,b.author,b.fandom,b.genre,b.summary,b.tagline,...(b.tags||[])].join(' '))}
function categories(b){
 const t=text(b),out=new Set();
 if(/horror|haunt|ghost|dead|uncanny|liminal|nightmare|radiator|dread|drowned|funeral|dark fantasy/.test(t))out.add('Horror');
 if(/dark romance|romance|slow burn|obsess|possessive|forbidden|enemies to|love|lover/.test(t))out.add('Dark Romance');
 if(/fantasy|magic|kingdom|royal|witch|crown|cathedral|spell|myth|folklore/.test(t))out.add('Fantasy');
 if(/sci-fi|science fiction|cyber|space|time travel|future|memory|orbit|technology/.test(t))out.add('Sci-Fi');
 if(/mystery|murder|investig|detective|secret|museum|case|missing/.test(t))out.add('Mystery');
 if(/vampire|cullen|twilight|volturi|forks|red eyes/.test(t))out.add('Vampires');
 if(/gothic|cathedral|garden|manor|house|velvet|coastal gothic|blackwood/.test(t))out.add('Gothic');
 if(b.fanfic||/fanfic|fanfiction|twilight.*alternate universe|alternate universe.*twilight/.test(t))out.add('Fanfic');
 return out;
}
function saveGenre(g){try{const s=JSON.parse(localStorage.getItem(KEY)||'{}');s.genre=g;localStorage.setItem(KEY,JSON.stringify(s))}catch{}}
function apply(){
 if(busy||typeof books==='undefined')return;busy=true;
 const shelf=document.querySelector('#shelf');if(!shelf){busy=false;return}
 const bar=document.querySelector('.archive-genres');
 if(bar){bar.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.genre===current))}
 let n=0;
 shelf.querySelectorAll('.book-card').forEach(card=>{
   const b=books.find(x=>String(x.id)===String(card.dataset.id));
   const ok=current==='All'||(b&&categories(b).has(current));
   card.style.display=ok?'':'none';if(ok)n++;
 });
 const count=document.querySelector('#count');if(count)count.textContent=`${n} title${n===1?'':'s'}`;
 busy=false;
}
function wire(){
 const bar=document.querySelector('.archive-genres');
 if(!bar||typeof books==='undefined')return setTimeout(wire,80);
 bar.addEventListener('click',e=>{
   const btn=e.target.closest('[data-genre]');if(!btn)return;
   e.preventDefault();e.stopImmediatePropagation();
   current=btn.dataset.genre||'All';saveGenre(current);apply();
 },true);
 const shelf=document.querySelector('#shelf');
 const mo=new MutationObserver(()=>requestAnimationFrame(apply));
 mo.observe(shelf,{childList:true,subtree:false});
 document.querySelector('#search')?.addEventListener('input',()=>setTimeout(apply,0));
 document.querySelector('nav')?.addEventListener('click',()=>setTimeout(apply,0));
 document.addEventListener('click',e=>{if(e.target.closest('.archive-platform-sheet'))setTimeout(apply,0)});
 window.addEventListener('focus',apply);
 setTimeout(apply,150);
 console.info('Archive genre filter repaired:',[...new Set(books.flatMap(b=>[...categories(b)]))]);
}
wire();
})();