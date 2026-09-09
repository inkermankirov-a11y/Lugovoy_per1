(()=>{
  const style=document.createElement('style');
  style.textContent=`
    .contact-actionable{cursor:pointer;border-radius:8px;transition:background-color .12s ease,color .12s ease}
    .contact-actionable:hover{background:#e6f1ee;color:var(--green)}
    .contact-actionable:active{background:#dff1e8}
    #contact-action-dialog{max-width:420px;width:calc(100% - 32px);padding:20px}
    #contact-action-dialog .contact-action-title{font-size:1.05rem;font-weight:800;margin:0 44px 8px 0;overflow-wrap:anywhere}
    #contact-action-dialog .contact-action-subtitle{color:var(--muted);font-size:.9rem;margin:0 0 16px;overflow-wrap:anywhere}
    #contact-action-dialog .contact-action-buttons{display:grid;gap:10px}
    #contact-action-dialog .contact-action-buttons button{width:100%;text-align:left;min-height:52px}
    #contact-action-dialog .contact-action-buttons .primary-action{background:var(--green);border-color:var(--green);color:#fff}
    #contact-action-dialog .contact-action-buttons .primary-action:hover{background:#0e554e}
    #contact-action-dialog .contact-action-close{position:absolute;right:16px;top:16px;min-width:44px}
    @media(max-width:760px){
      .passport-phone,.management-phone{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:center!important;gap:7px!important;white-space:nowrap!important;padding:12px 10px!important}
      .passport-phone{font-size:clamp(.78rem,3.35vw,.94rem)!important}
      .management-phone{font-size:clamp(.88rem,3.8vw,1rem)!important}
      .passport-phone::after,.management-phone::after{display:block!important;content:'Позвонить'!important;font-size:.68rem!important;font-weight:700!important;color:var(--muted)!important;white-space:nowrap!important}
    }
    @media(max-width:360px){
      .passport-phone{font-size:.74rem!important;padding-left:8px!important;padding-right:8px!important;gap:5px!important}
      .passport-phone::after{font-size:.63rem!important}
    }
  `;
  document.head.appendChild(style);

  const dialog=document.createElement('dialog');
  dialog.id='contact-action-dialog';
  dialog.innerHTML=`<button type="button" class="contact-action-close" aria-label="Закрыть">✕</button><div class="contact-action-title"></div><div class="contact-action-subtitle"></div><div class="contact-action-buttons"></div>`;
  document.body.appendChild(dialog);
  const title=dialog.querySelector('.contact-action-title');
  const subtitle=dialog.querySelector('.contact-action-subtitle');
  const buttons=dialog.querySelector('.contact-action-buttons');
  dialog.querySelector('.contact-action-close').addEventListener('click',()=>dialog.close());

  async function writeClipboard(text){
    try{await navigator.clipboard.writeText(text);return true}catch{
      try{const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();return true}catch{return false}
    }
  }
  async function copy(text){await writeClipboard(text);dialog.close()}
  function openMenu(kind,value,label,href){
    title.textContent=label;
    subtitle.textContent=kind==='phone'?'Что сделать с номером?':kind==='email'?'Что сделать с почтой?':'Что сделать с адресом?';
    buttons.innerHTML='';
    const add=(text,primary,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=text;if(primary)b.className='primary-action';b.addEventListener('click',fn);buttons.appendChild(b)};
    if(kind==='phone'){
      add('📋 Копировать номер',false,()=>copy(label));
      add('📞 Позвонить',true,()=>{dialog.close();location.href=href});
    }else if(kind==='email'){
      add('📋 Копировать почту',false,()=>copy(value));
      add('✉️ Написать письмо',true,()=>{dialog.close();location.href=href});
    }else{
      add('📋 Копировать адрес',false,()=>copy(value));
      add('🗺️ Открыть в Яндекс Картах',true,()=>{dialog.close();window.open('https://yandex.ru/maps/?text='+encodeURIComponent(value),'_blank','noopener')});
    }
    dialog.showModal();
  }

  function markAddresses(root=document){
    root.querySelectorAll?.('.management-address,.passport-card p').forEach(el=>{
      if(el.dataset.address)return;
      const strong=el.querySelector('strong');
      if(!strong||!/^Адрес:/i.test(strong.textContent.trim()))return;
      const address=el.textContent.replace(/^.*?Адрес:\s*/i,'').trim();
      if(!address)return;
      el.dataset.address=address;
      el.classList.add('contact-actionable');
      el.setAttribute('role','button');
      el.setAttribute('tabindex','0');
      el.setAttribute('aria-label','Действия с адресом: '+address);
    });
  }
  markAddresses();
  new MutationObserver(m=>m.forEach(x=>x.addedNodes.forEach(n=>{if(n.nodeType===1)markAddresses(n)}))).observe(document.body,{childList:true,subtree:true});

  document.addEventListener('click',e=>{
    const tel=e.target.closest('a[href^="tel:"]');
    if(tel){e.preventDefault();openMenu('phone',tel.getAttribute('href').slice(4),tel.textContent.trim(),tel.href);return}
    const mail=e.target.closest('a[href^="mailto:"]');
    if(mail){e.preventDefault();const value=mail.getAttribute('href').slice(7).split('?')[0];openMenu('email',value,mail.textContent.replace(/^✉️?\s*/,'').trim(),mail.href);return}
    const address=e.target.closest('[data-address]');
    if(address){openMenu('address',address.dataset.address,address.dataset.address);return}
    if(e.target===dialog)dialog.close();
  });
  document.addEventListener('keydown',e=>{
    if((e.key==='Enter'||e.key===' ')&&e.target.matches?.('[data-address]')){e.preventDefault();const a=e.target;openMenu('address',a.dataset.address,a.dataset.address)}
  });
})();
