import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from '@nextui-org/react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import EditTemp from './EditTemp';
import { useDisclosure } from '@nextui-org/react';

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
    GetAllGeneralTemplate,
    apiId,
    genLimit,
    setGenLimit,
  } = DataSupplier();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  useEffect(() => {
    GetAllGeneralTemplate(200);
  }, [selectTemp, genLimit]);

  const [pass, setPass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const closeFn = () => {
    onClose();
    setPass('');
  };

  const hangoEdit = (data, id) => {
    setDataEdit({ data, id });
    setSwich('update');
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  console.log(selectedDate, selectTemp);

  const filteredGrp =
    selectTemp === 'Festival'
      ? genTemplateData?.LimitedData?.filter((i) => {
          const itemDate = i.Date || i.attributeToBeUpdated?.Date;
          const dateCondition = selectedDate ? itemDate === selectedDate : true;
          if (i?.attributeToBeUpdated) {
            return (
              i.attributeToBeUpdated.Type === `${selectTemp}` && dateCondition
            );
          } else {
            return i?.Type === `${selectTemp}` && dateCondition;
          }
        })
      : genTemplateData?.LimitedData?.filter((i) => {
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
      ? a.attributeToBeUpdated?.serial
      : a?.serial;
    const serialB = b.attributeToBeUpdated
      ? b.attributeToBeUpdated?.serial
      : b?.serial;

    const parsedSerialA =
      typeof serialA === 'number' ? serialA : parseInt(serialA);
    const parsedSerialB =
      typeof serialB === 'number' ? serialB : parseInt(serialB);

    return parsedSerialA - parsedSerialB;
  };

  const sortedData = filteredGrp?.sort(customSort);

  return (
    <>
      <div className="flex flex-col gap-3 justify-start w-full items-start">
        <div className="flex flex-row mt-2 gap-6 justify-start w-full items-start">
          <Chip color="warning" variant="dot">
            Total General Template : {genTemplateData?.TotalCount}
          </Chip>
          <Chip color="warning" variant="dot">
            Total General Template : {genTemplateData?.LimitedData?.length}
          </Chip>
        </div>
        {selectTemp === 'Festival' ? (
          <div className="flex flex-row gap-4 justify-start w-full items-center">
            <label htmlFor="datePicker">Filter by Date:</label>
            <input
              type="date"
              id="datePicker"
              value={selectedDate}
              onChange={handleDateChange}
              className="border p-2 rounded"
            />
          </div>
        ) : null}
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
                      <div className="flex items-center gap-3">
                        <div className="flex h-full flex-row justify-center items-center gap-2">
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
