// Pace is an independent deployment, never a route on the Intl. site.
document.querySelectorAll('.pace-external').forEach(a=>{a.href='https://paceios.netlify.app/';a.target='_blank';a.rel='noopener'});
const carousel=document.getElementById('toolCarousel');
if(carousel){
 const prev=document.getElementById('toolsPrev'),next=document.getElementById('toolsNext'),position=document.getElementById('toolPosition');
 const visible=()=>[...carousel.querySelectorAll('.tool')].filter(t=>getComputedStyle(t).display!=='none');
 let queued=false;
 function render(){queued=false;const cards=visible(),box=carousel.getBoundingClientRect(),center=box.left+box.width/2;let nearest=0,best=Infinity;
 cards.forEach((card,i)=>{const delta=card.offsetLeft+card.offsetWidth/2-carousel.scrollLeft-carousel.clientWidth/2;const distance=Math.abs(delta);if(distance<best){best=distance;nearest=i}const progress=Math.max(-1,Math.min(1,delta/350));card.style.setProperty('--tilt',`${-progress*22}deg`);card.style.setProperty('--scale',String(1-Math.abs(progress)*.12));card.style.setProperty('--fade',String(1-Math.abs(progress)*.25))});
 position.textContent=cards.length?`${nearest+1} / ${cards.length} Tools`:'Keine Tools';prev.disabled=nearest===0;next.disabled=nearest>=cards.length-1;
 return {cards,nearest};}
 function move(step){const {cards,nearest}=render();const target=cards[Math.max(0,Math.min(cards.length-1,nearest+step))];if(target)carousel.scrollTo({left:target.offsetLeft+target.offsetWidth/2-carousel.clientWidth/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));carousel.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(render)}});window.addEventListener('resize',render);
 carousel.addEventListener('keydown',e=>{if(e.target===carousel&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
 carousel.addEventListener('focusin',e=>{if(e.target.matches('.tool:focus-visible'))carousel.scrollTo({left:e.target.offsetLeft+e.target.offsetWidth/2-carousel.clientWidth/2,behavior:'instant'})});
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{carousel.scrollTo({left:0,behavior:'instant'});requestAnimationFrame(render)}));render();
}
// Only consume wheel input while the pointer is over the tool strip.
carousel?.addEventListener('wheel',e=>{
 if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
 const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?carousel.clientWidth:1);
 const max=carousel.scrollWidth-carousel.clientWidth;
 if(!delta||max<=0||(delta<0&&carousel.scrollLeft<=1)||(delta>0&&carousel.scrollLeft>=max-1))return;
 e.preventDefault();carousel.scrollBy({left:delta*2.6,behavior:'instant'});
},{passive:false});
