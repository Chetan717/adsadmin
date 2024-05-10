import React, { useState } from 'react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import { Card, CardHeader, CardBody, Image, Button } from '@nextui-org/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import EditCompany from './Edit';

interface AddmlmProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  compLimit: Number;
  setCompLimit: React.Dispatch<React.SetStateAction<boolean>>;
}

const MLMCompanyList: React.FC<AddmlmProps> = ({ loading, setLoading }) => {
  const { companyData, GetAllCompany, apiId, compLimit, setCompLimit } =
    DataSupplier();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [pass, setPass] = useState('');
  // const HandleDelete = async (id: any, compLimit: Number) => {
  //   setLoading(true);
  //   try {
  //     axios
  //       .delete(
  //         `https://${apiId}.execute-api.ap-south-1.amazonaws.com/mlm/?MLM_COMP_ID=${id}`,
  //       )
  //       .then((res) => {
  //         onClose();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         onClose();
  //       })
  //       .finally(() => {
  //         console.log('done');
  //         GetAllCompany(compLimit);
  //         setLoading(false);
  //         onClose();
  //       });
  //   } catch (error) {
  //     onClose();
  //   }
  // };

  const totalData = companyData?.TotalCount;
  const HandleLoadMore = (totalData, setCompLimit, compLimit) => {
    try {
      // if (totalData > compLimit) {
      setCompLimit(compLimit + 20);
      // }
    } catch (error) {}
  };
  console.log(companyData?.LimitedData?.Items);

  return (
    <>
      <div className="flex flex-col gap-4 w-full justify-center items-center ">
        <div className="flex flex-col gap-2 justify-start w-full items-start  ">
          <h1 className="text-black  text-start dark:text-white font-bold text-sm">
            List Of Companies {`>`}
          </h1>
        </div>
        <div className="grid grid-cols-2 w-full justify-center items-center gap-10">
          {companyData?.LimitedData?.Items?.sort(
            (a, b) => a?.companyName?.localeCompare(b?.companyName),
          )?.map((i: any, index: number) => {
            const displayData = i.attributeToBeUpdated || i;
            const id = i?.id;
            return (
              <Card key={index} className="py-4 cursor-pointer hover:scale-110">
                {/* <CardHeader className="pb-0  flex-col items-start"></CardHeader> */}
                <CardBody
                  // onClick={() => GotoListTemplate('temp', 'Herbar')}
                  className="overflow-visible py-2"
                >
                  <div className="flex flex-row gap-22 justify-start items-start">
                    <div className="flex flex-row justify-center items-start gap-8">
                      <Image width={100} src={displayData?.logo} />
                      <div className="flex flex-col justify-center items-start gap-1">
                        <h4 className="font-bold text-large">
                          {displayData?.companyName}
                        </h4>
                        <small className="text-">
                          {displayData?.companyAddress}
                        </small>
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
                    </div>
                    <div className="flex flex-col gap-2">
                      {/* <Dropdown>
                        <DropdownTrigger>
                          <Button variant={`light`} color="danger">
                            Delete
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Action event example">
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            onClick={() => HandleDelete(id, compLimit)}
                          >
                            Confirm Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown> */}

                      {/* <Button
                        size="sm"
                        className=" bg-danger w-[100px] text-white font-semibold"
                        onPress={onOpen}
                      >
                        Delete
                      </Button> */}
                      {/* 
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
                                  onPress={onClose}
                                >
                                  Close
                                </Button>
                                {pass === '5688' ? (
                                  <Button
                                    color="primary"
                                    onPress={() => HandleDelete(id, compLimit)}
                                  >
                                    Confirm Delete
                                  </Button>
                                ) : null}
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal> */}

                      <EditCompany
                        id={id}
                        companydata={displayData}
                        loading={loading}
                        setLoading={setLoading}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
        {loading === true ? (
          <Button
            isLoading={true}
            size={`md`}
            className="bg-black text-white font-semibold"
          >
            Wait...
          </Button>
        ) : (
          <Button
            onPress={() => HandleLoadMore(totalData, setCompLimit, compLimit)}
            size={`md`}
            className="bg-black text-white font-semibold"
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
};
export default MLMCompanyList;
