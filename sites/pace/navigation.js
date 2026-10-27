document.addEventListener('pointerdown',e=>{const panel=document.getElementById('siteMenu'),toggle=document.getElementById('menuOpen');if(panel?.classList.contains('open')&&!panel.contains(e.target)&&!toggle.contains(e.target))closeSiteMenu()});
document.querySelectorAll('.hub-dropdown a').forEach(a=>a.addEventListener('click',()=>closeSiteMenu()));
document.querySelectorAll('.menu-theme').forEach(b=>b.addEventListener('click',()=>document.querySelector('.theme-toggle').click()));
new MutationObserver(()=>{const b=document.getElementById('menuOpen');b.setAttribute('aria-label',b.getAttribute('aria-expanded')==='true'?'Menü schließen':'Menü öffnen')}).observe(document.getElementById('menuOpen'),{attributes:true,attributeFilter:['aria-expanded']});
