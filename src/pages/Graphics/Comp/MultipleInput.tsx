import React from 'react';
import { Button, Image } from '@nextui-org/react';

interface MultiInputFormProps {
  inputs: { id: number; value: string }[];
  setInputs: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        value: string;
      }[]
    >
  >;
}

const MultiGraphicsInputForm: React.FC<MultiInputFormProps> = ({
  inputs,
  setInputs,
}) => {
  const handleChange = (id: number, value: any) => {
    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, value } : input,
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

  const handleDeleteInput = (id: any) => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    setInputs(updatedInputs);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full">
      {inputs.map((input) => (
        <div className="flex flex-row gap-2 w-full" key={input.id}>
          <textarea
            rows={2}
            cols={2}
            className="w-full rounded-lg border-[1px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={input.value}
            onChange={(e) => handleChange(input.id, e.target.value)}
          />

          <Image
            removeWrapper={true}
            src={input.value}
            className="w-[200px] h-[50px]"
          />

          <Button
            color="danger"
            variant="light"
            onPress={() => handleDeleteInput(input.id)}
          >
            Delete
          </Button>
        </div>
      ))}
      <button
        className="flex justify-center w-full rounded bg-[#000000] rounded-lg p-2 font-medium dark:bg-white dark:text-black text-white"
        onClick={handleAddInput}
      >
        {inputs.length === 0 ? `Add Graphics` : `Add +`}
      </button>
    </div>
  );
};

export default MultiGraphicsInputForm;
