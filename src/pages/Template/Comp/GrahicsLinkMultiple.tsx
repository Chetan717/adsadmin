import React, { useState } from 'react';
import { Button, ScrollShadow } from '@nextui-org/react';
import ShowGraphics from './ShowGraphics';
import EditGraphics from './EditGraphic';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import { Image } from '@nextui-org/react';
interface FormData {
  id: any;
  url: string;
  suggestionImage: string;
  nameImageUrl: string;
  bannerId: string;
  position: 'left' | 'right';
  incmNameId: string;
  active: string;
}

interface propGraphic {
  formData: FormData[];
  setFormData: React.Dispatch<React.SetStateAction<FormData[]>>;
  bannerIdOptions: any[];
  incmNameIdOptions: any[];
  error: string | null;
  selSubType: string | null;
  selType: string | null;
}

const GraphicsLinkSingle: React.FC<propGraphic> = ({
  formData,
  setFormData,
  bannerIdOptions,
  incmNameIdOptions,
  selSubType,
  error,
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
        nameImageUrl: '',
        bannerId: '',
        position: selType === 'Achievements' ? 'right' : 'left',
        incmNameId: '',
        active: 'true',
      },
    ]);
  };
  

  return (
    <div className="flex flex-col gap-3 w-full justify-start items-start">
      {formData?.map((entry, index) => (
        <div
          key={index + 2}
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
              {selType === 'Achievements-B' || selType === 'Achievements' ? (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-black">
                    {selType === 'Achievements-B' || selType === 'Achievements'
                      ? ' Badge/Graphics For Achivement'
                      : `${selType} Graphic`}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Name Image Url"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={entry.nameImageUrl}
                    onChange={(e) =>
                      handleInputChange(index, 'nameImageUrl', e.target.value)
                    }
                  />
                </div>
              ) : null}
              {selType === 'Festival' ||
              selType === 'Quate-Banner' ||
              selType === 'Today_Trending' ||
              selType === 'ThankYou-Banner-B' ||
              selType === 'ThankYou-Banner' ||
              selType === 'Meeting' ? null : (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-black">
                    {selType === 'Achievements' || selType === 'Achievements-B'
                      ? 'Add Frame For Middle Image'
                      : 'Add Badge For Image'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Badge For Image.."
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={entry.bannerId}
                    onChange={(e) =>
                      handleInputChange(index, 'bannerId', e.target.value)
                    }
                  />
                </div>
              )}

              {/* {selType === 'ThankYou-Banner' ||
              selType === 'ThankYou-Banner-B' ? (
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
              ) : null} */}

              {selType === 'Festival' || selType === 'Achievements' ? null : (
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
              {/* {selType === 'Meeting' ? ( */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-black">
                  Status
                </label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={entry.active}
                  onChange={(e) =>
                    handleInputChange(index, 'active', e.target.value)
                  }
                >
                  {/* Options for position */}
                  <option value="true">
                    {selType === 'Meeting' ? 'Host' : 'show'}
                  </option>
                  <option value="false">
                    {selType === 'Meeting' ? 'Without Host' : 'Hide'}
                  </option>
                </select>
              </div>
              {/* ) : null} */}

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
                {selType === 'Achievements-B' || selType === 'Achievements' ? (
                  <div className="flex flex-col w-full gap-1 justify-center items-center">
                    <Image src={entry?.nameImageUrl} className="w-[120px] " />
                    <p className="text-xs font-semibold text-black">
                      {selSubType} Graphics
                    </p>
                  </div>
                ) : null}
                {selType === 'Festival' ||
                selType === 'Quate-Banner' ||
                selType === 'Today_Trending' ||
                selType === 'ThankYou-Banner-B' ||
                selType === 'ThankYou-Banner' ? null : (
                  <div className="flex flex-col gap-1 w-full justify-center items-center">
                    <Image src={entry?.bannerId} className="w-[120px] " />
                    <p className="text-xs font-semibold text-black">
                      {selType === 'Achievements' ||
                      selType === 'Achievements-B'
                        ? 'Frame For Image'
                        : 'Badge For Image'}
                    </p>
                  </div>
                )}

                {/* {selType === 'ThankYou-Banner' ||
                selType === 'ThankYou-Banner-B' ? (
                  <div className="flex flex-col w-full gap-1 justify-center items-center">
                    <Image src={entry?.incmNameId} className="w-[120px] " />
                    <p className="text-xs font-semibold text-black">
                      Footer Graphics Image
                    </p>
                  </div>
                ) : null} */}
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

export default GraphicsLinkSingle;
