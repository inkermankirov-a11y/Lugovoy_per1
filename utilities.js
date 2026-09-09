(()=>{
  const buttonId='utilities-button';
  const dialogId='utilities-dialog';

  const style=document.createElement('style');
  style.textContent=`
    #utilities-dialog{max-width:720px}
    .utilities-list{display:grid;gap:10px}
    .utility-link{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:15px 16px;border:1px solid var(--line);border-radius:14px;background:#fff;color:#17313f;text-decoration:none;font-weight:800;transition:background-color .12s ease,border-color .12s ease,box-shadow .12s ease,transform .12s ease}
    .utility-link span{min-width:0}.utility-link small{display:block;margin-top:4px;color:var(--muted);font-size:.78rem;font-weight:600}.utility-link::after{content:'Открыть ↗';flex:0 0 auto;color:var(--green);font-size:.78rem}
    .utility-link:hover{background:#e6f1ee;border-color:var(--green);box-shadow:0 5px 14px rgba(30,70,65,.10)}
    .utility-link:active{transform:scale(.985);background:#dff1e8}
    .utility-link:focus-visible{outline:3px solid rgba(18,110,101,.22);outline-offset:2px}
    @media(max-width:760px){#utilities-dialog{padding:18px}.utility-link{padding:14px}.utility-link::after{font-size:.72rem}}
    @media(prefers-reduced-motion:reduce){.utility-link{transition:none}.utility-link:active{transform:none}}
  `;
  document.head.appendChild(style);

  function ensureDialog(){
    let dialog=document.getElementById(dialogId);
    if(dialog)return dialog;
    dialog=document.createElement('dialog');
    dialog.id=dialogId;
    dialog.innerHTML=`
      <div class="dialog-top"><h2>Коммуналка</h2><button data-close aria-label="Закрыть">✕</button></div>
      <p class="hint">Личные кабинеты и сервисы коммунальных организаций.</p>
      <div class="utilities-list">
        <a class="utility-link" href="https://k-ric.gkh43.ru/" target="_blank" rel="noopener"><span>Кировский РИЦ<small>Личный кабинет</small></span></a>
        <a class="utility-link" href="https://newlk.vdkanal.ru/" target="_blank" rel="noopener"><span>Водоканал<small>Личный кабинет</small></span></a>
        <a class="utility-link" href="https://lkm.esplus.ru/auth/" target="_blank" rel="noopener"><span>ЭнергосбыТ Плюс<small>Личный кабинет</small></span></a>
        <a class="utility-link" href="https://kabinet.rkc43.ru/kp/Account/LogOn" target="_blank" rel="noopener"><span>РКЦ<small>Личный кабинет</small></span></a>
        <a class="utility-link" href="https://xn--80ahbpbejkkdefz2i.xn--p1ai/lk" target="_blank" rel="noopener"><span>Домашний родник<small>Личный кабинет</small></span></a>
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
