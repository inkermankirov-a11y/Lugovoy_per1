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
    }
    @media(max-width:430px){
      .masthead{padding-left:10px!important;padding-right:10px!important;column-gap:7px;row-gap:8px}
      .masthead .brand{gap:6px}.masthead .brand img{width:34px;height:34px;flex-basis:34px}.masthead .brand h1{font-size:1.32rem}.masthead .brand p{font-size:.67rem}
      .header-status{gap:6px}.weather-pill{min-width:72px}.currency-pill{min-width:66px}.quiet{padding-left:8px;padding-right:8px;font-size:.72rem}
    }
    @media(max-width:360px){
      .masthead .brand img{width:31px;height:31px;flex-basis:31px}.masthead .brand h1{font-size:1.22rem}.masthead .brand p{font-size:.62rem}
      .weather-pill{min-width:68px}.currency-pill{min-width:62px}.quiet{font-size:.68rem;padding-left:6px;padding-right:6px}
    }
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
