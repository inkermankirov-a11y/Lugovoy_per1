(()=>{
  const flags={
    ru:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" rx="2" fill="#fff"/><rect y="5.33" width="24" height="5.34" fill="#0039a6"/><rect y="10.67" width="24" height="5.33" rx="0" fill="#d52b1e"/></svg>',
    en:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" rx="2" fill="#012169"/><path d="M0 0 24 16M24 0 0 16" stroke="#fff" stroke-width="3.2"/><path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" stroke-width="1.3"/><path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="5"/><path d="M12 0v16M0 8h24" stroke="#c8102e" stroke-width="2.6"/></svg>',
    fr:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" rx="2" fill="#fff"/><rect width="8" height="16" fill="#0055a4"/><rect x="16" width="8" height="16" fill="#ef4135"/></svg>',
    de:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" rx="2" fill="#000"/><rect y="5.33" width="24" height="5.34" fill="#dd0000"/><rect y="10.67" width="24" height="5.33" fill="#ffce00"/></svg>'
  };

  const style=document.createElement('style');
  style.textContent='.lang-current span,.lang-option span{display:inline-flex;align-items:center;justify-content:center}.lang-current span svg,.lang-option span svg{display:block;width:22px;height:15px;border-radius:2px;box-shadow:0 0 0 1px rgba(255,255,255,.22)}';
  document.head.appendChild(style);

  const apply=()=>{
    document.querySelectorAll('.lang-option[data-lang]').forEach(btn=>{
      const span=btn.querySelector('span');
      const id=btn.dataset.lang;
      if(span&&flags[id]&&!span.querySelector('svg'))span.innerHTML=flags[id];
    });
    const current=document.querySelector('.lang-current');
    if(current){
      const code=current.querySelector('b')?.textContent?.trim().toLowerCase();
      const span=current.querySelector('span');
      if(span&&flags[code]&&!span.querySelector('svg'))span.innerHTML=flags[code];
    }
  };

  const start=()=>{
    apply();
    new MutationObserver(()=>requestAnimationFrame(apply)).observe(document.body,{childList:true,subtree:true,characterData:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
