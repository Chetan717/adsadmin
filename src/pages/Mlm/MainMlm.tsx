import React, { useState } from 'react';
import AddMlmCompany from './Comp/AddMlmCompany';
import MLMCompanyList from './Comp/MLMCompanyList';
import { Spinner } from '@nextui-org/react';

const MainMlm: React.FC = () => {
  const [loading, setLoading] =
    useState<React.Dispatch<React.SetStateAction<boolean>>>(false);
  return (
    <>
      <div className="flex flex-col gap-3 justify-center items-center">
        <AddMlmCompany setLoading={setLoading} loading={loading} />
        {loading === true ? (
          <Spinner />
        ) : (
          <MLMCompanyList loading={loading} setLoading={setLoading} />
        )}
      </div>
    </>
  );
};

export default MainMlm;
