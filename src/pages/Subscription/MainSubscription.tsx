import React, { useEffect, useState } from 'react';
import { DataSupplier } from '../../DataContaxt/FetchData';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';

import axios from 'axios';

const MainSubscription: React.FC = () => {
  const { apiId, API_KEY } = DataSupplier();

  const [sub, setSub] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subLimit, setSubLimit] = useState(20);

  const currentDate = new Date();


  useEffect(() => {
    GetAllSubs(apiId, API_KEY, subLimit);
  }, [subLimit]);

  const GetAllSubs = (apiId: any, API_KEY: any, subLimit: any) => {
    try {
      setLoading(true);
      axios
        .get(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/getAllSub?API_KEY=${API_KEY}&limit=${Number(
            subLimit,
          )}`,
        )
        .then((res) => setSub(res?.data))
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);

          console.log('done');
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  // const HandleUpdate = (apiId: any, API_KEY: any, Status: any, id: any) => {
  //   setLoading(true);
  //   try {
  //     axios
  //       .put(
  //         `https://${apiId}.execute-api.ap-south-1.amazonaws.com/UpdatePlans?PLAN_ID=${id}`,
  //       )
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err))
  //       .finally(() => {
  //         setLoading(false);
  //         GetAllPlans(apiId, ApiKey);
  //         onClose();
  //       });
  //   } catch (error) {
  //     console.log(error, 'error');
  //   }
  // };

  const totalData = sub?.TotalCount;

  const HandleLoadMore = (totalData: any, setSubLimit: any, subLimit: any) => {
    try {
      if (totalData > subLimit) {
        setSubLimit(subLimit + 10);
      }
    } catch (error) {}
  };


  return (
    <>
      <div className="flex flex-col gap-12  w-full justify-between items-center ">
        <div className="grid grid-cols-4  fixed bg-black  border border-black rounded-lg w-3/4 ">
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-white">UserName</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-white">Email Id</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-white">Plan Type</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-white">ValideUpto</p>
          </div>
          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-white">PurchaseAt</p>
          </div>
          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-white">duration</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-white">PaymentAmount</p>
          </div>
          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-white">Status</p>
          </div>
        </div>

        <div className="flex flex-col mt-36 w-full  justify-center items-center gap-6">
          {sub?.LimitedData?.map((i: any, index: number) => {
            const displayData = i.attributeToBeUpdated || i;
            const id = i?.id;

            return (
              <div key={index} className="grid grid-cols-4  border border-gray-700 rounded-lg w-full ">
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black text-xl font-bold">
                    {displayData?.UserName}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black  text-sm underline font-bold">
                    {displayData?.emailId}
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black text-sm font-semibold">
                    {displayData?.planType}/--{displayData?.plan}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black text-sm font-semibold">
                    {displayData?.ValideUpto}
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black text-sm font-semibold">
                    {' '}
                    {displayData?.PurchaseAt}
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-danger font-semibold text-sm">
                    {' '}
                    {displayData?.duration}Days
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-success text-sm font-bold">
                    {' '}
                    ₹{displayData?.PaymentAmount /100}/-
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  {/* <p className="text-black "> {displayData?.Expire}</p> */}

                  <Button
                    size="lg"
                    className="shadow-sm"
                    variant={`bordered`}
                    color={displayData?.Expire === false ? `success` : `danger`}
                  >
                    {displayData?.Expire === false ? `Active` : `Expired`}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {loading === true ? (
          <Button
            isLoading={true}
            size={`md`}
            className="bg-black text-white font-semibold"
          >
            Wait...
          </Button>
        ) : (
          <Button
            onPress={() => HandleLoadMore(totalData, setSubLimit, subLimit)}
            size={`md`}
            className="bg-black text-white font-semibold"
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
};
export default MainSubscription;
