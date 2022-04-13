// TODO ESLINT OVERRIDES
/* eslint-disable jsx-a11y/anchor-is-valid */

// TODO https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
import { useState,  useEffect } from 'react';
import {
  useParams,
  useNavigate,
  Outlet
} from "react-router-dom";
import { config } from '../../Constants'
import IPRS_Person from './resource'
import { handleErrorAxios } from '../../utility/notification';
import { getResources } from '../../services/countries';

const axios = require('axios').default;

// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
var url = config.url.API_URL
// var url_users = config.url.API_URL_USERS

export default function Collection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resourcesGender, setResourcesGender] = useState([]);
  const [resourcesCountry, setResourcesCountry] = useState([]);
  const [resources, setResources] = useState([]);

  let navigate = useNavigate();
  let params = useParams();

  // TODO https://axios-http.com/docs/instance
  // const instance = axios.create({
  //   baseURL: url,
  //   timeout: 1000,
  //   // headers: {'X-Custom-Header': 'foobar'},
  //   // TODO https://axios-http.com/docs/handling_errors
  //   // validateStatus: function (status) {
  //   //   return status < 500; // Resolve only if the status code is less than 500
  //   // }
  // });

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    getResourcesGender()
    getResourcesCountry()
    getResources()
  }, [params])

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <div>Loading...</div>;
  // } else {
  //   return (
  //     <ul>
  //       {items.map(item => (
  //         <li key={item.id}>
  //           {item.name} {item.price}
  //         </li>
  //       ))}
  //     </ul>
  //   );

  function getResourcesGender() {
    axios.get(`${url}/vps/api/v0/genders`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      const resources = {}
      response.data.forEach(element => {
        resources[element.id] = element.name;
      });
      setResourcesGender(resources);
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

  function getResourcesCountry() {
    axios.get(`${url}/vps/api/v0/countries`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      const resources = {}
      response.data.forEach(element => {
        resources[element.id] = element.nationality;
      });
      setResourcesCountry(resources);
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

  function getResources() {
    axios.get(`${url}/vps/api/v0/iprs-persons`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setResources(response.data);
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

  function getResource(id, e) {
    navigate(id.toString());
  }

  return (
    <div className="row" style={{ display: 'block' }}>
      <div className="col-md-12 col-sm-12  ">
        <div className="x_panel">
            {/* <div className="x_title">
            <h2>IPRS Persons <small>IPRS Persons of the world</small></h2>
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
            <div className="x_content">
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>ID No</th>
                    <th className="d-none d-md-block d-lg-none">Passport</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th className="d-none d-md-block d-lg-none">Nationality</th>
                    <th className="d-none d-md-block d-lg-none">Gender</th>
                </tr>
                </thead>
                <tbody>
                {resources.map(item => (
                    <tr key={item.id} onClick={(e) => getResource(item.id, e)}>
                      <th scope="row">{item.id}</th>
                      <td>{item.id_no ? item.id_no : '-'}</td>
                      <td className="d-none d-md-block d-lg-none">{item.passport_no ? item.passport_no : '-' }</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td className="d-none d-md-block d-lg-none">{resourcesCountry[item.nationality]}</td>
                      <td className="d-none d-md-block d-lg-none">{resourcesGender[item.gender]}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            </div>
        </div>
      </div>
    </div>
  );
}