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

const MainPayments: React.FC = () => {
  const { apiId, API_KEY } = DataSupplier();

  const [pay, setPay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payLimit, setPayLimit] = useState(20);

  const originalDate = new Date();

  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getDate()).padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;

  const [dateOfPay, setDateOfPay] = useState(`${currentDate}`);

  console.log(dateOfPay);
  
  useEffect(() => {
    GetAllPay(apiId, API_KEY, payLimit, dateOfPay);
  }, [payLimit, dateOfPay]);

  const GetAllPay = (
    apiId: any,
    API_KEY: any,
    payLimit: any,
    PuchaseDate: any,
  ) => {
    try {
      setLoading(true);
      axios
        .get(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/ByDatePayments?API_KEY=${API_KEY}&limit=${Number(
            payLimit,
          )}&PuchaseDate=${PuchaseDate}`,
        )
        .then((res) => setPay(res?.data))
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);

          console.log('done');
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const totalData = pay?.TotalCount;

  const HandleLoadMore = (totalData: any, setPayLimit: any, payLimit: any) => {
    try {
      if (totalData > payLimit) {
        setPayLimit(payLimit + 10);
      }
    } catch (error) {}
  };

  console.log(pay);

  return (
    <>
      <div className="flex flex-col gap-4  w-full justify-between items-center ">
        <div className="grid grid-cols-5  fixed bg-black  border border-black rounded-lg w-3/4 ">
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-white">Razorpay Payment Id</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-white">Email Id</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-white">Payment Status</p>
          </div>
          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-white">Purchase Date</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-white">Pay Amount</p>
          </div>
        </div>

        <div className="w-1/2  mt-[75px]  border border-black rounded-full">
          <input
            type="date"
            value={dateOfPay}
            onChange={(e) => setDateOfPay(e.target.value)}
            className="w-full  rounded-lg text-xs text-black border-black border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="flex flex-col  w-full  justify-center items-center gap-6">
          {pay?.items?.map((i: any, index: number) => {
            const displayData = i.attributeToBeUpdated || i;
            const id = i?.id;
            return (
              <div
                key={index}
                className="grid grid-cols-5 border w-full border-black rounded-lg"
              >
                <div className="flex items-center justify-center p-2.5 ">
                  <p className="text-danger  text-xs font-bold">
                    {displayData?.OrderId}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black text-sm font-bold underline dark:text-white">
                    {displayData?.emailId}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex ">
                  <p className={`text-black font-title`}>
                    {displayData?.Status}
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex ">
                  <p className={` text-xs text-success font-title`}>
                    {displayData?.PuchaseDate}
                  </p>
                </div>

                <div className="hidden items-center flex flex-row gap-2 justify-center p-2.5 sm:flex ">
                  <p className="text-black font-bold">
                    ₹{displayData?.amount}/-
                  </p>
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
            onPress={() => HandleLoadMore(totalData, setPayLimit, payLimit)}
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
export default MainPayments;
