function updateManagementInfo(){
  const dialog=document.querySelector('#management-dialog');
  if(!dialog)return;
  const list=dialog.querySelector('.management-list');
  if(!list)return;

  if(!dialog.querySelector('[data-management-brand]')){
    const brand=document.createElement('section');
    brand.className='management-brand';
    brand.dataset.managementBrand='1';
    brand.innerHTML=`<div class="management-brand-main"><div class="management-brand-icon" aria-hidden="true">🏢</div><div><div class="management-brand-kicker">Управляющая компания</div><strong>УК «Добродом»</strong></div></div><div class="management-brand-links"><a href="https://dobrodomkirov.ru/" target="_blank" rel="noopener">🌐 Сайт</a><a href="https://vk.ru/dobrodom43" target="_blank" rel="noopener">VK</a><a href="https://max.ru/join/TUP0oTes_nxo5OUev4Uqph3Pr3GXv1iZNdT9oBkWJUU" target="_blank" rel="noopener">MAX</a></div>`;
    list.before(brand);
  }

  const cards=[...list.querySelectorAll('.management-card')];
  const main=cards[0];
  const office=cards[1];
  const billing=cards[2];

  if(main){
    const label=main.querySelector('.management-label');
    if(label)label.textContent='Заявки · главный телефон';
    const addr=main.querySelector('.management-address');
    if(addr)addr.innerHTML='<strong>Адрес:</strong> г. Киров, ул. Тимирязева, д. 7/1, пом. 1001';
    let hint=main.querySelector('.hint');
    if(hint)hint.textContent='Вход со стороны большой парковки.';
  }

  if(office){
    const label=office.querySelector('.management-label');
    if(label)label.textContent='Юридические вопросы · общее собрание собственников';
    const phone=office.querySelector('.management-phone');
    if(phone){phone.href='tel:+78332754955';phone.textContent='8 (8332) 75-49-55';}
    const addr=office.querySelector('.management-address');
    if(addr)addr.innerHTML='<strong>Адрес:</strong> г. Киров, ул. Профсоюзная, д. 1, офис 608/5';
    if(!office.querySelector('a[href^="mailto:"]')){
      const mail=document.createElement('a');
      mail.className='service-contact-link';
      mail.href='mailto:uk@dobrodomkirov.ru';
      mail.textContent='✉️ uk@dobrodomkirov.ru';
      office.appendChild(mail);
    }
  }

  if(billing){
    const addr=billing.querySelector('.management-address');
    if(addr)addr.innerHTML='<strong>Адрес:</strong> г. Киров, ул. Урицкого, д. 24';
    if(!billing.querySelector('a[href^="mailto:"]')){
      const mail=document.createElement('a');
      mail.className='service-contact-link';
      mail.href='mailto:254848@bk.ru';
      mail.textContent='✉️ 254848@bk.ru';
      billing.appendChild(mail);
    }
  }

  dialog.querySelector('[data-management-lifts]')?.remove();

  if(!dialog.querySelector('[data-management-hours]')){
    const section=document.createElement('section');
    section.className='management-card';
    section.dataset.managementHours='1';
    section.innerHTML='<div class="management-label">Режим работы офисов</div><p><strong>Пн–Чт:</strong> 8:00–17:00</p><p><strong>Пт:</strong> 8:00–16:00</p><p><strong>Обед:</strong> 12:00–12:48</p><p><strong>Сб, Вс:</strong> выходные</p>';
    list.appendChild(section);
  }
}

document.addEventListener('DOMContentLoaded',updateManagementInfo);
document.addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;if(button.id==='management-company'){updateManagementInfo();document.querySelector('#management-dialog')?.showModal();}});
