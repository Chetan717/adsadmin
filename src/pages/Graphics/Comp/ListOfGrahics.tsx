import React, { useEffect, useState } from 'react';
import { DataSupplier } from '../../../DataContaxt/FetchData';
import { Card, CardHeader, CardBody, Image, Button } from '@nextui-org/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
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
  const { GetAllGraphics, graphData, apiId } = DataSupplier();

  useEffect(() => {
    GetAllGraphics();
  }, []);

  const HandleDelete = (id: any) => {
    setLoading(true);    
    try {
      axios
        .delete(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/Grp/?ID=${id}`,
        )
        .then((res) => {
          console.log(res.data);
          
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => {
            GetAllGraphics();
            setLoading(false);
          }, 1500);
        });
    } catch (error) {}
  };

  console.log(graphData);
  
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
                            onClick={() => HandleDelete(id)}
                          >
                            Confirm Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

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

[
  {
      "value": "https://res.cloudinary.com/dos9t1ojp/image/upload/v1707238239/ADSMAKER/MLM/VSTAAR%20PLUS/FOOTER/B_vyqtq7.webp",
      "id": 1
  },
  {
      "value": "https://res.cloudinary.com/dos9t1ojp/image/upload/v1707238239/ADSMAKER/MLM/VSTAAR%20PLUS/FOOTER/A_mcy8aq.webp",
      "id": 2
  },
  {
      "value": "https://res.cloudinary.com/dos9t1ojp/image/upload/v1707238238/ADSMAKER/MLM/VSTAAR%20PLUS/FOOTER/8_meaun5.webp",
      "id": 3
  },
  {
      "value": "https://res.cloudinary.com/dos9t1ojp/image/upload/v1707238238/ADSMAKER/MLM/VSTAAR%20PLUS/FOOTER/7_v4izrs.webp",
      "id": 4
  },
  {
      "value": "https://res.cloudinary.com/dos9t1ojp/image/upload/v1707238237/ADSMAKER/MLM/VSTAAR%20PLUS/FOOTER/6_rfaacr.webp",
      "id": 5
  },
  {
      "value": "https://res.cloudinary.com/dos9t1ojp/image/upload/v1707238236/ADSMAKER/MLM/VSTAAR%20PLUS/FOOTER/5_lllln9.webp",
      "id": 6
  },
  {
      "value": "https://res.cloudinary.com/dos9t1ojp/image/upload/v1707238236/ADSMAKER/MLM/VSTAAR%20PLUS/FOOTER/4_lrejck.webp",
      "id": 7
  },
  {
      "value": "https://res.cloudinary.com/dos9t1ojp/image/upload/v1707238235/ADSMAKER/MLM/VSTAAR%20PLUS/FOOTER/3_hgrdll.webp",
      "id": 8
  }
]