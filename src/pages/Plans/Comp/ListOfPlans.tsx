import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import axios from 'axios';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import EditPlans from './EditPans';
export default function ListOfPlans({
  setLoading,
  loading,
  plans,
  GetAllPlans,
}) {
  const { apiId, API_KEY } = DataSupplier();

  const HandleDelete = async (id: any, apiId: any, API_KEY: any) => {
    setLoading(true);
    try {
      setTimeout(() => {
        axios
          .delete(
            `https://${apiId}.execute-api.ap-south-1.amazonaws.com/DeletePlans?PLAN_ID=${id}&API_KEY=${API_KEY}`,
          )
          .then((res) => {
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            GetAllPlans(apiId, API_KEY);
            setLoading(false);
          });
      }, 1000);
    } catch (error) {}
  };

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-4">
        <div className="grid grid-cols-3 justify-center items-center gap-4">
          {plans?.LimitedData?.map((itm) => {
            const displayData = itm?.attributeToBeUpdated || itm;
            return (
              <Card className="py-4 w-[300px]">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-medium uppercase font-bold">
                    {displayData?.PlanName}
                  </p>

                  <h4 className="font-bold text-large">
                    ₹,{displayData?.PlanAmount}
                  </h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2 flex flex-col gap-4">
                  <small className="text-default-500">
                    {displayData?.Description}
                  </small>

                  <div className="flex flex-row gap-2">
                    <small className="text-black text-tiny">
                      No Of Downloads :{' '}
                    </small>
                    <h4 className="font-bold text-tiny">
                      {' '}
                      {displayData?.download}
                    </h4>
                  </div>
                  <div className="flex flex-row gap-2">
                    <small className="text-black text-tiny">Plan For : </small>
                    <h5 className="font-bold text-tiny">
                      {' '}
                      {displayData?.Type}{' '}
                    </h5>
                  </div>
                  <div className="flex flex-row justify-end items-end gap-2">
                    <EditPlans
                      GetAllPlans={GetAllPlans}
                      DataOfPlan={displayData}
                      id={itm?.id}
                    />
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          isLoading={loading}
                          size="sm"
                          variant={`light`}
                          color="danger"
                        >
                          Delete
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Action event example">
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          onPress={() => HandleDelete(itm?.id, apiId, API_KEY)}
                        >
                          Confirm Delete Plan
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
