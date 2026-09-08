(()=>{
  const header=document.querySelector('.masthead');
  const about=document.getElementById('about');
  if(!header||!about)return;

  const style=document.createElement('style');
  style.textContent=`
    .weather-pill{margin-left:auto;display:grid;grid-template-columns:auto auto;grid-template-areas:"icon temp" "city city";align-items:center;justify-content:center;column-gap:5px;row-gap:2px;min-width:78px;padding:7px 9px;border:1px solid #46626f;border-radius:12px;background:#ffffff0d;color:#e6eff2;line-height:1;flex:0 0 auto}
    .weather-icon{grid-area:icon;font-size:1rem}.weather-temp{grid-area:temp;font-size:.95rem;font-weight:750;font-variant-numeric:tabular-nums}.weather-city{grid-area:city;text-align:center;font-size:.62rem;color:#bcd0d7;letter-spacing:.02em}
    @media(max-width:760px){.masthead .brand{min-width:0}.masthead .brand>div{min-width:0}.weather-pill{min-width:45px;padding:4px 3px;border:0;background:transparent;display:block;text-align:center}.weather-icon,.weather-city{display:none}.weather-temp{font-size:.9rem;white-space:nowrap}.masthead .brand p{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:145px}}
    @media(max-width:390px){.weather-pill{min-width:40px}.weather-temp{font-size:.82rem}.masthead .brand p{max-width:125px}}
  `;
  document.head.append(style);

  const box=document.createElement('div');
  box.className='weather-pill';
  box.setAttribute('role','status');
  box.setAttribute('aria-live','polite');
  box.innerHTML='<span class="weather-icon" aria-hidden="true">•</span><span class="weather-temp">—°</span><span class="weather-city">Киров</span>';
  header.insertBefore(box,about);

  const icon=box.querySelector('.weather-icon');
  const temp=box.querySelector('.weather-temp');

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
      box.title=`Киров: ${text}, ${value>0?'+':''}${value}°, ощущается как ${feels>0?'+':''}${feels}°. Данные Open-Meteo`;
      box.setAttribute('aria-label',`Погода в Кирове: ${text}, ${value} градусов, ощущается как ${feels}`);
    }catch{
      icon.textContent='🌡️';
      temp.textContent='—°';
      box.title='Погода в Кирове временно недоступна';
      box.setAttribute('aria-label','Погода в Кирове временно недоступна');
    }
  }

  loadWeather();
  setInterval(loadWeather,15*60*1000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)loadWeather()});
})();
