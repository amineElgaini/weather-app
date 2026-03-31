import React from 'react';
import {
  Sun, Cloud, CloudSun, CloudFog, CloudDrizzle,
  CloudRain, CloudSnow, CloudLightning, Wind,
  Droplets, Thermometer, Sunrise, Sunset
} from 'lucide-react';
import { getWeatherDescription } from '../services/weatherService';

const IconMap = {
  Sun, Cloud, CloudSun, CloudFog, CloudDrizzle,
  CloudRain, CloudSnow, CloudLightning
};

export function WeatherDisplay({ weather, city }) {
  if (!weather || !city) return null;

  const current = weather.current;
  const daily = weather.daily;
  const { label, icon } = getWeatherDescription(current.weather_code);
  const WeatherIcon = IconMap[icon] || Cloud;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-in fade-in zoom-in slide-in-from-bottom-8 duration-700">
      <div className="relative overflow-hidden bg-slate-800/40 backdrop-blur-3xl border border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 shadow-3xl">
        {/* Abstract Background Decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl text-slate-400 font-medium mb-1">{city.country}</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              {city.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-400 font-medium mt-2">{label}</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-7xl md:text-9xl font-bold text-white tracking-tighter flex">
              {Math.round(current.temperature_2m)}
              <span className="text-blue-500 text-4xl md:text-6xl mt-4">°</span>
            </div>
            <div className="bg-slate-700/30 p-4 md:p-6 rounded-3xl backdrop-blur-xl border border-white/5">
              <WeatherIcon className="w-16 h-16 md:w-24 md:h-24 text-white drop-shadow-2xl animate-pulse" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <DetailCard icon={<Thermometer className="w-5 h-5 text-orange-400" />} label="Feels Like" value={`${Math.round(current.apparent_temperature)}°`} />
          <DetailCard icon={<Wind className="w-5 h-5 text-blue-400" />} label="Wind Speed" value={`${current.wind_speed_10m} km/h`} />
          <DetailCard icon={<Droplets className="w-5 h-5 text-cyan-400" />} label="Humidity" value={`${current.relative_humidity_2m}%`} />
          <DetailCard icon={<Sunrise className="w-5 h-5 text-yellow-400" />} label="Sunrise" value={new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
        </div>
      </div>
    </div>
  );
}

function DetailCard({ icon, label, value }) {
  return (
    <div className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center group">
      <div className="mb-2 group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">{label}</div>
      <div className="text-white font-bold text-lg">{value}</div>
    </div>
  );
}
