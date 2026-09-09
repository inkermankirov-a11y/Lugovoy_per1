(()=>{
  const header=document.querySelector('.masthead');
  const about=document.getElementById('about');
  if(!header||!about)return;

  const style=document.createElement('style');
  style.textContent=`
    .header-status{margin-left:auto;display:flex;align-items:stretch;gap:10px;flex:0 0 auto;min-width:0}
    .weather-pill,.currency-pill{display:grid;align-items:center;justify-content:center;border:1px solid #46626f;border-radius:12px;background:#ffffff0d;color:#e6eff2;line-height:1;flex:0 0 auto;box-shadow:inset 0 0 0 1px #ffffff08}
    .weather-pill{grid-template-columns:auto auto;grid-template-areas:"icon temp" "city city";column-gap:6px;row-gap:4px;min-width:92px;padding:8px 11px;cursor:pointer;transition:background .16s ease,border-color .16s ease,transform .16s ease}
    .weather-pill:hover{background:#ffffff18;border-color:#6f8995}.weather-pill:active{transform:scale(.96)}.weather-pill:focus-visible{outline:3px solid #e6a826;outline-offset:3px}
    .weather-icon{grid-area:icon;font-size:1.05rem}.weather-temp{grid-area:temp;font-size:1rem;font-weight:800;font-variant-numeric:tabular-nums}.weather-city{grid-area:city;text-align:center;font-size:.63rem;color:#bcd0d7;letter-spacing:.04em;text-transform:uppercase}
    .currency-pill{grid-template-rows:auto auto;gap:4px;min-width:72px;padding:8px 11px;text-align:center}
    .currency-code{font-size:.62rem;color:#bcd0d7;letter-spacing:.08em}.currency-value{font-size:.9rem;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap}

    .forecast-overlay{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:20px;background:rgba(8,28,39,.62);backdrop-filter:blur(6px);opacity:0;visibility:hidden;transition:opacity .22s ease,visibility .22s ease}
    .forecast-overlay.open{opacity:1;visibility:visible}
    .forecast-panel{width:min(760px,100%);max-height:min(82dvh,760px);overflow:auto;border:1px solid #cbd9dd;border-radius:24px;background:#f8fbfb;color:#172c3a;box-shadow:0 28px 70px rgba(5,24,34,.35);transform:translateY(-22px) scale(.965);opacity:.2;transition:transform .28s cubic-bezier(.2,.8,.2,1),opacity .22s ease}
    .forecast-overlay.open .forecast-panel{transform:translateY(0) scale(1);opacity:1}
    .forecast-head{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:20px 20px 16px;background:linear-gradient(180deg,#f8fbfb 82%,rgba(248,251,251,0));border-radius:24px 24px 0 0}
    .forecast-head h2{font-size:1.25rem;margin:0}.forecast-sub{margin-top:4px;color:#526b78;font-size:.86rem}.forecast-close{display:grid;place-items:center;flex:0 0 44px;width:44px;height:44px;padding:0;border-radius:13px;background:#fff}
    .forecast-current{margin:0 20px 14px;padding:18px;border:1px solid #bed4d8;border-radius:18px;background:linear-gradient(135deg,#eaf7f3,#f4f9fa);display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:14px}
    .forecast-current-icon{font-size:2.2rem}.forecast-current-temp{font-size:1.8rem;font-weight:850;letter-spacing:-.04em}.forecast-current-text{color:#526b78;font-size:.88rem;margin-top:3px}.forecast-current-feels{text-align:right;color:#526b78;font-size:.78rem}.forecast-current-feels strong{display:block;color:#172c3a;font-size:1rem;margin-top:3px}
    .forecast-days{display:grid;gap:9px;padding:0 20px 20px}
    .forecast-day{display:grid;grid-template-columns:96px 44px minmax(120px,1fr) auto auto;align-items:center;gap:12px;padding:13px 14px;border:1px solid #d6e2e5;border-radius:16px;background:#fff;transition:transform .14s ease,background .14s ease,border-color .14s ease}
    .forecast-day:hover{transform:translateY(-1px);background:#f0f8f5;border-color:#9bc6bc}
    .forecast-date strong{display:block;font-size:.92rem}.forecast-date span{display:block;color:#6a808a;font-size:.72rem;margin-top:2px}.forecast-day-icon{font-size:1.55rem;text-align:center}.forecast-desc{font-size:.84rem;color:#405d69;line-height:1.25}.forecast-temp{font-weight:850;font-variant-numeric:tabular-nums;white-space:nowrap}.forecast-temp .min{color:#68808a;font-weight:700;margin-left:4px}.forecast-meta{display:grid;gap:3px;text-align:right;color:#607883;font-size:.72rem;white-space:nowrap}.forecast-source{padding:0 20px 20px;color:#78909a;font-size:.72rem;text-align:center}
    .forecast-loading{padding:36px 20px 42px;text-align:center;color:#607883}.forecast-spinner{width:32px;height:32px;margin:0 auto 12px;border:3px solid #d6e2e5;border-top-color:#126e65;border-radius:50%;animation:forecastSpin .8s linear infinite}@keyframes forecastSpin{to{transform:rotate(360deg)}}

    @media(max-width:760px){
      .masthead{display:grid!important;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"brand about" "status status";column-gap:10px;row-gap:10px;padding:14px 14px!important;align-items:center}
      .masthead .brand{grid-area:brand;min-width:0;gap:8px;display:flex;align-items:center}
      .masthead .brand>div{min-width:0}
      .masthead .brand img{width:36px;height:36px;flex:0 0 36px}
      .masthead .brand h1{font-size:1.42rem;line-height:1;white-space:nowrap}
      .masthead .brand p{display:block!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:none;font-size:.72rem;line-height:1.15;margin-top:4px;color:#bcd0d7}
      .header-status{grid-area:status;margin:0;display:flex;gap:8px;justify-content:flex-start;align-items:center}
      .weather-pill,.currency-pill{height:44px;border:1px solid #46626f;background:#ffffff0b;border-radius:10px;box-shadow:none}
      .weather-pill{width:auto;min-width:78px;padding:5px 9px;display:grid;grid-template-columns:auto auto;grid-template-areas:"icon temp" "city city";column-gap:5px;row-gap:2px;text-align:center}
      .weather-icon{display:block;font-size:.82rem}.weather-temp{font-size:.8rem;white-space:nowrap}.weather-city{display:block;font-size:.5rem}
      .currency-pill{width:auto;min-width:70px;padding:5px 9px;gap:2px}.currency-code{font-size:.5rem}.currency-value{font-size:.68rem}
      .quiet{grid-area:about;min-height:44px;padding:8px 11px;white-space:nowrap;font-size:.76rem;align-self:center}

      .forecast-overlay{place-items:end center;padding:0;background:rgba(8,28,39,.66)}
      .forecast-panel{width:100%;max-height:86dvh;border-radius:24px 24px 0 0;border-bottom:0;transform:translateY(100%);opacity:1}
      .forecast-overlay.open .forecast-panel{transform:translateY(0)}
      .forecast-panel::before{content:'';display:block;width:42px;height:5px;border-radius:99px;background:#c3d0d4;margin:9px auto -5px}
      .forecast-head{padding:18px 16px 14px;border-radius:24px 24px 0 0}.forecast-head h2{font-size:1.12rem}.forecast-current{margin:0 14px 12px;padding:14px;grid-template-columns:auto 1fr;gap:10px}.forecast-current-feels{grid-column:1/-1;text-align:left;display:flex;gap:6px;align-items:baseline}.forecast-current-feels strong{display:inline;margin:0}.forecast-current-icon{font-size:1.8rem}.forecast-current-temp{font-size:1.55rem}
      .forecast-days{padding:0 14px 16px;gap:8px}.forecast-day{grid-template-columns:78px 34px 1fr auto;padding:11px 10px;gap:9px}.forecast-desc{display:none}.forecast-meta{grid-column:3/5;grid-row:2;text-align:left;display:flex;gap:10px;font-size:.68rem}.forecast-day-icon{font-size:1.35rem}.forecast-temp{font-size:.88rem}.forecast-source{padding:0 14px calc(16px + env(safe-area-inset-bottom))}
    }
    @media(max-width:430px){
      .masthead{padding-left:10px!important;padding-right:10px!important;column-gap:7px;row-gap:8px}
      .masthead .brand{gap:6px}.masthead .brand img{width:34px;height:34px;flex-basis:34px}.masthead .brand h1{font-size:1.32rem}.masthead .brand p{font-size:.67rem}
      .header-status{gap:6px}.weather-pill{min-width:72px}.currency-pill{min-width:66px}.quiet{padding-left:8px;padding-right:8px;font-size:.72rem}
    }
    @media(max-width:360px){
      .masthead .brand img{width:31px;height:31px;flex-basis:31px}.masthead .brand h1{font-size:1.22rem}.masthead .brand p{font-size:.62rem}
      .weather-pill{min-width:68px}.currency-pill{min-width:62px}.quiet{font-size:.68rem;padding-left:6px;padding-right:6px}
      .forecast-day{grid-template-columns:70px 30px 1fr auto;font-size:.82rem}
    }
    @media(prefers-reduced-motion:reduce){.forecast-overlay,.forecast-panel,.weather-pill{transition:none}.forecast-spinner{animation:none}}
  `;
  document.head.append(style);

  const status=document.createElement('div');
  status.className='header-status';
  const weather=document.createElement('div');
  weather.className='weather-pill';
  weather.setAttribute('role','button');
  weather.setAttribute('tabindex','0');
  weather.setAttribute('aria-label','Погода в Кирове. Открыть прогноз на неделю');
  weather.innerHTML='<span class="weather-icon" aria-hidden="true">•</span><span class="weather-temp">—°</span><span class="weather-city">Киров</span>';
  const currency=document.createElement('div');
  currency.className='currency-pill';
  currency.setAttribute('role','status');
  currency.setAttribute('aria-live','polite');
  currency.innerHTML='<span class="currency-code">USD</span><span class="currency-value">—</span>';
  status.append(weather,currency);
  header.insertBefore(status,about);

  const overlay=document.createElement('div');
  overlay.className='forecast-overlay';
  overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML=`<section class="forecast-panel" role="dialog" aria-modal="true" aria-labelledby="forecast-title"><div class="forecast-head"><div><h2 id="forecast-title">Погода в Кирове · 7 дней</h2><div class="forecast-sub">Прогноз Open-Meteo</div></div><button type="button" class="forecast-close" aria-label="Закрыть прогноз">✕</button></div><div class="forecast-body"><div class="forecast-loading"><div class="forecast-spinner"></div>Загружаю прогноз…</div></div></section>`;
  document.body.appendChild(overlay);

  const icon=weather.querySelector('.weather-icon');
  const temp=weather.querySelector('.weather-temp');
  const currencyValue=currency.querySelector('.currency-value');
  const panel=overlay.querySelector('.forecast-panel');
  const body=overlay.querySelector('.forecast-body');
  const closeButton=overlay.querySelector('.forecast-close');
  let weatherData=null;

  function condition(code,isDay=true){
    if(code===0)return[isDay?'☀️':'🌙','ясно'];
    if(code===1)return[isDay?'🌤️':'🌙','преимущественно ясно'];
    if(code===2)return['⛅','переменная облачность'];
    if(code===3)return['☁️','облачно'];
    if(code===45||code===48)return['🌫️','туман'];
    if(code>=51&&code<=57)return['🌦️','морось'];
    if(code>=61&&code<=67)return['🌧️','дождь'];
    if(code>=71&&code<=77)return['🌨️','снег'];
    if(code>=80&&code<=82)return['🌦️','ливни'];
    if(code>=85&&code<=86)return['🌨️','снегопад'];
    if(code>=95)return['⛈️','гроза'];
    return['🌡️','погода'];
  }
  const signed=n=>`${Number(n)>0?'+':''}${Math.round(Number(n))}°`;
  const dayName=(iso,i)=>i===0?'Сегодня':new Intl.DateTimeFormat('ru-RU',{weekday:'short'}).format(new Date(iso+'T12:00:00')).replace('.','');
  const shortDate=iso=>new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'short'}).format(new Date(iso+'T12:00:00')).replace('.','');

  function renderForecast(){
    if(!weatherData?.daily?.time?.length){body.innerHTML='<div class="forecast-loading">Прогноз временно недоступен.</div>';return}
    const c=weatherData.current||{};
    const [currentIcon,currentText]=condition(Number(c.weather_code),Boolean(c.is_day));
    const d=weatherData.daily;
    const rows=d.time.slice(0,7).map((date,i)=>{
      const [sym,desc]=condition(Number(d.weather_code[i]),true);
      const rain=Math.round(Number(d.precipitation_probability_max?.[i]??0));
      const wind=Math.round(Number(d.wind_speed_10m_max?.[i]??0));
      return `<article class="forecast-day"><div class="forecast-date"><strong>${dayName(date,i)}</strong><span>${shortDate(date)}</span></div><div class="forecast-day-icon" aria-hidden="true">${sym}</div><div class="forecast-desc">${desc}</div><div class="forecast-temp">${signed(d.temperature_2m_max[i])}<span class="min">${signed(d.temperature_2m_min[i])}</span></div><div class="forecast-meta"><span>💧 ${rain}%</span><span>💨 ${wind} км/ч</span></div></article>`;
    }).join('');
    body.innerHTML=`<div class="forecast-current"><div class="forecast-current-icon" aria-hidden="true">${currentIcon}</div><div><div class="forecast-current-temp">${signed(c.temperature_2m)}</div><div class="forecast-current-text">${currentText}</div></div><div class="forecast-current-feels">Ощущается как <strong>${signed(c.apparent_temperature)}</strong></div></div><div class="forecast-days">${rows}</div><div class="forecast-source">Данные: Open-Meteo · прогноз обновляется автоматически</div>`;
  }

  function openForecast(){
    renderForecast();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.documentElement.style.overflow='hidden';
    setTimeout(()=>closeButton.focus({preventScroll:true}),80);
    if(!weatherData)loadWeather().then(renderForecast);
  }
  function closeForecast(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.documentElement.style.overflow='';
    weather.focus({preventScroll:true});
  }
  weather.addEventListener('click',openForecast);
  weather.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openForecast()}});
  closeButton.addEventListener('click',closeForecast);
  overlay.addEventListener('click',e=>{if(e.target===overlay)closeForecast()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))closeForecast()});

  async function loadWeather(){
    try{
      const url='https://api.open-meteo.com/v1/forecast?latitude=58.6036&longitude=49.6680&current=temperature_2m,apparent_temperature,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&forecast_days=7&temperature_unit=celsius&wind_speed_unit=kmh&timezone=Europe%2FMoscow';
      const response=await fetch(url,{cache:'no-store'});
      if(!response.ok)throw new Error('weather');
      const data=await response.json();
      const current=data.current;
      if(!current)throw new Error('weather');
      weatherData=data;
      const value=Math.round(current.temperature_2m);
      const feels=Math.round(current.apparent_temperature);
      const [symbol,text]=condition(Number(current.weather_code),Boolean(current.is_day));
      icon.textContent=symbol;
      temp.textContent=`${value>0?'+':''}${value}°`;
      weather.title=`Киров: ${text}, ${value>0?'+':''}${value}°, ощущается как ${feels>0?'+':''}${feels}°. Нажмите для прогноза на 7 дней.`;
      weather.setAttribute('aria-label',`Погода в Кирове: ${text}, ${value} градусов. Открыть прогноз на неделю`);
      if(overlay.classList.contains('open'))renderForecast();
      return data;
    }catch{
      icon.textContent='🌡️';
      temp.textContent='—°';
      weather.title='Погода в Кирове временно недоступна';
      weather.setAttribute('aria-label','Погода в Кирове временно недоступна. Открыть прогноз');
      return null;
    }
  }

  function showRate(value,date,cached=false){
    const rate=Number(value);
    if(!Number.isFinite(rate))return false;
    currencyValue.textContent=rate.toLocaleString('ru-RU',{minimumFractionDigits:2,maximumFractionDigits:2});
    const dateText=date?new Date(date).toLocaleDateString('ru-RU'):'';
    currency.title=`Курс ЦБ РФ: 1 USD = ${currencyValue.textContent} ₽${dateText?` на ${dateText}`:''}${cached?' · сохранённые данные':''}`;
    currency.setAttribute('aria-label',`Курс доллара ЦБ РФ: ${currencyValue.textContent} рубля`);
    return true;
  }

  async function loadCurrency(){
    try{
      const response=await fetch('https://www.cbr-xml-daily.ru/daily_json.js',{cache:'no-store'});
      if(!response.ok)throw new Error('currency');
      const data=await response.json();
      const usd=data?.Valute?.USD;
      if(!usd||!showRate(usd.Value,data.Date))throw new Error('currency');
      localStorage.setItem('etazhi-usd-rate',JSON.stringify({value:usd.Value,date:data.Date,saved:Date.now()}));
    }catch{
      try{
        const saved=JSON.parse(localStorage.getItem('etazhi-usd-rate')||'null');
        if(saved&&Date.now()-Number(saved.saved)<7*24*60*60*1000&&showRate(saved.value,saved.date,true))return;
      }catch{}
      currencyValue.textContent='—';
      currency.title='Курс USD временно недоступен';
      currency.setAttribute('aria-label','Курс доллара временно недоступен');
    }
  }

  loadWeather();
  loadCurrency();
  setInterval(loadWeather,15*60*1000);
  setInterval(loadCurrency,4*60*60*1000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){loadWeather();loadCurrency();}});
})();
