import Filter from './components/Filter';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Content from './components/Content';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const countryList = response.data;
        setCountries(countryList.map(c => c.name.common));
      });
  }, []);

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Filter search={search} handleSearch={handleSearch} />
      <Content search={search} countries={countries} />
    </div>
  );
};
export default App;
