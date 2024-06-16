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
  Image,
} from '@nextui-org/react';
import { DataSupplier } from '../../../DataContaxt/FetchData';

interface EditCompanyProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  companydata: {
    companyName: string;
    logo: string;
    RMBG: string;
    companyAddress: string;
    Active: boolean;
    Launched: boolean;
    designations: Array<{ id: number; value: string }>;
    logos: Array<{ id: number; value: string; Type: string }>;
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

    setLaunchedOption(companyData?.Launched);
  }, [companydata]);

  const [companyData, setCompanyData] = useState(companydata);
  const [launchedOption, setLaunchedOption] = useState(companyData?.Launched);

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
      return;
    }

    setLoading(true);
    try {
      axios
        .put(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/mlm/?MLM_COMP_ID=${id}`,
          {
            companyName: companyData?.companyName,
            logo: companyData?.logo,
            RMBG: companyData?.RMBG,
            companyAddress: companyData?.companyAddress,
            Active: companyData?.Active,
            Launched: launchedOption,
            designations: companyData.designations,
            logos: companyData?.logos,
          },
        )
        .then((res) => console.log(''))
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

  const [activeTab, setActiveTab] = useState(true);

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
                        Remove Background key
                      </label>
                      <input
                        type="text"
                        placeholder="RMBG..."
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={companyData.RMBG}
                        onChange={(e) =>
                          handleInputChange('RMBG', e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex row p-6 gap-2 items-center gap-2">
                        <label>Show:</label>
                        <input
                          type="radio"
                          checked={launchedOption === true}
                          onChange={() => setLaunchedOption(true)}
                        />
                        <label>Hide:</label>
                        <input
                          type="radio"
                          checked={launchedOption === false}
                          onChange={() => setLaunchedOption(false)}
                        />
                      </div>
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
                  <div className="w-3/4">
                    <label className="mb-3 block text-black font-semibold dark:text-white">
                      Company Logo Url
                    </label>
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <textarea
                        placeholder="Logo Url"
                        className="w-3/4 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={companyData.logo}
                        onChange={(e) =>
                          handleInputChange('logo', e.target.value)
                        }
                      />
                      <Image
                        src={`${companyData?.logo}`}
                        className="w-[100px] h-[100px]"
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-4 justify-start items-center">
                    <div className="flex  flex-row gap-5 justify-center items-center">
                      <p
                        onClick={() => setActiveTab(true)}
                        className={
                          activeTab === true
                            ? `bg-black cursor-pointer text-white rounded-lg  font-bold text-sm p-2`
                            : `border border-black  cursor-pointer rounded-lg  text-black font-bold text-sm p-2`
                        }
                      >
                        Add Designations
                      </p>{' '}
                      <p
                        onClick={() => setActiveTab(false)}
                        className={
                          activeTab === false
                            ? `bg-black text-white cursor-pointer rounded-lg  font-bold text-sm p-2`
                            : `border border-  cursor-pointer  rounded-lg text-black font-bold text-sm p-2`
                        }
                      >
                        Add Logos & Topuplines
                      </p>
                    </div>
                    {activeTab === true ? (
                      <div className="flex w-full flex-col justify-start items-center">
                        <label className="mb-3 block text-black font-semibold dark:text-white">
                          Add Company Designations
                        </label>
                        <div className="flex justify-start w-3/4 items-start">
                          <MultiInputForm
                            setInputs={handleDesignationsChange}
                            inputs={companyData.designations}
                            namebtn={`Designations`}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full flex-col justify-start items-center">
                        <label className="mb-3 block text-black font-semibold dark:text-white">
                          Add Logos And Topuplines
                        </label>
                        <div className="flex justify-start w-3/4 items-start">
                          <MultiInputForm
                            setInputs={handleLogosChange}
                            inputs={companyData.logos}
                            namebtn={`Logos`}
                          />
                        </div>
                      </div>
                    )}
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
