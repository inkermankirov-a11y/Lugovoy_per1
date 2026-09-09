(()=>{
  const waitForPill=()=>{
    const pill=document.querySelector('.currency-pill');
    if(!pill){setTimeout(waitForPill,40);return}

    const style=document.createElement('style');
    style.textContent=`
      .currency-pill{cursor:pointer;transition:background .16s ease,border-color .16s ease,transform .16s ease}
      .currency-pill:hover{background:#ffffff18!important;border-color:#6f8995!important}.currency-pill:active{transform:scale(.96)}.currency-pill:focus-visible{outline:3px solid #e6a826;outline-offset:3px}
      .currency-overlay{position:fixed;inset:0;z-index:10020;display:grid;place-items:center;padding:20px;background:rgba(8,28,39,.62);backdrop-filter:blur(6px);opacity:0;visibility:hidden;transition:opacity .22s ease,visibility .22s ease}
      .currency-overlay.open{opacity:1;visibility:visible}
      .currency-panel{width:min(560px,100%);max-height:86dvh;overflow:auto;border:1px solid #cbd9dd;border-radius:24px;background:#f8fbfb;color:#172c3a;box-shadow:0 28px 70px rgba(5,24,34,.35);transform:translateY(-22px) scale(.965);opacity:.2;transition:transform .28s cubic-bezier(.2,.8,.2,1),opacity .22s ease}
      .currency-overlay.open .currency-panel{transform:translateY(0) scale(1);opacity:1}
      .currency-head{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:20px 20px 12px}.currency-head h2{margin:0;font-size:1.25rem}.currency-sub{margin-top:4px;color:#526b78;font-size:.86rem}.currency-close{display:grid;place-items:center;flex:0 0 44px;width:44px;height:44px;padding:0;border-radius:13px;background:#fff}
      .currency-body{padding:0 20px 20px}.currency-card{border:1px solid #d2e0e3;border-radius:18px;background:#fff;padding:16px}.currency-row{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:end}.currency-field label{display:block;font-size:.72rem;font-weight:800;color:#607883;text-transform:uppercase;letter-spacing:.06em;margin:0 0 6px}.currency-field select,.currency-amount{width:100%;min-width:0;height:48px;border:1px solid #b9cbd0;border-radius:12px;background:#fff;color:#172c3a;padding:0 12px;font:inherit}.currency-field select:focus,.currency-amount:focus{outline:3px solid #aedbd2;border-color:#126e65}.currency-swap{width:46px;height:46px;min-height:46px;padding:0;border-radius:14px;background:#eaf7f3;color:#126e65;font-size:1.25rem;transition:transform .2s ease,background .14s ease}.currency-swap:hover{background:#dff1e8}.currency-swap:active{transform:rotate(180deg) scale(.94)}
      .currency-input-wrap{margin-top:14px}.currency-amount{font-size:1.25rem;font-weight:800;font-variant-numeric:tabular-nums}.currency-result{margin-top:14px;border-radius:16px;background:linear-gradient(135deg,#eaf7f3,#f3f8f9);border:1px solid #bdd6d0;padding:16px}.currency-result-value{font-size:2rem;font-weight:850;letter-spacing:-.04em;font-variant-numeric:tabular-nums;overflow-wrap:anywhere}.currency-result-caption{margin-top:5px;color:#526b78;font-size:.82rem}.currency-rate-line{margin-top:12px;padding-top:12px;border-top:1px solid #d5e4e0;color:#526b78;font-size:.78rem;line-height:1.5}.currency-source{padding:12px 4px 0;text-align:center;color:#78909a;font-size:.72rem}.currency-loading{padding:32px 18px;text-align:center;color:#607883}.currency-spinner{width:30px;height:30px;margin:0 auto 12px;border:3px solid #d6e2e5;border-top-color:#126e65;border-radius:50%;animation:currencySpin .8s linear infinite}@keyframes currencySpin{to{transform:rotate(360deg)}}
      @media(max-width:760px){.currency-overlay{place-items:end center;padding:0;background:rgba(8,28,39,.66)}.currency-panel{width:100%;max-height:88dvh;border-radius:24px 24px 0 0;border-bottom:0;transform:translateY(100%);opacity:1}.currency-overlay.open .currency-panel{transform:translateY(0)}.currency-panel::before{content:'';display:block;width:42px;height:5px;border-radius:99px;background:#c3d0d4;margin:9px auto -5px}.currency-head{padding:18px 16px 12px}.currency-body{padding:0 14px calc(18px + env(safe-area-inset-bottom))}.currency-card{padding:14px}.currency-row{grid-template-columns:1fr 44px 1fr;gap:7px}.currency-field select{font-size:.9rem;padding:0 8px}.currency-result-value{font-size:1.7rem}}
      @media(max-width:380px){.currency-head h2{font-size:1.08rem}.currency-field select{font-size:.82rem}.currency-card{padding:12px}.currency-row{grid-template-columns:minmax(0,1fr) 40px minmax(0,1fr)}.currency-swap{width:40px;height:44px}.currency-result-value{font-size:1.5rem}}
      @media(prefers-reduced-motion:reduce){.currency-overlay,.currency-panel,.currency-pill,.currency-swap{transition:none}.currency-spinner{animation:none}}
    `;
    document.head.appendChild(style);

    pill.setAttribute('role','button');
    pill.setAttribute('tabindex','0');
    pill.setAttribute('aria-label','Курс валют. Открыть конвертер');

    const overlay=document.createElement('div');
    overlay.className='currency-overlay';
    overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML=`<section class="currency-panel" role="dialog" aria-modal="true" aria-labelledby="currency-title"><div class="currency-head"><div><h2 id="currency-title">Конвертер валют</h2><div class="currency-sub">Курсы Центрального банка РФ</div></div><button type="button" class="currency-close" aria-label="Закрыть">✕</button></div><div class="currency-body"><div class="currency-loading"><div class="currency-spinner"></div>Загружаю курсы…</div></div></section>`;
    document.body.appendChild(overlay);

    const body=overlay.querySelector('.currency-body');
    const close=overlay.querySelector('.currency-close');
    let rates=null, rateDate='';

    const rubPerUnit=code=>code==='RUB'?1:rates?.[code]?.rubPerUnit;
    const fmt=(n,max=4)=>Number(n).toLocaleString('ru-RU',{minimumFractionDigits:0,maximumFractionDigits:max});

    function options(selected){
      const entries=Object.entries(rates||{}).sort((a,b)=>{
        const priority=['RUB','USD','EUR','CNY','GBP','CHF','JPY','TRY','KZT'];
        const ai=priority.indexOf(a[0]),bi=priority.indexOf(b[0]);
        if(ai>=0||bi>=0)return(ai<0?999:ai)-(bi<0?999:bi);
        return a[0].localeCompare(b[0]);
      });
      return entries.map(([code,v])=>`<option value="${code}" ${code===selected?'selected':''}>${code} · ${v.name}</option>`).join('');
    }

    function render(){
      if(!rates){body.innerHTML='<div class="currency-loading"><div class="currency-spinner"></div>Загружаю курсы…</div>';return}
      body.innerHTML=`<div class="currency-card"><div class="currency-row"><div class="currency-field"><label for="currency-from">Из</label><select id="currency-from">${options('USD')}</select></div><button type="button" class="currency-swap" aria-label="Поменять валюты местами">⇄</button><div class="currency-field"><label for="currency-to">В</label><select id="currency-to">${options('RUB')}</select></div></div><div class="currency-input-wrap currency-field"><label for="currency-amount">Сумма</label><input id="currency-amount" class="currency-amount" inputmode="decimal" autocomplete="off" value="1" aria-label="Сумма для конвертации"></div><div class="currency-result"><div class="currency-result-value" id="currency-result-value">—</div><div class="currency-result-caption" id="currency-result-caption"></div><div class="currency-rate-line" id="currency-rate-line"></div></div></div><div class="currency-source">Курсы ЦБ РФ${rateDate?' · '+rateDate:''}. Для валютной пары используется кросс-курс через рубль.</div>`;
      const from=body.querySelector('#currency-from'),to=body.querySelector('#currency-to'),amount=body.querySelector('#currency-amount'),result=body.querySelector('#currency-result-value'),caption=body.querySelector('#currency-result-caption'),line=body.querySelector('#currency-rate-line'),swap=body.querySelector('.currency-swap');
      const update=()=>{
        const raw=amount.value.trim().replace(',','.').replace(/\s/g,'');
        const value=Number(raw);
        const a=rubPerUnit(from.value),b=rubPerUnit(to.value);
        if(!Number.isFinite(value)||!Number.isFinite(a)||!Number.isFinite(b)){result.textContent='—';caption.textContent='Введите сумму';line.textContent='';return}
        const converted=value*a/b;
        const one=a/b;
        result.textContent=`${fmt(converted,converted<1?6:2)} ${to.value}`;
        caption.textContent=`${fmt(value,4)} ${from.value} = ${fmt(converted,converted<1?6:2)} ${to.value}`;
        line.textContent=`1 ${from.value} = ${fmt(one,one<1?6:4)} ${to.value} · 1 ${to.value} = ${fmt(1/one,(1/one)<1?6:4)} ${from.value}`;
      };
      from.addEventListener('change',update);to.addEventListener('change',update);amount.addEventListener('input',update);
      swap.addEventListener('click',()=>{const v=from.value;from.value=to.value;to.value=v;update()});
      update();
    }

    async function loadRates(){
      try{
        const r=await fetch('https://www.cbr-xml-daily.ru/daily_json.js',{cache:'no-store'});
        if(!r.ok)throw Error();
        const data=await r.json();
        rates={RUB:{name:'Российский рубль',rubPerUnit:1}};
        for(const v of Object.values(data.Valute||{}))rates[v.CharCode]={name:v.Name,rubPerUnit:Number(v.Value)/Number(v.Nominal)};
        rateDate=data.Date?new Date(data.Date).toLocaleDateString('ru-RU'):'';
        localStorage.setItem('etazhi-currency-rates',JSON.stringify({rates,rateDate,saved:Date.now()}));
      }catch{
        try{
          const saved=JSON.parse(localStorage.getItem('etazhi-currency-rates')||'null');
          if(saved?.rates){rates=saved.rates;rateDate=saved.rateDate||''}
        }catch{}
      }
      if(rates)render();else body.innerHTML='<div class="currency-loading">Курсы временно недоступны. Попробуйте позже.</div>';
    }

    function openConverter(){
      render();
      overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.documentElement.style.overflow='hidden';
      setTimeout(()=>close.focus({preventScroll:true}),180);
      if(!rates)loadRates();
    }
    function closeConverter(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');document.documentElement.style.overflow='';pill.focus({preventScroll:true})}

    pill.addEventListener('click',openConverter);
    pill.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openConverter()}});
    close.addEventListener('click',closeConverter);
    overlay.addEventListener('click',e=>{if(e.target===overlay)closeConverter()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))closeConverter()});
    loadRates();
  };
  waitForPill();
})();
