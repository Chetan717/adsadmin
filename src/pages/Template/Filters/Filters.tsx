import React from 'react';

export default function Filters({ setSelectTemp, selectTemp, TemplateType }) {
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
            className="w-full rounded-lg bg-black text-white border-black border-[1.5px] p-2"
          >
            {TemplateType?.map((i: any) => {
              return <option value={i}>{i}</option>;
            })}
          </select>
        </div>
      </div>
    </>
  );
}
