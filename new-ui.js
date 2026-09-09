(()=>{
  const main=document.getElementById('top');
  const searchPanel=document.querySelector('.search-panel');
  if(!main||!searchPanel)return;

  const nav=document.createElement('section');
  nav.className='new-home-nav';
  nav.setAttribute('aria-label','Основные разделы');
  nav.innerHTML=`<p class="new-ui-section-label">Главное</p><div class="new-home-grid">
    <button type="button" class="new-home-card nav-house" data-open="management-company"><span class="nav-emoji">🏢</span><strong>О доме</strong><small>Управляющая компания и контакты</small></button>
    <button type="button" class="new-home-card nav-cam" data-open-service="video-service"><span class="nav-emoji">📹</span><strong>Камеры</strong><small>Доступ и видеозаписи</small></button>
    <button type="button" class="new-home-card nav-intercom" data-open-service="intercom-service"><span class="nav-emoji">🔔</span><strong>Домофон</strong><small>Приложение и инструкция</small></button>
    <button type="button" class="new-home-card nav-utilities" data-open="utilities-button"><span class="nav-emoji">🧾</span><strong>Коммуналка</strong><small>Личные кабинеты и оплата</small></button>
    <button type="button" class="new-home-card nav-search" data-search><span class="nav-emoji">🔎</span><strong>Поиск квартиры</strong><small>Найти квартиру на этаже</small></button>
    <button type="button" class="new-home-card nav-services" data-open="service-organizations"><span class="nav-emoji">🛠️</span><strong>Полезное</strong><small>Обслуживающие организации</small></button>
  </div>`;
  main.insertBefore(nav,searchPanel);

  const brand=document.querySelector('.brand>div');
  if(brand&&!brand.querySelector('.new-ui-tag')){
    const tag=document.createElement('div');
    tag.className='new-ui-tag';
    tag.textContent='Полезная информация для жителей';
    brand.appendChild(tag);
  }

  nav.addEventListener('click',e=>{
    const button=e.target.closest('button');
    if(!button)return;
    if(button.hasAttribute('data-search')){
      searchPanel.classList.add('search-focus');
      searchPanel.scrollIntoView({behavior:'smooth',block:'start'});
      setTimeout(()=>document.getElementById('numbers')?.focus({preventScroll:true}),350);
      setTimeout(()=>searchPanel.classList.remove('search-focus'),1600);
      return;
    }
    const targetId=button.dataset.open;
    if(targetId){
      const target=document.getElementById(targetId);
      if(target instanceof HTMLButtonElement){target.click();return;}
    }
    const serviceId=button.dataset.openService;
    if(serviceId){
      const servicesButton=document.getElementById('service-organizations');
      servicesButton?.click();
      setTimeout(()=>document.getElementById(serviceId)?.click(),30);
    }
  });
})();