import { Outlet } from "react-router-dom";

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './app.css'
const App = () => {
  return (
    // <I18nextProvider i18n={i18n}>
    // <div>
    //   <Outlet />
    // </div>
    // </I18nextProvider>
    <div className="app">
      <h1 style={{fontSize: "40px"}}>Money</h1>
    </div>
  );
};

export default App;
