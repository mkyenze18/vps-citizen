// TODO ESLINT OVERRIDES
/* eslint-disable jsx-a11y/anchor-is-valid */

// TODO https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
import { useState,  useEffect, useRef } from 'react';
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import { getCountries } from '../../services/countries';
import MyVerticallyCenteredModal from '../../components/modal_react_bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

export default function Countries() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState(null);
  // TODO https://react-bootstrap.github.io/components/modal/#vertically-centered
  const [modalShow, setModalShow] = useState(false);
  
  let navigate = useNavigate();
  let params = useParams();

  // TODO https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
  // textInput must be declared here so the ref can refer to it
  // const textInput = useRef(null);
  const idInput = useRef(null);
  const nameInput = useRef(null);
  const nationalityInput = useRef(null);
  
  const deleteButton = useRef(null);
  const cancelButton = useRef(null);
  const submitButton = useRef(null);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    getCountries()
    const id = idInput.current.value
    if (!id) {
      deleteButton.current.disabled = true
    }
  }, [])

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

  function getCountries() {
    axios.get('http://127.0.0.1:8000/vps/api/v0/countries')
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setCountries(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      setIsLoaded(true);
      setError(error);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.error("Operation failed", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .then(function () {
      // always executed
    });
  }

  function postCountry(data) {
    axios.post(`http://127.0.0.1:8000/vps/api/v0/countries`, data)
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);
      // setCountries(result);
      getCountries()
      navigate("invoices/" + result.id)

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Country posted successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      setIsLoaded(true);
      setError(error);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.error("Operation failed", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .then(function () {
      // always executed
    });
  }

  function getCountry(id, e) {
    axios.get(`http://127.0.0.1:8000/vps/api/v0/countries/${id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);
      // setCountries(result);
      setCountrySelected(result)

      idInput.current.value = result["id"]
      nameInput.current.value = result["name"]
      nationalityInput.current.value = result["nationality"]

      deleteButton.current.disabled = false
      cancelButton.current.disabled = false
      submitButton.current.disabled = false
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      setIsLoaded(true);
      setError(error);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.error("Operation failed", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .then(function () {
      // always executed
    });
  }

  function putCountry(id, data) {
    axios.put(`http://127.0.0.1:8000/vps/api/v0/countries/${id}`, data)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      // setCountries(result);
      getCountries()

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Countrry updated successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      setIsLoaded(true);
      setError(error);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.error("Operation failed", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .then(function () {
      // always executed
    });
  }

  function deleteCountry() {
    const id = idInput.current.value

    axios.delete(`http://127.0.0.1:8000/vps/api/v0/countries/${id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      // setCountries(result);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.warning("Country deleted successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
      
      resetForm()
      setModalShow(false);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      setIsLoaded(true);
      setError(error);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.error("Operation failed", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .then(function () {
      // always executed
    });
  }

  function resetForm() {
    setCountrySelected(null)
    
    idInput.current.value = ""
    nameInput.current.value = ""
    nationalityInput.current.value = ""

    deleteButton.current.disabled = true
    cancelButton.current.disabled = true
    submitButton.current.disabled = false
  }

  function handleSubmit(event) {
    event.preventDefault();

    const id = idInput.current.value;
    const name = nameInput.current.value;
    const nationality = nationalityInput.current.value;

    const data = {
      'name': name,
      'nationality': nationality,
    }

    if(countrySelected) {
      putCountry(id, data)
    } else {
      postCountry(data)
    }
  }

    return (
      <div className="">
        {/* <div className="page-title">
          <div className="title_left">
            <h3>Countries <small>Countries of the world</small></h3>
          </div>

          <div className="title_right">
            <div className="col-md-5 col-sm-5   form-group pull-right top_search">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..."/>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">Go!</button>
                </span>
              </div>
            </div>
          </div>
        </div> */}

        <div className="clearfix"></div>

        <div className="row" style={{ display: 'block' }}>
          <div className="col-md-6 col-sm-6  ">
            <div className="x_panel">
              <div className="x_title">
                <h2>Countries <small>Countries of the world</small></h2>
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
              </div>
              <div className="x_content">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countries.map(item => (
                      <tr key={item.id} onClick={(e) => getCountry(item.id, e)}>
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

          <div className="col-md-6 ">
            <div className="x_panel">
              <div className="x_title">
                <h2>Form Design <small>different form elements</small></h2>
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
              </div>
              <div className="x_content">
                <br />
                <form className="form-label-left input_mask" onSubmit={handleSubmit}>

                  <div className="form-group row">
                    <label className="col-form-label col-md-3 col-sm-3 ">ID</label>
                    <div className="col-md-9 col-sm-9 ">
                      <input type="text" className="form-control" readOnly="readonly" placeholder="id" ref={idInput}/>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-3 col-sm-3 ">Name</label>
                    <div className="col-md-9 col-sm-9 ">
                      <input type="text" className="form-control" placeholder="name" ref={nameInput}/>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-3 col-sm-3 ">Nationality</label>
                    <div className="col-md-9 col-sm-9 ">
                      <input type="text" className="form-control" placeholder="nationality" ref={nationalityInput}/>
                    </div>
                  </div>
                  <div className="ln_solid"></div>
                  <div className="form-group row">
                    <div className="col-md-9 col-sm-9  offset-md-3">
                      <button className="btn btn-danger" type="button" ref={deleteButton} onClick={() => setModalShow(true)}>Delete</button>
                      <button type="button" className="btn btn-primary" ref={cancelButton} onClick={resetForm}>Cancel</button>
                      <button type="submit" className="btn btn-success" ref={submitButton}>Submit</button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          handleconfirm={deleteCountry}
          heading="Delete country" // TODO https://stackoverflow.com/questions/39523040/concatenating-variables-and-strings-in-react
          title="Are you sure?"
          body="This action cannot be undone."
        />

        <ToastContainer />
      </div>
    );
  }