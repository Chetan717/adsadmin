import React from 'react';

export default function Filters() {
  return (
    <>
      <div className="flex flex-row gap-4 justify-center items-center">
        <div>
          <label className="text-xs text-black font-semibold">
            Select Type
          </label>
          <select className="w-full rounded-lg bg-black text-white border-black border-[1.5px] p-2">
            <option>Select Type</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-black font-semibold">
            Select SubType
          </label>
          <select className="w-full rounded-lg bg-black text-white border-black border-[1.5px] p-2">
            <option>SubType</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>
    </>
  );
}
