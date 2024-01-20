import React, { useEffect } from 'react';
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

export default function ListOfTemplate({
  selectComp,
  setDataEdit,
  dataEdit,
  setSwich,
  selectTemp,
}) {
  const {
    templateData,
    tempLoading,
    GetAllCompanyTemplate,
    apiId,
    tempLimit,
    setTempLimit,
  } = DataSupplier();

  useEffect(() => {
    GetAllCompanyTemplate(selectComp);
  }, [selectComp, tempLimit]);

  const handleDelete = (id) => {
    try {
      axios
        .delete(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/temp/?TEMP_ID=${id}`,
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          GetAllCompanyTemplate(selectComp);
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const hangoEdit = (data, id) => {
    setDataEdit({ data, id });
    setSwich('update');
  };

  const filteredGrp = templateData?.LimitedData?.Items?.filter((i) => {
    if (i?.attributeToBeUpdated) {
      return i.attributeToBeUpdated.Type === `${selectTemp}`;
    } else {
      return i?.Type === `${selectTemp}`;
    }
  });

  const handleLoadMore = (templateData) => {
    try {
      if (Number(templateData?.TotalCount) + 20 > tempLimit) {
        setTempLimit(tempLimit + 20);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-3 justify-start w-full items-start">
    <div className="flex flex-row mt-2 gap-6 justify-start w-full items-start">
    <Chip color="warning" variant="dot">Total MLM Template : {templateData?.TotalCount}</Chip>
      <Chip color="warning" variant="dot">Total Fetch Template : {templateData?.LimitedData?.Items?.length}</Chip>
    </div>
        <div className="flex flex-col gap-4 justify-center w-full items-center w-full">
          <Table>
            <TableHeader>
              <TableColumn>Showcase</TableColumn>
              <TableColumn>Company</TableColumn>
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
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
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
                              onClick={() => handleDelete(id)}
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
              onPress={() => handleLoadMore(templateData)}
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
