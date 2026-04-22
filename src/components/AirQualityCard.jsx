import React from 'react';
import { Wind, Activity, Zap, ShieldCheck } from 'lucide-react';

const getAQIDescription = (aqi) => {
  if (aqi <= 20) return { label: 'Excellent', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
  if (aqi <= 40) return { label: 'Good', color: 'text-green-400', bg: 'bg-green-500/20' };
  if (aqi <= 60) return { label: 'Fair', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
  if (aqi <= 80) return { label: 'Poor', color: 'text-orange-400', bg: 'bg-orange-500/20' };
  if (aqi <= 100) return { label: 'Very Poor', color: 'text-red-400', bg: 'bg-red-500/20' };
  return { label: 'Extremely Poor', color: 'text-purple-400', bg: 'bg-purple-500/20' };
};

export function AirQualityCard({ data }) {
  if (!data || !data.current) return null;

  const { european_aqi, pm10, pm2_5, ozone } = data.current;
  const status = getAQIDescription(european_aqi);

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 animate-in fade-in zoom-in slide-in-from-bottom-8 duration-700 delay-100">
      <div className="bg-slate-800/30 backdrop-blur-3xl border border-slate-700/40 rounded-[2.5rem] p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${status.bg} border border-white/5`}>
              <Wind className={`w-8 h-8 ${status.color}`} />
            </div>
            <div>
              <h3 className="text-slate-400 font-medium text-sm uppercase tracking-widest">Air Quality Index</h3>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-white">{european_aqi}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${status.bg} ${status.color} border border-white/5`}>
                  {status.label}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 w-full md:w-auto">
            <AQIMetric icon={<Activity className="w-4 h-4 text-blue-400" />} label="PM2.5" value={pm2_5} unit="μg/m³" />
            <AQIMetric icon={<Zap className="w-4 h-4 text-purple-400" />} label="PM10" value={pm10} unit="μg/m³" />
            <AQIMetric icon={<ShieldCheck className="w-4 h-4 text-amber-400" />} label="Ozone" value={ozone} unit="μg/m³" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AQIMetric({ icon, label, value, unit }) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-white">{Math.round(value)}</span>
        <span className="text-[10px] text-slate-500">{unit}</span>
      </div>
    </div>
  );
}
