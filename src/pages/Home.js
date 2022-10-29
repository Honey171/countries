import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import ThumbDetail from '../components/ThumbDetail';

function Home() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [mode, setMode] = useState(true);
  const [toggleBtn, setToggleBtn] = useState(
    '<i class="far fa-moon"></i> Light Mode',
  );

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    await setCountries(data);
    console.log(data);
  };

  const toggleDarkMode = () => {
    if (mode) {
      document.documentElement.classList.add('dark');
      setToggleBtn('<i class="fas fa-moon"></i> Dark Mode');
      setMode((current) => (current = !current));
    }
    if (!mode) {
      document.documentElement.classList.remove('dark');
      setToggleBtn('<i class="far fa-moon"></i> Light Mode');
      setMode((current) => (current = !current));
    }
  };

  const searchCountry = async (term) => {
    if (term.length < 3 || term === '') return;
    const response = await fetch(`https://restcountries.com/v3.1/name/${term}`);
    const data = await response.json();
    await setCountries(data);
  };

  const filterByRegion = async (region) => {
    if (region === '') return;
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`,
    );
    const data = await response.json();
    await setCountries(data);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="w-screen shadow-md py-6 px-5 mb-16 bg-white dark:bg-gray-700 dark:text-white">
        <div className="container flex mx-auto">
          <h1 className="font-bold text-xl">Where in the world?</h1>
          <div className="ml-auto font-medium">
            <button
              onClick={() => toggleDarkMode()}
              dangerouslySetInnerHTML={{ __html: toggleBtn }}
            ></button>
          </div>
        </div>
      </div>
      <div className="container flex mx-auto mb-16">
        <i className="fa fa-search my-auto pr-2 pl-3 py-5 rounded-md -mr-9 z-10 text-gray-400"></i>
        <input
          type="text"
          placeholder="Search for a country..."
          className="pl-10 p-2 shadow-md rounded-md w-1/3 outline-none dark:bg-gray-700"
          onChange={(term) => searchCountry(term.target.value)}
        />
        <select
          className="ml-auto my-2 p-2 shadow-md rounded-md font-medium outline-none dark:bg-gray-700"
          onChange={(val) => filterByRegion(val.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div className="container grid gap-16 xl:grid-cols-4 lg:grid-cols-3 md:mx-auto md:grid-cols-2">
        {countries.map((country, index) => (
          <Link
            to="/details"
            state={{
              country,
            }}
            key={index}
          >
            <ThumbDetail
              title={country.name.common}
              image_url={country.flags.png}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
