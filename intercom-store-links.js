(()=>{
  const PLAY='https://play.google.com/store/apps/details?id=sputnik.axmor.com';
  const APPLE='https://apps.apple.com/app/id1371300967';
  const labels={
    ru:{title:'Скачать приложение:',play:'«Наш дом» в Google Play',apple:'«Наш дом» в App Store'},
    en:{title:'Download the app:',play:'Nash Dom on Google Play',apple:'Nash Dom on the App Store'},
    fr:{title:'Télécharger l’application :',play:'Nash Dom sur Google Play',apple:'Nash Dom sur l’App Store'},
    de:{title:'App herunterladen:',play:'Nash Dom bei Google Play',apple:'Nash Dom im App Store'}
  };
  const lang=()=>labels[document.documentElement.lang]?document.documentElement.lang:'ru';
  function ensure(){
    const d=document.getElementById('intercom-detail-dialog');
    if(!d)return;
    const cards=d.querySelectorAll('.passport-card');
    const reg=[...cards].find(c=>c.querySelector('h3')?.textContent.includes('📱'));
    if(!reg)return;
    let box=reg.querySelector('.intercom-store-links');
    if(!box){
      box=document.createElement('div');
      box.className='intercom-store-links';
      const list=reg.querySelector('ol');
      reg.insertBefore(box,list||null);
    }
    const t=labels[lang()];
    box.innerHTML=`<p style="margin:8px 0 6px"><strong>${t.title}</strong></p><a class="service-contact-link store-link" href="${PLAY}" target="_blank" rel="noopener"><img src="./google-play-icon.svg?v=25" alt="Google Play" width="24" height="24"><span>${t.play}</span></a><a class="service-contact-link store-link" href="${APPLE}" target="_blank" rel="noopener"><img src="./app-store-icon.svg?v=25" alt="App Store" width="24" height="24"><span>${t.apple}</span></a>`;
  }
  document.addEventListener('click',e=>{
    if(e.target.closest('#intercom-service,.lang-option')){setTimeout(ensure,0);setTimeout(ensure,100);}
  });
  new MutationObserver(()=>requestAnimationFrame(ensure)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.ensureIntercomStoreLinks=ensure;
})();
