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
import { Dropzone } from "dropzone";
import moment from 'moment';
import { updateQueryStringParameter } from '../../utility/url';
import { handleErrorAxios } from '../../utility/notification';
import { getInvoice, deleteInvoice } from "../../data";

const axios = require('axios').default;
  
export default function Resource(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resourcesGender, setResourcesGender] = useState([]);
  const [resourcesCountry, setResourcesCountry] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [modalShow, setModalShow] = useState(false); // TODO https://react-bootstrap.github.io/components/modal/#vertically-centered
  const [modalShowMugShot, setModalShowMugShot] = useState(false); // TODO https://react-bootstrap.github.io/components/modal/#vertically-centered
  const [dropzoneShow, setDropzoneShow] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  // TODO https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
  // textInput must be declared here so the ref can refer to it
  // const textInput = useRef(null);
  const resourceForm = useRef(null);

  const idInput = useRef(null);

  const idNoInput = useRef(null);
  const passportNoInput = useRef(null);

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

  const inputRefsArray = [idNoInput, passportNoInput,
    firstNameInput, middleNameInput, LastNameInput,
    genderInput, nationalityInput, // dateOfBirthInput,
    countyOfBirthInput, districtOfBirthInput, divisionOfBirthInput, locationOfBirthInput
]
  
  const deleteButton = useRef(null);
  const cancelButton = useRef(null);
  const submitButton = useRef(null);

  const dropzone = useRef(null);
  const toastId = useRef(null); // TODO https://fkhadra.github.io/react-toastify/update-toast/

  const dropzoneRef = useRef(null);
  const thumbnailRef = useRef(null);
  const mugShotRef = useRef(null);

  const dropzoneControlsRef = useRef(null);
  const resetButtonMugShot = useRef(null);
  const clearButtonMugShot = useRef(null);
  const submitButtonMugShot = useRef(null);

  // let resolveAfterSuccess;

  // TODO https://axios-http.com/docs/instance
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'},
    // TODO https://axios-http.com/docs/handling_errors
    // validateStatus: function (status) {
    //   return status < 500; // Resolve only if the status code is less than 500
    // }
  });

  let IPRS_PersonClassName = 'col-sm-12';
  if (params.resourceId) {
      IPRS_PersonClassName += ' col-md-8';
  }

  useEffect(() => {
    getResourcesGender();
    getResourcesCountry();
    if(params.resourceId) {
      getResource(params.resourceId);
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
  function getResourcesGender() {
    instance.get('vps/api/v0/genders')
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
    instance.get('vps/api/v0/countries')
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

  function getResource(id) {
    instance.get(`vps/api/v0/iprs-persons/${id}`)
    .then(function (response) {
        // handle success
        console.log(response);
        const result = response.data
        setIsLoaded(true);
        setSelectedResource(result)

        idInput.current.value = result["id"];
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
            mugShotRef.current.src = "http://127.0.0.1:8000"+result["mug_shot"];

            setDropzoneShow(false);

            thumbnailRef.current.style = "display: block";
            resetButtonMugShot.current.style = "display: inline";

            dropzoneRef.current.style = "display: none";
            clearButtonMugShot.current.style = "display: none";
            dropzoneControlsRef.current.style = "display: none";
        } else {
            mugShotRef.current.src = "/static/vps/person-placeholder.png";
            resetButtonMugShot.current.style = "display: none";
        }

        deleteButton.current.disabled = false
        cancelButton.current.disabled = false
        submitButton.current.disabled = false
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);

      navigate('..', {replace: true});
      
      handleErrorAxios(error, "IPRS Person")
    })
    .then(function () {
      // always executed
    });
  }

  function postResource(data) {
    instance.post(`vps/api/v0/iprs-persons`, data)
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);
      navigate(`../${result.id.toString()}`)

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("IPRS Person posted successfully", {
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
    instance.put(`vps/api/v0/iprs-persons/${id}`, data)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      handlewrite(true)

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("IPRS Person updated successfully", {
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

    instance.delete(`vps/api/v0/iprs-persons/${id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      handlewrite();

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.warning("IPRS Person deleted successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
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

    data["date_of_birth"] = moment(dateOfBirthInput.current.value, "MM-DD-YYYY").format("YYYY-MM-DD");

    const id = idInput.current.value;

    if(selectedResource) {
      putResource(id, data)
    } else {
      postResource(data)
    }
  }

  function resetMugShot() {
    const id = idInput.current.value;
    
    instance.put(`vps/api/v0/iprs-persons/${id}/reset-mug`)
      .then(function (response) {
        // handle success
        console.log(response);
        setIsLoaded(true);

        handlewrite(true)

        // TODO https://fkhadra.github.io/react-toastify/positioning-toast
        toast.success("Mug shot reset successfully", {
          position: toast.POSITION.TOP_RIGHT
        });

        setModalShowMugShot(false);
      })
      .catch(function(error){
        // handle error
        console.error(error);
        setIsLoaded(true);;
        
        handleErrorAxios(error)
      })
      .then(function () {
        // always executed
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

  function initDropzone() {
    // TODO https://github.com/dropzone/dropzone#quickstart
    // if(!dropzone.current) {
    //   dropzone.current = new Dropzone("div#myId",
    //   { url: `http://127.0.0.1/vps/api/v0/iprs-persons/{params.resourceId}`,
    //       method: "put" });
    // }

    const maxFiles = 1;

    // TODO https://docs.dropzone.dev/configuration/tutorials/combine-form-data-with-files#show-me-the-code
    Dropzone.options.uploadForm = { // The camelized version of the ID of the form element

      url: `http://127.0.0.1:8000/vps/api/v0/iprs-persons/${params.resourceId}`,
      paramName: "mug_shot", // The name that will be used to transfer the file
      method: "put",
      // withCredentials: true,
      acceptedFiles: "image/*",
      maxFiles: maxFiles,
      // autoQueue: false,
      addRemoveLinks: true,
      // renameFile: "",
      // forceFallback: true,

      // The configuration we've talked about above
      autoProcessQueue: false,
      // uploadMultiple: true,
      parallelUploads: 100,
      // maxFiles: 100,
      
      // The setting up of the dropzone
      init: function() {
          var myDropzone = this;
          dropzone.current = this;
      
          // First change the button to actually tell Dropzone to process the queue.
          // this.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
          submitButtonMugShot.current.addEventListener("click", function(e) {
              // Make sure that the form isn't actually being sent.
              e.preventDefault();
              e.stopPropagation();
              myDropzone.processQueue();
          });

          clearButtonMugShot.current.addEventListener("click", function(e) {
            // Make sure that the form isn't actually being sent.
            e.preventDefault();
            e.stopPropagation();
            myDropzone.removeAllFiles();
          });


          this.on("sending", function() {
            // Gets triggered when the form is actually being sent.
            // Hide the success button or the complete form.
            setIsLoaded(false);

            // resolveAfterSuccess = new Promise((resolve) => {});
            // toast.promise(
            //     resolveAfterSuccess,
            //     {
            //       pending: 'Promise is pending',
            //       success: 'Promise resolved 👌',
            //       error: 'Promise rejected 🤯'
            //     }
            // )
            toastId.current = toast("Uploading", { autoClose: false }); // TODO https://fkhadra.github.io/react-toastify/update-toast/
          });
          this.on("success", function(files, response) {
              // Gets triggered when the files have successfully been sent.
              // Redirect user or notify of success.
              setIsLoaded(true);
            
              handlewrite(true);

              // resolveAfterSuccess.resolve()
              toast.update(toastId.current, {
                render: "Mug shot uploaded successfully",
                type: toast.TYPE.SUCCESS,
                autoClose: 5000
              }); // TODO https://fkhadra.github.io/react-toastify/update-toast/
          });
          this.on("error", function(files, response) {
              // Gets triggered when there was an error sending the files.
              // Maybe show form again, and notify user of error
              setIsLoaded(true);

              toast.update(toastId.current, {
                render: "Mug shot upload failed",
                type: toast.TYPE.ERROR,
                autoClose: 5000
              }); // TODO https://fkhadra.github.io/react-toastify/update-toast/
          });

          // TODO https://docs.dropzone.dev/configuration/events
          // SUSPENDED
          // this.on("addedfile ", file => {
          //   console.log("A file has been added");

          //   // this.getAcceptedFiles() // all accepted files
          //   // this.getRejectedFiles() // all rejected files
          //   // this.getQueuedFiles() // all queued files
          //   // this.getUploadingFiles() // all uploading files
          //   const queuedFiles = this.getQueuedFiles()
          //   if(queuedFiles.length < maxFiles) {
          //     this.enqueueFile(file)
          //   } else {
          //     toast.info(`You can only upload ${maxFiles} images`, {
          //       position: toast.POSITION.TOP_RIGHT
          //     });
          //   }
          // });
          this.on("maxfilesexceeded ", function(files, response) {
            // TODO https://fkhadra.github.io/react-toastify/positioning-toast
            toast.warning("Only one image is required", {
              position: toast.POSITION.TOP_RIGHT
            });
          });
          // TODO https://docs.dropzone.dev/configuration/basics/methods
          this.on("complete", function(file) {
            this.removeFile(file);
          });
          
          // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
          // of the sending event because uploadMultiple is set to true.
          // this.on("sendingmultiple", function() {
          //     // Gets triggered when the form is actually being sent.
          //     // Hide the success button or the complete form.
          //     setIsLoaded(false);
          // });
          // this.on("successmultiple", function(files, response) {
          //     // Gets triggered when the files have successfully been sent.
          //     // Redirect user or notify of success.
          //     setIsLoaded(false);
          // });
          // this.on("errormultiple", function(files, response) {
          //     // Gets triggered when there was an error sending the files.
          //     // Maybe show form again, and notify user of error
          //     setIsLoaded(true);
          // });
      }
    }

    // TODO https://docs.dropzone.dev/getting-started/setup/declarative
    Dropzone.discover();
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

    idInput.current.value = "";
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

    deleteButton.current.disabled = true
    submitButton.current.disabled = false
  }

  function showDropzone() {
    setDropzoneShow(true)

    thumbnailRef.current.style = "display: none";
    resetButtonMugShot.current.style = "display: none";

    dropzoneRef.current.style = "display: block";
    clearButtonMugShot.current.style = "display: block";
    dropzoneControlsRef.current.style = "display: block";

    if(!dropzone.current) {
      initDropzone();
    }
  }

  function hideDropzone() {
    setDropzoneShow(false)

    thumbnailRef.current.style = "display: block";
    if(selectedResource["mug_shot"]) {
      resetButtonMugShot.current.style = "display: block";
    }

    dropzoneRef.current.style = "display: none";
    clearButtonMugShot.current.style = "display: none";
    dropzoneControlsRef.current.style = "display: none";
  }

  function handleErrorMugShot(e) {
    e.target.src = "/static/vps/broken-image.png"
  }

  return (
    <div className="row">
        <div className={IPRS_PersonClassName}>
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
                        <label>National identification number</label>
                        <input type="text" placeholder="National identification number" className="form-control" ref={idNoInput} name="id_no" />
                    </div>
                    <div className="field col-md-6 col-sm-12  form-group">
                        <label>Passport number</label>
                        <input type="text" placeholder="Passport Number" className="form-control" ref={passportNoInput} name="passport_no" />
                    </div>

                    <div className="field col-md-4 col-sm-12  form-group">
                        <label>First name<span className="required">*</span></label>
                        <input type="text" placeholder="First name" className="form-control" ref={firstNameInput} name="first_name" required="required" />
                    </div>
                    <div className="field col-md-4 col-sm-12  form-group">
                        <label>Middle name</label>
                        <input type="text" placeholder="Middle name" className="form-control" ref={middleNameInput} name="middle_name" />
                    </div>
                    <div className="field col-md-4 col-sm-12  form-group">
                        <label>Last name<span className="required">*</span></label>
                        <input type="text" placeholder="Last name" className="form-control" ref={LastNameInput} name="last_name" required="required" />
                    </div>

                    <div className="field col-md-4 col-sm-12  form-group">
                        <label>Gender<span className="required">*</span></label>
                        {/* <input type="number" placeholder="Gender" className="form-control" ref={genderInput} name="gender" required="required" /> */}
                        <select className="form-control" ref={genderInput} name="gender" required="required">
                          <option value="">Select gender</option>
                          {resourcesGender.map(item => (
                              <option key={item.id} value={item.id}>{item.name}</option>
                          ))}
                        </select>
                    </div>
                    <div className="field col-md-4 col-sm-12  form-group">
                        <label>Nationality<span className="required">*</span></label>
                        {/* <input type="number" placeholder="Nationality" className="form-control" ref={nationalityInput} name="nationality" required="required" /> */}
                        <select className="form-control" ref={nationalityInput} name="nationality" required="required">
                          <option value="">Select nationality</option>
                          {resourcesCountry.map(item => (
                              <option key={item.id} value={item.id}>{item.nationality}</option>
                          ))}
                        </select>
                    </div>
                    <div className="field col-md-4 col-sm-12  form-group">
                        <label>Date of birth<span className="required">*</span></label>
                        {/* <input type="text" placeholder="Date of birth" className="form-control" ref={dateOfBirthInput} name="" required="required" /> */}
                        <input id="birthday" className="form-control" ref={dateOfBirthInput} name="date_of_birth" placeholder="dd-mm-yyyy" type="text" required="required" />
                    </div>


                    <div className="field col-md-3 col-sm-12  form-group">
                        <label>County of birth<span className="required">*</span></label>
                        <input type="text" placeholder="County of birth" className="form-control" ref={countyOfBirthInput} name="county_of_birth" required="required" />
                    </div>
                    <div className="field col-md-3 col-sm-12  form-group">
                        <label>District of birth<span className="required">*</span></label>
                        <input type="text" placeholder="District of birth" className="form-control" ref={districtOfBirthInput} name="district_of_birth" required="required" />
                    </div>
                    <div className="field col-md-3 col-sm-12  form-group">
                        <label>Division of birth<span className="required">*</span></label>
                        <input type="text" placeholder="Division of birth" className="form-control" ref={divisionOfBirthInput} name="division_of_birth" required="required" />
                    </div>
                    <div className="field col-md-3 col-sm-12  form-group">
                        <label>Location of birth<span className="required">*</span></label>
                        <input type="text" placeholder="Location of birth" className="form-control" ref={locationOfBirthInput} name="location_of_birth" required="required" />
                    </div>

                </div>

                {/* <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 ">Nationality</label>
                    <div className="col-md-9 col-sm-9 ">
                    <input type="text" className="form-control" placeholder="nationality" ref={nationalityInput} required="required"/>
                    </div>
                </div> */}

                <div className="ln_solid"></div>
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
            </div>
            </div>
        </div>
        { params.resourceId &&
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

                <div className="thumbnail" ref={thumbnailRef}>
                  <div style={{ height: "100%" }} className="image view view-first">
                    {/* https://stackoverflow.com/questions/3019077/detecting-an-image-404-in-javascript */}
                    <img style={{ width: "100%", display: "block" }} ref={mugShotRef} src="/static/vps/person-placeholder.png" alt="" onError={handleErrorMugShot} />
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
                {/* https://docs.dropzone.dev/configuration/tutorials/combine-form-data-with-files#show-me-the-code */}
                <form id="upload-form" style={{display: "none"}} className="dropzone" ref={dropzoneRef}>
                    {/* <!-- this is were the previews should be shown. --> */}
                    <div className="previews"></div>

                    {/* <!-- Now setup your input fields --> */}
                    {/* <input type="email" name="username" />
                    <input type="password" name="password" />

                    <button type="submit">Submit data and files!</button> */}
                </form>
                <br />
                {/* https://getbootstrap.com/docs/4.1/utilities/flex/ */}
                <div className="d-flex p-2 bd-highlight">
                  <div className="flex-fill">
                    <button type="button"
                            className="btn btn-danger"
                            style={{display: "none"}}
                            ref={resetButtonMugShot}
                            onClick={() => setModalShowMugShot(true)}
                            disabled={!isLoaded}>Reset</button>
                    <button type="button" style={{display: "none"}} className="btn btn-primary" ref={clearButtonMugShot} disabled={!isLoaded}>Remove all</button>
                  </div>
                  <div style={{display: "none"}} className="" ref={dropzoneControlsRef}>
                      <button type="button" className="btn btn-primary" onClick={() => {hideDropzone()}} disabled={!isLoaded}>Cancel</button>
                      <button type="submit" className="btn btn-success" ref={submitButtonMugShot} disabled={!isLoaded}>
                          {!isLoaded &&
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          }
                          Submit
                      </button>
                  </div>
                  {!dropzoneShow &&
                  <div className="">
                      <button type="button" className="btn btn-primary" onClick={() => {showDropzone()}} disabled={!isLoaded}>Upload</button>
                  </div>}
                </div>
            </div>
            </div>
        </div>}
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleconfirm={deleteResource}
            heading="Delete IPRS Person"
            title="Are you sure?"
            body="This action cannot be undone."
            isloading={!isLoaded}
            />
        <MyVerticallyCenteredModal
            show={modalShowMugShot}
            onHide={() => setModalShowMugShot(false)}
            handleconfirm={resetMugShot}
            heading="Reset IPRS Person mug shot"
            title="Are you sure?"
            body="This action cannot be undone."
            isloading={!isLoaded}
            />
    </div>
  );
}