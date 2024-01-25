import React from 'react';
import { Button, Image } from '@nextui-org/react';

interface MultiInputFormProps {
  inputs: { id: number; value: string; Type?: string }[];
  setInputs: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        value: string;
        Type?: string;
      }[]
    >
  >;
  namebtn: string;
}

const MultiInputForm: React.FC<MultiInputFormProps> = ({
  inputs,
  setInputs,
  namebtn,
}) => {
  const handleChange = (id: number, value: string, Type: string) => {
    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, value, Type } : input,
    );
    setInputs(updatedInputs);
  };

  const handleAddInput = () => {
    // Check if all previous input fields are filled before adding a new one
    if (inputs.every((input) => input.value.trim() !== '')) {
      const newId = inputs.length + 1;
      setInputs([...inputs, { id: newId, value: '' }]);
    }
  };

  const handleDeleteInput = (id: number) => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    setInputs(updatedInputs);
  };


  return (
    <div className="flex flex-col gap-2 w-full">
      {inputs.map((input) => (
        <div
          className="flex flex-row gap-4 justify-center items-center"
          key={input.id}
        >
          <textarea
            className="w-full rounded-lg text-sm text-black fonr-semibold border-[1px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={input.value}
            onChange={(e) =>
              handleChange(input.id, e.target.value, input.Type || '')
            }
          />
          {namebtn === 'Logos' ? (
            <select
              value={input.Type}
              className="border p-2 border-black rounded-lg "
              onChange={(e) =>
                handleChange(input.id, input.value, e.target.value)
              }
            >
              <option value="logo">Logo</option>
              <option value="TopUpline">TopUpline</option>
              {/* Add other options based on your requirements */}
            </select>
          ) : null}

          <div className="flex flex-col justify-center items-center gap-2">
            {namebtn === 'Logos' ? (
              <Image
                src={`${input?.value}`}
                className="w-[100px]  rounded-lg h-[50px]"
              />
            ) : null}
            <Button
              color="danger"
              size={`sm`}
              variant="light"
              onPress={() => handleDeleteInput(input.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
      <button
        className="flex justify-center rounded bg-[#000000] rounded-lg p-2 font-medium dark:bg-white dark:text-black text-white"
        onClick={handleAddInput}
      >
        {inputs.length === 0 ? `${'Add ' + namebtn}` : 'Add +'}
      </button>
    </div>
  );
};

export default MultiInputForm;
