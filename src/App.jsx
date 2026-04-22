import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { Forecast } from './components/Forecast';
import { getWeatherData } from './services/weatherService';
import { CloudRain, Loader2, ThermometerSun } from 'lucide-react';

function App() {
  
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCitySelect = async (city) => {
    setSelectedCity(city);
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(city.latitude, city.longitude);
      if (data) {
        setWeatherData(data);
      } else {
        setError('Failed to fetch weather data.');
      }
    } catch (err) {
      setError('An error occurred while fetching weather.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load with a default city (optional)
  useEffect(() => {
    handleCitySelect({
      name: 'Casablanca',
      latitude: 33.5883,
      longitude: -7.6114,
      country: 'Morocco'
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0A3D3A] text-slate-200 selection:bg-blue-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10 group">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
            <ThermometerSun className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            YouMeteo
          </h1>
        </div>

        {/* Search Section */}
        <SearchBar onCitySelect={handleCitySelect} />

        {/* Content Section */}
        <div className="w-full mt-4 min-h-[400px] flex flex-col items-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-slate-400 font-medium">Fetching the latest weather...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl max-w-md">
                <CloudRain className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h3>
                <p className="text-slate-400">{error}</p>
                <button
                  onClick={() => handleCitySelect(selectedCity)}
                  className="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors font-medium"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : weatherData ? (
            <>
              <WeatherDisplay weather={weatherData} city={selectedCity} />
              <Forecast daily={weatherData.daily} />
            </>
          ) : (
            <div className="py-20 text-center animate-in fade-in duration-1000">
              <p className="text-slate-500 text-lg">Search for a city to see the weather forecast</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
