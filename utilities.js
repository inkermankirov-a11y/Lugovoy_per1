(()=>{
  const buttonId='utilities-button';
  const dialogId='utilities-dialog';

  const style=document.createElement('style');
  style.textContent=`
    #utilities-dialog{max-width:720px}
    .utilities-list{display:grid;gap:10px}
    .utility-link{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:15px 16px;border:1px solid var(--line);border-radius:14px;background:#fff;color:#17313f;text-decoration:none;font-weight:800;transition:background-color .12s ease,border-color .12s ease,box-shadow .12s ease,transform .12s ease}
    .utility-link-main{display:flex;align-items:center;gap:12px;min-width:0}.utility-link-text{min-width:0}.utility-link small{display:block;margin-top:4px;color:var(--muted);font-size:.78rem;font-weight:600}
    .utility-site-icon{display:grid;place-items:center;flex:0 0 50px;width:50px;height:42px;border:1px solid #d7e2e4;border-radius:12px;background:#fff;overflow:hidden;padding:3px}
    .utility-site-icon img{display:block;width:100%;height:100%;object-fit:contain}
    .utility-link::after{content:'Открыть ↗';flex:0 0 auto;color:var(--green);font-size:.78rem}
    .utility-link:hover{background:#e6f1ee;border-color:var(--green);box-shadow:0 5px 14px rgba(30,70,65,.10)}
    .utility-link:active{transform:scale(.985);background:#dff1e8}
    .utility-link:focus-visible{outline:3px solid rgba(18,110,101,.22);outline-offset:2px}
    @media(max-width:760px){#utilities-dialog{padding:18px}.utility-link{padding:12px 13px;gap:10px}.utility-site-icon{width:46px;height:40px;flex-basis:46px}.utility-link::after{font-size:.72rem}}
    @media(prefers-reduced-motion:reduce){.utility-link{transition:none}.utility-link:active{transform:none}}
  `;
  document.head.appendChild(style);

  const favicon=domain=>`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
  const item=(href,icon,title,subtitle='Личный кабинет')=>`<a class="utility-link" href="${href}" target="_blank" rel="noopener"><span class="utility-link-main"><span class="utility-site-icon" aria-hidden="true"><img src="${icon}" alt="" width="44" height="36"></span><span class="utility-link-text">${title}<small>${subtitle}</small></span></span></a>`;

  function ensureDialog(){
    let dialog=document.getElementById(dialogId);
    if(dialog)return dialog;
    dialog=document.createElement('dialog');
    dialog.id=dialogId;
    dialog.innerHTML=`
      <div class="dialog-top"><h2>Коммуналка</h2><button data-close aria-label="Закрыть">✕</button></div>
      <p class="hint">Личные кабинеты и сервисы коммунальных организаций.</p>
      <div class="utilities-list">
        ${item('https://k-ric.gkh43.ru/',favicon('k-ric.gkh43.ru'),'Кировский РИЦ')}
        ${item('https://newlk.vdkanal.ru/',favicon('vdkanal.ru'),'Водоканал')}
        ${item('https://lkm.esplus.ru/auth/','./energosbyt-logo.svg?v=45','ЭнергосбыТ Плюс')}
        ${item('https://kabinet.rkc43.ru/kp/Account/LogOn','./capital-repair-logo.svg?v=45','Капитальный ремонт','Фонд капитального ремонта · личный кабинет')}
        ${item('https://xn--80ahbpbejkkdefz2i.xn--p1ai/lk',favicon('xn--80ahbpbejkkdefz2i.xn--p1ai'),'Домашний родник')}
      </div>`;
    document.body.appendChild(dialog);
    dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{
      const r=dialog.getBoundingClientRect();
      const inside=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
      if(!inside)dialog.close();
    });
    return dialog;
  }

  document.addEventListener('click',e=>{
    const button=e.target.closest('button');
    if(button?.id===buttonId)ensureDialog().showModal();
  });
})();