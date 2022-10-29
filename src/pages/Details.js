import React, { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { NumericFormat } from 'react-number-format';

function Details() {
  const [mode, setMode] = useState(true);
  const [toggleBtn, setToggleBtn] = useState(
    '<i class="far fa-moon"></i> Light Mode',
  );

  let { state } = useLocation();

  console.log(state);

  console.log(Object.values(state.country.name.nativeName)[0]);

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
      <div className="container mx-auto mb-16">
        <Link
          className="px-8 py-2 bg-white text-gray-600 shadow-md rounded-lg dark:bg-gray-700 dark:text-white"
          to="/"
        >
          <i className="fa fa-arrow-left mr-3"></i> Back
        </Link>
      </div>
      <div className="container flex flex-col space-y-16 relative translate-y-12 lg:justify-center lg:space-x-28 md:space-x-14 md:flex-row md:space-y-0">
        <div>
          <img
            src={state.country.flags.png}
            alt="flag"
            className="w-[375px] h-[300px] md:w-[450px] lg:w-[550px] lg:h-[300px]"
          />
        </div>
        <div className="flex flex-col space-y-8 relative ">
          <p className="font-bold text-2xl">{state.country.name.common}</p>
          <div className="flex flex-col space-y-16 md:flex-row lg:flex-row lg:space-x-28 lg:space-y-0 md:space-y-0 ">
            <div className="leading-loose">
              <p className="font-bold">
                Native Name:{' '}
                <span className="font-semibold">
                  {Object.values(state.country.name.nativeName)[0].common}
                </span>
              </p>
              <p className="font-bold">
                Population:{' '}
                <NumericFormat
                  value={state.country.population}
                  allowLeadingZeros
                  thousandSeparator=","
                  className="font-semibold dark:bg-gray-800"
                />
              </p>
              <p className="font-bold">
                Region:{' '}
                <span className="font-semibold">{state.country.region}</span>
              </p>
              <p className="font-bold">
                Sub Region:{' '}
                <span className="font-semibold">{state.country.subregion}</span>
              </p>
              <p className="font-bold">
                Capital:{' '}
                <span className="font-semibold">{state.country.capital}</span>
              </p>
            </div>
            <div className="leading-loose">
              <p className="font-bold">
                Independent:{' '}
                {state.country.independent ? (
                  <span className="font-semibold">Yes</span>
                ) : (
                  <span className="font-semibold">No</span>
                )}
              </p>
              <p className="font-bold">
                Currencies:{' '}
                <span className="font-semibold">
                  {Object.values(state.country.currencies).map(
                    (item) =>
                      `${item.name}${
                        item === Object.values(state.country.currencies).pop()
                          ? ''
                          : ', '
                      }`,
                  )}
                </span>
              </p>
              <p className="font-bold">
                Languages:{' '}
                <span className="font-semibold">
                  {Object.values(state.country.languages).map(
                    (item) =>
                      `${item}${
                        item === Object.values(state.country.languages).pop()
                          ? ''
                          : ', '
                      }`,
                  )}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-row space-x-8">
            <p className="font-bold">Border Countries:</p>
            <div className="flex flex-col space-y-4 md:flex-col md:space-y-4 md:space-x-0">
              {state.country.borders &&
                state.country.borders.map((border) => (
                  <button className="shadow-lg rounded-md px-8 lg:px-8 md:px-8 bg-gray-200 dark:bg-gray-700">
                    {border}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
