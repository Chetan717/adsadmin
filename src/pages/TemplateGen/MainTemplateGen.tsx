import React, { useEffect, useState } from 'react';
import AddTemplate from './Comp/AddTemplate';
import Filters from './Filters/Filters';
import GraphicsLinkSingle from './Comp/GrahicsLinkMultiple';
import ListOfCompanies from './ListOfCompanies';
import { Spinner, Button } from '@nextui-org/react';
import ListOfTemplate from './Comp/ListOfTemplate';
import { DataSupplier } from '../../DataContaxt/FetchData';
import EditTemplate from './Comp/EditTemp';

export default function MainTemplateGen() {
  const TemplateType = [
    { name: 'Festival', value: 'Festival' },
    { name: 'Good Morning', value: 'Good-Morning' },
    { name: 'Greeting & Wishes', value: 'Greeting-Wishes' },
    { name: 'Leader Quates', value: 'Leader Quates' },
    { name: 'Devotional & Spiritual', value: 'Devotional & Spiritual' },
    { name: 'Health Tips', value: 'Health-Tips' },
    { name: 'Today Trending', value: 'Today_TrendingGen' },
    { name: 'Motivational Banner', value: 'Quate-Banner' },
    { name: 'Welcome-Banner', value: 'Welcome-Banner' },
    { name: 'Closing-Banner', value: 'Closing-Banner' },
    // { name: 'Rank-Promotion', value: 'Rank-Promotion' },
    // { name: 'Rank-PromotionB', value: 'Rank-PromotionB' },
    { name: 'Achievements', value: 'Achievements' },
    { name: 'Achievements-B', value: 'Achievements-B' },
    // { name: 'Capping', value: 'Capping' },
    { name: 'Bonanza Promotion', value: 'BonPromotion-Banner' },
    { name: 'Aniversary/Birthday', value: 'Wish-Banner' },
    { name: 'ThankYou Message', value: 'ThankYou-Banner' },
    // { name: 'ThankYou Message-B', value: 'ThankYou-Banner-B' },
    { name: 'Income-Banner', value: 'Income-Banner' },
    // { name: 'Meeting', value: 'Meeting' },
    // { name: 'Product', value: 'Product' },
  ];
  const { GetAllCompanyTemplate } = DataSupplier();
  const [selectComp, setSelectComp] = useState('');
  const [selectTemp, setSelectTemp] = useState(TemplateType[0]?.value);
  const [swich, setSwich] = useState('temp');
  const [dataEdit, setDataEdit] = useState({});
  const [load, setLoad] = useState(false);
  const [loadGr, setLoadGr] = useState(false);

  // useEffect(() => {
  //   GetAllCompanyTemplate(`${selectComp}`);
  // }, [selectComp]);

  const SwitchToedit = () => {
    setLoad(true);
    setTimeout(() => {
      setSwich('add');
      setLoad(false);
    }, 1500);
  };
  return (
    <>
      {load === true ? (
        <Spinner />
      ) : swich === 'temp' ? (
        <>
          <p
            onClick={() => setSwich('temp')}
            className="text-sm hover:text-primary cursor-pointer font-bold text-black dark:text-white"
          >
            {`<`} Back To List Of Companies
          </p>
          <p className="text-xl font-semibold text-black">{selectComp}</p>
          <div className="flex flex-col gap-2  h-full p-1 rounded-lg">
            <div className="flex flex-row gap-3 justify-start items-center">
              <Filters
                setSelectTemp={setSelectTemp}
                selectTemp={selectTemp}
                TemplateType={TemplateType}
              />
              <div className="flex flex-col gap-2">
                <div className="h-4"></div>
                <Button
                  size={`lg`}
                  className="bg-black dark:bg-white text-white font-semibold dark:text-black "
                  onPress={SwitchToedit}
                >
                  Add Template +
                </Button>
              </div>
            </div>
            <div className="flex flex-row gap-1 justify-center items-start">
              <div className="flex flex-row gap-3 rounded-lg h-full w-full justify-start items-center">
                <ListOfTemplate
                  selectComp={selectComp}
                  TemplateType={TemplateType}
                  setSwich={setSwich}
                  setDataEdit={setDataEdit}
                  dataEdit={dataEdit}
                  selectTemp={selectTemp}
                />
              </div>
            </div>
          </div>
        </>
      ) : swich === 'add' ? (
        <div className="w-full flex flex-col gap-2">
          <p
            onClick={() => setSwich('temp')}
            className="text-sm hover:text-primary cursor-pointer font-bold text-black dark:text-white"
          >
            {`<`} Back To List Of Templates
          </p>
          <AddTemplate
            selectComp={selectComp}
            TemplateType={TemplateType}
            setSwich={setSwich}
            setSelectTemp={setSelectTemp}
          />
        </div>
      ) : swich === 'update' ? (
        <div className="w-full flex flex-col gap-2">
          <p
            onClick={() => setSwich('temp')}
            className="text-sm hover:text-primary cursor-pointer font-bold text-black dark:text-white"
          >
            {`<`} Back To List Of Templates
          </p>
          <EditTemplate
            Data={dataEdit}
            TemplateType={TemplateType}
            selectComp={selectComp}
            setSwich={setSwich}
          />
        </div>
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
