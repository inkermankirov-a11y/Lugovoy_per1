(()=>{
  const languages={
    ru:{flag:'🇷🇺',code:'RU',name:'Русский'},
    en:{flag:'🇬🇧',code:'EN',name:'English'},
    fr:{flag:'🇫🇷',code:'FR',name:'Français'},
    de:{flag:'🇩🇪',code:'DE',name:'Deutsch'}
  };

  const tr={
    ru:{about:'О сайте',main:'Главное',house:'О доме',houseSub:'Управляющая компания и контакты',service:'Обслуживание',serviceSub:'Обслуживающие организации',utilities:'Коммуналка',utilitiesSub:'Личные кабинеты и оплата',floors:'Этажи',floorsSub:'Найти квартиру на этаже',chat:'Чат дома',chatSub:'Общение жильцов во VK',market:'Маркет',marketSub:'Купить или продать в доме',back:'← Назад к разделам',find:'Найдите свою квартиру',meta:'3 подъезда · 17 этажей · 711 квартир',placeholder:'Например: 13, 292, 475–480',add:'Добавить ＋',hint:'Введите один номер, несколько через запятую или диапазон.',selected:'Выбрано',clear:'Очистить',share:'Поделиться подборкой',copy:'Скопировать данные',saved:'Выбор сохраняется на этом устройстве.',install:'На экран телефона',top:'Наверх ↑',web:'Этажи · Веб-версия 1.35',mgmt:'Управляющая компания',services:'Обслуживающие организации',passport:'Паспортный стол',passportSub:'ООО «Кировский РИЦ» · прописка и регистрация',contact:'Контактная информация',site:'Сайт',requests:'Заявки · главный телефон',legal:'Юридические вопросы · общее собрание собственников',hours:'Режим работы офисов',address:'Адрес:',openSite:'Открыть сайт',dispatcher:'Диспетчер',emergency:'Аварийная служба',lift:'Обслуживание лифтов',intercom:'Домофон',spring:'Домашний родник',video:'Видеонаблюдение',utilityHint:'Личные кабинеты и сервисы коммунальных организаций.',open:'Открыть ↗',language:'Язык'},
    en:{about:'About',main:'Main',house:'About the building',houseSub:'Management company and contacts',service:'Services',serviceSub:'Service organizations',utilities:'Utilities',utilitiesSub:'Accounts and payments',floors:'Floors',floorsSub:'Find an apartment by floor',chat:'Building chat',chatSub:'Residents chat on VK',market:'Marketplace',marketSub:'Buy or sell in the building',back:'← Back to sections',find:'Find your apartment',meta:'3 entrances · 17 floors · 711 apartments',placeholder:'For example: 13, 292, 475–480',add:'Add ＋',hint:'Enter one number, several separated by commas, or a range.',selected:'Selected',clear:'Clear',share:'Share selection',copy:'Copy data',saved:'Your selection is saved on this device.',install:'Add to phone',top:'Back to top ↑',web:'Floors · Web version 1.35',mgmt:'Management company',services:'Service organizations',passport:'Registration office',passportSub:'Kirov RIC LLC · residence registration',contact:'Contact information',site:'Website',requests:'Requests · main phone',legal:'Legal matters · owners’ general meeting',hours:'Office hours',address:'Address:',openSite:'Open website',dispatcher:'Dispatcher',emergency:'Emergency service',lift:'Elevator service',intercom:'Intercom',spring:'Home Spring',video:'Video surveillance',utilityHint:'Personal accounts and utility service websites.',open:'Open ↗',language:'Language'},
    fr:{about:'À propos',main:'Principal',house:'À propos de l’immeuble',houseSub:'Société de gestion et contacts',service:'Services',serviceSub:'Organismes de service',utilities:'Services publics',utilitiesSub:'Comptes et paiements',floors:'Étages',floorsSub:'Trouver un appartement par étage',chat:'Chat de l’immeuble',chatSub:'Discussion des résidents sur VK',market:'Marché',marketSub:'Acheter ou vendre dans l’immeuble',back:'← Retour aux sections',find:'Trouvez votre appartement',meta:'3 entrées · 17 étages · 711 appartements',placeholder:'Par exemple : 13, 292, 475–480',add:'Ajouter ＋',hint:'Entrez un numéro, plusieurs séparés par des virgules ou une plage.',selected:'Sélectionné',clear:'Effacer',share:'Partager la sélection',copy:'Copier les données',saved:'La sélection est enregistrée sur cet appareil.',install:'Ajouter au téléphone',top:'Haut de page ↑',web:'Étages · Version web 1.35',mgmt:'Société de gestion',services:'Organismes de service',passport:'Bureau d’enregistrement',passportSub:'Kirov RIC SARL · enregistrement de résidence',contact:'Coordonnées',site:'Site',requests:'Demandes · téléphone principal',legal:'Questions juridiques · assemblée des propriétaires',hours:'Horaires des bureaux',address:'Adresse :',openSite:'Ouvrir le site',dispatcher:'Répartiteur',emergency:'Service d’urgence',lift:'Entretien des ascenseurs',intercom:'Interphone',spring:'Source domestique',video:'Vidéosurveillance',utilityHint:'Comptes personnels et services des fournisseurs.',open:'Ouvrir ↗',language:'Langue'},
    de:{about:'Info',main:'Hauptmenü',house:'Über das Gebäude',houseSub:'Hausverwaltung und Kontakte',service:'Service',serviceSub:'Dienstleister',utilities:'Nebenkosten',utilitiesSub:'Konten und Zahlungen',floors:'Etagen',floorsSub:'Wohnung nach Etage finden',chat:'Hauschat',chatSub:'Bewohner-Chat in VK',market:'Marktplatz',marketSub:'Im Haus kaufen oder verkaufen',back:'← Zurück zu den Bereichen',find:'Wohnung finden',meta:'3 Eingänge · 17 Etagen · 711 Wohnungen',placeholder:'Zum Beispiel: 13, 292, 475–480',add:'Hinzufügen ＋',hint:'Eine Nummer, mehrere durch Kommas getrennte Nummern oder einen Bereich eingeben.',selected:'Ausgewählt',clear:'Leeren',share:'Auswahl teilen',copy:'Daten kopieren',saved:'Die Auswahl wird auf diesem Gerät gespeichert.',install:'Zum Telefon hinzufügen',top:'Nach oben ↑',web:'Etagen · Webversion 1.35',mgmt:'Hausverwaltung',services:'Dienstleister',passport:'Meldebüro',passportSub:'Kirov RIC GmbH · Wohnsitzanmeldung',contact:'Kontaktinformationen',site:'Website',requests:'Anfragen · Haupttelefon',legal:'Rechtsfragen · Eigentümerversammlung',hours:'Bürozeiten',address:'Adresse:',openSite:'Website öffnen',dispatcher:'Leitstelle',emergency:'Notdienst',lift:'Aufzugsservice',intercom:'Gegensprechanlage',spring:'Hausquelle',video:'Videoüberwachung',utilityHint:'Persönliche Konten und Versorgerdienste.',open:'Öffnen ↗',language:'Sprache'}
  };

  let lang=localStorage.getItem('lugovoy-lang')||'ru';
  if(!languages[lang])lang='ru';
  let observer=null;

  const setText=(sel,text)=>{const el=document.querySelector(sel);if(el&&el.textContent!==text)el.textContent=text;};

  function updateSwitcher(){
    const btn=document.querySelector('.lang-current');if(!btn)return;
    const l=languages[lang];
    btn.innerHTML=`<span>${l.flag}</span><b>${l.code}</b>`;
    btn.setAttribute('aria-label',`${tr[lang].language}: ${l.name}`);
    document.querySelectorAll('.lang-option').forEach(el=>el.classList.toggle('active',el.dataset.lang===lang));
  }

  function apply(){
    if(observer)observer.disconnect();
    const t=tr[lang];
    document.documentElement.lang=lang;
    document.title=lang==='ru'?'Луговой 1':'Lugovoy 1';
    setText('#about',t.about);
    setText('.new-ui-section-label',t.main);
    setText('[data-action="management"] strong',t.house);setText('[data-action="management"] small',t.houseSub);
    setText('[data-action="services"] strong',t.service);setText('[data-action="services"] small',t.serviceSub);
    setText('[data-action="utilities"] strong',t.utilities);setText('[data-action="utilities"] small',t.utilitiesSub);
    setText('[data-action="search"] strong',t.floors);setText('[data-action="search"] small',t.floorsSub);
    setText('[data-action="house-chat"] strong',t.chat);setText('[data-action="house-chat"] small',t.chatSub);
    setText('[data-action="house-market"] strong',t.market);setText('[data-action="house-market"] small',t.marketSub);
    setText('.new-ui-search-back',t.back);
    setText('.search-heading h2',t.find);setText('.house-meta',t.meta);
    const input=document.getElementById('numbers');if(input)input.placeholder=t.placeholder;
    setText('#search .primary',t.add);setText('#status',t.hint);
    const selectionTitle=document.querySelector('.selection-title h2');
    if(selectionTitle){const count=document.getElementById('count')?.textContent||'0';selectionTitle.textContent=`${t.selected} `;const span=document.createElement('span');span.id='count';span.textContent=count;selectionTitle.appendChild(span);}
    setText('#clear',t.clear);setText('#share',t.share);setText('#copy',t.copy);setText('.device-note',t.saved);
    setText('#install',t.install);setText('footer .footer-actions a',t.top);setText('footer span',t.web);
    setText('#management-title',t.mgmt);setText('#services-title',t.services);setText('#passport-service strong',t.passport);setText('#passport-service small',t.passportSub);
    setText('.management-brand-kicker',t.mgmt);setText('.management-brand-links a:first-child span:last-child',t.site);
    const labels=document.querySelectorAll('#management-dialog .management-label');
    if(labels[0])labels[0].textContent=t.requests;if(labels[1])labels[1].textContent=t.legal;if(labels[3])labels[3].textContent=t.hours;
    document.querySelectorAll('#management-dialog .management-address strong').forEach(el=>el.textContent=t.address);
    setText('#utilities-dialog .dialog-top h2',t.utilities);setText('#utilities-dialog > .hint',t.utilityHint);
    document.querySelectorAll('#utilities-dialog .utility-link').forEach(el=>el.dataset.i18nOpen=t.open);
    setText('#elevator-service strong',t.lift);setText('#intercom-service strong',t.intercom);setText('#spring-service strong',t.spring);setText('#video-service strong',t.video);
    setText('#elevator-detail-dialog .dialog-top h2',t.lift);setText('#elevator-detail-dialog .service-detail-head strong',t.lift);
    setText('#intercom-detail-dialog .dialog-top h2',t.intercom);setText('#intercom-detail-dialog .service-detail-head strong',t.intercom);
    setText('#spring-detail-dialog .dialog-top h2',t.spring);setText('#spring-detail-dialog .service-detail-head strong',t.spring);
    setText('#video-detail-dialog .dialog-top h2',t.video);setText('#video-detail-dialog .service-detail-head strong',t.video);
    document.querySelectorAll('.service-detail-head p').forEach(el=>el.textContent=t.contact);
    document.querySelectorAll('.service-detail-back').forEach(el=>el.textContent=`← ${t.services}`);
    setText('#elevator-detail-dialog .primary-lift-contact h3',`📞 ${t.dispatcher}`);setText('#elevator-detail-dialog .passport-note h3',`🚨 ${t.emergency}`);
    updateSwitcher();
    if(observer)observer.observe(document.body,{childList:true,subtree:true});
  }

  function ensureSwitcher(){
    if(document.querySelector('.lang-switcher'))return;
    const about=document.getElementById('about');if(!about)return;
    const wrap=document.createElement('div');wrap.className='lang-switcher';
    wrap.innerHTML=`<button type="button" class="lang-current" aria-haspopup="true" aria-expanded="false"></button><div class="lang-menu" hidden>${Object.entries(languages).map(([id,l])=>`<button type="button" class="lang-option" data-lang="${id}"><span>${l.flag}</span><b>${l.code}</b></button>`).join('')}</div>`;
    about.after(wrap);
    const style=document.createElement('style');
    style.textContent=`.lang-switcher{position:relative;margin-left:8px}.lang-current,.lang-option{display:inline-flex;align-items:center;justify-content:center;gap:4px;min-width:48px;height:38px;padding:0 7px;border:1px solid rgba(255,255,255,.22);border-radius:10px;background:rgba(255,255,255,.09);color:#fff;font:800 .72rem/1 system-ui;cursor:pointer}.lang-current span,.lang-option span{font-size:1rem}.lang-menu{position:absolute;right:0;top:45px;z-index:1200;display:grid;grid-template-columns:repeat(2,1fr);gap:6px;padding:8px;border-radius:12px;background:#173241;box-shadow:0 10px 28px rgba(0,0,0,.25)}.lang-menu[hidden]{display:none}.lang-option{min-width:58px}.lang-option.active{outline:2px solid #fff;outline-offset:1px}@media(max-width:760px){.lang-switcher{margin-left:0}.lang-current{min-width:42px;height:34px;padding:0 5px}.lang-current span{font-size:.9rem}.lang-current b{font-size:.64rem}}.utility-link[data-i18n-open]::after{content:attr(data-i18n-open)!important}`;
    document.head.appendChild(style);
    wrap.addEventListener('click',e=>{
      const option=e.target.closest('.lang-option');const current=e.target.closest('.lang-current');const menu=wrap.querySelector('.lang-menu');
      if(current){menu.hidden=!menu.hidden;current.setAttribute('aria-expanded',String(!menu.hidden));return;}
      if(option){lang=option.dataset.lang;localStorage.setItem('lugovoy-lang',lang);menu.hidden=true;wrap.querySelector('.lang-current').setAttribute('aria-expanded','false');apply();}
    });
    document.addEventListener('click',e=>{if(!wrap.contains(e.target)){wrap.querySelector('.lang-menu').hidden=true;wrap.querySelector('.lang-current').setAttribute('aria-expanded','false');}});
  }

  const start=()=>{
    ensureSwitcher();
    observer=new MutationObserver(records=>{
      const hasElementAddition=records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1));
      if(hasElementAddition)requestAnimationFrame(apply);
    });
    apply();
    setTimeout(apply,100);
    setTimeout(apply,500);
    window.applyI18n=apply;
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
