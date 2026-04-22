import React from 'react';
import { Sun, Cloud, CloudSun, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';
import { getWeatherDescription } from '../services/weatherService';

const IconMap = {
  Sun, Cloud, CloudSun, CloudFog, CloudDrizzle,
  CloudRain, CloudSnow, CloudLightning
};

export function HourlyForecast({ hourly }) {
  if (!hourly || !hourly.time) return null;

  // Get current hour to filter upcoming hours
  const now = new Date();
  const currentHour = now.getHours();
  
  // We'll show the next 24 data points starting from roughly now
  const startIndex = hourly.time.findIndex(t => new Date(t) >= now) || 0;
  const next24Hours = hourly.time.slice(startIndex, startIndex + 24).map((time, index) => {
    const idx = startIndex + index;
    const { icon } = getWeatherDescription(hourly.weather_code[idx]);
    const WeatherIcon = IconMap[icon] || Cloud;
    
    return {
      time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: Math.round(hourly.temperature_2m[idx]),
      icon: WeatherIcon
    };
  });

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      <div className="bg-slate-800/30 backdrop-blur-3xl border border-slate-700/40 rounded-[2rem] p-6 shadow-xl">
        <h3 className="text-slate-400 font-medium text-sm uppercase tracking-widest mb-6 ml-2">Hourly Forecast</h3>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide select-none">
          {next24Hours.map((hour, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 flex flex-col items-center justify-between min-w-[80px] p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
            >
              <span className="text-xs text-slate-400 font-medium mb-3">{hour.time}</span>
              <div className="mb-3 group-hover:scale-110 transition-transform">
                <hour.icon className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <span className="text-xl font-bold text-white">{hour.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
