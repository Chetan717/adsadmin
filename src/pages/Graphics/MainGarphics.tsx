import React, { useState } from 'react';
import AddGraphics from './Comp/AddGraphics';
import { Spinner } from '@nextui-org/react';
import GraphicsList from './Comp/ListOfGrahics';

const MainGraphics: React.FC = () => {
  const [loading, setLoading] =
    useState<React.Dispatch<React.SetStateAction<boolean>>>(false);

  const grptype = [
    'TopUplineFrames',
    'Gems',
    'Footers',
    'AchiverFrame',
    'other',
  ];
  const [selType, setSelType] = useState(grptype[0]);
  return (
    <>
      <div className="flex flex-col gap-10 justify-start items-start">
        <div className="flex flex-row gap-3 justify-center items-center">
          <div>
            <label className="text-xs font-semibold text-black">
              Select Type
            </label>
            <select
              onChange={(e) => setSelType(e.target.value)}
              placeholder="Graphics type"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              value={selType}
            >
              <option>Select GraphicsType</option>
              {grptype?.map((i: any, index: number) => {
                return (
                  <>
                    <option key={index} value={i}>
                      {i}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          <AddGraphics
            setLoading={setLoading}
            loading={loading}
            grptype={grptype}
          />
        </div>
        {loading === true ? (
          <Spinner />
        ) : (
          //   <MLMCompanyList loading={loading} setLoading={setLoading} />
          <GraphicsList
            setLoading={setLoading}
            loading={loading}
            grptype={grptype}
            selType={selType}
          />
        )}
      </div>
    </>
  );
};

export default MainGraphics;
