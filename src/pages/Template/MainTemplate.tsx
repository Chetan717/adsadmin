import React, { useEffect, useState } from 'react';
import AddTemplate from './Comp/AddTemplate';
import Filters from './Filters/Filters';
import GraphicsLinkSingle from './Comp/GrahicsLinkMultiple';
import ListOfCompanies from './ListOfCompanies';
import { Spinner } from '@nextui-org/react';
import ListOfTemplate from './Comp/ListOfTemplate';
import { DataSupplier } from '../../DataContaxt/FetchData';
import ShowGraphics from './Comp/ShowGraphics';
export default function MainTemplate() {
  const { GetAllCompanyTemplate } = DataSupplier();
  const [selectComp, setSelectComp] = useState('');
  const [selectTemp, setSelectTemp] = useState('');
  const [swich, setSwich] = useState('');
  const [load, setLoad] = useState(false);
  const [loadGr, setLoadGr] = useState(false);

  useEffect(() => {
    GetAllCompanyTemplate(`${selectComp}`);
  }, [selectComp]);

  return (
    <>
      {load === true ? (
        <Spinner />
      ) : swich === 'temp' ? (
        <>
          <p
            onClick={() => setSwich(' ')}
            className="text-sm hover:text-primary cursor-pointer font-bold text-black dark:text-white"
          >
            {`<`} Back To List Of Companies
          </p>
          <p className="text-xl font-semibold text-black">{selectComp}</p>
          <div className="flex flex-col gap-2  h-full p-1 rounded-lg">
            <div className="flex flex-row gap-3 justify-start items-center">
              <Filters />
              <AddTemplate selectComp={selectComp} />
            </div>
            <div className="flex flex-row gap-1 justify-center items-start">
              <div className="flex flex-row gap-3 rounded-lg h-full w-full justify-start items-center">
                <ListOfTemplate
                  selectTemp={selectTemp}
                  setSelectTemp={setSelectTemp}
                  setLoadGr={setLoadGr}
                  loadGr={loadGr}
                  selectComp={selectComp}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <ListOfCompanies
          setSelectComp={setSelectComp}
          selectComp={selectComp}
          swich={swich}
          setSwich={setSwich}
          load={load}
          setLoad={setLoad}
        />
      )}
    </>
  );
}
