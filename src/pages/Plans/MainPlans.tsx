import React, { useState,useEffect } from 'react';
import AddPalns from './Comp/AddPalns';
import ListOfPlans from './Comp/ListOfPlans';
import axios from 'axios';
import { Spinner } from '@nextui-org/react';
import { DataSupplier } from '../../DataContaxt/FetchData';
export default function MainPlans() {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const { apiId, API_KEY } = DataSupplier();

  useEffect(() => {
    GetAllPlans(apiId, API_KEY);
  }, []);

  const GetAllPlans = (apiId: any, API_KEY: any) => {
    try {
      setLoading(true);
      axios
        .get(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/AllPlans?API_KEY=${API_KEY}`,
        )
        .then((res) => setPlans(res?.data))
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 justify-center items-center">
        <AddPalns loading={loading} GetAllPlans={GetAllPlans} />
        {loading === true ? (
          <Spinner />
        ) : (
          <ListOfPlans
            loading={loading}
            setLoading={setLoading}
            plans={plans}
            GetAllPlans={GetAllPlans}
          />
        )}
      </div>
    </>
  );
}
