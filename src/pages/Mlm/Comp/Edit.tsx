import React, { useState, useEffect } from 'react';
import MultiInputForm from '../CommonForms/OneOrMoreInput';
import axios from 'axios';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { DataSupplier } from '../../../DataContaxt/FetchData';

interface EditCompanyProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  companydata: {
    companyName: string;
    companyAddress: string;
    Active: boolean;
    Launched: boolean;
    designations: Array<{ id: number; value: string }>;
    logos: Array<{ id: number; value: string }>;
  };
  id: any;
}

const EditCompany: React.FC<EditCompanyProps> = ({
  loading,
  setLoading,
  companydata,
  id,
}) => {
  const { GetAllCompany, apiId, compLimit } = DataSupplier();

  // Use useEffect to update the state when companydata changes
  useEffect(() => {
    setCompanyData(companydata);
  }, [companydata]);

  const [companyData, setCompanyData] = useState(companydata);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleInputChange = (field: string, value: string) => {
    setCompanyData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleDesignationsChange = (
    inputs: Array<{ id: number; value: string }>,
  ) => {
    setCompanyData((prevData) => ({
      ...prevData,
      designations: inputs,
    }));
  };
  const handleLogosChange = (inputs: any) => {
    setCompanyData((prevData) => ({
      ...prevData,
      logos: inputs,
    }));
  };

  const handleSaveCompany = (id: any, compLimit: any) => {
    // Check if any required field is empty
    if (!companyData.companyName || !companyData.companyAddress) {
      console.log('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      axios
        .put(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/mlm/?MLM_COMP_ID=${id}`,
          companyData,
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
          GetAllCompany();
          onClose();
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <>
      <Button
        size="sm"
        className="bg-black dark:bg-white text-white font-semibold dark:text-black "
        onPress={onOpen}
      >
        Edit
      </Button>
      <Modal
        size={`3xl`}
        placement={`center`}
        scrollBehavior={`outside`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <div className="grid grid-cols-2 w-3/4 gap-3">
                    <div>
                      <label className="mb-3 block text-black font-semibold dark:text-white">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="companyName..."
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={companyData.companyName}
                        onChange={(e) =>
                          handleInputChange('companyName', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-black font-semibold dark:text-white">
                        Company Address
                      </label>
                      <input
                        type="text"
                        placeholder="Adress.."
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={companyData.companyAddress}
                        onChange={(e) =>
                          handleInputChange('companyAddress', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-row justify-start items-start">
                    <div className="flex w-full flex-col justify-start items-start">
                      <label className="mb-3 block text-black font-semibold dark:text-white">
                        Add Company Designations
                      </label>
                      <div className="flex justify-start w-3/4 items-start">
                        <MultiInputForm
                          setInputs={handleDesignationsChange}
                          inputs={companyData?.designations || []}
                          namebtn={`Designations`}
                        />
                      </div>
                    </div>

                    <div className="flex w-full flex-col justify-start items-start">
                      <label className="mb-3 block text-black font-semibold dark:text-white">
                        Add Company logos & Topupline
                      </label>
                      <div className="flex justify-start w-3/4 items-start">
                        <MultiInputForm
                          setInputs={handleLogosChange}
                          inputs={companyData?.logos || []}
                          namebtn={`Logos`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {loading === true ? (
                  <Button
                    color={`default`}
                    isLoading={true}
                    className="bg-black text-white dark:bg-white dark:text-black"
                  >
                    Wait..
                  </Button>
                ) : (
                  <Button
                    color={`default`}
                    className="bg-black text-white dark:bg-white dark:text-black"
                    onPress={() => handleSaveCompany(id, compLimit)}
                  >
                    Update Company
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCompany;
