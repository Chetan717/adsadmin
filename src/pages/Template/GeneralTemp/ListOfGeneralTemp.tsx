import React, { useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from '@nextui-org/react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import ShowGraphics from './ShowGraphics';
import axios from 'axios';
import EditTemp from './EditTemp';

export default function ListOfTemplate({
  selectComp,
  setDataEdit,
  dataEdit,
  setSwich,
  selectTemp,
}) {
  const {
    GetAllGeneralTemplate,
    genTempLoading,
    genTemplateData,
    apiId,
    genLimit,
    setGenLimit,
  } = DataSupplier();

  useEffect(() => {
    GetAllGeneralTemplate(genLimit);
  }, [genLimit]);

  const handleDelete = (id, genLimit) => {
    try {
      axios
        .delete(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/temp/?TEMP_ID=${id}`,
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          GetAllGeneralTemplate(genLimit);
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const hangoEdit = (data, id) => {
    setDataEdit({ data, id });
    setSwich('Edit');
  };

  const filteredGrp = genTemplateData?.LimitedData?.filter((i) => {
    if (i?.attributeToBeUpdated) {
      return i.attributeToBeUpdated.Type === `${selectTemp}`;
    } else {
      return i?.Type === `${selectTemp}`;
    }
  });

  const HandleLoadMore = (totalData, setGenLimit, genLimit) => {
    try {
      if (Number(totalData + 20) > Number(genLimit)) {
        setGenLimit(genLimit + 40);
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-4 justify-start w-full items-start">
      <div className="flex flex-row gap-6 mt-2 justify-start w-full items-start">
        <Chip color="warning" variant="dot">
          Total Template : {genTemplateData?.TotalCount}
        </Chip>
        <Chip color="warning" variant="dot">
          Total Fetch Template : {genTemplateData?.LimitedData?.length}
        </Chip>
      </div>
      <div className="flex flex-col gap-4 justify-center w-full items-center w-full">
        <Table>
          <TableHeader>
            <TableColumn>Showcase</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Sub Type</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {filteredGrp?.map((i, index) => {
              const displayData = i.attributeToBeUpdated || i;
              const id = i?.id;

              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex-shrink-0">
                      <img
                        src={displayData?.ShowCase}
                        className="w-15 h-15"
                        alt="Brand"
                      />
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="text-black dark:text-white">
                      {displayData?.Type}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-meta-3">{displayData?.SubType}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-black dark:text-white">
                      {displayData?.APPTYPE}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="hidden items-center flex flex-row gap-2 justify-center sm:flex">
                      <Dropdown>
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
                            onClick={() => handleDelete(id, genLimit)}
                          >
                            Confirm Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
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
        {genTempLoading === true ? (
          <Button
            isLoading={true}
            size={`md`}
            className="bg-black text-white font-semibold"
          >
            Wait...
          </Button>
        ) : (
          <Button
            onPress={() =>
              HandleLoadMore(genTemplateData?.TotalCount, setGenLimit, genLimit)
            }
            size={`md`}
            className="bg-black text-white font-semibold"
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}
