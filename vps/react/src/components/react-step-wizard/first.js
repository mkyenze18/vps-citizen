import { useState,  useEffect, useRef } from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { config } from '../../Constants'
import MyVerticallyCenteredModal from '../../components/modal_react_bootstrap';
import GoogleMapModal from '../../components/modal_google_map';
import IPRSPersonModal from '../modal_iprs_person';
import { toast } from 'react-toastify';
import FormValidator from '@yaireo/validator';
import moment from 'moment';
import { updateQueryStringParameter } from '../../utility/url';
import { handleErrorAxios } from '../../utility/notification';

const axios = require('axios').default;

// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
var url = config.url.API_URL
// var url_users = config.url.API_URL_USERS

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#add-some-routes
export default function First(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedIPRS_Person, setIsLoadedIPRS_Person] = useState(false);
  const [resourcesGender, setResourcesGender] = useState([]);
  const [resourcesCountry, setResourcesCountry] = useState([]);
  const [resourcesIPRS_person, setResourcesIPRS_Person] = useState([]);
  const [resourcesReporter, setResourcesReporter] = useState([]);
  const [selectedResourceReporter, setSelectedResourceReporter] = useState(null);
  const [selectedResourceIPRS_person, setSelectedResourceIPRS_person] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [IPRS_PersonModalShow, setIPRS_PersonModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false); // TODO https://react-bootstrap.github.io/components/modal/#vertically-centered
  const [modalShowReporter, setModalShowReporter] = useState(false);
  const [modalShowGoogleMap, setModalShowGoogleMap] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  // TODO https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
  // textInput must be declared here so the ref can refer to it
  // const textInput = useRef(null);
  const resourceIPRS_PersonForm = useRef(null);
  const resourceForm = useRef(null);

  const idInput = useRef(null);
  const policeStationInput = useRef(null);
  const policeOfficerInput = useRef(null);
  const locationInput = useRef(null);
  const moduleInput = useRef(null);

  const inputRefsArray = [
    policeStationInput, policeOfficerInput, locationInput, moduleInput, 
]
  
  // const idIPRS_PersonInput = useRef(null);

  const idNoInput = useRef(null);
  const passportNoInput = useRef(null);
  const searchButton = useRef(null);

  const firstNameInput = useRef(null);
  const middleNameInput = useRef(null);
  const LastNameInput = useRef(null);

  const genderInput = useRef(null);
  const nationalityInput = useRef(null);
  const dateOfBirthInput = useRef(null);

  const countyOfBirthInput = useRef(null);
  const districtOfBirthInput = useRef(null);
  const divisionOfBirthInput = useRef(null);
  const locationOfBirthInput = useRef(null);

  const emailInput = useRef(null);
  const mobilePhoneInput = useRef(null);
  const countyOfResidenceInput = useRef(null);
  const subCountyOfResidenceInput = useRef(null);

  const cancelButton = useRef(null);
  const submitButton = useRef(null);

  const mugShotIPRS_PersonRef = useRef(null);

  let IPRS_PersonClassName = 'col-sm-12';
  if (selectedResourceIPRS_person) {
      IPRS_PersonClassName += ' col-md-8';
  }

  useEffect(() => {
    getResourcesGender();
    getResourcesCountry();
    if(params.resourceId) {
      // getResource(params.resourceId)
      if(props.occurrence) {
        populateOccurrenceForm(props.occurrence);
        locationInput.current.disabled = props.occurrence.is_closed;
        setSelectedResource(props.occurrence);
      }
      getResourcesReporter({occurrence: params.resourceId})
    } else {
      idInput.current.value = "";
      resetForm();
      locationInput.current.disabled = false;
    }

    initFormValidator();

    const scripts = [
      // '/static/vps/gentelella_validation_form.js',
      // '/static/vps/resource_iprs_person.js',
      // '/static/gentelella/vendors/jQuery-Smart-Wizard/js/jquery.smartWizard.js'
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

  }, [params.resourceId, location.search, props.occurrence])

  // REST ACTIIONS

  function getResourcesGender() {
    axios.get(`${url}/vps/api/v0/genders`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setResourcesGender(response.data);
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);
      
      handleErrorAxios(error, 'IPRS Person')
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
      setResourcesCountry(response.data);
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

  function getResourcesIPRS_Person(params) {
    axios.get(`${url}/vps/api/v0/iprs-persons`, {params})
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);
      setResourcesIPRS_Person(response.data);

      if(result.length) {
        setIPRS_PersonModalShow(true);

        // Remove all toasts !
        toast.dismiss();
      } else {
        // TODO https://fkhadra.github.io/react-toastify/positioning-toast
        toast.warn("No IPRS Records found", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
      }
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

  function getResourceIPRS_Person(id) {
    axios.get(`${url}/vps/api/v0/iprs-persons/${id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);
      setSelectedResourceIPRS_person(response.data);

      populateIPRS_PersonForm(result);

      setIPRS_PersonModalShow(false);
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

  function getResource(id) {
    axios.get(`${url}/vps/api/v0/occurrences/${id}`)
    .then(function (response) {
        // handle success
        console.log(response);
        const result = response.data
        setIsLoaded(true);
        setSelectedResource(result);

        populateOccurrenceForm(result);
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);

      navigate('..', {replace: true});
      
      handleErrorAxios(error, "Reporter")
    })
    .then(function () {
      // always executed
    });
  }

  function postResource(data) {
    axios.post(`${url}/vps/api/v0/occurrences`, data)
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);
      navigate(`../${result.id.toString()}`, true)

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Occurrence posted successfully", {
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
    axios.put(`${url}/vps/api/v0/occurrences/${id}`, data)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      handlewrite(true)

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Occurrence updated successfully", {
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

  function getResourcesReporter(params) {
    axios.get(`${url}/vps/api/v0/reporters`, {params})
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setResourcesReporter([])
      setResourcesReporter(response.data.results);
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

  function postResourceReporter(data) {
    axios.post(`${url}/vps/api/v0/reporters`, data)
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);
      resetFormReporter(0);

      handlewrite(true);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Reporter posted successfully", {
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

  function putResourceReporter(id, data) {
    axios.put(`${url}/vps/api/v0/reporters/${id}`, data)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      handlewrite(true);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Reporter updated successfully", {
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

  function deleteResourceReporter() {
    const id = selectedResourceReporter;

    axios.delete(`${url}/vps/api/v0/reporters/${id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setModalShowReporter(false);

      handlewrite(true);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.warning("Reporter deleted successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);
      
      handleErrorAxios(error, 'Reporter')
    })
    .then(function () {
      // always executed
    });
  }

  function handleSubmitReporter(event) {
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

    const email_address = form.querySelector('[name="email_address"]').value;
    const iprs_person = form.querySelector('[name="iprs_person"]')?.value;
    const phone_number = form.querySelector('[name="phone_number"]').value;
    const county_of_residence = form.querySelector('[name="county_of_residence"]').value;
    const sub_county_of_residence = form.querySelector('[name="sub_county_of_residence"]').value;

    const data = {
      occurrence: params.resourceId,
      iprs_person: parseInt(iprs_person) ? iprs_person : selectedResourceIPRS_person.id,
      email_address: email_address,
      phone_number: phone_number,
      county_of_residence: county_of_residence,
      sub_county_of_residence: sub_county_of_residence,
    }
    const id = form.querySelector('[name="id"]').value;

    if(parseInt(id)) {
      putResourceReporter(id, data)
    } else {
      postResourceReporter(data)
    }
  }

  function handleSearch() {
    setIsLoadedIPRS_Person(false);
    
    let params = {};
    if (idNoInput.current.value) {
      params.id_no = idNoInput.current.value;
      getResourcesIPRS_Person(params);
      return;
    }

    if (passportNoInput.current.value) {
      params.passport_no = passportNoInput.current.value;
      getResourcesIPRS_Person(params);
      return;
    }

    // TODO https://fkhadra.github.io/react-toastify/positioning-toast
    toast.warn("Enter ID or passport number to run search", {
      position: toast.POSITION.TOP_RIGHT,
    });
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

  function resetForm() {
    setSelectedResource(null)

    locationInput.current.value = "";

    // submitButton.current.disabled = false
  }

  function resetFormIPRS_Person() {
    setSelectedResourceIPRS_person(null)

    // idIPRS_PersonInput.current.value = "";
    idNoInput.current.value = "";

    passportNoInput.current.value = "";

    firstNameInput.current.value = "";
    middleNameInput.current.value = "";
    LastNameInput.current.value = "";

    genderInput.current.value = "";
    nationalityInput.current.value = "";
    dateOfBirthInput.current.value = "";

    countyOfBirthInput.current.value = "";
    districtOfBirthInput.current.value = "";
    divisionOfBirthInput.current.value = "";
    locationOfBirthInput.current.value = "";

    emailInput.current.value = "";
    mobilePhoneInput.current.value = "";
    countyOfResidenceInput.current.value = "";
    subCountyOfResidenceInput.current.value = "";

    submitButton.current.disabled = false
  }

  function handleErrorMugShot(e) {
    e.target.src = "/static/vps/broken-image.png"
  }

  function populateOccurrenceForm(result) {
    idInput.current.value = result["id"];

    if(parseInt(policeStationInput.current.value) !== result["police_station"]["id"]) {
      var select = policeStationInput.current;
      var opt = document.createElement('option');
      opt.value = result["police_station"]["id"];
      opt.innerHTML = result["police_station"]["name"];
      select.appendChild(opt);

      policeStationInput.current.value = result["police_station"]["id"];
    }

    if(parseInt(policeOfficerInput.current.value) !== result["police_officer"]["id"]) {
      var select = policeOfficerInput.current;
      var opt = document.createElement('option');
      opt.value = result["police_officer"]["id"];
      opt.innerHTML = result["police_officer"]["service_number"];
      select.appendChild(opt);

      policeOfficerInput.current.value = result["police_officer"]["id"];
    }

    locationInput.current.value = result["location"];

    // cancelButton.current.disabled = false
    // submitButton.current.disabled = false
  }

  function populateIPRS_PersonForm(result) {
    // idIPRS_PersonInput.current.value = result["id"];
    idNoInput.current.value = result["id_no"];

    passportNoInput.current.value = result["passport_no"];

    firstNameInput.current.value = result["first_name"];
    middleNameInput.current.value = result["middle_name"];
    LastNameInput.current.value = result["last_name"];

    genderInput.current.value = result["gender"];
    nationalityInput.current.value = result["nationality"];
    dateOfBirthInput.current.value = moment(result["date_of_birth"]).format("MM/DD/YYYY");

    countyOfBirthInput.current.value = result["county_of_birth"];
    districtOfBirthInput.current.value = result["district_of_birth"];
    divisionOfBirthInput.current.value = result["division_of_birth"];
    locationOfBirthInput.current.value = result["location_of_birth"];

    // document.querySelector(`#gender${result["gender"]}`).checked = true;
    // document.querySelector(`#gender${result["gender"]}`).required = true;

    // hideDropzone(); // Falied for some resource, may be state related
    if(result["mug_shot"]) {
        mugShotIPRS_PersonRef.current.src = url+result["mug_shot"];
    } else {
        mugShotIPRS_PersonRef.current.src = "/static/vps/person-placeholder.png";
    }

    setIsLoadedIPRS_Person(true);
  }

  function resetFormReporter(id) {
    const form = document.querySelector("#form_input_"+id);

    form.querySelector('[name="email_address"]').value = "";
    form.querySelector('[name="phone_number"]').value = "";
    form.querySelector('[name="county_of_residence"]').value = "";
    form.querySelector('[name="sub_county_of_residence"]').value = "";

    if(id === 0) {
      resetFormIPRS_Person();
    }
  }

  function handleDeleteReporter(id) {
    setModalShowReporter(true);
    setSelectedResourceReporter(id);
  }

  return (
    <div id={"step-"+props.currentStep}>
      {/* Police station, officer and location */}
      <div className="row">
        <div className="col-md-12 ">
            <div className="x_panel">
              <div className="x_content">
                <br/>
                <form className="form-label-left input_mask" ref={resourceForm} onSubmit={handleSubmit} noValidate>

                  <div className="row">
                      <div className="col-md-8"></div>
                      <div className="field col-md-4 col-sm-12 pull-right form-group">
                          <label>System ID</label>
                          <input type="text" placeholder="System ID" className="form-control" ref={idInput} name="id" readOnly="readonly" />
                      </div>
                  </div>

                  <div className="row">
                  <input type="hidden" ref={moduleInput} name="module" defaultValue="OB" readOnly="readonly" />

                    <div className="field col-md-4 col-sm-12  form-group">
                        <label>Police Station</label>
                        {/* <input type="text" placeholder="Police Station" className="form-control" ref={policeStationInput} name="police_station" required="required" /> */}
                        <select className="form-control" ref={policeStationInput} name="police_station" disabled >
                          <option value={props.police_officer.police_station.id}>{props.police_officer.police_station.name}</option>
                        </select>
                    </div>
                    <div className="field col-md-4 col-sm-12  form-group">
                        <label>Police Officer</label>
                        {/* <input type="text" placeholder="Police Officer" className="form-control" ref={policeOfficerInput} name="police_officer" value={props.police_officer.service_number} required="required" /> */}
                        <select className="form-control" ref={policeOfficerInput} name="police_officer" disabled >
                          <option value={props.police_officer.id}>{props.police_officer.service_number}</option>
                        </select>
                    </div>
                    <div className="field col-md-4 col-sm-12  form-group">
                          <label>Location</label>
                          <input
                            type="text"
                            placeholder="Location"
                            className="form-control"
                            ref={locationInput}
                            // onClick={() => setModalShowGoogleMap(true)}
                            name="location"
                            required />
                      </div>
                  </div>

                  {(!props.occurrence?.is_closed || !params.resourceId) &&
                  <div className="d-flex p-2 bd-highlight">
                    <div className="flex-fill"></div>
                    <div className="">
                        <button type="submit" className="btn btn-primary" ref={cancelButton} onClick={() => {resetForm()}} disabled={!isLoaded}>Cancel</button>
                        <button type="submit" className="btn btn-success" ref={submitButton} disabled={!isLoaded}>Submit</button>
                    </div>
                  </div>}
                </form>
              </div>
            </div>
          </div>
      </div>

      {params.resourceId &&
      <div className="">
          
          {/* iprs person and reporter */}
          {!props.occurrence?.is_closed &&
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
              <h3>Add reporter</h3>
              {/* <br /> */}
              <div className="row">
                <div className={IPRS_PersonClassName}>
                  <form className="form-label-left input_mask" ref={resourceIPRS_PersonForm} onSubmit={handleSubmit}>

                  {/* <div className="row">
                      <div className="col-md-8"></div>
                      <div className="field col-md-4 col-sm-12 pull-right form-group">
                          <label>System ID</label>
                          <input type="text" placeholder="System ID" className="form-control" ref={idIPRS_PersonInput} name="iprs_person" readOnly="readonly" />
                      </div>
                  </div> */}

                  <div className="row">

                      <div className="field col-md-4 col-sm-12  form-group">
                          <label>National identification number</label>
                          <input type="text" placeholder="National identification number" className="form-control" ref={idNoInput} name="id_no" />
                      </div>
                      <div className="field col-md-4 col-sm-12  form-group">
                          <label>Passport number</label>
                          <input type="text" placeholder="Passport Number" className="form-control" ref={passportNoInput} name="passport_no" />
                      </div>
                      <div className="col-md-4 col-sm-12 d-flex align-items-end justify-content-around mb-2">
                        <button type="button" className="btn btn-primary" ref={searchButton} onClick={() => handleSearch()} disabled={!isLoaded}>
                            {!isLoaded &&
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            }
                            Search
                        </button>
                        <a href={`/vps/iprs-persons/${selectedResourceIPRS_person?.id}`}>
                          <button type="button" className="btn btn-warning" disabled={!isLoadedIPRS_Person}>Edit</button>
                        </a>
                      </div>

                      <div className="field col-md-4 col-sm-12  form-group">
                          <label>First name<span className="required">*</span></label>
                          <input type="text" placeholder="First name" className="form-control" ref={firstNameInput} name="first_name" disabled />
                      </div>
                      <div className="field col-md-4 col-sm-12  form-group">
                          <label>Middle name</label>
                          <input type="text" placeholder="Middle name" className="form-control" ref={middleNameInput} name="middle_name" disabled />
                      </div>
                      <div className="field col-md-4 col-sm-12  form-group">
                          <label>Last name<span className="required">*</span></label>
                          <input type="text" placeholder="Last name" className="form-control" ref={LastNameInput} name="last_name" disabled />
                      </div>

                      <div className="field col-md-4 col-sm-12  form-group">
                          <label>Gender<span className="required">*</span></label>
                          {/* <input type="number" placeholder="Gender" className="form-control" ref={genderInput} name="gender" required="required" /> */}
                          <select className="form-control" ref={genderInput} name="gender" disabled >
                          <option value="">Select gender</option>
                          {resourcesGender.map(item => (
                              <option key={item.id} value={item.id}>{item.name}</option>
                          ))}
                          </select>
                      </div>
                      <div className="field col-md-4 col-sm-12  form-group">
                          <label>Nationality<span className="required">*</span></label>
                          {/* <input type="number" placeholder="Nationality" className="form-control" ref={nationalityInput} name="nationality" required="required" /> */}
                          <select className="form-control" ref={nationalityInput} name="nationality" disabled >
                          <option value="">Select nationality</option>
                          {resourcesCountry.map(item => (
                              <option key={item.id} value={item.id}>{item.nationality}</option>
                          ))}
                          </select>
                      </div>
                      <div className="field col-md-4 col-sm-12  form-group">
                          <label>Date of birth<span className="required">*</span></label>
                          {/* <input type="text" placeholder="Date of birth" className="form-control" ref={dateOfBirthInput} name="" required="required" /> */}
                          <input id="birthday" className="form-control" ref={dateOfBirthInput} name="date_of_birth" placeholder="dd-mm-yyyy" type="text" disabled />
                      </div>

                      <div className="field col-md-3 col-sm-12  form-group">
                          <label>County of birth<span className="required">*</span></label>
                          <input type="text" placeholder="County of birth" className="form-control" ref={countyOfBirthInput} name="county_of_birth" disabled />
                      </div>
                      <div className="field col-md-3 col-sm-12  form-group">
                          <label>District of birth<span className="required">*</span></label>
                          <input type="text" placeholder="District of birth" className="form-control" ref={districtOfBirthInput} name="district_of_birth" disabled />
                      </div>
                      <div className="field col-md-3 col-sm-12  form-group">
                          <label>Division of birth<span className="required">*</span></label>
                          <input type="text" placeholder="Division of birth" className="form-control" ref={divisionOfBirthInput} name="division_of_birth" disabled />
                      </div>
                      <div className="field col-md-3 col-sm-12  form-group">
                          <label>Location of birth<span className="required">*</span></label>
                          <input type="text" placeholder="Location of birth" className="form-control" ref={locationOfBirthInput} name="location_of_birth" disabled />
                      </div>

                  </div>

                  {/* <div className="field item form-group">
                      <label className="col-form-label col-md-3 col-sm-3 ">Nationality</label>
                      <div className="col-md-9 col-sm-9 ">
                      <input type="text" className="form-control" placeholder="nationality" ref={nationalityInput} required="required"/>
                      </div>
                  </div> */}

                  {/* <div className="ln_solid"></div> */}
                  {/* https://getbootstrap.com/docs/4.1/utilities/flex/ */}
                  {/* <div className="d-flex p-2 bd-highlight">
                    <div className="flex-fill"></div>
                    <div className="">
                        <a href={`/vps/iprs-persons/${selectedResourceIPRS_person?.id}`}>
                          <button type="button" className="btn btn-warning" disabled={!isLoadedIPRS_Person}>Edit</button>
                        </a>
                    </div>
                  </div> */}

                  </form>
                </div>
                {selectedResourceIPRS_person &&
                <div className="col-md-4 ">
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

                          {/* <p>Drag multiple files to the box below for multi upload or click to select files. This is for demonstration purposes only, the files are not uploaded to any server.</p>
                          <div id="myId" className="dropzone"></div>
                          <br />
                          <br />
                          <br />
                          <br /> */}

                          
                          <div className="thumbnail">
                          <div style={{ height: "100%" }} className="image view view-first">
                              {/* https://stackoverflow.com/questions/3019077/detecting-an-image-404-in-javascript */}
                              <img style={{ width: "100%", display: "block" }} ref={mugShotIPRS_PersonRef} src="/static/vps/person-placeholder.png" alt="" onError={handleErrorMugShot} />
                              {/* <div className="mask">
                              <p>Your Text</p>
                              <div className="tools tools-bottom">
                                  <a href="#"><i className="fa fa-link"></i></a>
                                  <a href="#"><i className="fa fa-pencil"></i></a>
                                  <a href="#"><i className="fa fa-times"></i></a>
                              </div>
                              </div> */}
                          </div>
                          {/* <div className="caption">
                              <p>Snow and Ice Incoming for the South</p>
                          </div> */}
                          </div>
                      </div>
                    </div>
                </div>}

                <div className="col-md-12 mt-5">
                  <form id="form_input_0" className="form-label-left input_mask" onSubmit={handleSubmitReporter} noValidate>
                            
                    <fieldset disabled={!selectedResourceIPRS_person}>

                    {/* <div className="row">
                        <div className="col"></div>
                        <div className="field col-md-4 col-sm-12 pull-right form-group">
                            <label>System ID</label>
                            <input type="text" placeholder="System ID" className="form-control" ref={idReporterInput} name="id" readOnly="readonly" />
                        </div>
                    </div> */}

                    <div className="row">

                        <input type="hidden" name="id" defaultValue="0" readOnly="readonly" />

                        <div className="field col-md-6 col-sm-12  form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Email" className="form-control" ref={emailInput} name="email_address" />
                        </div>
                        <div className="field col-md-6 col-sm-12  form-group">
                            <label>Mobile phone</label>
                            <input type="text" placeholder="Mobile phone" className="form-control" ref={mobilePhoneInput} name="phone_number" />
                        </div>

                        <div className="field col-md-6 col-sm-12  form-group">
                            <label>County of residence</label>
                            <input type="text" placeholder="County of residence" className="form-control" ref={countyOfResidenceInput} name="county_of_residence" required />
                        </div>

                        <div className="field col-md-6 col-sm-12  form-group">
                            <label>Sub-county of residence</label>
                            <input type="text" placeholder="Sub-county of residence" className="form-control" ref={subCountyOfResidenceInput} name="sub_county_of_residence" required />
                        </div>

                    </div>
                    </fieldset>

                    {/* <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3 ">Nationality</label>
                        <div className="col-md-9 col-sm-9 ">
                        <input type="text" className="form-control" placeholder="nationality" ref={nationalityInput} required="required"/>
                        </div>
                    </div> */}

                    <div className="ln_solid"></div>
                    {/* https://getbootstrap.com/docs/4.1/utilities/flex/ */}
                    <div className="d-flex p-2 bd-highlight">
                    <div className="flex-fill"></div>
                    <div className="">
                        <button type="button" className="btn btn-primary" onClick={() => {resetFormReporter(0)}} disabled={!isLoaded || !isLoadedIPRS_Person}>Cancel</button>
                        <button type="submit" className="btn btn-success" disabled={!isLoaded || !isLoadedIPRS_Person}>
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
            </div>
          </div>}

          {/* reporters */}
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
                      <h3>Reporters</h3>
                      {/* <br /> */}
                      {resourcesReporter.map(item => (
                      <form key={item.id} id={"form_input_"+item.id} className="form-label-left input_mask" onSubmit={handleSubmitReporter} noValidate>
                      
                        <fieldset disabled={props.occurrence?.is_closed}>
                          <div className="row">

                            <input type="hidden" name="id" value={item.id} readOnly="readonly" />
                            <input type="hidden" name="iprs_person" value={item.iprs_person} readOnly="readonly" />

                            <div className="field col-md-6 col-sm-12  form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Email" className="form-control" name="email_address" value={item.email_address} />
                            </div>
                            <div className="field col-md-6 col-sm-12  form-group">
                                <label>Mobile phone</label>
                                <input type="text" placeholder="Mobile phone" className="form-control" name="phone_number" value={item.phone_number} />
                            </div>

                            <div className="field col-md-6 col-sm-12  form-group">
                                <label>County of residence</label>
                                <input type="text" placeholder="County of residence" className="form-control" name="county_of_residence" value={item.county_of_residence} required />
                            </div>

                            <div className="field col-md-6 col-sm-12  form-group">
                                <label>Sub-county of residence</label>
                                <input type="text" placeholder="Sub-county of residence" className="form-control" name="sub_county_of_residence" value={item.sub_county_of_residence} required />
                            </div>

                          </div>
                        </fieldset>

                        {/* <div className="field item form-group">
                            <label className="col-form-label col-md-3 col-sm-3 ">Nationality</label>
                            <div className="col-md-9 col-sm-9 ">
                            <input type="text" className="form-control" placeholder="nationality" ref={nationalityInput} required="required"/>
                            </div>
                        </div> */}

                        {/* <div className="ln_solid"></div> */}
                        {/* https://getbootstrap.com/docs/4.1/utilities/flex/ */}
                        {!props.occurrence?.is_closed &&
                        <div className="d-flex p-2 bd-highlight">
                          <div className="flex-fill">
                              <button className="btn btn-round btn-danger" type="button" onClick={() => handleDeleteReporter(item.id)} disabled={!isLoaded}><i className="fa fa-trash"></i></button>
                          </div>
                          <div className="">
                              <button type="button" className="btn btn-round btn-primary" onClick={() => resetFormReporter(item.id)} disabled={!isLoaded}><i className="fa fa-times"></i></button>
                              <button type="submit" className="btn btn-round btn-success" disabled={!isLoaded}>
                                  {!isLoaded &&
                                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                  }
                                  <i className="fa fa-save"></i>
                              </button>
                          </div>
                        </div>}
                        
                        <div className="ln_solid"></div>
                      </form>
                      ))}
                  </div>
              </div>
            </div>
          </div>
      </div>}

      <IPRSPersonModal
        show={IPRS_PersonModalShow}
        onHide={() => setIPRS_PersonModalShow(false)}
        getResource={getResourceIPRS_Person}
        heading="Select IPRS Person"
        resources={resourcesIPRS_person}
        isloading={!isLoaded}
        />
      <MyVerticallyCenteredModal
          show={modalShowReporter}
          onHide={() => setModalShowReporter(false)}
          handleconfirm={deleteResourceReporter}
          heading="Delete Reporter"
          title="Are you sure?"
          body="This action cannot be undone."
          isloading={!isLoaded}
          />
      <GoogleMapModal
          show={modalShowGoogleMap}
          onHide={() => setModalShowGoogleMap(false)}
          handleconfirm={deleteResourceReporter}
          heading="Pick location on map"
          title="Are you sure?"
          isloading={!isLoaded}
          />
    </div>
  );
}