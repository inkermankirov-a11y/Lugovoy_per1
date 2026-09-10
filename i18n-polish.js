(()=>{
  const T={
    ru:{call:'Позвонить',week:'Пн–Чт:',fri:'Пт:',lunch:'Обед:',weekend:'Сб, Вс:',closed:'выходные',liftSub:'ООО «ЛифтСтандарт» · обслуживание лифтов'},
    en:{call:'Call',week:'Mon–Thu:',fri:'Fri:',lunch:'Lunch:',weekend:'Sat, Sun:',closed:'closed',liftSub:'LiftStandard LLC · elevator maintenance'},
    fr:{call:'Appeler',week:'Lun–Jeu :',fri:'Ven :',lunch:'Pause :',weekend:'Sam, Dim :',closed:'fermé',liftSub:'LiftStandard SARL · entretien des ascenseurs'},
    de:{call:'Anrufen',week:'Mo–Do:',fri:'Fr:',lunch:'Pause:',weekend:'Sa, So:',closed:'geschlossen',liftSub:'LiftStandard GmbH · Aufzugswartung'}
  };
  const lang=()=>T[document.documentElement.lang]?document.documentElement.lang:'ru';
  function apply(){
    const t=T[lang()];
    document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.dataset.callLabel=t.call);
    const liftSub=document.querySelector('#elevator-service small');
    if(liftSub)liftSub.textContent=t.liftSub;
    const hours=document.querySelector('[data-management-hours]');
    if(hours){
      const p=hours.querySelectorAll('p');
      if(p[0])p[0].innerHTML=`<strong>${t.week}</strong> 8:00–17:00`;
      if(p[1])p[1].innerHTML=`<strong>${t.fri}</strong> 8:00–16:00`;
      if(p[2])p[2].innerHTML=`<strong>${t.lunch}</strong> 12:00–12:48`;
      if(p[3])p[3].innerHTML=`<strong>${t.weekend}</strong> ${t.closed}`;
    }
  }
  new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  document.addEventListener('click',e=>{
    if(e.target.closest('#management-company,[data-action="management"],#services-dialog,.service-entry')){
      setTimeout(apply,0);
      setTimeout(apply,80);
      setTimeout(apply,180);
    }
  },true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  window.applyI18nPolish=apply;
})();
