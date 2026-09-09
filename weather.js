(()=>{
  const header=document.querySelector('.masthead');
  const about=document.getElementById('about');
  if(!header||!about)return;

  const style=document.createElement('style');
  style.textContent=`
    .header-status{margin-left:auto;display:flex;align-items:stretch;gap:10px;flex:0 0 auto;min-width:0}
    .weather-pill,.currency-pill{display:grid;align-items:center;justify-content:center;border:1px solid #46626f;border-radius:12px;background:#ffffff0d;color:#e6eff2;line-height:1;flex:0 0 auto;box-shadow:inset 0 0 0 1px #ffffff08}
    .weather-pill{grid-template-columns:auto auto;grid-template-areas:"icon temp" "city city";column-gap:6px;row-gap:4px;min-width:92px;padding:8px 11px}
    .weather-icon{grid-area:icon;font-size:1.05rem}.weather-temp{grid-area:temp;font-size:1rem;font-weight:800;font-variant-numeric:tabular-nums}.weather-city{grid-area:city;text-align:center;font-size:.63rem;color:#bcd0d7;letter-spacing:.04em;text-transform:uppercase}
    .currency-pill{grid-template-rows:auto auto;gap:4px;min-width:72px;padding:8px 11px;text-align:center}
    .currency-code{font-size:.62rem;color:#bcd0d7;letter-spacing:.08em}.currency-value{font-size:.9rem;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap}
    @media(max-width:760px){
      .masthead{gap:7px}.masthead .brand{min-width:0;flex:1 1 auto}.masthead .brand>div{min-width:0}.header-status{gap:5px;margin-left:0;align-items:center}
      .weather-pill,.currency-pill{height:50px;border:1px solid #46626f;background:#ffffff0b;border-radius:11px;box-shadow:none}
      .weather-pill{min-width:48px;padding:5px 5px;display:grid;grid-template-columns:1fr;grid-template-areas:"icon" "temp";gap:2px;text-align:center}.weather-icon{display:block;font-size:.82rem}.weather-temp{font-size:.8rem;white-space:nowrap}.weather-city{display:none}
      .currency-pill{min-width:50px;padding:5px 5px;gap:2px}.currency-code{font-size:.5rem}.currency-value{font-size:.68rem}
      .masthead .brand p{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:112px}
      .quiet{min-height:50px;padding:8px 10px;white-space:nowrap}
    }
    @media(max-width:430px){
      .masthead{padding-left:12px;padding-right:12px;gap:5px}.masthead .brand{gap:7px}.masthead .brand img{width:34px;height:34px}.masthead .brand h1{font-size:1.42rem}.masthead .brand p{max-width:92px;font-size:.72rem}
      .header-status{gap:4px}.weather-pill{min-width:44px;width:44px}.currency-pill{min-width:47px;width:47px}.weather-temp{font-size:.76rem}.currency-value{font-size:.64rem}.quiet{padding-left:8px;padding-right:8px;font-size:.76rem}
    }
    @media(max-width:390px){
      .masthead .brand p{display:none}.masthead .brand h1{font-size:1.35rem}.masthead .brand{flex:0 1 auto}.weather-pill{width:42px;min-width:42px}.currency-pill{width:45px;min-width:45px}.quiet{font-size:.72rem;padding-left:7px;padding-right:7px}
    }
    @media(max-width:350px){.weather-pill{display:none}.currency-pill{width:43px;min-width:43px}.masthead .brand h1{font-size:1.28rem}}
  `;
  document.head.append(style);

  const status=document.createElement('div');
  status.className='header-status';
  const weather=document.createElement('div');
  weather.className='weather-pill';
  weather.setAttribute('role','status');
  weather.setAttribute('aria-live','polite');
  weather.innerHTML='<span class="weather-icon" aria-hidden="true">•</span><span class="weather-temp">—°</span><span class="weather-city">Киров</span>';
  const currency=document.createElement('div');
  currency.className='currency-pill';
  currency.setAttribute('role','status');
  currency.setAttribute('aria-live','polite');
  currency.innerHTML='<span class="currency-code">USD</span><span class="currency-value">—</span>';
  status.append(weather,currency);
  header.insertBefore(status,about);

  const icon=weather.querySelector('.weather-icon');
  const temp=weather.querySelector('.weather-temp');
  const currencyValue=currency.querySelector('.currency-value');

  function condition(code,isDay){
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

  async function loadWeather(){
    try{
      const url='https://api.open-meteo.com/v1/forecast?latitude=58.6036&longitude=49.6680&current=temperature_2m,apparent_temperature,weather_code,is_day&temperature_unit=celsius&timezone=Europe%2FMoscow';
      const response=await fetch(url,{cache:'no-store'});
      if(!response.ok)throw new Error('weather');
      const data=await response.json();
      const current=data.current;
      if(!current)throw new Error('weather');
      const value=Math.round(current.temperature_2m);
      const feels=Math.round(current.apparent_temperature);
      const [symbol,text]=condition(Number(current.weather_code),Boolean(current.is_day));
      icon.textContent=symbol;
      temp.textContent=`${value>0?'+':''}${value}°`;
      weather.title=`Киров: ${text}, ${value>0?'+':''}${value}°, ощущается как ${feels>0?'+':''}${feels}°. Данные Open-Meteo`;
      weather.setAttribute('aria-label',`Погода в Кирове: ${text}, ${value} градусов, ощущается как ${feels}`);
    }catch{
      icon.textContent='🌡️';
      temp.textContent='—°';
      weather.title='Погода в Кирове временно недоступна';
      weather.setAttribute('aria-label','Погода в Кирове временно недоступна');
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
