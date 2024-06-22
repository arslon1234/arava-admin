
import { useNavigate } from "react-router-dom";

import "./style.scss";

function Index() {
  const navigate = useNavigate();

  const navigetBtn = () => {

    navigate("/"); 
    // if (localStorage.getItem("token")) {
    //   navigate("/main");
    // }else{
    //     navigate("/signin"); 
    // }
  };

  

  return (
    <section className="page_404 flex items-center justify-center min-h-[100vh] ">
      <div className="container ">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>

                <p>the page you are looking for not avaible!</p>

                <button onClick={()=>navigetBtn()} className="link_404">Go to SignIn</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
