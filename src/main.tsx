import ReactDOM from 'react-dom/client'
import Router from "./router/routes.tsx"
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import Root from './router/index.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
   <>
    <Router />
   </>
  // </React.StrictMode>,
)
