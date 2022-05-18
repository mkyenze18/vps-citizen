import { useState,  useEffect, useRef } from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { config } from '../../Constants'
import { handleErrorAxios } from '../../utility/notification';
import Wizard from '../../components/react-step-wizard/components/wizard';

const axios = require('axios').default;

// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
var url = config.url.API_URL
// var url_users = config.url.API_URL_USERS

export default function Resource() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedResourcePoliceOfficer, setSelectedResourcePoliceOfficer] = useState(null);

  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    getResourcePoliceOfficer(window.police_officer);
  }, [params.responseId])

  function getResourcePoliceOfficer(id) {
    axios.get(`${url}/vps/api/v0/police-officers/${id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      // if(response.data.length) {
        setSelectedResourcePoliceOfficer(response.data);
      // } else {
      //   navigate('/403', {replace: true})
      // }
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);
      
      handleErrorAxios(error)
    })
    .then(function () {
      // always executed
    });
  }

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12  ">
        {/* <div className="x_panel"> */}
          {/* <div className="x_title">
            <h2><i className="fa fa-bars"></i> Tabs <small>Float left</small></h2>
            <ul className="nav navbar-right panel_toolbox">
              <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Settings 1</a>
                    <a className="dropdown-item" href="#">Settings 2</a>
                  </div>
              </li>
              <li><a className="close-link"><i className="fa fa-close"></i></a>
              </li>
            </ul>
            <div className="clearfix"></div>
          </div> */}
          {/* <div className="x_content"> */}

            {selectedResourcePoliceOfficer && <Wizard police_officer={selectedResourcePoliceOfficer} />}
            

          {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}