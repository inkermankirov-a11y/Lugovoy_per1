function updateManagementInfo(){
  const dialog=document.querySelector('#management-dialog');
  if(!dialog)return;
  const list=dialog.querySelector('.management-list');
  if(!list)return;

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

  if(!dialog.querySelector('[data-management-lifts]')){
    const section=document.createElement('section');
    section.className='management-card';
    section.dataset.managementLifts='1';
    section.innerHTML='<div class="management-label">Заявки по обслуживанию лифтов</div><a class="management-phone" href="tel:+78332476020">8 (8332) 47-60-20</a><a class="management-phone" href="tel:+78332447248">8 (8332) 44-72-48</a>';
    if(billing)list.insertBefore(section,billing);else list.appendChild(section);
  }

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
