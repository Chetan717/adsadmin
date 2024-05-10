import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ScrollShadow,
  Chip,
} from '@nextui-org/react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import ShowGraphics from './ShowGraphics';
import axios from 'axios';
import EditTemp from './EditTemp';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';

export default function ListOfTemplate({
  selectComp,
  setDataEdit,
  dataEdit,
  setSwich,
  selectTemp,
}) {
  const {
    genTemplateData,
    tempLoading,
    GetAllCompanyTemplate,
    GetAllGeneralTemplate,
    apiId,
    genLimit,
    setGenLimit,
  } = DataSupplier();

  const { isOpen, onOpen, onOpenChange ,onClose} = useDisclosure();
  useEffect(() => {
    GetAllGeneralTemplate(genLimit);
  }, [selectTemp, genLimit]);

  const [pass, setPass] = useState('');
  const handleDelete = (id, pass) => {
    if (pass === '5688') {
      try {
        axios
          .delete(
            `https://${apiId}.execute-api.ap-south-1.amazonaws.com/temp/?TEMP_ID=${id}`,
          )
          .then((res) => {
            setPass("")
          })
          .catch((err) => console.log(err))
          .finally(() => {
            GetAllGeneralTemplate(100);
            setPass("")
          });
      } catch (error) {
        console.log(error, 'error');
        setPass("")
      }
    } else {
    }
  };

  const closeFn = () =>{
    onClose()
    setPass("")
  }
  const hangoEdit = (data, id) => {
    setDataEdit({ data, id });
    setSwich('update');
  };

  const filteredGrp = genTemplateData?.LimitedData?.filter((i) => {
    if (i?.attributeToBeUpdated) {
      return i.attributeToBeUpdated.Type === `${selectTemp}`;
    } else {
      return i?.Type === `${selectTemp}`;
    }
  });

  const handleLoadMore = (genTemplateData) => {
    try {
      setGenLimit(Number(genLimit) + 20);
    } catch (error) {
      console.error(error);
    }
  };
  const customSort = (a, b) => {
    const serialA = a.attributeToBeUpdated
      ? a.attributeToBeUpdated.serial
      : a.serial;
    const serialB = b.attributeToBeUpdated
      ? b.attributeToBeUpdated.serial
      : b.serial;

    // Check if serialA is a number or a string
    const parsedSerialA =
      typeof serialA === 'number' ? serialA : parseInt(serialA);
    // Check if serialB is a number or a string
    const parsedSerialB =
      typeof serialB === 'number' ? serialB : parseInt(serialB);

    return parsedSerialA - parsedSerialB;
  };

  // Sort the data based on the custom sort function
  const sortedData = filteredGrp?.sort(customSort);

  return (
    <>
      <div className="flex flex-col gap-3 justify-start w-full items-start">
        <div className="flex flex-row mt-2 gap-6 justify-start w-full items-start">
          <Chip color="warning" variant="dot">
            Total Genaral Template : {genTemplateData?.TotalCount}
          </Chip>
          <Chip color="warning" variant="dot">
            Total Genaral Template : {genTemplateData?.LimitedData?.length}
          </Chip>
        </div>
        <div className="flex flex-col gap-4 justify-center w-full items-center w-full">
          <Table>
            <TableHeader>
              <TableColumn>Showcase</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Company</TableColumn>
              <TableColumn>Type</TableColumn>
              <TableColumn>Sub Type</TableColumn>
              <TableColumn>Category</TableColumn>
              <TableColumn></TableColumn>
            </TableHeader>
            <TableBody>
              {sortedData?.map((i, index) => {
                const displayData = i.attributeToBeUpdated || i;
                const id = i?.id;

                return (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center  gap-3">
                        <div className="flex h-full  flex-row justify-center items-center gap-2">
                          <p className="bg-black rounded-full text-white p-2">
                            {index + 1}
                          </p>
                          <img
                            src={displayData?.ShowCase}
                            className="w-15 h-15"
                            alt="Brand"
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <p
                          className={
                            displayData?.Launched === true
                              ? `text-[#008000] font-semibold`
                              : `text-[#ff0000] font-semibold`
                          }
                        >
                          {displayData?.Launched === true ? `Show` : `Hide`}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <p className="hidden text-black text-xs font-semibold sm:block">
                          {displayData?.Company}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <p className="text-black dark:text-white">
                          {displayData?.Type}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <p className="text-meta-3">{displayData?.SubType}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="hidden items-center justify-center sm:flex">
                        <p className="text-black dark:text-white">
                          {displayData?.APPTYPE}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                   
                      <div className="hidden items-center flex flex-row gap-2 justify-center sm:flex">
                        <Button size={`sm`} onPress={onOpen}>
                          Delete
                        </Button>
                        <Modal
                          isOpen={isOpen}
                          onOpenChange={onOpenChange}
                          isDismissable={false}
                          isKeyboardDismissDisabled={true}
                        >
                          <ModalContent>
                            {(onClose) => (
                              <>
                                <ModalHeader className="flex flex-col gap-1">
                                  Enter Password & Delete
                                </ModalHeader>
                                <ModalBody>
                                  <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-black">
                                      Enter Password & Delete
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Password"
                                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                      value={pass}
                                      onChange={(e) => setPass(e.target.value)}
                                    />
                                  </div>
                                </ModalBody>
                                <ModalFooter>
                                  <Button
                                    color="danger"
                                    variant="light"
                                    onPress={closeFn}
                                  >
                                    Close
                                  </Button>
                                  {pass === '5688' ? (
                                    <Button
                                      color="primary"
                                      onPress={() => handleDelete(id, pass)}
                                    >
                                      Confirm Delete
                                    </Button>
                                  ) : null}
                                </ModalFooter>
                              </>
                            )}
                          </ModalContent>
                        </Modal>
                        <Button
                          size="sm"
                          onClick={() => hangoEdit(displayData, id)}
                          className="bg-black dark:bg-white dark:text-black text-white text-xs"
                        >
                          edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {tempLoading === true ? (
            <Button
              isLoading={true}
              size={`md`}
              className="bg-black text-white font-semibold"
            >
              Wait...
            </Button>
          ) : (
            <Button
              onPress={() => handleLoadMore(genTemplateData)}
              size={`md`}
              className="bg-black text-white font-semibold"
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
