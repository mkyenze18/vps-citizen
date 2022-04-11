// TODO ESLINT OVERRIDES
/* eslint-disable jsx-a11y/anchor-is-valid */

// TODO https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
import { useState,  useEffect } from 'react';
import {
  useParams,
  useNavigate,
  Outlet
} from "react-router-dom";
import { handleErrorAxios } from '../../utility/notification';
import { getCountries } from '../../services/countries';

const axios = require('axios').default;

export default function Gender() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resources, setResources] = useState([]);

  let navigate = useNavigate();
  let params = useParams();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
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

  function getResources() {
    axios.get('http://127.0.0.1:8000/vps/api/v0/genders')
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
    <div className="">
      <div className="page-title">
        <div className="title_left">
          <h3>Genders <small>Genders for the system</small></h3>
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
            {/* <div className="x_title">
              <h2>Genders <small>Genders of the world</small></h2>
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
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map(item => (
                    <tr key={item.id} onClick={(e) => getResource(item.id, e)}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
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