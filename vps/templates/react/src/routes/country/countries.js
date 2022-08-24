// TODO ESLINT OVERRIDES
/* eslint-disable jsx-a11y/anchor-is-valid */

// TODO https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
import { useState,  useEffect } from 'react';
import {
  useParams,
  useNavigate,
  Outlet,
  useSearchParams
} from "react-router-dom";
import { config } from '../../Constants'
import { handleErrorAxios } from '../../utility/notification';
import { getParameterByName } from '../../utility/url';
import { getResources } from '../../services/countries';

const axios = require('axios').default;

// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
var url = config.url.API_URL
// var url_users = config.url.API_URL_USERS

export default function Countries() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resources, setResources] = useState([]);
  const [pagination, setPagination] = useState([]);

  let navigate = useNavigate();
  let params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    getResources()
  }, [params, searchParams])

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

  function getResources() {
    axios.get(`${url}/vps/api/v0/countries`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setResources(response.data.results);

      const pagination = {
        'previous': response.data.previous,
        'next': response.data.next
      }
      setPagination(pagination);
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

  function navigatePagination(page, e) {
    if (page) {
      setSearchParams({page: page});
    }
  }

  return (
    <div className="">
      <div className="page-title">
        <div className="title_left">
          <h3>Countries <small>Countries of the world</small></h3>
        </div>

        {/* <div className="title_right">
          <div className="col-md-5 col-sm-5   form-group pull-right top_search">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for..."/>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div> */}
      </div>

      <div className="clearfix"></div>

      <div className="row" style={{ display: 'block' }}>
        <div className="col-md-6 col-sm-6  ">
          <div className="x_panel">
            <div className="x_title">
              <h2>
                Countries <small>Countries of the world</small>
              </h2>
              <ul className="nav navbar-right panel_toolbox">
                <li>
                  <a
                    className=""
                    onClick={(e) => navigatePagination(getParameterByName('page', pagination.previous) ? getParameterByName('page', pagination.previous) : 1)}>
                      <i className="fa fa-chevron-left"></i>
                    </a>
                </li>
                {/* <li><a className=""><i className="fa fa-chevron-up"></i></a>
                </li> */}
                <li>
                  <a
                    className=""
                    onClick={(e) => navigatePagination(getParameterByName('page', pagination.next))}>
                      <i className="fa fa-chevron-right"></i>
                  </a>
                </li>
                {/* <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a className="dropdown-item" href="#">Settings 1</a>
                      <a className="dropdown-item" href="#">Settings 2</a>
                    </div>
                </li>
                <li><a className="close-link"><i className="fa fa-close"></i></a>
                </li> */}
              </ul>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Nationality</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map(item => (
                    <tr key={item.id} onClick={(e) => getResource(item.id, e)}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.nationality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}