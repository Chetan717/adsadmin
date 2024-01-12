import React, { useEffect, useState } from 'react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';

import axios from 'axios';

const ListOfMlmUsers: React.FC<AddmlmProps> = () => {
  const { GetAllCompany, apiId, API_KEY, mlmUser, setMlmUser } = DataSupplier();

  const [loading, setLoading] = useState(false);
  const [userLimit, setUserLimit] = useState(20);

  useEffect(() => {
    GetAllMlmUsers(apiId, API_KEY, userLimit);
  }, [userLimit]);

  const GetAllMlmUsers = (apiId: any, API_KEY: any, userLimit: any) => {
    try {
      setLoading(true);
      axios
        .get(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/mlmUser?API_KEY=${API_KEY}&limit=${Number(
            userLimit,
          )}`,
        )
        .then((res) => setMlmUser(res?.data))
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);

          console.log('done');
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  console.log(mlmUser);

  const HandleDelete = async (id: any, userLimit: Number) => {
    setLoading(true);
    try {
      axios
        .delete(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/mlmUser?MLM_USER_ID=${id}`,
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log('done');
          GetAllMlmUsers(apiId, API_KEY, userLimit);
          setLoading(false);
        });
    } catch (error) {}
  };

  const totalData = mlmUser?.TotalCount;

  const HandleLoadMore = (
    totalData: any,
    setUserLimit: any,
    userLimit: any,
  ) => {
    try {
      if (totalData > userLimit) {
        setUserLimit(userLimit + 10);
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="flex flex-col gap-4   justify-between items-center ">
        <div className="grid grid-cols-5 fixed bg-black  border border-black rounded-lg w-3/4 ">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="hidden text-white sm:block">MLM User Name</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-white">Email Id</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-white">Designation Of User</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-white">Company Of User</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-white">Delete User</p>
          </div>
        </div>
        <div className="flex flex-col mt-20  justify-start items-start gap-6">
          {mlmUser?.LimitedData?.map((i: any, index: number) => {
            const displayData = i.attributeToBeUpdated || i;
            const id = i?.id;
            return (
              <div
                key={index}
                className="grid grid-cols-5 border border-black rounded-lg"
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="hidden text-black text-sm font-semibold dark:text-white sm:block">
                    {displayData?.UserName}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black underline dark:text-white">
                    {displayData?.emailId}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{displayData?.service}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">
                    {displayData?.Company?.CompName}
                  </p>
                </div>

                <div className="hidden items-center flex flex-row gap-2 justify-center p-2.5 sm:flex xl:p-5">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant={`light`} color="danger">
                        Delete
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Action event example">
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onPress={() => HandleDelete(id, userLimit)}
                      >
                        Confirm Delete User
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
            onPress={() => HandleLoadMore(totalData, setUserLimit, userLimit)}
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
export default ListOfMlmUsers;
