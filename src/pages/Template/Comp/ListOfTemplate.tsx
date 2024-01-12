import React, { useEffect } from 'react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import { Button, ScrollShadow, Spinner } from '@nextui-org/react';
import ShowGraphics from './ShowGraphics';
import axios from 'axios';
import EditTemp from './EditTemp';

export default function ListOfTemplate({
  selectComp,
  setDataEdit,
  dataEdit,
  setSwich,
  selectTemp,
}) {
  const {
    templateData,
    tempLoading,
    GetAllCompanyTemplate,
    apiId,
    tempLimit,
    setTempLimit,
  } = DataSupplier();

  useEffect(() => {
    GetAllCompanyTemplate(selectComp);
  }, [selectComp, tempLimit]);

  const handleDelete = (id: any) => {
    try {
      axios
        .delete(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/temp/?TEMP_ID=${id}`,
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

  const hangoEdit = (data: any, id: any) => {
    setDataEdit({ data, id });
    setSwich('update');
  };

  const filteredGrp = templateData?.LimitedData?.Items?.filter((i: any) => {
    if (i?.attributeToBeUpdated) {
      // If attributeToBeUpdated exists, filter based on its properties
      return i.attributeToBeUpdated.Type === `${selectTemp}`;
    } else {
      // If attributeToBeUpdated doesn't exist, filter based on GraphicsType
      return i?.Type === `${selectTemp}`;
    }
  });

  const totalData = templateData?.TotalCount;

  const HandleLoadMore = (totalData, setTempLimit, tempLimit) => {
    try {
      if (totalData > tempLimit) {
        setTempLimit(tempLimit + 10);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="flex flex-col justify-start w-full items-start">
        <div className="flex flex-col gap-4 justify-center w-full items-center w-full">
          {/* <div className="grid grid-cols-3 w-full rounded-xl border rounded-lg  dark:bg-white sm:grid-cols-5">
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
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium text-black dark:text-black uppercase ">
                Action
              </h5>
            </div>
          </div> */}
          <ScrollShadow
            hideScrollBar
            className="w-full h-full flex flex-col gap-3"
          >
            {filteredGrp?.map((i: any, index: any) => {
              const displayData = i.attributeToBeUpdated || i;
              const id = i?.id; // Use attributeToBeUpdated if present, otherwise use the item itself

              return (
                <div
                  key={index}
                  className="grid grid-cols-4 border border-black rounded-lg sm:grid-cols-6"
                >
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <div className="flex-shrink-0">
                      <img
                        src={displayData?.ShowCase}
                        className="w-15 h-15"
                        alt="Brand"
                      />
                    </div>
                    <p className="hidden text-black text-xs font-semibold dark:text-white sm:block">
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

                  <div className="hidden items-center flex flex-row gap-2 justify-center p-2.5 sm:flex xl:p-5">
                    <Button
                      size="sm"
                      onClick={() => handleDelete(id)}
                      className="bg-black dark:bg-white dark:text-black text-white text-xs"
                    >
                      delete
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => hangoEdit(displayData, id)}
                      className="bg-black dark:bg-white dark:text-black text-white text-xs"
                    >
                      edit
                    </Button>
                    {/* <EditTemp Temp={displayData} id={id} /> */}
                  </div>
                </div>
              );
            })}
          </ScrollShadow>
          {tempLoading === true ? (
            <Button
              isLoading={true}
              size={`md`}
              className="bg-black text-white font-semibold"
            >
              Wait...
            </Button>
          ) : (
            <Button
              onPress={() => HandleLoadMore(totalData, setTempLimit, tempLimit)}
              size={`md`}
              className="bg-black text-white font-semibold"
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
