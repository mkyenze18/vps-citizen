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
import { config } from '../../Constants'
import MyVerticallyCenteredModal from '../../components/modal_react_bootstrap';
import { toast } from 'react-toastify';
import FormValidator from '@yaireo/validator';
import { Dropzone } from "dropzone";
import moment from 'moment';
import { updateQueryStringParameter } from '../../utility/url';
import { handleErrorAxios } from '../../utility/notification';
import { getInvoice, deleteInvoice } from "../../data";
import Cookies from 'js-cookie'

const axios = require('axios').default;

// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
var url = config.url.API_URL
// var url_users = config.url.API_URL_USERS

export default function Resource(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resourcesOccurrenceCategoryInputs, setResourcesOccurrenceCategoryInputs] = useState([]);
  const [selectedResourceOccurrenceCategoryInput, setSelectedResourceOccurrenceCategoryInput] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [modalShow, setModalShow] = useState(false); // TODO https://react-bootstrap.github.io/components/modal/#vertically-centered
  const [modalShowOccurrenceCategoryInput, setModalShowOccurrenceCategoryInput] = useState(false);


  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  // TODO https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
  // textInput must be declared here so the ref can refer to it
  // const textInput = useRef(null);
  const resourceForm = useRef(null);

  const idInput = useRef(null);

  const nameInput = useRef(null);
  const descriptionInput = useRef(null);

  const inputs = {};
  const inputRefsArray = [nameInput, descriptionInput];
  
  const deleteButton = useRef(null);
  const cancelButton = useRef(null);
  const submitButton = useRef(null);

  // let resolveAfterSuccess;

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

  useEffect(() => {
    if(params.resourceId) {
      getResource(params.resourceId);
      getResourcesOccurrenceCategoryInput({occurrence_category: params.resourceId})
      deleteButton.current.style.display = 'inline-block';
      cancelButton.current.style.display = 'none'; // UX issues of unknowingly clearing out the fields and potentially saving it after effectively loosing data
    } else {
      setIsLoaded(true);
      deleteButton.current.style.display = 'none';
    }

    initFormValidator();

    const scripts = [
			// '/static/vps/gentelella_validation_form.js',
			'/static/vps/resource_iprs_person.js'
		]
		scripts.forEach(element => {
			const script = document.createElement('script');

			script.src = element;
			script.async = true;
		
			document.body.appendChild(script);
		
			return () => {
			  document.body.removeChild(script);
			}
		});

  }, [params.resourceId, location.search])

  // REST ACTIIONS

  function getResource(id) {
    axios.get(`${url}/vps/api/v0/occurrence-categories/${id}`)
    .then(function (response) {
        // handle success
        console.log(response);
        const result = response.data
        setIsLoaded(true);
        setSelectedResource(result)

        idInput.current.value = result["id"];
        nameInput.current.value = result["name"];
        descriptionInput.current.value = result["description"] ? result["description"] : '';

        deleteButton.current.disabled = false
        cancelButton.current.disabled = false
        submitButton.current.disabled = false
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);

      navigate('..', {replace: true});
      
      handleErrorAxios(error, "Occurrence Category")
    })
    .then(function () {
      // always executed
    });
  }

  function postResource(data) {
    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.post(`${url}/vps/api/v0/occurrence-categories`, data, config)
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);
      navigate(`../${result.id.toString()}`, { replace: true })

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Occurrence Category posted successfully", {
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
    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.put(`${url}/vps/api/v0/occurrence-categories/${id}`, data, config)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      handlewrite(true)

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Occurrence Category updated successfully", {
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

    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.delete(`${url}/vps/api/v0/occurrence-categories/${id}`, config)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      handlewrite();

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.warning("Occurrence Category deleted successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);
      
      handleErrorAxios(error, 'Occurrence Category')
    })
    .then(function () {
      // always executed
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoaded(false);

    const data = {}

    // programmatic form validation since form has "novalidate" attribute
    for (let index = 0; index < inputRefsArray.length; index++) {
      const element = inputRefsArray[index];
      data[element.current.name] = element.current.value;
      if(element.current.required) {
        if(!element.current.value) {
          setIsLoaded(true);
          return;
        }
      }
    }

    const id = idInput.current.value;

    if(selectedResource) {
      putResource(id, data)
    } else {
      postResource(data)
    }
  }

  function getResourcesOccurrenceCategoryInput(params) {
    axios.get(`${url}/vps/api/v0/occurrence-category-inputs`, {params})
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setResourcesOccurrenceCategoryInputs([])
      setResourcesOccurrenceCategoryInputs(response.data.results);
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

  function postResourceOccurrenceCategoryInput(data) {
    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.post(`${url}/vps/api/v0/occurrence-category-inputs`, data, config)
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);
      resetFormOccurrenceCategoryInput(0);

      handlewrite(true);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Occurrence Category Input posted successfully", {
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

  function putResourceOccurrenceCategoryInput(id, data) {
    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.put(`${url}/vps/api/v0/occurrence-category-inputs/${id}`, data, config)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      handlewrite(true)

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Occurrence Category Input updated successfully", {
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

  function deleteResourceOccurrenceCategoryInput() {
    const id = selectedResourceOccurrenceCategoryInput;

    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.delete(`${url}/vps/api/v0/occurrence-category-inputs/${id}`, config)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setModalShowOccurrenceCategoryInput(false);

      handlewrite(true);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.warning("Occurrence Category Input deleted successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);
      
      handleErrorAxios(error, 'Occurrence Category')
    })
    .then(function () {
      // always executed
    });
  }

  function handleSubmitOccurrenceCategoryInput(event) {
    event.preventDefault();

    const form = event.target;

    // initialize a validator instance from the "FormValidator" constructor.
    // A "<form>" element is optionally passed as an argument, but is not a must
    // TODO https://github.com/yairEO/validator#usage-example---validate-on-field-blurinputchange-events
    var validator = new FormValidator({
      "events": ['blur', 'input', 'change'],
      alerts: false // TODO https://github.com/yairEO/validator#example-for-a-given-type-date-field-lets-set-a-custom-general-error-message-like-so
    }, form);

    // on form "submit" event
    // TODO https://github.com/yairEO/validator#usage-example---validate-on-submit
    // form.onsubmit = function(e) {
      var submit = true,
          validatorResult = validator.checkAll(form);
      console.log(validatorResult);
      if(!!!validatorResult.valid) {
        return
      }
    // }

    const label = form.querySelector('[name="label"]').value;
    const type = form.querySelector('[name="type"]').value;
    const name = form.querySelector('[name="name"]').value;
    const order = form.querySelector('[name="order"]').value;
    const choices = form.querySelector('[name="choices"]').value;

    const data = {
      occurrence_category: params.resourceId,
      label: label,
      type: type,
      name: name,
      order: order,
      choices: choices,
    }
    const id = form.querySelector('[name="id"]').value;

    if(parseInt(id)) {
      putResourceOccurrenceCategoryInput(id, data)
    } else {
      postResourceOccurrenceCategoryInput(data)
    }
  }

  // UI ACTIONS

  function initFormValidator(){
    // initialize a validator instance from the "FormValidator" constructor.
    // A "<form>" element is optionally passed as an argument, but is not a must
    // TODO https://github.com/yairEO/validator#usage-example---validate-on-field-blurinputchange-events
    var validator = new FormValidator({
      "events": ['blur', 'input', 'change'],
      alerts: false // TODO https://github.com/yairEO/validator#example-for-a-given-type-date-field-lets-set-a-custom-general-error-message-like-so
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
  }

  function handlewrite(stayInPage = false) {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const query_string = location.search
    const update_query_string = updateQueryStringParameter(query_string, 'updated', timestamp)
    if(stayInPage) {
        navigate(`?${update_query_string}`, { replace: true })
    } else {
        navigate(`..?${update_query_string}`, { replace: true })
    }
  }

  function handleSelect(id, e) {
    const type = e.target.value;
    if(type === 'select' || type === 'radio' || type === 'checkbox') {
      document.querySelector(`#choices_${id}`).style.display = "block";
      document.querySelector(`#tags_${id}`).required = true;
    } else {
      document.querySelector(`#choices_${id}`).style.display = "none";
      document.querySelector(`#tags_${id}`).required = false;
    }
  }

  function resetForm() {
    setSelectedResource(null)

    idInput.current.value = "";
    nameInput.current.value = "";
    descriptionInput.current.value = "";

    deleteButton.current.disabled = true
    submitButton.current.disabled = false
  }

  function resetFormOccurrenceCategoryInput(id) {
    const form = document.querySelector("#form_input_"+id);

    form.querySelector('[name="label"]').value = "";
    form.querySelector('[name="type"]').value = "";
    form.querySelector('[name="name"]').value = "";
    form.querySelector('[name="order"]').value = "";
    form.querySelector('[name="choices"]').value = "";
  }

  function handleDeleteOccurrenceCategoryInput(id) {
    setModalShowOccurrenceCategoryInput(true);
    setSelectedResourceOccurrenceCategoryInput(id);
  }

  // https://reactjs.org/docs/dom-elements.html#style
  function divStyleChoices(type) {
    if(type === 'select' || type === 'radio' || type === 'checkbox') {

      return {
        display: 'block',
      };

    } else {

      return {
        display: 'none',
      };
    }
  }

  return (
    <div className="row">
        <div className="col-sm-12 col-md-12">
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

                    <div className="row">
                      <div className="col-md-8"></div>
                      <div className="field col-md-4 col-sm-12 pull-right form-group">
                        <label>System ID</label>
                        <input type="text" placeholder="System ID" className="form-control" ref={idInput} name="id" readOnly="readonly" />
                      </div>

                    </div>

                    <div className="row">

                        <div className="field col-md-6 col-sm-12  form-group">
                          <label>Name</label>
                          <input type="text" placeholder="Name" className="form-control" ref={nameInput} name="name" />
                        </div>

                        <div className="field col-md-12 col-sm-12  form-group">
                          <label>Description</label>
                          <textarea className="form-control" rows="3" placeholder="Description" ref={descriptionInput} name="description"></textarea>
                        </div>

                    </div>

                    {/* <div className="ln_solid"></div> */}
                    {/* https://getbootstrap.com/docs/4.1/utilities/flex/ */}
                    <div className="d-flex p-2 bd-highlight">
                      <div className="flex-fill">
                        <button className="btn btn-danger" type="button" ref={deleteButton} onClick={() => setModalShow(true)} disabled={!isLoaded}>Delete</button>
                      </div>
                      <div className="">
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

                  <div className="ln_solid"></div>

                  {resourcesOccurrenceCategoryInputs.map(item => (
                    <form key={item.id} id={"form_input_"+item.id} className="form-label-left input_mask" onSubmit={handleSubmitOccurrenceCategoryInput} noValidate>
                      <div className="row">

                        <input type="hidden" name="id" defaultValue={item.id} />
    
                        <div className="field col-md-3 col-sm-12  form-group">
                          <label>Label</label>
                          <input type="text" placeholder="Label" className="form-control" name="label" defaultValue={item.label} required />
                        </div>

                        <div className="field col-md-3 col-sm-12  form-group">
                          <label>Type<span className="required">*</span></label>
                          <select className="form-control" name="type" required="required" onChange={(e) => handleSelect(item.id, e)} defaultValue={item.type}>
                            <option value="">Select type</option>
                            <option value="text">Single line</option>
                            <option value="textarea">Multi line</option>
                            <option value="select">Select</option>
                            <option value="radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="date">Date</option>
                          </select>
                        </div>

                        <div className="field col-md-3 col-sm-12  form-group">
                          <label>name</label>
                          <input type="text" placeholder="Name" className="form-control" name="name" defaultValue={item.name} required />
                        </div>

                        <div className="field col-md-3 col-sm-12  form-group">
                          <label>Order</label>
                          <input type="number" placeholder="Order" className="form-control" name="order" defaultValue={item.order} required />
                        </div>

                        <div className="col align-self-end px-0 mb-2">
                          <div className="d-flex bd-highlight align-items-center justify-content-end flex-wrap">
    
                            <div className="flex-fill">
                              {/* https://reactjs.org/docs/dom-elements.html#style */}
                              <div className="field col-md-12 col-sm-12  form-group" id={"choices_"+item.id} style={divStyleChoices(item.type)}>
                                <label>Choices</label>
                                <div className="">
                                  <input id={"tags_"+item.id}  type="text" className="tags form-control" name="choices" defaultValue={item.choices} />
                                  <div id="suggestions-container" style={{ position: "relative", float: "left", width: "250px", margin: "10px" }}></div>
                                </div>
                              </div>
                            </div>
    
                            <div className="">
                              <button type="button" className="btn btn-round btn-danger" onClick={() => handleDeleteOccurrenceCategoryInput(item.id)} disabled={!isLoaded}><i className="fa fa-trash"></i></button>
                              <button type="button" className="btn btn-round btn-primary" onClick={() => resetFormOccurrenceCategoryInput(item.id)} disabled={!isLoaded}><i className="fa fa-times"></i></button>
                              <button type="submit" className="btn btn-round btn-success" disabled={!isLoaded}>
                                  {!isLoaded &&
                                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                  }
                                  <i className="fa fa-save"></i>
                              </button>
                            </div>
                            
                          </div>
                        </div>
      
                      </div>
    
                    </form>
                  ))}
              </div>
            </div>
        </div>
        { params.resourceId &&
        <div className="col-sm-12 col-md-12">
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
                <form id="form_input_0" className="form-label-left input_mask" onSubmit={handleSubmitOccurrenceCategoryInput} noValidate>

                  <div className="row">

                    <input type="hidden" name="id" defaultValue="0" required />

                    <div className="field col-md-3 col-sm-12  form-group">
                      <label>Label</label>
                      <input type="text" placeholder="Label" className="form-control" name="label" required />
                    </div>

                    <div className="field col-md-3 col-sm-12  form-group">
                      <label>Type<span className="required">*</span></label>
                      <select className="form-control" name="type" required="required" onChange={(e) => handleSelect(0, e)}>
                        <option value="">Select type</option>
                        <option value="text">Single line</option>
                        <option value="textarea">Multi line</option>
                        <option value="select">Select</option>
                        <option value="radio">Radio</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="date">Date</option>
                      </select>
                    </div>

                    <div className="field col-md-3 col-sm-12  form-group">
                        <label>Name</label>
                        <input type="text" placeholder="Name" className="form-control" name="name" required />
                    </div>

                    <div className="field col-md-3 col-sm-12  form-group">
                        <label>Order</label>
                        <input type="number" placeholder="Order" className="form-control" name="order" defaultValue="0" required />
                    </div>
                    
                    <div className="col align-self-end px-0 mb-2">
                      <div className="d-flex bd-highlight align-items-center justify-content-end flex-wrap">

                        <div className="flex-fill">
                          <div className="field col-md-12 col-sm-12  form-group" id="choices_0" style={{ display: "none" }}>
                            <label>Choices</label>
                            <div className="">
                              <input id="tags_0" type="text" className="tags form-control" name="choices" />
                              <div id="suggestions-container" style={{ position: "relative", float: "left", width: "250px", margin: "10px" }}></div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="">
                          <button type="button" className="btn btn-round btn-primary" onClick={() => resetFormOccurrenceCategoryInput(0)} disabled={!isLoaded}><i className="fa fa-times"></i></button>
                          <button type="submit" className="btn btn-round btn-success" disabled={!isLoaded}>
                              {!isLoaded &&
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              }
                              <i className="fa fa-save"></i>
                          </button>
                        </div> */}
                        
                      </div>
                    </div>

                  </div>

                  <div className="ln_solid"></div>
                  {/* https://getbootstrap.com/docs/4.1/utilities/flex/ */}
                  <div className="d-flex p-2 bd-highlight">
                    <div className="flex-fill"></div>
                    <div className="">
                      <button type="button" className="btn btn-primary" onClick={() => resetFormOccurrenceCategoryInput(0)} disabled={!isLoaded}>Cancel</button>
                      <button type="submit" className="btn btn-success" disabled={!isLoaded}>
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
        </div>}
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleconfirm={deleteResource}
            heading="Delete Occurrence Category"
            title="Are you sure?"
            body="This action cannot be undone."
            isloading={!isLoaded}
            />
        <MyVerticallyCenteredModal
            show={modalShowOccurrenceCategoryInput}
            onHide={() => setModalShowOccurrenceCategoryInput(false)}
            handleconfirm={deleteResourceOccurrenceCategoryInput}
            heading="Delete Occurrence Category Input"
            title="Are you sure?"
            body="This action cannot be undone."
            isloading={!isLoaded}
            />
    </div>
  );
}