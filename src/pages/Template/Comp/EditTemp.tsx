import React, { useEffect, useState } from 'react';
import { Button, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import GraphicsLinkMultiple from './GrahicsLinkMultiple';
import { DataSupplier } from '../../../DataContaxt/FetchData';

export default function EditTemplate({
  TemplateType,
  Data,
  selectComp,
  setSwich,
}) {
  const [loading, setLoading] = useState(false);
  const { GetAllCompanyTemplate, apiId, tempLimit } = DataSupplier();
  const bannerIdOptions = [1, 3, 4, 5];

  // Options for incmNameId
  const incmNameIdOptions = [1, 3, 4, 5];

  interface FormData {
    id: any;
    url: string;
    suggestionImage: string;
    nameImageUrl: string;
    bannerId: number;
    position: 'left' | 'right';
    incmNameId: number;
    active: boolean;
  }
  const [selType, setSelType] = useState('');
  const [serial, setSerial] = useState(0);

  const [showcase, setShowcase] = useState('');
  const [showcaseFr, setShowcaseFr] = useState('');

  const [selSubType, setSelSubType] = useState('');

  const [formData, setFormData] = useState<FormData[]>([]);

  useEffect(() => {
    setFormData(Data?.data?.GraphicsLink);
    setSelType(Data?.data.Type);
    setSelSubType(Data?.data.SubType);
    setShowcaseFr(Data?.data.ShowCaseForm);
    setShowcase(Data?.data.ShowCase);
    setSerial(Data?.data?.serial);
  }, [Data]);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [savedData, setSavedData] = useState<FormData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!selType || !showcase || !selSubType) {
      setError('All fields are required.');
      return false;
    }
    setError(null);
    return true;
  };

  const DataOfTemplate = {
    Type: selType,
    SubType: selSubType,
    ShowCase: showcase,
    ShowCaseForm: showcaseFr,
    APPTYPE: 'mlm',
    Company: selectComp,
    GraphicsLink: formData,
    Active: true,
    Launched: true,
    serial: serial,
  };

  const handleSaveCompany = (id: any, tempLimit: any) => {
    if (!selType || !selSubType || !showcase) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      try {
        axios
          .put(
            `https://${apiId}.execute-api.ap-south-1.amazonaws.com/temp/?TEMP_ID=${id}`,
            DataOfTemplate,
          )
          .then((res) => {})
          .catch((err) => console.log(err))
          .finally(() => {
            setTimeout(() => {
              GetAllCompanyTemplate(selectComp);
              setLoading(false);
              onClose();
              setSwich('temp');
            }, 1000);
          });
      } catch (error) {}
    }, 1000);
  };
  return (
    <div className="flex flex-col w-full  gap-2 justify-center items-center">
      <div className="grid grid-cols-2 w-full gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-black">
            Select Type
          </label>
          <select
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={selType}
            onChange={(e) => setSelType(e.target.value)}
          >
            {/* Options for bannerId */}
            {TemplateType?.map((option: any) => (
              <option key={option?.value} value={option?.value}>
                {option?.name}
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
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-black">
            Form Showcase Image Url
          </label>
          <input
            type="text"
            placeholder="Form Showcase Image Url"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={showcaseFr}
            onChange={(e) => setShowcaseFr(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-black">
            Serial Number
          </label>
          <select
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={serial}
            onChange={(e: any) => setSerial(e.target.value)}
          >
            {/* Options for position */}
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ]?.map((i, index) => {
              return (
                <option key={index} value={i}>
                  {i}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2  justify-start items-start">
        <label className="mb-3 text-lg block text-black text-start relative  font-semibold dark:text-white">
          Add Template And Their Graphics
        </label>
        <div className="flex flex-row gap-1 justify-center w-full items-center">
          <GraphicsLinkMultiple
            // handleSaveData={handleSaveData}
            error={error}
            formData={formData}
            bannerIdOptions={bannerIdOptions}
            incmNameIdOptions={incmNameIdOptions}
            setFormData={setFormData}
            selSubType={selSubType}
            selType={selType}
          />
        </div>
      </div>
      {loading === true ? (
        <Button
          isLoading={true}
          size="lg"
          className="bg-black text-white font-semibold"
        >
          Wait....
        </Button>
      ) : (
        <Button
          className="bg-black text-white font-semibold"
          onPress={() => handleSaveCompany(Data.id, tempLimit)}
          size="lg"
        >
          Save Template
        </Button>
      )}
    </div>
  );
}
