import ReactDOM from 'react-dom/client'
import Router from "./router/routes.tsx"
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
   <>
    <Router />
   </>
)
