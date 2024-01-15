import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
interface Data {
  name: string;
}

const DataProvider = createContext<Data | undefined>(undefined);

interface DataSupplierContextProps {
  children: ReactNode;
}

export default function DataSupplierContext({
  children,
}: DataSupplierContextProps) {
  const [companyData, setCompanyData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [templateData, setTemplateData] = useState([]);
  const [genTemplateData, setGenTemplateData] = useState([]);
  const [mlmUser, setMlmUser] = useState([]);

  const [genTempLoading, setGenTempLoading] = useState(false);
  const [tempLoading, setTempLoading] = useState(false);
  const [compLoading, setCompLoading] = useState(false);
  const [grpLoading, setGrpLoading] = useState(false);
  const [compLimit, setCompLimit] = useState(20);
  const [tempLimit, setTempLimit] = useState(100);
  const [genLimit, setGenLimit] = useState(100);
  const [grpLimit, setGrpLimit] = useState(10);

  const apiId = 'vihnyda2gi';
  const API_KEY = 'ADS360KEY';

  useEffect(() => {
    GetAllCompany(compLimit);
  }, [compLimit]);

  const GetAllCompany = (compLimit: any) => {
    setCompLoading(true);
    try {
      var ApiKey = 'ADS360KEY';

      axios
        .get(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/mlmCom?API_KEY=${ApiKey}&limit=${Number(
            compLimit,
          )}`,
        )
        .then(
          (res) => setCompanyData(res?.data),
          //  console.log(res)
        )
        .catch((err) => console.log(err))
        .finally(() => {
          console.log('done');
          setCompLoading(false);
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const GetAllGraphics = () => {
    setGrpLoading(true);
    try {
      var ApiKey = 'ADS360KEY';

      axios
        .get(
          `https://${apiId}.execute-api.ap-south-1.amazonaws.com/GrpAll/?API_KEY=${ApiKey}`,
        )
        .then(
          (res) => setGraphData(res?.data),
          //  console.log(res)
        )
        .catch((err) => console.log(err))
        .finally(() => {
          console.log('done');
          setGrpLoading(false);
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };


  //   setTempLoading(true);
  //   try {
  //     // Set the API endpoint and query parameters
  //     const endpoint = `https://${apiId}.execute-api.ap-south-1.amazonaws.com/tempByCompany?COMPANY_ID=${Company}&API_KEY=${API_KEY}&limit=${tempLimit}`;

  //     setTimeout(() => {
  //       axios
  //         .get(endpoint)
  //         .then((res) => {
  //           setTemplateData(res?.data);
  //         })
  //         .catch((err) => {
  //           if (err) {
  //             setTemplateData([]);
  //           }
  //         })
  //         .finally(() => {
  //           setTempLoading(false);
  //         });
  //     }, 1000);
  //   } catch (error) {
  //     console.error('Error in GetAllTemplate:', error);
  //   }
  // };

  const GetAllCompanyTemplate = useMemo(() => {
    return (Company: any) => {
      setTempLoading(true);
      try {
        // Set the API endpoint and query parameters
        const endpoint = `https://${apiId}.execute-api.ap-south-1.amazonaws.com/tempByCompany?COMPANY_ID=${Company}&API_KEY=${API_KEY}&limit=${tempLimit}`;

        setTimeout(() => {
          axios
            .get(endpoint)
            .then((res) => {
              setTemplateData(res?.data);
            })
            .catch((err) => {
              if (err) {
                setTemplateData([]);
              }
            })
            .finally(() => {
              setTempLoading(false);
            });
        }, 1000);
      } catch (error) {
        console.error('Error in GetAllTemplate:', error);
      }
    };
  }, [apiId, API_KEY, tempLimit]);

  const GetAllGeneralTemplate = (limit: any) => {
    setGenTempLoading(true);
    try {
      // Set the API endpoint and query parameters
      const endpoint = `https://${apiId}.execute-api.ap-south-1.amazonaws.com/TempGen?APPTYPEID=Genaral&limit=${limit}`;
      // `https://${apiId}.execute-api.ap-south-1.amazonaws.com/TempGen/?APPTYPEID=${APPTYPE}&limit=${limit}`;
      axios
        .get(endpoint)
        .then((res) => {
          setGenTemplateData(res?.data);
        })
        .catch((err) => {
          if (err) {
            setGenTemplateData([]);
          }
        })
        .finally(() => {
          setGenTempLoading(false);
        });
    } catch (error) {
      console.error('Error in GetAllTemplate:', error);
    }
  };


  return (
    <>
      <DataProvider.Provider
        value={{
          companyData,
          GetAllCompany,
          compLimit,
          setCompLimit,
          templateData,
          mlmUser, setMlmUser,
          GetAllCompanyTemplate,
          tempLimit,
          setTempLimit,
          tempLoading,
          setTempLoading,
          compLoading,
          GetAllGraphics,
          grpLimit,
          setGrpLimit,
          grpLoading,
          setGrpLoading,
          graphData,
          apiId,
          API_KEY,
          GetAllGeneralTemplate,
          genLimit,
          setGenLimit,
          genTempLoading,
          genTemplateData,
        }}
      >
        {children}
      </DataProvider.Provider>
    </>
  );
}

const DataSupplier = (): Data | undefined => {
  return useContext(DataProvider);
};

export { DataProvider, DataSupplier, DataSupplierContext };
