import React, { useEffect, useState } from 'react';
import MultiInputForm from '../../Mlm/CommonForms/OneOrMoreInput';
import axios from 'axios';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import MultiGraphicsInputForm from './MultipleInput';
interface AddmlmProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  grptype: string[];
  dataAll: {};
  id: any;
}

const EditGraphics: React.FC<AddmlmProps> = ({
  loading,
  setLoading,
  grptype,
  dataAll,
  id,
}) => {
  const { GetAllGraphics,apiId } = DataSupplier();

  const [graphicsData, setGraphicsData] = useState({
    GraphicName: '',
    GraphicsType: '',
    GraphicsLinks: [{ id: 1, value: '' }],
    Active: true,
  });

  useEffect(() => {
    setGraphicsData(dataAll);
  }, [dataAll]);

  console.log(graphicsData,"edit");

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleInputChange = (field: any, value: any) => {
    setGraphicsData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleGrahicsChange = (inputs: any) => {
    setGraphicsData((prevData) => ({
      ...prevData,
      GraphicsLinks: inputs,
    }));
  };

  const handleSaveGraphics = (id: any) => {
    // Check if any required field is empty
    if (!graphicsData.GraphicName || !graphicsData.GraphicsType) {
      console.log('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      axios
        .put(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/Grp/?ID=${id}`,
          graphicsData,
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
            GetAllGraphics();
            setGraphicsData({
              GraphicName: '',
              GraphicsType: '',
              GraphicsLinks: [{ id: 1, value: '' }],
              Active: true,
            });
            onClose();
          }, 1500);
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
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <div className="grid grid-cols-2 w-3/4 gap-3">
                    <div>
                      <label className="mb-3 block text-black font-semibold dark:text-white">
                        Graphic Name
                      </label>
                      <input
                        type="text"
                        placeholder="GraphicName..."
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={graphicsData.GraphicName}
                        onChange={(e) =>
                          handleInputChange('GraphicName', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-black font-semibold dark:text-white">
                        Graphic Type
                      </label>
                      {/* <input
                        type="text"   
                      /> */}
                      <select
                        onChange={(e) =>
                          handleInputChange('GraphicsType', e.target.value)
                        }
                        placeholder="Graphics type"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={graphicsData.GraphicsType}
                      >
                        <option>Select Type</option>
                        {grptype?.map((i) => {
                          return (
                            <>
                              <option value={i}>{i}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="flex w-full flex-col justify-start items-center">
                    <label className="mb-3 block text-black font-semibold dark:text-white">
                      Add Graphics Links
                    </label>
                    <div className="flex justify-start w-3/4 items-start">
                      <MultiGraphicsInputForm
                        setInputs={handleGrahicsChange}
                        inputs={graphicsData.GraphicsLinks}
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
                    onPress={handleSaveGraphics}
                  >
                    Wait..
                  </Button>
                ) : (
                  <Button
                    color={`default`}
                    className="bg-black text-white dark:bg-white dark:text-black"
                    onPress={() => handleSaveGraphics(id)}
                  >
                    Save Graphics
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditGraphics;
