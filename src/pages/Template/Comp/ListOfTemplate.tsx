import React from 'react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import { Button, ScrollShadow, Spinner } from '@nextui-org/react';
import ShowGraphics from './ShowGraphics';
import axios from 'axios';
import EditTemp from './EditTemp';

export default function ListOfTemplate({ selectComp }) {
  const { templateData, tempLoading, GetAllCompanyTemplate } = DataSupplier();

  const handleDelete = (id: any) => {
    try {
      axios
        .delete(
          `https://q5gogikuke.execute-api.ap-south-1.amazonaws.com/temp/?TEMP_ID=${id}`,
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          GetAllCompanyTemplate(selectComp);
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <>
      <div className="flex flex-col justify-start w-full items-start">
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-3 w-full rounded-xl border rounded-lg  dark:bg-white sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium text-black dark:text-black uppercase ">
                Company
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium text-black dark:text-black uppercase ">
                Type
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium text-black dark:text-black uppercase ">
                Sub Type
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium text-black dark:text-black uppercase ">
                Category
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5"></div>
          </div>
          <ScrollShadow hideScrollBar className="w-full h-[400px]">
            {tempLoading === true ? (
              <Spinner />
            ) : (
              templateData?.map((i: any, index: any) => {
                const displayData = i.attributeToBeUpdated || i;
                const id = i?.id; // Use attributeToBeUpdated if present, otherwise use the item itself

                return (
                  <div key={index} className="grid grid-cols-4 sm:grid-cols-6">
                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                      <div className="flex-shrink-0">
                        <img
                          src={displayData?.ShowCase}
                          className="w-15 h-15"
                          alt="Brand"
                        />
                      </div>
                      <p className="hidden text-black dark:text-white sm:block">
                        {displayData?.Company}
                      </p>
                    </div>

                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="text-black dark:text-white">
                        {displayData?.Type}
                      </p>
                    </div>

                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="text-meta-3">{displayData?.SubType}</p>
                    </div>

                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="text-black dark:text-white">
                        {displayData?.APPTYPE}
                      </p>
                    </div>

                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <ShowGraphics design={displayData?.GraphicsLink} />
                    </div>
                    <div className="hidden items-center flex flex-row gap-2 justify-center p-2.5 sm:flex xl:p-5">
                      <Button
                        size="sm"
                        onClick={() => handleDelete(id)}
                        className="bg-black dark:bg-white dark:text-black text-white text-xs"
                      >
                        delete
                      </Button>
                      {/* <EditTemp Temp={displayData} id={id} /> */}
                    </div>
                  </div>
                );
              })
            )}
          </ScrollShadow>
        </div>
      </div>
    </>
  );
}
