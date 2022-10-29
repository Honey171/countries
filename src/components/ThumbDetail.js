import React from 'react';

import { NumericFormat } from 'react-number-format';

function ThumbDetail({ title, image_url, population, region, capital }) {
  return (
    <div className="rounded-lg shadow-lg pb-4 flex flex-col justify-center relative ml-10 items-center w-[300px] md:ml-0 md:w-auto bg-white dark:bg-gray-700 dark:text-white ">
      <img
        src={image_url}
        alt="flag"
        className="rounded-tl-lg rounded-tr-lg"
        style={{ width: '350px', height: '170px' }}
      />
      <div className="p-4">
        <p className="font-bold mb-4 text-lg">{title}</p>
        <p className="text-sm">
          <span className="font-bold">Population: </span>
          <NumericFormat
            value={population}
            allowLeadingZeros
            thousandSeparator=","
            className="font-semibold dark:bg-gray-700"
          />
        </p>
        <p className="text-sm">
          <span className="font-bold">Region: </span>
          <span className="font-semibold">{region}</span>
        </p>
        <p className="text-sm">
          <span className="font-bold">Capital: </span>
          <span className="font-semibold">{capital}</span>
        </p>
      </div>
    </div>
  );
}

export default ThumbDetail;
