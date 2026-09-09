(()=>{
  const main=document.getElementById('top');
  const searchPanel=document.querySelector('.search-panel');
  const workspace=document.querySelector('.workspace');
  if(!main||!searchPanel||!workspace)return;

  const nav=document.createElement('section');
  nav.className='new-home-nav';
  nav.setAttribute('aria-label','Основные разделы');
  nav.innerHTML=`<p class="new-ui-section-label">Главное</p><div class="new-home-grid">
    <button type="button" class="new-home-card nav-house" data-action="management"><span class="nav-emoji">🏢</span><strong>О доме</strong><small>Управляющая компания и контакты</small></button>
    <button type="button" class="new-home-card nav-cam" data-action="services"><span class="nav-emoji">🛠️</span><strong>Обслуживание</strong><small>Обслуживающие организации</small></button>
    <button type="button" class="new-home-card nav-intercom" data-action="utilities"><span class="nav-emoji">🧾</span><strong>Коммуналка</strong><small>Личные кабинеты и оплата</small></button>
    <button type="button" class="new-home-card nav-utilities" data-action="search"><span class="nav-emoji">🔎</span><strong>Поиск квартиры</strong><small>Найти квартиру на этаже</small></button>
    <button type="button" class="new-home-card nav-search" data-service="video-service"><span class="nav-emoji">📹</span><strong>Камеры</strong><small>Доступ и видеозаписи</small></button>
    <button type="button" class="new-home-card nav-services" data-service="intercom-service"><span class="nav-emoji">🔔</span><strong>Домофон</strong><small>Приложение и инструкция</small></button>
  </div>`;
  main.insertBefore(nav,searchPanel);

  const searchView=document.createElement('section');
  searchView.className='new-ui-search-view';
  searchView.setAttribute('aria-label','Поиск квартиры');
  main.insertBefore(searchView,searchPanel);

  const back=document.createElement('button');
  back.type='button';
  back.className='new-ui-search-back';
  back.innerHTML='<span aria-hidden="true">←</span> Назад к разделам';
  searchView.appendChild(back);
  searchView.appendChild(searchPanel);
  searchView.appendChild(workspace);

  const showHome=({scroll=true}={})=>{
    nav.hidden=false;
    searchView.hidden=true;
    main.classList.remove('search-view');
    if(scroll)nav.scrollIntoView({behavior:'smooth',block:'start'});
  };

  const showSearch=({focus=true}={})=>{
    nav.hidden=true;
    searchView.hidden=false;
    main.classList.add('search-view');
    searchPanel.classList.add('search-focus');
    searchView.scrollIntoView({behavior:'smooth',block:'start'});
    if(focus)setTimeout(()=>document.getElementById('numbers')?.focus({preventScroll:true}),350);
    setTimeout(()=>searchPanel.classList.remove('search-focus'),1600);
  };

  const openDialog=id=>{
    const dialog=document.getElementById(id);
    if(dialog instanceof HTMLDialogElement&&!dialog.open)dialog.showModal();
  };

  const openService=serviceId=>{
    openDialog('services-dialog');
    requestAnimationFrame(()=>document.getElementById(serviceId)?.click());
  };

  back.addEventListener('click',()=>showHome());

  nav.addEventListener('click',e=>{
    const button=e.target.closest('button');
    if(!button)return;

    const serviceId=button.dataset.service;
    if(serviceId){openService(serviceId);return;}

    switch(button.dataset.action){
      case 'search':
        showSearch();
        break;
      case 'management':
        if(typeof window.updateManagementInfo==='function')window.updateManagementInfo();
        openDialog('management-dialog');
        break;
      case 'utilities':
        if(typeof window.openUtilitiesDialog==='function')window.openUtilitiesDialog();
        else document.getElementById('utilities-button')?.click();
        break;
      case 'services':
        openDialog('services-dialog');
        break;
    }
  });

  if(location.hash.startsWith('#q=')) showSearch({focus:false});
  else showHome({scroll:false});
})();