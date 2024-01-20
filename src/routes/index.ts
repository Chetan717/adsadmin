import { lazy } from 'react';
import MainSubscription from '../pages/Subscription/MainSubscription';
import MainPlans from '../pages/Plans/MainPlans';
import MainPayments from '../pages/PaymentLog/MainPayments';
const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const MlmCompany = lazy(() => import('../pages/Mlm/MainMlm'));
const Mlmuser = lazy(() => import('../pages/Mlm/MainMlmUser'));
const MainTemplate = lazy(() => import('./../pages/Template/MainTemplate'));
const MainGraphics = lazy(() => import('../pages/Graphics/MainGarphics'));
const GeneralTemplate = lazy(
  () => import('../pages/Template/GeneralTemp/GeneralTemplate'),
);

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/mlm/mlmcompany',
    title: 'mlmcompany',
    component: MlmCompany,
  },
  // {
  //   path: '/mlm/mlmuser',
  //   title: 'mlmuser',
  //   component: Mlmuser,
  // },
  {
    path: '/temp/Template',
    title: 'Template',
    component: MainTemplate,
  },
  {
    path: '/temp/GenaralTemp',
    title: 'Template',
    component: GeneralTemplate,
  },
  {
    path: '/Grp',
    title: 'Graphics',
    component: MainGraphics,
  },
  {
    path: '/Sub/Subs',
    title: 'Subs',
    component: MainSubscription,
  },
  {
    path: '/Sub/Plan',
    title: 'Plan',
    component: MainPlans,
  },
  {
    path: '/Sub/Payment',
    title: 'Payment',
    component: MainPayments,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
