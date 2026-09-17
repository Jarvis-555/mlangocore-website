const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const viewer=document.querySelector('#viewer');
const products=[...document.querySelectorAll('[data-image], [data-src]')];
let selectedProduct=0;
const controls=document.createElement('div');controls.className='viewer-nav';controls.innerHTML='<button type="button" aria-label="Previous image">←</button><span aria-live="polite"></span><button type="button" aria-label="Next image">→</button>';document.querySelector('.dialog-bottom').append(controls);
function displayProduct(index){selectedProduct=(index+products.length)%products.length;const button=products[selectedProduct];const title=button.dataset.title;document.querySelector('#large-image').src=button.dataset.src||`assets/product-${button.dataset.image}.webp`;document.querySelector('#large-image').alt=title;document.querySelector('#large-title').textContent=title;document.querySelector('#enquire').href=`mailto:info@mlangocore.co.ke?subject=${encodeURIComponent(title+' enquiry')}`;controls.querySelector('span').textContent=`${selectedProduct+1} / ${products.length}`;}
products.forEach((button,index)=>button.addEventListener('click',()=>{displayProduct(index);viewer.showModal();}));
controls.querySelector('button:first-child').addEventListener('click',()=>displayProduct(selectedProduct-1));controls.querySelector('button:last-child').addEventListener('click',()=>displayProduct(selectedProduct+1));
viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();displayProduct(selectedProduct-1);}if(e.key==='ArrowRight'){e.preventDefault();displayProduct(selectedProduct+1);}});
document.querySelector('.close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close();}});
viewer.addEventListener('close',()=>products[selectedProduct]?.focus({preventScroll:true}));
document.querySelector('#year').textContent=new Date().getFullYear();
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const sceneAlts={6:'Pine dining furniture in a sunlit home opening onto a terrace',3:'Timber pergola and decking overlooking a landscape at sunset',5:'Timber prefab home with covered veranda'};
let sceneRequest=0;
document.querySelectorAll('[data-scene]').forEach(button=>button.addEventListener('click',async()=>{if(button.getAttribute('aria-pressed')==='true')return;const request=++sceneRequest;document.querySelector('#hero-photo').classList.remove('scene-out');const scene=button.dataset.scene;const image=new Image();image.src=`assets/collection-${scene}.webp`;try{await image.decode();}catch{return;}if(request!==sceneRequest)return;const photo=document.querySelector('#hero-photo');if(!reducedMotion.matches){photo.classList.add('scene-out');await new Promise(resolve=>setTimeout(resolve,300));}if(request!==sceneRequest)return;photo.src=image.src;photo.alt=sceneAlts[scene];photo.classList.remove('scene-out');document.querySelectorAll('[data-scene]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});}));
if('IntersectionObserver' in window&&!reducedMotion.matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('reveal-pending');observer.unobserve(e.target);}}),{threshold:.06});document.querySelectorAll('.interior-card,.section-head,.material-copy,.prefab>div,.process article,.craft figure,.finishes>div').forEach(el=>{el.classList.add('reveal-pending');observer.observe(el);});reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){document.querySelectorAll('.reveal-pending').forEach(el=>el.classList.remove('reveal-pending'));observer.disconnect();}});}
