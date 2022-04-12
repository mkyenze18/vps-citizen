// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
// export default function Invoice() {
//     return <h2>Invoice #???</h2>;
//   }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
// import { useParams } from "react-router-dom";

// export default function Invoice() {
//   let params = useParams();
//   return <h2>Invoice: {params.invoiceId}</h2>;
// }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
// import { useParams } from "react-router-dom";
// import { getInvoice } from "../data";

// export default function Invoice() {
//   let params = useParams();
//   let invoice = getInvoice(parseInt(params.invoiceId, 10));
//   return (
//     <main style={{ padding: "1rem" }}>
//       <h2>Total Due: {invoice.amount}</h2>
//       <p>
//         {invoice.name}: {invoice.number}
//       </p>
//       <p>Due Date: {invoice.due}</p>
//     </main>
//   );
// }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#navigating-programmatically
// import {
//   useParams,
//   useNavigate,
//   useLocation,
// } from "react-router-dom";
// import { getInvoice, deleteInvoice } from "../data";

// export default function Invoice() {
//   let navigate = useNavigate();
//   let location = useLocation();
//   let params = useParams();
//   let invoice = getInvoice(parseInt(params.invoiceId, 10));

//   return (
//     <main style={{ padding: "1rem" }}>
//       <h2>Total Due: {invoice.amount}</h2>
//       <p>
//         {invoice.name}: {invoice.number}
//       </p>
//       <p>Due Date: {invoice.due}</p>
//       <p>
//         <button
//           onClick={() => {
//             deleteInvoice(invoice.number);
//             navigate("/invoices" + location.search);
//           }}
//         >
//           Delete
//         </button>
//       </p>
//     </main>
//   );
// }

// ! YOUR CODE STARTS HERE
// TODO ESLINT OVERRIDES
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState,  useEffect, useRef } from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import MyVerticallyCenteredModal from '../../components/modal_react_bootstrap';
import { toast } from 'react-toastify';
import FormValidator from '@yaireo/validator';
import { config } from '../../Constants'
import { updateQueryStringParameter } from '../../utility/url';
import { handleErrorAxios } from '../../utility/notification';
import { getInvoice, deleteInvoice } from "../../data";

const axios = require('axios').default;

// https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
var url = config.url.API_URL
// var url_users = config.url.API_URL_USERS

export default function Gender(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [modalShow, setModalShow] = useState(false); // TODO https://react-bootstrap.github.io/components/modal/#vertically-centered

  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  // TODO https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
  // textInput must be declared here so the ref can refer to it
  // const textInput = useRef(null);
  const resourceForm = useRef(null);
  const idInput = useRef(null);
  const nameInput = useRef(null);
  const inputRefsArray = [nameInput]
  
  const deleteButton = useRef(null);
  const cancelButton = useRef(null);
  const submitButton = useRef(null);

  // TODO https://axios-http.com/docs/instance
  const instance = axios.create({
    baseURL: url,
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'},
    // TODO https://axios-http.com/docs/handling_errors
    // validateStatus: function (status) {
    //   return status < 500; // Resolve only if the status code is less than 500
    // }
  });

  useEffect(() => {
    if(params.resourceId) {
      getResource(params.resourceId);
      deleteButton.current.style.display = 'inline-block'
    } else {
      setIsLoaded(true);
      deleteButton.current.style.display = 'none'
    }

    // initialize a validator instance from the "FormValidator" constructor.
    // A "<form>" element is optionally passed as an argument, but is not a must
    // TODO https://github.com/yairEO/validator#usage-example---validate-on-field-blurinputchange-events
    var validator = new FormValidator({
      "events": ['blur', 'input', 'change']
    }, resourceForm.current);

    // on form "submit" event
    // TODO https://github.com/yairEO/validator#usage-example---validate-on-submit
    resourceForm.current.onsubmit = function(e) {
      var submit = true,
          validatorResult = validator.checkAll(this);
      console.log(validatorResult);
      return !!validatorResult.valid;
    };
    // on form "reset" event
    resourceForm.current.onreset = function(e) {
      validator.reset();
    };
  }, [params.resourceId]);

  function getResource(id) {
    instance.get(`vps/api/v0/genders/${id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);
      setSelectedResource(result)

      idInput.current.value = result["id"]
      nameInput.current.value = result["name"]

      deleteButton.current.disabled = false
      cancelButton.current.disabled = false
      submitButton.current.disabled = false
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

  function postResource(data) {
    instance.post(`vps/api/v0/genders`, data)
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);
      navigate(`../${result.id.toString()}`)

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Gender posted successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
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

  function putResource(id, data) {
    instance.put(`vps/api/v0/genders/${id}`, data)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      handlewrite()

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Gender updated successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
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

  function deleteResource() {
    const id = idInput.current.value

    instance.delete(`vps/api/v0/genders/${id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      handlewrite()

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.warning("Gender deleted successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
      
      resetForm()
      setModalShow(false);
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

  function handlewrite() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const query_string = location.search
    const update_query_string = updateQueryStringParameter(query_string, 'updated', timestamp)
    navigate(`?${update_query_string}`)
  }

  function resetForm() {
    setSelectedResource(null)
    
    idInput.current.value = ""
    nameInput.current.value = ""

    deleteButton.current.disabled = true
    submitButton.current.disabled = false
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    
    setIsLoaded(false);

    // programmatic form validation since form has "novalidate" attribute
    for (let index = 0; index < inputRefsArray.length; index++) {
      const element = inputRefsArray[index];
      if(element.current.required) {
        if(!element.current.value) {
          setIsLoaded(true);
          return;
        }
      }
    }

    const id = idInput.current.value;
    const name = nameInput.current.value;

    const data = {
      'name': name,
    }

    if(selectedResource) {
      putResource(id, data)
    } else {
      postResource(data)
    }
  }

  return (
    <div className="col-md-6 ">
        <div className="x_panel">
          {/* <div className="x_title">
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
          </div> */}
          <div className="x_content">
            <br />
            <form className="form-label-left input_mask" ref={resourceForm} onSubmit={handleSubmit} noValidate>

              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3 ">ID</label>
                <div className="col-md-9 col-sm-9 ">
                  <input type="text" className="form-control" readOnly="readonly" placeholder="id" ref={idInput}/>
                </div>
              </div>

              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3 ">Name</label>
                <div className="col-md-9 col-sm-9 ">
                  <input type="text" className="form-control" placeholder="name" ref={nameInput} required="required"/>
                </div>
              </div>

              <div className="ln_solid"></div>
              <div className="form-group row">
                <div className="col-md-9 col-sm-9  offset-md-3">
                  <button className="btn btn-danger" type="button" ref={deleteButton} onClick={() => setModalShow(true)} disabled={!isLoaded}>Delete</button>
                  <button type="button" className="btn btn-primary" ref={cancelButton} onClick={() => {resetForm()}} disabled={!isLoaded}>Cancel</button>
                  <button type="submit" className="btn btn-success" ref={submitButton} disabled={!isLoaded}>
                    {!isLoaded &&
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    }
                    Submit
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          handleconfirm={deleteResource}
          heading="Delete gender" // TODO https://stackoverflow.com/questions/39523040/concatenating-variables-and-strings-in-react
          title="Are you sure?"
          body="This action cannot be undone."
          isloading={!isLoaded}
        />
      </div>
  );
}