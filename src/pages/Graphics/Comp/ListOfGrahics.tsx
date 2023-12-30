import React, { useState } from 'react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import { Card, CardHeader, CardBody, Image, Button } from '@nextui-org/react';
import axios from 'axios';
import EditGraphics from './EditGraphics';
import Filters from './Filters';

interface AddmlmProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selType: any;
}

const GraphicsList: React.FC<AddmlmProps> = ({
  loading,
  setLoading,
  grptype = { grptype },
  selType,
}) => {
  const { GetAllGraphics, graphData } = DataSupplier();

  const HandleDelete = (id: any) => {
    setLoading(true);
    try {
      axios
        .delete(
          `https://q5gogikuke.execute-api.ap-south-1.amazonaws.com/Grp/?ID=${id}`,
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log('done');
          setTimeout(() => {
            GetAllGraphics();
            setLoading(false);
          }, 1500);
        });
    } catch (error) {}
  };

  const filteredGrp = graphData?.filter((i: any) => {
    if (i?.attributeToBeUpdated) {
      // If attributeToBeUpdated exists, filter based on its properties
      return i.attributeToBeUpdated.GraphicsType === `${selType}`;
    } else {
      // If attributeToBeUpdated doesn't exist, filter based on GraphicsType
      return i?.GraphicsType === `${selType}`;
    }
  });

  return (
    <>
      <div className="flex flex-col gap-2 justify-start items-start ">
        <div className="grid grid-cols-3 justify-center items-center gap-10">
          {filteredGrp?.map((i: any, index: number) => {
            const displayData = i.attributeToBeUpdated || i;
            const id = i?.id;
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
                      <h4 className="font-bold text-large">
                        {displayData?.GraphicName}
                      </h4>
                      <small className="text-">
                        {displayData?.GraphicsType}
                      </small>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="text-white w-[100px] text-black text-xs "
                        onClick={() => HandleDelete(id)}
                      >
                        delete
                      </Button>
                      <EditGraphics
                        loading={loading}
                        setLoading={setLoading}
                        id={id}
                        dataAll={displayData}
                        grptype={grptype}
                      />
                    </div>
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
export default GraphicsList;
