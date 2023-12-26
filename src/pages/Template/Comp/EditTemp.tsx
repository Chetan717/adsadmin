import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import GraphicsLinkMultiple from './GrahicsLinkMultiple';
import { DataSupplier } from '../../../DataContaxt/FetchData';

export default function EditTemp({ Temp, id }) {
  const [loading, setLoading] = useState(false);
  console.log(Temp, 'dfhd');

  const { GetAllCompanyTemplate } = DataSupplier();
  const bannerIdOptions = [1, 3, 4, 5];
  const incmNameIdOptions = [1, 3, 4, 5];

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [savedData, setSavedData] = useState<FormData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [selType, setSelType] = useState(Temp.Type || '');
  const [selSubType, setSelSubType] = useState(Temp.SubType || '');
  const [showcase, setShowcase] = useState(Temp.ShowCase || '');

  const initialFormData = {
    id: Temp.id || 1,
    url: '',
    suggestionImage: '',
    nameImageUrl: '',
    bannerId: bannerIdOptions[0],
    position: 'right',
    incmNameId: incmNameIdOptions[0],
    active: true,
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    if (isOpen) {
      setSavedData(Temp.GraphicsLink || []);
      setSelType(Temp.Type || '');
      setSelSubType(Temp.SubType || '');
      setShowcase(Temp.ShowCase || '');
      setFormData(initialFormData);
    }
  }, [isOpen, Temp]);

  const validateForm = (): boolean => {
    const { url, suggestionImage, nameImageUrl } = formData;
    if (!url || !suggestionImage || !nameImageUrl) {
      setError('All fields are required.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSaveData = () => {
    if (!validateForm()) {
      return;
    }
    setSavedData((prevSavedData) => [...prevSavedData, { ...formData }]);
    setFormData({
      ...formData,
      id: formData.id + 1,
      url: '',
      suggestionImage: '',
      nameImageUrl: '',
      bannerId: bannerIdOptions[0],
      position: 'right',
      incmNameId: incmNameIdOptions[0],
      active: true,
    });
  };

  const DataOfTemplate = {
    Type: selType,
    SubType: selSubType,
    ShowCase: showcase,
    APPTYPE: 'mlm',
    Company: Temp?.Company,
    GraphicsLink: savedData,
    Active: true,
    Launched: true,
  };
  console.log(DataOfTemplate);

  const handleSaveCompany = (id: any, company: any) => {
    console.log(id, company, 'yggvgfcf');

    if (!selType || !selSubType || savedData?.length === 0) {
      console.log('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      var ApiKey = 'ADS360KEY';
      axios
        .put(
          `https://q5gogikuke.execute-api.ap-south-1.amazonaws.com/temp/?TEMP_ID=${id}`,
          DataOfTemplate,
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          GetAllCompanyTemplate(company);
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
        size={`sm`}
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
        className="flex justify-end items-end"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full gap-2 justify-center items-center">
                  <div className="grid grid-cols-2 w-full gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-black">
                        Select Type
                      </label>
                      <select
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={formData.bannerId}
                        onChange={(e) => setSelType(parseInt(e.target.value))}
                      >
                        {bannerIdOptions.map((option) => (
                          <option key={option} value={option}>
                            Banner {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-black">
                        Subtype Name
                      </label>
                      <input
                        type="text"
                        placeholder="Subtype name"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={selSubType}
                        onChange={(e) => setSelSubType(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-black">
                        Showcase Image Url
                      </label>
                      <input
                        type="text"
                        placeholder="Showcase Image Url"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={showcase}
                        onChange={(e) => setShowcase(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-col justify-start items-center">
                    <label className="mb-3 text-lg block text-black text-start relative font-semibold dark:text-white">
                      Add Template And Their Graphics
                    </label>
                    <div className="flex justify-center w-full items-center">
                      <GraphicsLinkMultiple
                        handleSaveData={handleSaveData}
                        error={error}
                        formData={formData}
                        bannerIdOptions={bannerIdOptions}
                        incmNameIdOptions={incmNameIdOptions}
                        setFormData={setFormData}
                        savedData={savedData}
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
                  >
                    Wait..
                  </Button>
                ) : (
                  <Button
                    color={`default`}
                    className="bg-black text-white dark:bg-white dark:text-black"
                    onPress={() => handleSaveCompany(id, Temp?.Company)}
                  >
                    Save Template
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
