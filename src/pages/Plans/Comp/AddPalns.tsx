import React, { useState } from 'react';
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
interface AddmlmProps {
  GetAllPlans: () => void;
}

const AddPalns: React.FC<AddmlmProps> = ({ GetAllPlans }) => {
  const [planData, setPlanData] = useState({
    PlanName: '',
    PlanAmount: '',
    Launch: true,
    download: '',
    img: '',
    Description: '',
    Days: '',
    Type: '',
  });
  const [loading, setLoading] = useState(false);

  const { apiId } = DataSupplier();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleInputChange = (field: any, value: any) => {
    setPlanData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSaveCompany = (apiId: any, planData: any) => {
    // Check if any required field is empty
    if (
      !planData.download ||
      !planData.Description ||
      !planData.PlanAmount ||
      !planData.PlanName ||
      !planData.Type ||
      !planData.img
    ) {
      return;
    }

    setLoading(true);
    try {
      var ApiKey = 'ADS360KEY';
      axios
        .put(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/AddPlans?API_KEY=${ApiKey}`,
          planData,
        )
        .then((res) => console.log(""))
        .catch((err) => console.log(err))
        .finally(() => {
          GetAllPlans(apiId, ApiKey);
          setLoading(false);
          onClose();
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <>
      <Button
        className="bg-black dark:bg-white text-white font-semibold dark:text-black "
        onPress={onOpen}
      >
        Add Plans +
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
                        Plan Name
                      </label>
                      <input
                        type="text"
                        placeholder="Plan Name"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={planData.PlanName}
                        onChange={(e) =>
                          handleInputChange('PlanName', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-black font-semibold dark:text-white">
                        Plan Amount
                      </label>
                      <input
                        type="text"
                        placeholder="Plan Amount."
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={planData.PlanAmount}
                        onChange={(e) =>
                          handleInputChange('PlanAmount', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-black font-semibold dark:text-white">
                        Downloads
                      </label>
                      <input
                        type="number"
                        placeholder="No of Downloads"
                        maxLength={4}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={planData.download}
                        onChange={(e) =>
                          handleInputChange('download', e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[16px] font-semibold text-black">
                        Select Launch
                      </label>
                      <select
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={planData?.Launch}
                        onChange={(e) =>
                          handleInputChange('Launch', e.target.value)
                        }
                      >
                        {/* Options for bannerId */}
                        {[
                          { name: 'Launched', value: true },
                          { name: 'UnLuanched', value: false },
                        ]?.map((option: any) => (
                          <option
                            key={option.value + option.name}
                            value={option.value}
                          >
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[16px] font-semibold text-black">
                        Select Plan For
                      </label>
                      <select
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={planData?.Type}
                        onChange={(e) =>
                          handleInputChange('Type', e.target.value)
                        }
                      >
                        {/* Options for bannerId */}
                        {[
                          { name: 'Basic', value: 'Basic' },
                          { name: 'Pro', value: 'Pro' },

                          { name: 'Standard', value: 'Standard' },

                          { name: 'Annual Plan', value: 'Annual Plan' },
                        ]?.map((option: any) => (
                          <option
                            key={option.value + option.name}
                            value={option.name}
                          >
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[16px] font-semibold text-black">
                        Select Duration
                      </label>
                      <select
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={planData?.Days}
                        onChange={(e) =>
                          handleInputChange('Days', e.target.value)
                        }
                      >
                        {[
                          { name: '1 Month', value: 30 },
                          { name: '3 Month', value: 91 },
                          { name: '6 Month', value: 182 },
                          { name: '1 Year', value: 365 },
                          { name: '2 Year', value: 730 },
                          { name: '3 Year', value: 1095 },
                        ]?.map((option: any) => (
                          <option
                            key={option.value + option.name}
                            value={option.value}
                          >
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="">
                      <label className="mb-3 block text-black font-semibold dark:text-white">
                        Plan Image Url
                      </label>
                      <textarea
                        rows={8}
                        placeholder="Plan Image"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={planData?.img}
                        onChange={(e) =>
                          handleInputChange('img', e.target.value)
                        }
                      />
                    </div>
                    <div className="">
                      <label className="mb-3 block text-black font-semibold dark:text-white">
                        Plan Description/Info
                      </label>
                      <textarea
                        rows={8}
                        placeholder="Plan Description"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={planData?.Description}
                        onChange={(e) =>
                          handleInputChange('Description', e.target.value)
                        }
                      />
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
                    // onPress={handleSaveCompany}
                  >
                    Wait..
                  </Button>
                ) : (
                  <Button
                    color={`default`}
                    className="bg-black text-white dark:bg-white dark:text-black"
                    onPress={() => handleSaveCompany(apiId, planData)}
                  >
                    Save Plan
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
export default AddPalns;
