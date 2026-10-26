const $ = s => document.querySelector(s);
const money = n => new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN',maximumFractionDigits:0}).format(n);
let filter='all', cart=[];
// Migrate previous separate-color items while retaining sizes and quantities.
try {
 const saved=JSON.parse(localStorage.getItem('undernight-cart')||'[]');
 if(Array.isArray(saved)) for(const x of saved){
  if(!x||!Number.isInteger(x.qty)||x.qty<1||x.qty>99)continue;
  const p=PRODUCTS.find(p=>p.id===x.id)||PRODUCTS.find(p=>p.variants.some(v=>v.id===x.id));
  if(!p||!p.sizes.includes(x.size))continue;
  const v=p.variants.find(v=>v.id===(x.variant||x.id));
  if(!v)continue;
  const existing=cart.find(c=>c.id===p.id&&c.variant===v.id&&c.size===x.size);
  if(existing)existing.qty=Math.min(99,existing.qty+x.qty);
  else cart.push({id:p.id,variant:v.id,size:x.size,qty:x.qty});
 }
}catch{}
const basePrice=p=>Math.min(...p.variants.map(v=>v.price));
function persist(){try{localStorage.setItem('undernight-cart',JSON.stringify(cart));}catch{} $('#count').textContent=cart.reduce((a,b)=>a+b.qty,0);}
function renderProducts(){
 let list=PRODUCTS.filter(p=>filter==='all'||p.type===filter||(filter==='oversize'&&p.fit==='Oversize'));
 if($('#sort').value!=='default')list.sort((a,b)=>$('#sort').value==='asc'?basePrice(a)-basePrice(b):basePrice(b)-basePrice(a));
 $('#results').textContent=`${list.length} ${list.length===1?'produkt':list.length<5?'produkty':'produktów'}`;
 $('#products').innerHTML=list.map(p=>{
  const v=p.variants[0],multiple=p.variants.length>1;
  return `<article class="product"><button class="product-image" data-product="${p.id}" aria-label="Zobacz ${p.name}, ${p.fit}"><span class="tag">${p.fit.toUpperCase()}</span><img src="assets/${v.image}.webp" alt="${p.name} — ${v.color}, ${p.fit}" loading="lazy" width="1080" height="1080"><span class="quick" aria-hidden="true">+</span></button><div class="product-text"><div><h3>${p.name}</h3><p>${p.fit} / ${multiple?'3 kolory':v.color}</p><div class="card-colors" aria-label="Dostępne kolory">${p.variants.map(c=>`<span title="${c.color}" aria-label="${c.color}" style="--swatch:${c.swatch}"></span>`).join('')}</div></div><span class="price">${multiple?'od ':''}${money(basePrice(p))}</span></div></article>`;
 }).join('');
}
function openProduct(id){
 const p=PRODUCTS.find(x=>x.id===id);let size=null,variant=p.variants[0],galleryIndex=0;
 const gallery=()=>[{image:variant.image,label:"Produkt",alt:`${p.name}, ${variant.color}, ${p.fit}`},{image:p.design,label:"Projekt",alt:`Projekt nadruku ${p.name}`},{image:p.photo,label:"Sesja",alt:`Zdjęcie sesyjne kolekcji ${p.name}`}];
 $('#productDetail').innerHTML=`<div class="detail-grid"><div class="product-gallery"><div class="gallery-stage"><img id="variantImage" src="assets/${variant.image}.webp" alt="${p.name}, ${variant.color}, ${p.fit}"></div><div class="gallery-thumbs" role="group" aria-label="Galeria produktu">${gallery().map((g,i)=>`<button data-gallery="${i}" class="${i===0?'selected':''}" aria-pressed="${i===0}" aria-label="Pokaż: ${g.label}"><img src="assets/${g.image}.webp" alt=""><span>${g.label}</span></button>`).join('')}</div><p id="galleryCaption" class="gallery-caption" aria-live="polite">Widok wybranego koloru i kroju</p></div><div><p class="eyebrow">UNDERNIGHT / ${p.fit.toUpperCase()}</p><h2>${p.name}</h2><p id="variantDescription">${p.type==='hoodie'?'Bluza z kapturem':'Koszulka'} · ${variant.color} · ${p.fit}</p><div class="detail-price" id="variantPrice" aria-live="polite">${money(variant.price)}</div><p>Wyrazista grafika inspirowana motoryzacją i nocnym życiem miasta. Twój styl, Twoje zasady.</p><fieldset class="variant-field"><legend>Kolor</legend><div class="colors">${p.variants.map((v,i)=>`<button data-color="${v.id}" class="color-option ${i===0?'selected':''}" aria-pressed="${i===0}"><span style="--swatch:${v.swatch}"></span>${v.color}</button>`).join('')}</div></fieldset><fieldset class="variant-field"><legend>Wybierz rozmiar</legend><div class="sizes">${p.sizes.map(s=>`<button data-size="${s}" aria-pressed="false">${s}</button>`).join('')}</div></fieldset><button class="primary add-button" id="addToCart">DODAJ DO KOSZYKA <span>+</span></button><p class="size-error" id="sizeError" role="status"></p><p class="demo-note">Produkt pokazowy. Cena i rozmiary do potwierdzenia.</p></div></div>`;
 function showGallery(index){
  galleryIndex=index;const g=gallery()[index];$('#variantImage').src=`assets/${g.image}.webp`;$('#variantImage').alt=g.alt;
  document.querySelectorAll('[data-gallery]').forEach(b=>{const selected=Number(b.dataset.gallery)===index;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',selected);});
  $('#galleryCaption').textContent=index===0?'Widok wybranego koloru i kroju':index===1?'Projekt nadruku':'Zdjęcie sesyjne kolekcji — prezentowany kolor i krój mogą się różnić';
 }
 document.querySelectorAll('[data-gallery]').forEach(b=>b.onclick=()=>showGallery(Number(b.dataset.gallery)));
 $('#productDialog').showModal();
 document.querySelectorAll('[data-color]').forEach(b=>b.onclick=()=>{
  variant=p.variants.find(v=>v.id===b.dataset.color);
  document.querySelectorAll('[data-color]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b);});
  document.querySelector('[data-gallery="0"] img').src=`assets/${variant.image}.webp`;showGallery(0);
  $('#variantDescription').textContent=`${p.type==='hoodie'?'Bluza z kapturem':'Koszulka'} · ${variant.color} · ${p.fit}`;
  $('#variantPrice').textContent=money(variant.price);$('#sizeError').textContent='';
 });
 document.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{size=b.dataset.size;document.querySelectorAll('[data-size]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b)});$('#sizeError').textContent='';});
 $('#addToCart').onclick=()=>{
  if(!size){$('#sizeError').textContent='Wybierz rozmiar przed dodaniem do koszyka.';return;}
  const item=cart.find(x=>x.id===id&&x.variant===variant.id&&x.size===size);
  if(item&&item.qty>=99){$('#sizeError').textContent='Maksymalnie 99 sztuk jednego wariantu.';return;}
  if(item)item.qty++;else cart.push({id,variant:variant.id,size,qty:1});
  persist();$('#productDialog').close();toast(`Dodano do koszyka · ${p.name} / ${p.fit} / ${variant.color} / ${size}`);
 };
}
let toastTimer;function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3000);}
function renderCart(){if(!cart.length){$('#cartItems').innerHTML='<div class="empty"><span>↗</span>Twoja nocna kolekcja zaczyna się tutaj.<br><br>Koszyk jest jeszcze pusty.</div>';$('#cartBottom').innerHTML='<button class="primary add-button" id="continue">ODKRYJ KOLEKCJĘ →</button>';$('#continue').onclick=()=>{$('#cartDialog').close();location.hash='kolekcja'};return;}let total=0;$('#cartItems').innerHTML=cart.map((x,i)=>{const p=PRODUCTS.find(p=>p.id===x.id);const v=p.variants.find(v=>v.id===x.variant);total+=x.qty*v.price;return `<div class="cart-row"><img src="assets/${v.image}.webp" alt="${p.name}, ${v.color}, ${p.fit}"><div><h3>${p.name}</h3><p>${v.color} / ${p.fit} / ${x.size}</p><div class="quantity"><button data-qty="${i}" data-delta="-1" aria-label="Zmniejsz liczbę ${p.name}">−</button><span>${x.qty}</span><button data-qty="${i}" data-delta="1" aria-label="Zwiększ liczbę ${p.name}">+</button></div></div><div><span class="price">${money(v.price*x.qty)}</span><button class="remove" data-remove="${i}">Usuń</button></div></div>`}).join('');$('#cartBottom').innerHTML=`<div class="total"><span>Suma produktów</span><strong>${money(total)}</strong></div><p class="checkout-note">Dostawa nie jest wliczona. To sklep pokazowy — zamówienia i płatności nie są jeszcze dostępne.</p><button class="primary add-button" id="checkoutInfo">INFORMACJE O ZAMÓWIENIACH ↗</button><p id="checkoutMessage" class="checkout-note" role="status"></p>`;$('#checkoutInfo').onclick=()=>{$('#checkoutMessage').textContent='Sprzedaż ruszy po podłączeniu płatności i dostaw. Zawartość koszyka zapisujemy w tej przeglądarce, jeśli pamięć lokalna jest dostępna.';};}
document.addEventListener('click',e=>{const p=e.target.closest('[data-product]');if(p)openProduct(p.dataset.product);const c=e.target.closest('[data-close]');if(c)document.getElementById(c.dataset.close).close();const q=e.target.closest('[data-qty]');if(q){const i=Number(q.dataset.qty);cart[i].qty=Math.min(99,cart[i].qty+Number(q.dataset.delta));if(cart[i].qty<=0)cart.splice(i,1);persist();renderCart();}const r=e.target.closest('[data-remove]');if(r){cart.splice(Number(r.dataset.remove),1);persist();renderCart();}});
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));renderProducts();});$('#sort').onchange=renderProducts;$('#openCart').onclick=()=>{renderCart();$('#cartDialog').showModal();};document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));$('#year').textContent=new Date().getFullYear();persist();renderProducts();
