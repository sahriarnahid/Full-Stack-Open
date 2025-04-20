import { useState, useEffect } from 'react';
import axios from 'axios';

const Content = ({ countries, search }) => {
  const [countryDetails, setCountryDetails] = useState(null);
  const [weather, setWeather] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filtered = countries.filter(
    c => search && c.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!search) {
      setCountryDetails(null);
      setSelectedCountry(null);
      setWeather(null);
      return;
    }

    if (filtered.length === 1) {
      setSelectedCountry(filtered[0]);
    } else if (!selectedCountry) {
      setCountryDetails(null);
      setWeather(null);
    }
  }, [filtered, search]);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${selectedCountry}`
        )
        .then(response => {
          setCountryDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching country details:', error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (countryDetails) {
      const [lat, lon] = countryDetails.latlng;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
            import.meta.env.VITE_API_KEY
          }`
        )
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    } else {
      setWeather(null);
    }
  }, [countryDetails]);

  const handleShowDetails = countryName => {
    setSelectedCountry(countryName);
  };

  if (filtered.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (selectedCountry && countryDetails) {
    return (
      <div>
        <h2>{countryDetails.name.common}</h2>
        <p>Capital: {countryDetails.capital}</p>
        <p>Area: {countryDetails.area}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.values(countryDetails.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={countryDetails.flags.png}
          alt={`Flag of ${countryDetails.name.common}`}
          style={{ width: '150px', height: '100px' }}
        />
        <h2>Weather in {countryDetails.name.common}</h2>
        {weather ? (
          <div>
            <p>Temperature {weather.main.temp}°C</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>Wind {weather.wind.speed} m/s</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    );
  }

  return (
    <ul>
      {filtered.map(c => (
        <li key={c}>
          {c} <button onClick={() => handleShowDetails(c)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default Content;
