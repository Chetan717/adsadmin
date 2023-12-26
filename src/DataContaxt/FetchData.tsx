import React, {
  createContext,
  useContext,
  ReactNode,
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
  useEffect(() => {
    GetAllCompany();
  }, []);

  const [companyData, setCompanyData] = useState([]);
  const [templateData, setTemplateData] = useState([]);
  const [tempLoading, setTempLoading] = useState(false);
  const [compLoading, setCompLoading] = useState(false);

  const GetAllCompany = () => {
    setCompLoading(true);
    try {
      var ApiKey = 'ADS360KEY';

      axios
        .get(
          `https://q5gogikuke.execute-api.ap-south-1.amazonaws.com/mlmCom/?API_KEY=${ApiKey}`,
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
  const GetAllCompanyTemplate = (Comapany: any) => {
    setTempLoading(true);
    try {
      // Set the API endpoint and query parameters
      const endpoint = `https://q5gogikuke.execute-api.ap-south-1.amazonaws.com/tempByCompany/?COMPANY_ID=${Comapany}`;

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
    } catch (error) {
      console.error('Error in GetAllTemplate:', error);
    }
  };

  console.log(templateData, 'temp');

  return (
    <>
      <DataProvider.Provider
        value={{
          companyData,
          GetAllCompany,
          templateData,
          GetAllCompanyTemplate,
          tempLoading,
          setTempLoading,
          compLoading,
          
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
