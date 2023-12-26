import React, { useState } from 'react';
import { ScrollShadow } from '@nextui-org/react';
import ShowGraphics from './ShowGraphics';
import EditGraphics from './EditGraphic';

interface FormData {
  id: number;
  url: string;
  suggestionImage: string;
  nameImageUrl: string;
  bannerId: number;
  position: 'left' | 'right';
  incmNameId: number;
  active: boolean;
}

interface propGraphic {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  bannerIdOptions: any[];
  incmNameIdOptions: any[];
  handleSaveData: () => void;
  error: string | null;
  savedData: FormData[];
}

const GraphicsLinkSingle: React.FC<propGraphic> = ({
  formData,
  setFormData,
  bannerIdOptions,
  incmNameIdOptions,
  handleSaveData,
  error,
  savedData,
}) => {
  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-row gap-3 w-full justify-center items-center">
      <div className=" grid grid-cols-2 gap-3 w-full justify-center items-center">
        {/* Your form input fields */}
        {/* <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-black">ID</label>
          <input
            type="text"
            placeholder="ID"
            disabled
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={formData.id}
            onChange={(e) => handleInputChange('id', parseInt(e.target.value))}
          />
        </div> */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-black">
            Suggetion Image Url
          </label>
          <input
            type="text"
            placeholder="Suggetion Image Url"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={formData.url}
            onChange={(e) => handleInputChange('url', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-black">
            Background Image Url
          </label>
          <input
            type="text"
            placeholder="Background Image Url"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={formData.suggestionImage}
            onChange={(e) =>
              handleInputChange('suggestionImage', e.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-black">
            Name Image Url
          </label>
          <input
            type="text"
            placeholder="Name Image Url"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={formData.nameImageUrl}
            onChange={(e) => handleInputChange('nameImageUrl', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-black">
            Select Banner For Image
          </label>
          <select
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={formData.bannerId}
            onChange={(e) =>
              handleInputChange('bannerId', parseInt(e.target.value))
            }
          >
            {/* Options for bannerId */}
            {bannerIdOptions.map((option) => (
              <option key={option} value={option}>
                Banner {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-black">
            Image Placement
          </label>
          <select
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
          >
            {/* Options for position */}
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-black">
            Income Name Graphic
          </label>
          <select
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={formData.incmNameId}
            onChange={(e) =>
              handleInputChange('incmNameId', parseInt(e.target.value))
            }
          >
            {/* Options for incmNameId */}
            {incmNameIdOptions.map((option) => (
              <option key={option} value={option}>
                Option {option}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <div className="h-5"></div>
          <button
            className="bg-black w-full text-white font-semibold p-2 rounded"
            onClick={handleSaveData}
          >
            Save Data
          </button>
        </div>
      </div>
      {/* {error && <p className="text-danger">{error}</p>} */}
      {/* <ScrollShadow hideScrollBar className="w-[300px] h-[400px]">
        <div className="flex flex-col gap-3 justify-center items-center">
          <EditGraphics design={savedData} />
        </div>
      </ScrollShadow> */}
    </div>
  );
};

export default GraphicsLinkSingle;
