(()=>{
  const svg={
    ru:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><rect width="24" height="16" fill="#fff"/><rect y="5.33" width="24" height="5.34" fill="#0039a6"/><rect y="10.67" width="24" height="5.33" fill="#d52b1e"/></svg>`,
    en:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><rect width="24" height="16" fill="#012169"/><path d="M0 0 24 16M24 0 0 16" stroke="#fff" stroke-width="3.2"/><path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" stroke-width="1.3"/><path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="5"/><path d="M12 0v16M0 8h24" stroke="#c8102e" stroke-width="2.6"/></svg>`,
    fr:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><rect width="24" height="16" fill="#fff"/><rect width="8" height="16" fill="#0055a4"/><rect x="16" width="8" height="16" fill="#ef4135"/></svg>`,
    de:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><rect width="24" height="16" fill="#000"/><rect y="5.33" width="24" height="5.34" fill="#dd0000"/><rect y="10.67" width="24" height="5.33" fill="#ffce00"/></svg>`
  };
  const data=id=>`url("data:image/svg+xml,${encodeURIComponent(svg[id])}")`;
  const style=document.createElement('style');
  style.textContent=`
    .lang-current span,.lang-option span{display:inline-block;width:22px;height:15px;font-size:0!important;border-radius:2px;background-size:100% 100%;background-repeat:no-repeat;box-shadow:0 0 0 1px rgba(255,255,255,.22)}
    .lang-option[data-lang="ru"] span{background-image:${data('ru')}}
    .lang-option[data-lang="en"] span{background-image:${data('en')}}
    .lang-option[data-lang="fr"] span{background-image:${data('fr')}}
    .lang-option[data-lang="de"] span{background-image:${data('de')}}
    .lang-current[data-current-lang="ru"] span{background-image:${data('ru')}}
    .lang-current[data-current-lang="en"] span{background-image:${data('en')}}
    .lang-current[data-current-lang="fr"] span{background-image:${data('fr')}}
    .lang-current[data-current-lang="de"] span{background-image:${data('de')}}
  `;
  document.head.appendChild(style);
  const sync=()=>{const b=document.querySelector('.lang-current');if(b)b.dataset.currentLang=document.documentElement.lang||'ru'};
  const start=()=>{
    sync();
    new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    if(!document.querySelector('script[data-i18n-about]')){
      const s=document.createElement('script');
      s.src='./i18n-about.js?v=1';
      s.defer=true;
      s.dataset.i18nAbout='1';
      document.head.appendChild(s);
    }
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();