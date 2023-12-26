import React from 'react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { Button, ScrollShadow, Spinner, Image } from '@nextui-org/react';
import axios from 'axios';

export default function EditGraphics({ design }) {
  console.log(design);
  return (
    <>
      <div className="flex grid grid-cols-1 gap-2 ">
        {design?.map((itm: any) => {
          return (
            <div className="flex border border-black rounded-lg p-2 grid grid-cols-2 justify-center items-center   ">
              <div className="flex flex-col gap-1 justify-center items-center">
                <Image
                  src={itm?.suggestionImage}
                  className="w-[150px] h-[150px]"
                />
                <p className="text-xs font-semibold text-black">Background</p>
              </div>
              <div className="flex flex-col gap-1 justify-center items-center">
                <Image
                  src={itm?.nameImageUrl}
                  className="w-[150px] h-[150px]"
                />
                <p className="text-xs font-semibold text-black">Rank Name</p>
              </div>
              <div className="flex flex-col gap-1 justify-center items-center">
                <Image
                  src={'itm?.suggestionImage'}
                  className="w-[150px] h-[150px]"
                />
                <p className="text-xs font-semibold text-black">Banner</p>
              </div>
              <div className="flex flex-col gap-1 justify-center items-center">
                <Image src={'itm'} className="w-[150px] h-[150px]" />
                <p className="text-xs font-semibold text-black">Income Name</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
