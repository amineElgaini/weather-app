import React from 'react';
import { getWeatherDescription } from '../services/weatherService';
import { Sun, Cloud, CloudSun, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

const IconMap = {
  Sun, Cloud, CloudSun, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning
};

export function Forecast({ daily }) {
  if (!daily) return null;

  console.log(daily);

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
        {daily.time.map((time, i) => {
          const index = i; // show all days
          const { icon } = getWeatherDescription(daily.weather_code[index]);
          const WeatherIcon = IconMap[icon] || Cloud;
          const date = new Date(time);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <div
              key={time}
              className="bg-slate-800/30 cursor-pointer backdrop-blur-xl border border-slate-700/30 p-4 rounded-3xl flex flex-col items-center group hover:bg-slate-700/40 transition-all cursor-default"
            >
              <span className="text-slate-400 text-sm font-medium mb-3">{dayName}</span>
              <div className="bg-slate-900/50 p-3 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                <WeatherIcon className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-white font-bold text-lg">{Math.round(daily.temperature_2m_max[index])}°</span>
                <span className="text-slate-500 text-sm">{Math.round(daily.temperature_2m_min[index])}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
