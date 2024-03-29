import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { NextUIProvider } from '@nextui-org/react';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import MainMlm from './pages/Mlm/MainMlm';
import { DataSupplier } from './DataContaxt/FetchData';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { admin, GetAdmin } = DataSupplier();
  useEffect(() => {
    GetAdmin();
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <NextUIProvider>
        {admin && admin?.name === 'adminadsmaker' ? (
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<MainMlm />} />
              {routes?.map((routes, index) => {
                const { path, component: Component } = routes;
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <Suspense fallback={<Loader />}>
                        <Component />
                      </Suspense>
                    }
                  />
                );
              })}
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route index element={<SignIn />} />
          </Routes>
        )}
      </NextUIProvider>
    </>
  );
}

export default App;
