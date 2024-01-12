import React from 'react';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { DataSupplier } from '../../DataContaxt/FetchData';
interface list {
  selectComp: string | any;
  setSelectComp: React.Dispatch<React.SetStateAction<string>>;
  swich: string | any;
  setSwich: React.Dispatch<React.SetStateAction<string>>;
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
}
const ListOfCompanies: React.FC<list> = ({
  selectComp,
  swich,
  setSwich,
  setSelectComp,
  setLoad,
  load,
}) => {
  const { companyData, GetAllCompanyTemplate } = DataSupplier();
  const GotoListTemplate = (swich: any, Company: any) => {
    setLoad(true);
    setTimeout(() => {
      setSwich(swich);
      setSelectComp(Company);
      setLoad(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex flex-col gap-3 justify-start items-start ">
        <h1 className="text-black text-center dark:text-white font-bold text-sm">
          List Of Companies {`>`}
        </h1>
        <div className="grid grid-cols-3 justify-center items-center gap-6">
          {companyData?.LimitedData?.map((i: any, index: any) => {
            const displayData = i.attributeToBeUpdated || i;
            return (
              <Card
                key={index}
                className="py-4 cursor-pointer w-[300px] hover:scale-110"
              >
                {/* <CardHeader className="pb-0  flex-col items-start"></CardHeader> */}
                <CardBody
                  onClick={() =>
                    GotoListTemplate('temp', displayData?.companyName)
                  }
                  className="overflow-visible py-2"
                >
                  <h4 className="font-bold text-large">
                    {displayData?.companyName}
                  </h4>
                  <small className="text-">{displayData?.companyAddress}</small>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListOfCompanies;
