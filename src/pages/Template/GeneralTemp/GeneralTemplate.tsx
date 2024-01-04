import React, { useEffect, useState } from 'react';
import AddGenaralTemplate from './Comp/AddGenaralTemplate';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import Filters from './Filters';
import { Button } from '@nextui-org/react';
import ListOfTemplate from './ListOfGeneralTemp';
import EditGenTemplate from './Comp/EditGenTemplate';
export default function GeneralTemplate() {
  const { GetAllGeneralTemplate, genTempLoading, genTemplateData } =
    DataSupplier();
  useEffect(() => {
    GetAllGeneralTemplate('Genaral');
  }, []);

  const [swich, setSwich] = useState('Home');
  const [selectTemp, setSelectTemp] = useState('Festival');
  const [dataEdit, setDataEdit] = useState({});

  const switchMode = (mode: any) => {
    setSwich(mode);
  };
  return (
    <>
      {swich === 'Home' ? (
        <>
          <div className="flex flex-col gap-2  h-full p-1 rounded-lg">
            <div className="flex flex-row gap-3 justify-start items-center">
              <Filters setSelectTemp={setSelectTemp} selectTemp={selectTemp} />
              <div className="flex flex-col gap-2">
                <div className="h-2"></div>
                <Button
                  size={`lg`}
                  className="bg-black dark:bg-white text-white font-semibold dark:text-black "
                  onPress={() => switchMode('Add')}
                >
                  Add Template +
                </Button>
              </div>
            </div>
            <div className="flex flex-row gap-1 justify-center items-start">
              <div className="flex flex-row gap-3 rounded-lg h-full w-full justify-start items-center">
                {/* <ListOfTemplate
                  selectComp={selectComp}
                  TemplateType={TemplateType}
                  setSwich={setSwich}
                  setDataEdit={setDataEdit}
                  dataEdit={dataEdit}
                  selectTemp={selectTemp}
                /> */}
                <ListOfTemplate
                  setDataEdit={setDataEdit}
                  dataEdit={dataEdit}
                  selectTemp={selectTemp}
                  setSwich={setSwich}
                />
              </div>
            </div>
          </div>
        </>
      ) : swich === 'Add' ? (
        <div className="flex flex-col justify-start items-start gap-2">
          <p
            onClick={() => switchMode('Home')}
            className="text-sm hover:text-primary cursor-pointer font-bold text-black dark:text-white"
          >
            {`<`} Back To List Of Templates
          </p>
          <AddGenaralTemplate
            genTempLoading={genTempLoading}
            GetAllGeneralTemplate={GetAllGeneralTemplate}
          />
        </div>
      ) : swich === 'Edit' ? (
        <EditGenTemplate dataEdit={dataEdit} setSwich={setSwich} />
      ) : null}
    </>
  );
}
