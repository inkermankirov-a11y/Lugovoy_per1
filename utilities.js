(()=>{
  const buttonId='utilities-button',dialogId='utilities-dialog';
  const T={
    ru:{title:'Коммуналка',hint:'Личные кабинеты и сервисы коммунальных организаций.',open:'Открыть ↗',account:'Личный кабинет',items:[['Кировский РИЦ','Личный кабинет'],['Водоканал','Личный кабинет'],['ЭнергосбыТ Плюс','Личный кабинет'],['Капитальный ремонт','Фонд капитального ремонта · личный кабинет'],['Домашний родник','Личный кабинет']]},
    en:{title:'Utilities',hint:'Personal accounts and utility service websites.',open:'Open ↗',account:'Personal account',items:[['Kirov RIC','Personal account'],['Vodokanal','Personal account'],['Energosbyt Plus','Personal account'],['Capital repairs','Capital Repair Fund · personal account'],['Home Spring','Personal account']]},
    fr:{title:'Services publics',hint:'Comptes personnels et services des fournisseurs.',open:'Ouvrir ↗',account:'Compte personnel',items:[['Kirov RIC','Compte personnel'],['Vodokanal','Compte personnel'],['Energosbyt Plus','Compte personnel'],['Rénovation majeure','Fonds de rénovation majeure · compte personnel'],['Source domestique','Compte personnel']]},
    de:{title:'Nebenkosten',hint:'Persönliche Konten und Versorgerdienste.',open:'Öffnen ↗',account:'Persönliches Konto',items:[['Kirov RIC','Persönliches Konto'],['Vodokanal','Persönliches Konto'],['Energosbyt Plus','Persönliches Konto'],['Kapitalreparaturen','Fonds für Kapitalreparaturen · persönliches Konto'],['Hausquelle','Persönliches Konto']]}
  };
  const links=[
    ['https://k-ric.gkh43.ru/','./ric-logo.svg?v=1'],['https://newlk.vdkanal.ru/','./vodokanal-logo.svg?v=1'],['https://lkm.esplus.ru/auth/','./energosbyt-logo.svg?v=46'],['https://kabinet.rkc43.ru/kp/Account/LogOn','./capital-repair-logo.svg?v=46'],['https://xn--80ahbpbejkkdefz2i.xn--p1ai/lk','./rodnik-logo.svg?v=1']
  ];
  const lang=()=>T[document.documentElement.lang]?document.documentElement.lang:'ru';
  const style=document.createElement('style');
  style.textContent=`#utilities-dialog{max-width:720px}.utilities-list{display:grid;gap:10px}.utility-link{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:15px 16px;border:1px solid var(--line);border-radius:14px;background:#fff;color:#17313f;text-decoration:none;font-weight:800;transition:background-color .12s ease,border-color .12s ease,box-shadow .12s ease,transform .12s ease}.utility-link-main{display:flex;align-items:center;gap:12px;min-width:0}.utility-link-text{min-width:0}.utility-link small{display:block;margin-top:4px;color:var(--muted);font-size:.78rem;font-weight:600}.utility-site-icon{display:grid;place-items:center;flex:0 0 50px;width:50px;height:42px;border:1px solid #d7e2e4;border-radius:12px;background:#fff;overflow:hidden;padding:3px}.utility-site-icon img{display:block;width:100%;height:100%;object-fit:contain}.utility-link::after{content:attr(data-open);flex:0 0 auto;color:var(--green);font-size:.78rem}.utility-link:hover{background:#e6f1ee;border-color:var(--green);box-shadow:0 5px 14px rgba(30,70,65,.10)}.utility-link:active{transform:scale(.985);background:#dff1e8}.utility-link:focus-visible{outline:3px solid rgba(18,110,101,.22);outline-offset:2px}@media(max-width:760px){#utilities-dialog{padding:18px}.utility-link{padding:12px 13px;gap:10px}.utility-site-icon{width:46px;height:40px;flex-basis:46px}.utility-link::after{font-size:.72rem}}@media(prefers-reduced-motion:reduce){.utility-link{transition:none}.utility-link:active{transform:none}}`;
  document.head.appendChild(style);

  function render(dialog){
    const t=T[lang()];
    dialog.querySelector('.dialog-top h2').textContent=t.title;
    dialog.querySelector('.dialog-top [data-close]').setAttribute('aria-label',lang()==='ru'?'Закрыть':lang()==='de'?'Schließen':lang()==='fr'?'Fermer':'Close');
    dialog.querySelector(':scope > .hint').textContent=t.hint;
    dialog.querySelector('.utilities-list').innerHTML=links.map(([href,icon],i)=>{const [title,subtitle]=t.items[i];return `<a class="utility-link" href="${href}" target="_blank" rel="noopener noreferrer" data-open="${t.open}"><span class="utility-link-main"><span class="utility-site-icon" aria-hidden="true"><img src="${icon}" alt="" width="44" height="36" decoding="async"></span><span class="utility-link-text">${title}<small>${subtitle}</small></span></span></a>`}).join('');
  }
  function ensureDialog(){
    let dialog=document.getElementById(dialogId);
    if(dialog){render(dialog);return dialog;}
    dialog=document.createElement('dialog');dialog.id=dialogId;
    dialog.innerHTML='<div class="dialog-top"><h2></h2><button data-close aria-label="">✕</button></div><p class="hint"></p><div class="utilities-list"></div>';
    document.body.appendChild(dialog);render(dialog);
    dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
    dialog.querySelector('.utilities-list').addEventListener('click',e=>{const link=e.target.closest('a.utility-link');if(!link)return;e.preventDefault();window.open(link.href,'_blank','noopener,noreferrer')});
    dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(!(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom))dialog.close()});
    return dialog;
  }
  window.openUtilitiesDialog=()=>{const dialog=ensureDialog();render(dialog);if(!dialog.open)dialog.showModal()};
  document.addEventListener('click',e=>{if(e.target.closest('button')?.id===buttonId)window.openUtilitiesDialog();if(e.target.closest('.lang-option'))setTimeout(()=>{const d=document.getElementById(dialogId);if(d)render(d)},0)});
})();