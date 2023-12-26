import React from 'react';
import AddMlmCompForm from '../forms/AddMlmCompForm';

interface AddmlmProps {
  loading: true | false;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMlmCompany: React.FC<AddmlmProps> = ({ loading, setLoading }) => {
  return (
    <>
      <AddMlmCompForm setLoading={setLoading} loading={loading} />
    </>
  );
};

export default AddMlmCompany;
