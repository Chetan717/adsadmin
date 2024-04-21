import React from 'react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import { Card, CardHeader, CardBody, Image, Button } from '@nextui-org/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
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

  const HandleDelete = async (id: any, compLimit: Number) => {
    setLoading(true);
    try {
      axios
        .delete(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/mlm/?MLM_COMP_ID=${id}`,
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log('done');
          GetAllCompany(compLimit);
          setLoading(false);
        });
    } catch (error) {}
  };

  const totalData = companyData?.TotalCount;
  const HandleLoadMore = (totalData, setCompLimit, compLimit) => {
    try {
      if (totalData > compLimit) {
        setCompLimit(compLimit + 10);
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="flex flex-col gap-4 w-full justify-center items-center ">
        <div className="flex flex-col gap-2 justify-start w-full items-start  ">
          <h1 className="text-black  text-start dark:text-white font-bold text-sm">
            List Of Companies {`>`}
          </h1>
        </div>
        <div className="grid grid-cols-2 w-full justify-center items-center gap-10">
          {companyData?.LimitedData?.Items?.map((i: any, index: number) => {
            const displayData = i.attributeToBeUpdated || i;
            const id = i?.id;
            return (
              <Card key={index} className="py-4 cursor-pointer hover:scale-110">
                {/* <CardHeader className="pb-0  flex-col items-start"></CardHeader> */}
                <CardBody
                  // onClick={() => GotoListTemplate('temp', 'Herbar')}
                  className="overflow-visible py-2"
                >
                  <div className="flex flex-row gap-22 justify-center items-center">
                    <div className="flex flex-row justify-center items-start gap-8">
                      <Image width={70} src={displayData?.logo} />
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
                            onClick={() => HandleDelete(id, compLimit)}
                          >
                            Confirm Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

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
