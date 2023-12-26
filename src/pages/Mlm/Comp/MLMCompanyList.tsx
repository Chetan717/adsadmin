import React from 'react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import { Card, CardHeader, CardBody, Image, Button } from '@nextui-org/react';
import axios from 'axios';

interface AddmlmProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const MLMCompanyList: React.FC<AddmlmProps> = ({ loading, setLoading }) => {
  const { companyData, GetAllCompany } = DataSupplier();

  console.log(companyData);
  const HandleDelete = (id: any) => {
    setLoading(true);
    try {
      axios
        .delete(
          `https://q5gogikuke.execute-api.ap-south-1.amazonaws.com/mlm/?MLM_COMP_ID=${id}`,
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log('done');
          GetAllCompany();
          setLoading(false);
        });
    } catch (error) {}
  };

  return (
    <>
      <div className="flex flex-col gap-2 justify-start items-start ">
        <h1 className="text-black text-center dark:text-white font-bold text-sm">
          List Of Companies {`>`}
        </h1>
        <div className="grid grid-cols-3 justify-center items-center gap-10">
          {companyData?.map((i: any, index: number) => {
            return (
              <Card
                key={index}
                className="py-4 cursor-pointer w-[300px] hover:scale-110"
              >
                {/* <CardHeader className="pb-0  flex-col items-start"></CardHeader> */}
                <CardBody
                  // onClick={() => GotoListTemplate('temp', 'Herbar')}
                  className="overflow-visible py-2"
                >
                  <div className="flex flex-row gap-10 justify-center items-center">
                    <div>
                      <h4 className="font-bold text-large">{i?.companyName}</h4>
                      <small className="text-">{i?.companyAddress}</small>
                    </div>
                    <Button
                      size="sm"
                      className="text-white w-[100px] text-black text-xs "
                      onClick={() => HandleDelete(i?.id)}
                    >
                      delete
                    </Button>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default MLMCompanyList;
