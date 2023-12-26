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

export default function ShowGraphics({ design }) {
    console.log(design);
    
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <div>
        <Button
          size="sm"
          onClick={onOpen}
          className="bg-black dark:bg-white dark:text-black text-white text-xs"
        >
          View Graphics
        </Button>
      </div>

      <Modal
        size="3xl"
        scrollBehavior={`outside`}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Graphics</ModalHeader>
          <ModalBody>
            {/* <ScrollShadow
              hideScrollBar
              className="w-full justify-center items-center h-full"
            > */}
            <div className="flex grid grid-cols-2 gap-2 ">
              {design?.map((itm: any) => {
                return (
                  <div className="flex border border-black rounded-lg p-2 grid grid-cols-2 justify-center items-center   ">
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <Image
                        src={itm?.suggestionImage}
                        className="w-[150px] h-[150px]"
                      />
                      <p className="text-xs font-semibold text-black">
                        Background
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <Image
                        src={itm?.nameImageUrl}
                        className="w-[150px] h-[150px]"
                      />
                      <p className="text-xs font-semibold text-black">
                        Rank Name
                      </p>
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
                      <p className="text-xs font-semibold text-black">
                        Income Name
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
