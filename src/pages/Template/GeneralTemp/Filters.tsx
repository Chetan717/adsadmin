import React from 'react';

export default function Filters({ setSelectTemp, selectTemp }) {
  const typeGenaral = [
    { name: 'Festival', value: 'Festival' },
    { name: 'Motivational Quate', value: 'Quate-BannerHome' },
    { name: 'Today Trending', value: 'Today_Trend' },
    { name: 'Good Morning', value: 'Good_Morning' },
    { name: 'Health Tips', value: 'Health_Tip' },
    { name: 'Greeting And Wishes', value: 'Greeting_And_Wishes' },
    { name: 'Good Night', value: 'Good Night' },
    { name: 'Devotional', value: 'Devotional' },
    { name: 'Daily Post Collection', value: 'Daily_Post_Collection' },
    { name: 'Birthday', value: 'Birthday' },
    { name: 'Aniversary', value: 'Aniversary' },
    { name: 'Thank You Birthday', value: 'Thank_You_Birthday' },
    { name: 'Thank You Aniversary', value: 'Thank_You_Aniversary' },
  ];

  return (
    <>
      <div className="flex flex-row gap-4 justify-center items-center">
        <div>
          <label className="text-xs text-black font-semibold">
            Select Type
          </label>
          <select
            value={selectTemp}
            onChange={(e) => setSelectTemp(e.target.value)}
            className="w-full rounded-lg bg-black text-white border-black border-[1.5px] p-3"
          >
            {typeGenaral?.map((i, index) => {
              return (
                <option key={index} value={i?.value}>
                  {i?.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
}
