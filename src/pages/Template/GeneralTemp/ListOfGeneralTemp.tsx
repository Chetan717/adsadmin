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
    GetAllGeneralTemplate,
    genTempLoading,
    genTemplateData,
    apiId,
    genLimit,
    setGenLimit,
  } = DataSupplier();
  useEffect(() => {
    GetAllGeneralTemplate(genLimit);
  }, [genLimit]);

  const handleDelete = (id: any, genLimit: any) => {
    try {
      axios
        .delete(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/temp/?TEMP_ID=${id}`,
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          GetAllGeneralTemplate(genLimit);
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const hangoEdit = (data: any, id: any) => {
    setDataEdit({ data, id });
    setSwich('Edit');
  };

  const filteredGrp = genTemplateData?.LimitedData?.filter((i: any) => {
    if (i?.attributeToBeUpdated) {
      // If attributeToBeUpdated exists, filter based on its properties
      return i.attributeToBeUpdated.Type === `${selectTemp}`;
    } else {
      // If attributeToBeUpdated doesn't exist, filter based on GraphicsType
      return i?.Type === `${selectTemp}`;
    }
  });

  const totalData = genTemplateData?.TotalCount;
  const HandleLoadMore = (totalData, setGenLimit, genLimit) => {
    try {
      if (totalData > genLimit) {
        setGenLimit(genLimit + 10);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="flex flex-col gap-5 justify-center w-full items-center">
        <div className="flex flex-col w-full">
          <ScrollShadow
            hideScrollBar
            className="w-full h-full flex flex-col gap-3"
          >
            {genTempLoading === true ? (
              <Spinner />
            ) : (
              filteredGrp?.map((i: any, index: any) => {
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

                    {selectTemp === 'Festival' ? (
                      <div className="flex items-center justify-center p-2.5 xl:p-5">
                        <p className="text-black dark:text-white">
                          {displayData?.Date}
                        </p>
                      </div>
                    ) : null}
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
                        onClick={() => handleDelete(id, genLimit)}
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
              })
            )}
          </ScrollShadow>
        </div>
        {genTempLoading === true ? (
          <Button
            isLoading={true}
            size={`md`}
            className="bg-black text-white font-semibold"
          >
            Wait...
          </Button>
        ) : (
          <Button
            onPress={() => HandleLoadMore(totalData, setGenLimit, genLimit)}
            size={`md`}
            className="bg-black text-white font-semibold"
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
}
