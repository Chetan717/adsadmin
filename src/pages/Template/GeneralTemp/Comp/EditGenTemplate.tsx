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
import { DataSupplier } from '../../../../DataContaxt/FetchData';
import GenarlMultipleGraphics from './GenarlMultipleGraphics';
export default function EditGenTemplate({ dataEdit, setSwich }) {
  const [loading, setLoading] = useState(false);
  const { apiId, GetAllGeneralTemplate } = DataSupplier();

  interface FormData {
    id: number;
    url: string;
    suggestionImage: string;

    position: 'left' | 'right';

    active: boolean;
  }
  const [selType, setSelType] = useState('');
  const [showcase, setShowcase] = useState('');
  const [selSubType, setSelSubType] = useState('');
  const [date, setDate] = useState('');

  const [formData, setFormData] = useState<FormData[]>([]);

  useEffect(() => {
    setFormData(dataEdit?.data?.GraphicsLink);
    setSelType(dataEdit?.data.Type);
    setSelSubType(dataEdit?.data.SubType);
    setShowcase(dataEdit?.data.ShowCase);
    setDate(dataEdit?.data?.Date);
  }, [dataEdit]);

  const DataOfTemplate = {
    Type: selType,
    SubType: selSubType,
    ShowCase: showcase,
    APPTYPE: 'Genaral',
    Date: date,
    GraphicsLink: formData,
    Active: true,
    Launched: true,
  };

  const handleSaveCompany = (id: any) => {
    if (!selType || !selSubType || !showcase) {
      console.log('Please fill in all required fields.');
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
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
          .finally(() => {
            setTimeout(() => {
              setLoading(false);
              GetAllGeneralTemplate('Genaral');
            }, 1000);
          });
      } catch (error) {
        console.log(error, 'error');
      }
    }, 1000);
  };
  return (
    <>
      <p
        onClick={() => setSwich('Home')}
        className="text-sm hover:text-primary text-start cursor-pointer font-bold text-black dark:text-white"
      >
        {`<`} Back To List Of Templates
      </p>

      <div className="flex flex-col w-full mt-5  gap-2 justify-center items-center">
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

              <option value="Festival">Festival</option>
              <option value="Quate-Banner">Quate-Banner</option>
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
          {selType === 'Festival' ? (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-black">
                Date Of Festival
              </label>
              <input
                type="date"
                placeholder="Date"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          ) : null}
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
        <div className="flex w-full flex-col gap-2  justify-start items-start">
          <label className="mb-3 text-lg block text-black text-start relative  font-semibold dark:text-white">
            Add Template And Their Graphics
          </label>
          <div className="flex flex-row gap-1 justify-center w-full items-center">
            <GenarlMultipleGraphics
              formData={formData}
              selSubType={selSubType}
              setFormData={setFormData}
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
            onPress={() => handleSaveCompany(dataEdit?.id)}
            size="lg"
          >
            Update Template
          </Button>
        )}
      </div>
    </>
  );
}
