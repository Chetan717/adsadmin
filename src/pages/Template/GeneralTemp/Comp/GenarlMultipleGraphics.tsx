import React, { useState } from 'react';
import { Button, ScrollShadow } from '@nextui-org/react';

import { Image } from '@nextui-org/react';
interface FormData {
  id: any;
  url: string;
  suggestionImage: string;
  incmNameId: string;
  position: 'left' | 'right';

  active: boolean;
}

interface propGraphic {
  formData: FormData[];
  setFormData: React.Dispatch<React.SetStateAction<FormData[]>>;
  bannerIdOptions: any[];
  incmNameId: any[];
  error: string | null;
  selSubType: string | null;
  selType: string | null;
}

const GenarlMultipleGraphics: React.FC<propGraphic> = ({
  formData,
  setFormData,
  selType,
}) => {
  const handleInputChange = (
    index: number,
    field: keyof FormData,
    value: string | number,
  ) => {
    setFormData((prevData: FormData[]) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [field]: value,
      };
      return newData;
    });
  };

  const handleDelete = (index: number) => {
    setFormData((prevData: FormData[]) =>
      prevData.filter((_, i) => i !== index),
    );
  };

  const handleAdd = () => {
    setFormData((prevData: FormData[]) => [
      ...prevData,
      {
        id: new Date(),
        url: '',
        suggestionImage: '',
        incmNameId: '',
        position: 'left',
        active: false,
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-3 w-full justify-start items-start">
      {formData?.map((entry, index) => (
        <div
          key={index}
          className="flex flex-row w-full justify-center items-center gap-3"
        >
          <label className="bg-black text-white font-semibold p-2 rounded-full">
            {index + 1}
          </label>

          <div className="flex w-full justify-center items-center  flex-row border  rounded-lg border-black p-2 gap-3">
            <div className="grid grid-cols-2 gap-3 w-3/4 mt-5 justify-center items-center">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-black">
                  Suggetion Image Url
                </label>
                <textarea
                  rows={3}
                  placeholder="Suggetion Image Url"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={entry.suggestionImage}
                  onChange={(e) =>
                    handleInputChange(index, 'suggestionImage', e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-black">
                  Background Image Url
                </label>
                <textarea
                  rows={3}
                  placeholder="Background Image Url"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={entry.url}
                  onChange={(e) =>
                    handleInputChange(index, 'url', e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-black">
                  Footer Banner Image
                </label>
                <textarea
                  rows={3}
                  placeholder="Footer Banner Image "
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={entry.incmNameId}
                  onChange={(e) =>
                    handleInputChange(index, 'incmNameId', e.target.value)
                  }
                />
              </div>

              {selType === 'Festival' ? null : (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-black">
                    Image Placement
                  </label>
                  <select
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={entry.position}
                    onChange={(e) =>
                      handleInputChange(index, 'position', e.target.value)
                    }
                  >
                    {/* Options for position */}
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              )}

              <Button
                size="sm"
                className=" bg-danger w-[100px] text-white font-semibold"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </div>

            <div className="flex flex-col  w-1/3  border border-black p-2 rounded-lg ">
              <div className="flex flex-col w-full gap-1 justify-center items-center">
                <Image src={entry?.suggestionImage} className="w-[200px] " />
                <p className="text-xs font-semibold text-black">
                  Suggetion Image
                </p>
              </div>
              <div className="flex  w-full  gap-3 rounded-lg p-2 grid grid-cols-2 justify-center items-center   ">
                <div className="flex flex-col w-full gap-1 justify-center items-center">
                  <Image src={entry?.url} className="w-[120px] " />
                  <p className="text-xs font-semibold text-black">
                    Background Image
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1 justify-center items-center">
                <Image src={entry?.incmNameId} className="w-[120px] " />
                <p className="text-xs font-semibold text-black">
                  Footer Graphics Image
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        className="bg-black  text-white font-semibold p-2"
        onClick={handleAdd}
      >
        Add Template +
      </Button>
    </div>
  );
};

export default GenarlMultipleGraphics;
