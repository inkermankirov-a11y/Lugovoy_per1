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
    <button type="button" class="new-home-card nav-utilities" data-action="search"><span class="nav-emoji nav-app-icon" aria-hidden="true"><img src="./icon.svg" alt="" width="40" height="40"></span><strong>Этажи</strong><small>Найти квартиру на этаже</small></button>
    <button type="button" class="new-home-card nav-chat" data-action="house-chat"><span class="nav-emoji">💬</span><strong>Чат дома</strong><small>Общение жильцов во VK</small></button>
    <button type="button" class="new-home-card nav-market" data-action="house-market"><span class="nav-emoji">🛍️</span><strong>Маркет</strong><small>Купить или продать в доме</small></button>
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

  const numbersInput=document.getElementById('numbers');
  const keypad=document.createElement('div');
  keypad.className='apartment-keypad';
  keypad.setAttribute('role','group');
  keypad.setAttribute('aria-label','Цифровая клавиатура для номера квартиры');
  keypad.innerHTML=`
    ${[1,2,3,4,5,6,7,8,9].map(n=>`<button type="button" class="apartment-key" data-number="${n}" aria-label="${n}">${n}</button>`).join('')}
    <button type="button" class="apartment-key apartment-key-zero" data-number="0" aria-label="0">0</button>
    <button type="button" class="apartment-key apartment-key-delete" data-delete-number aria-label="Удалить последнюю цифру">⌫ <span>Удалить</span></button>`;
  searchPanel.querySelector('#status')?.before(keypad);

  const touchMode=matchMedia('(pointer:coarse)').matches||navigator.maxTouchPoints>0;
  if(touchMode&&numbersInput){
    numbersInput.readOnly=true;
    numbersInput.setAttribute('inputmode','none');
    numbersInput.setAttribute('aria-describedby','status');
  }

  keypad.addEventListener('click',e=>{
    const button=e.target.closest('button');
    if(!button||!numbersInput)return;
    if(button.hasAttribute('data-delete-number')){
      numbersInput.value=numbersInput.value.slice(0,-1);
      numbersInput.focus({preventScroll:true});
      return;
    }
    const digit=button.dataset.number;
    if(digit===undefined)return;
    if(!numbersInput.value&&digit==='0')return;
    if(numbersInput.value.length>=3)return;
    numbersInput.value+=digit;
    numbersInput.focus({preventScroll:true});
  });

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
    if(focus)setTimeout(()=>numbersInput?.focus({preventScroll:true}),350);
    setTimeout(()=>searchPanel.classList.remove('search-focus'),1600);
  };

  const openDialog=id=>{
    const dialog=document.getElementById(id);
    if(dialog instanceof HTMLDialogElement&&!dialog.open)dialog.showModal();
  };

  const linkDialog=document.createElement('dialog');
  linkDialog.className='external-link-dialog';
  linkDialog.setAttribute('aria-labelledby','external-link-title');
  linkDialog.innerHTML=`<div class="dialog-top"><h2 id="external-link-title">Открыть ссылку</h2><button type="button" data-link-close aria-label="Закрыть">✕</button></div><p class="external-link-text"></p><div class="external-link-actions"><button type="button" class="external-link-go">Перейти</button><button type="button" class="external-link-copy">Скопировать ссылку</button></div><p class="external-link-status" role="status" aria-live="polite"></p>`;
  document.body.appendChild(linkDialog);
  let pendingLink='';

  const showLinkDialog=(label,url)=>{
    pendingLink=url;
    linkDialog.querySelector('#external-link-title').textContent=label;
    linkDialog.querySelector('.external-link-text').textContent='Выберите действие:';
    linkDialog.querySelector('.external-link-status').textContent='';
    if(!linkDialog.open)linkDialog.showModal();
  };

  const copyLink=async()=>{
    try{
      await navigator.clipboard.writeText(pendingLink);
      linkDialog.querySelector('.external-link-status').textContent='Ссылка скопирована.';
    }catch{
      const area=document.createElement('textarea');
      area.value=pendingLink;
      area.style.position='fixed';
      area.style.opacity='0';
      document.body.appendChild(area);
      area.select();
      const ok=document.execCommand('copy');
      area.remove();
      linkDialog.querySelector('.external-link-status').textContent=ok?'Ссылка скопирована.':'Не удалось скопировать ссылку.';
    }
  };

  linkDialog.addEventListener('click',e=>{
    const button=e.target.closest('button');
    if(!button)return;
    if(button.hasAttribute('data-link-close')){linkDialog.close();return;}
    if(button.classList.contains('external-link-go')){
      if(touchMode){
        linkDialog.close();
        window.location.href=pendingLink;
      }else{
        const opened=window.open(pendingLink,'_blank','noopener');
        if(opened)linkDialog.close();
        else linkDialog.querySelector('.external-link-status').textContent='Браузер заблокировал новое окно.';
      }
      return;
    }
    if(button.classList.contains('external-link-copy'))copyLink();
  });

  back.addEventListener('click',()=>showHome());

  nav.addEventListener('click',e=>{
    const button=e.target.closest('button');
    if(!button)return;

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
      case 'house-chat':
        showLinkDialog('Чат дома','https://vk.me/join/HHUNBMEnfqy7_eCGM2uYCdiI69taPCLuqTw=');
        break;
      case 'house-market':
        showLinkDialog('Маркет','https://vk.me/join/9NbXV4NK39PGg1cVqDiAGoj5ZmezmaqtHXM=');
        break;
    }
  });

  if(location.hash.startsWith('#q='))showSearch({focus:false});
  else showHome({scroll:false});
})();