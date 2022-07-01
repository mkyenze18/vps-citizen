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
import Cookies from 'js-cookie'
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

const axios = require('axios').default;

// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
var url = config.url.API_URL
// var url_users = config.url.API_URL_USERS

export default function Resource(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resourcesEvidenceCategory, setResourcesEvidenceCategory] = useState([]);
  const [resourcesPoliceOfficer, setResourcesPoliceOfficer] = useState([]);
  const [resourcesEvidenceItemCategory, setResourcesEvidenceItemCategory] = useState([]);
  const [resourcesEvidenceItemImage, setResourcesEvidenceItemImage] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedResourceEvidenceItemImage, setSelectedResourceEvidenceItemImage] = useState(null);
  const [modalShow, setModalShow] = useState(false); // TODO https://react-bootstrap.github.io/components/modal/#vertically-centered
  const [modalShowEvidenceItemImage, setModalShowEvidenceItemImage] = useState(false); // TODO https://react-bootstrap.github.io/components/modal/#vertically-centered

  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  // TODO https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
  // textInput must be declared here so the ref can refer to it
  // const textInput = useRef(null);
  const resourceForm = useRef(null);

  const idInput = useRef(null);

  const evidenceCategoryInput = useRef(null);
  const officerInchargeInput = useRef(null);
  const officersInvolvedInput = useRef(null);
  const locationInput = useRef(null);

  const evidenceItemCategoryInput = useRef(null);

  const makeInput = useRef(null);
  const unitInput = useRef(null);
  const quantityInput = useRef(null);
  const serialNoInput = useRef(null);

  const descriptionInput = useRef(null);

  const evidenceInput = useRef(null);

  const inputRefsArray = [evidenceCategoryInput, officerInchargeInput,
    locationInput,
    evidenceItemCategoryInput, makeInput, unitInput, quantityInput, serialNoInput,
    descriptionInput
]
  
  const deleteButton = useRef(null);
  const cancelButton = useRef(null);
  const submitButton = useRef(null);

  const dropzone = useRef(null);
  const toastId = useRef(null); // TODO https://fkhadra.github.io/react-toastify/update-toast/

  const dropzoneRef = useRef(null);

  const clearButtonMugShot = useRef(null);

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
    getResourcesEvidenceCategory();
    // getResourcesPoliceOfficer(); // TRANSFERRED to getResourcesEvidenceCategory()
    // getResourcesEvidenceItemCategory(); // TRANSFERRED to getResourcesPoliceOfficer()

    // TRANSFERRED to delayGetResourceCall() called in getResourcesEvidenceItemCategory()
    // if(params.resourceId) {
    //   getResource(params.resourceId);
    //   getResourcesEvidenceItemImage(params.resourceId);

    //   evidenceInput.current.value = params.resourceId;
    //   deleteButton.current.style.display = 'inline-block';
    //   cancelButton.current.style.display = 'none'; // UX issues of unknowingly clearing out the fields and potentially saving it after effectively loosing data
    // } else {
    //   setIsLoaded(true);
    //   deleteButton.current.style.display = 'none';
    // }

    initFormValidator();
    if(!dropzone.current) {
      initDropzone();
    }

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
  function getResourcesEvidenceCategory() {
    axios.get(`${url}/vps/api/v0/evidence-categories`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setResourcesEvidenceCategory(response.data.results);
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);
      
      handleErrorAxios(error, 'Evidence Category')
    })
    .then(function () {
      // always executed
      getResourcesPoliceOfficer();
    });
  }

  function getResourcesPoliceOfficer() {
    axios.get(`${url}/vps/api/v0/police-officers`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setResourcesPoliceOfficer(response.data);
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);
      
      handleErrorAxios(error, 'Police Officer')
    })
    .then(function () {
      // always executed
      getResourcesEvidenceItemCategory();
    });
  }
  
  function getResourcesEvidenceItemCategory() {
    axios.get(`${url}/vps/api/v0/evidence-item-categories`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setResourcesEvidenceItemCategory(response.data.results);

      delayGetResourceCall();
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);
      
      handleErrorAxios(error, 'Evidence Item Category')
    })
    .then(function () {
      // always executed
    });
  }

  function getResourcesEvidenceItemImage(id) {
    axios.get(`${url}/vps/api/v0/evidence-item-images?evidence=${id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setResourcesEvidenceItemImage(response.data.results);
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);
      
      handleErrorAxios(error, 'Evidence Item Image')
    })
    .then(function () {
      // always executed
    });
  }

  function delayGetResourceCall() {
    if(params.resourceId) {
      getResource(params.resourceId);
      getResourcesEvidenceItemImage(params.resourceId);

      evidenceInput.current.value = params.resourceId;
      deleteButton.current.style.display = 'inline-block';
      cancelButton.current.style.display = 'none'; // UX issues of unknowingly clearing out the fields and potentially saving it after effectively loosing data
    } else {
      setIsLoaded(true);
      deleteButton.current.style.display = 'none';
    }

  }

  function getResource(id) {
    axios.get(`${url}/vps/api/v0/evidences/${id}`)
    .then(function (response) {
        // handle success
        console.log(response);
        const result = response.data
        setIsLoaded(true);
        setSelectedResource(result)

        idInput.current.value = result["id"];

        evidenceCategoryInput.current.value = result["evidence_category"]["id"];
        officerInchargeInput.current.value = result["officer_incharge"]["id"];
        // officersInvolvedInput.current.value = result["officers_involved"];
        populateOfficersInvolved(result["officers_involved"]);
        locationInput.current.value = result["location"];

        evidenceItemCategoryInput.current.value = result["item_category"]["id"];

        makeInput.current.value = result["make"];
        unitInput.current.value = result["unit"];
        quantityInput.current.value = result["quantity"];
        serialNoInput.current.value = result["serial_no"];

        descriptionInput.current.value = result["description"];

        handleItemCategorySelect();

        // document.querySelector(`#gender${result["gender"]}`).checked = true;
        // document.querySelector(`#gender${result["gender"]}`).required = true;

        // hideDropzone(); // Falied for some resource, may be state related

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
    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.post(`${url}/vps/api/v0/evidences`, data, config)
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);

      if(dropzone.current.getQueuedFiles().length) {
        evidenceInput.current.value = result.id
        dropzone.current.processQueue();
      }

      navigate(`../${result.id.toString()}`)

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Evidence posted successfully", {
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
    axios.put(`${url}/vps/api/v0/evidences/${id}`, data, config)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      if(dropzone.current.getQueuedFiles().length) {
        dropzone.current.processQueue();
      } else {
        handlewrite(true);
      }

      // handlewrite(true);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Evidence updated successfully", {
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
    axios.delete(`${url}/vps/api/v0/evidences/${id}`, config)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      handlewrite();

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.warning("Evidence deleted successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);
      
      handleErrorAxios(error, 'Evidence')
    })
    .then(function () {
      // always executed
    });
  }

  function deleteResourceEvidenceItemEvidence() {
    const id = selectedResourceEvidenceItemImage.id

    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.delete(`${url}/vps/api/v0/evidence-item-images/${id}`, config)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      setModalShowEvidenceItemImage(false);

      handlewrite(true);

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.warning("Evidence Item Image deleted successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);
      
      handleErrorAxios(error, 'Evidence Item Image')
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

    // TODO https://stackoverflow.com/a/27781069
    var result = [];
    var options = officersInvolvedInput.current && officersInvolvedInput.current.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];

      // Skip the first option "Select police officer"
      if(!opt.value) {
        continue;
      }

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }

    data["officers_involved"] = result;

    if(selectedResource) {
      putResource(id, data)
    } else {
      postResource(data)
    }
  }

  function handleDeleteEvidenceItemImage(item) {
    setModalShowEvidenceItemImage(true);
    setSelectedResourceEvidenceItemImage(item);
  }

  function handleItemCategorySelect() {
    // TODO https://stackoverflow.com/a/13964186
    var result = resourcesEvidenceItemCategory.filter(obj => {
      return obj.id === parseInt(evidenceItemCategoryInput.current.value)
    })

    console.log(resourcesEvidenceItemCategory)
    
    let i, opt;
    let makes = result[0]?.makes;

    makeInput.current.innerHTML = ""
    unitInput.current.innerHTML = ""

    if(makes) {
      makeInput.current.parentElement.parentElement.parentElement.style = "display: block";
      makeInput.current.required = true;
      makes = makes.split(",");
      for (i = 0; i<makes.length; i++){
        opt = document.createElement('option');
        opt.value = makes[i];
        opt.innerHTML = makes[i];
        makeInput.current.appendChild(opt);
      }
    } else {
      makeInput.current.parentElement.parentElement.parentElement.style = "display: none";
      makeInput.current.required = false;
    }

    let units = result[0]?.units;
    if(units) {
      unitInput.current.parentElement.parentElement.parentElement.style = "display: block";
      unitInput.current.required = true;
      unitInput.current.innerHTML = ""
      units = units.split(",");
      for (i = 0; i<units.length; i++){
        opt = document.createElement('option');
        opt.value = units[i];
        opt.innerHTML = units[i];
        unitInput.current.appendChild(opt);
      }

      quantityInput.current.parentElement.parentElement.parentElement.style = "display: block";
      quantityInput.current.required = true;
    } else {
      unitInput.current.parentElement.parentElement.parentElement.style = "display: none";
      unitInput.current.required = false;

      quantityInput.current.parentElement.parentElement.parentElement.style = "display: none";
      quantityInput.current.required = false;
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

      url: `${url}/vps/api/v0/evidence-item-images`,
      paramName: "image", // The name that will be used to transfer the file
      method: "post",
      // withCredentials: true,
      acceptedFiles: "image/*",
      // maxFiles: maxFiles,
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
          // submitButtonMugShot.current.addEventListener("click", function(e) {
          //     // Make sure that the form isn't actually being sent.
          //     e.preventDefault();
          //     e.stopPropagation();
          //     myDropzone.processQueue();
          // });

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
                render: "Evidence Item Image uploaded successfully",
                type: toast.TYPE.SUCCESS,
                autoClose: 5000
              }); // TODO https://fkhadra.github.io/react-toastify/update-toast/
          });
          this.on("error", function(files, response) {
              // Gets triggered when there was an error sending the files.
              // Maybe show form again, and notify user of error
              setIsLoaded(true);

              toast.update(toastId.current, {
                render: "Evidence Item Image upload failed",
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
            toast.warning("Maximum upload of 100 images exceeded", {
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

    evidenceCategoryInput.current.value = "";
    officerInchargeInput.current.value = "";
    officersInvolvedInput.current.value = "";
    locationInput.current.value = "";
    
    evidenceItemCategoryInput.current.value = "";

    makeInput.current.value = "";
    unitInput.current.value = "";
    quantityInput.current.value = "";
    serialNoInput.current.value = "";

    descriptionInput.current.value = "";

    deleteButton.current.disabled = true
    submitButton.current.disabled = false
  }

  function populateOfficersInvolved(results) {
    let opt;
    results.forEach((element) => {
      const option = officersInvolvedInput.current.querySelector(`option[value='${element.id}'`)
      if(option) {
        option.selected = true;
      } else {
        opt = document.createElement('option');
        opt.selected = true;
        opt.value = element.id;
        opt.innerHTML = `${element.iprs_person.first_name} ${element.iprs_person.last_name}`;
        officersInvolvedInput.current.appendChild(opt);
      }
    })
  }

  return (
    <div className="row">
        <div className="col-sm-12">
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
              <form id="evidence-form" className="form-label-left input_mask" ref={resourceForm} onSubmit={handleSubmit} noValidate>

                <div className="row">
                    <div className="col-md-8"></div>
                    <div className="field col-md-4 col-sm-12 pull-right form-group">
                        <label>System ID</label>
                        <input type="text" placeholder="System ID" className="form-control" ref={idInput} name="id" readOnly="readonly" />
                    </div>

                </div>

                <div className="row">
                    <div className="field col-md-6 col-sm-12 form-group">
                        <label>Evidence Category<span className="required">*</span></label>
                        {/* <input type="number" placeholder="Gender" className="form-control" ref={genderInput} name="gender" required="required" /> */}
                        <select className="form-control" ref={evidenceCategoryInput} name="evidence_category" required="required">
                          <option value="">Select evidence category</option>
                          {resourcesEvidenceCategory.map(item => (
                              <option key={item.id} value={item.id}>{item.name}</option>
                          ))}
                        </select>
                    </div>
                    <div className="field col-md-6 col-sm-12 form-group">
                        <label>Officer incharge<span className="required">*</span></label>
                        {/* <input type="number" placeholder="Gender" className="form-control" ref={genderInput} name="gender" required="required" /> */}
                        <select className="form-control" ref={officerInchargeInput} name="officer_incharge" required="required">
                          <option value="">Select police officer</option>
                          {resourcesPoliceOfficer.map(item => (
                              <option key={item.id} value={item.id}>{`${item.iprs_person.first_name} ${item.iprs_person.last_name}`}</option>
                          ))}
                        </select>
                    </div>

                    <div className="field col-md-12 col-sm-12 form-group">
                        <label>Officers involved<span className="required">*</span></label>
                        {/* <input type="number" placeholder="Gender" className="form-control" ref={genderInput} name="gender" required="required" /> */}
                        <select className="select2_multiple form-control" multiple="multiple" ref={officersInvolvedInput} name="officers_involved" >
                          {/* <option value="">Select police officer</option> */}
                          {resourcesPoliceOfficer.map(item => (
                              <option key={item.id} value={item.id}>{`${item.iprs_person.first_name} ${item.iprs_person.last_name}`}</option>
                          ))}
                        </select>
                    </div>

                    <div className="field col-md-12 col-sm-12 form-group mb-4">
                        <label>Location</label>
                        <input type="text" placeholder="Location" className="form-control" ref={locationInput} name="location" required="required" />
                    </div>
                      
                    <div className="field col-md-6 col-sm-6 form-group">
                      <div className="form-group row">
                        <label className="control-label col-md-3 col-sm-3 ">Item Category<span className="required">*</span></label>
                        <div className="col-md-9 col-sm-9 ">
                          <select className="form-control" ref={evidenceItemCategoryInput} name="item_category" required="required" onChange={() => handleItemCategorySelect()}>
                            <option value="">Select item category</option>
                            {resourcesEvidenceItemCategory.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="field col-md-6 col-sm-6 form-group" style={{display:"none"}}>
                      <div className="form-group row">
                        <label className="control-label col-md-3 col-sm-3 ">Item Make<span className="required">*</span></label>
                        <div className="col-md-9 col-sm-9 ">
                          <select className="form-control" ref={makeInput} name="make" required="required">
                            <option value="">Select item make</option>
                            {/* {resourcesEvidenceCategory.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))} */}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="field col-md-6 col-sm-6 form-group" style={{display:"none"}}>
                      <div className="form-group row">
                        <label className="control-label col-md-3 col-sm-3 ">Units<span className="required">*</span></label>
                        <div className="col-md-9 col-sm-9 ">
                          <select className="form-control" ref={unitInput} name="unit" required="required">
                            <option value="">Select unit</option>
                            {/* {resourcesEvidenceCategory.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))} */}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="field col-md-6 col-sm-6 form-group" style={{display:"none"}}>
                      <div className="form-group row">
                        <label className="control-label col-md-3 col-sm-3 ">Quantity<span className="required">*</span></label>
                        <div className="col-md-9 col-sm-9 ">
                          <input type="number" placeholder="Quantity" className="form-control" ref={quantityInput} name="quantity" min="0" />
                        </div>
                      </div>
                    </div>

                    <div className="field col-md-12 col-sm-12  form-group">
                        <label>Serial Number</label>
                        <input type="text" placeholder="Serial number" className="form-control" ref={serialNoInput} name="serial_no" />
                    </div>

                    <div className="field col-md-12 col-sm-12  form-group">
                        <label>Description</label>
                        <textarea id="message" required="required" className="form-control" name="description"
                          data-parsley-trigger="keyup" data-parsley-minlength="20" data-parsley-maxlength="100"
                          data-parsley-minlength-message="Come on! You need to enter at least a 20 caracters long comment.."
                          data-parsley-validation-threshold="10" placeholder="Brief Description of the Evidence" ref={descriptionInput}></textarea>
                    </div>

                </div>

                {/* <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 ">Nationality</label>
                    <div className="col-md-9 col-sm-9 ">
                    <input type="text" className="form-control" placeholder="nationality" ref={nationalityInput} required="required"/>
                    </div>
                </div> */}

              </form>
              <div>
                {resourcesEvidenceItemImage &&
                <div className="row">
                  {resourcesEvidenceItemImage.map(item => (
                    <div key={item.id} className="col-md-55">
                      <div className="thumbnail">
                        <div className="image view view-first">
                          <img style={{width: "100%", display: "block"}} src={item.image} alt="" />
                          <div className="mask">
                            <p></p>
                            <div className="tools tools-bottom">
                              {/* <a href="#"><i className="fa fa-link"></i></a> */}
                              {/* <a href="#"><i className="fa fa-pencil"></i></a> */}
                              <a style={{cursor: "pointer"}}><i className="fa fa-times" onClick={() => handleDeleteEvidenceItemImage(item)}></i></a>
                            </div>
                          </div>
                        </div>
                        <div className="caption">
                          {/* <p>Snow and Ice Incoming for the South</p> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>}
                <div>
                  <label>Attach Evidence Image(From Gallery)</label>
                  {/* <p>Attach Evidence Image(From Gallery)</p>
                  <form action="form_upload.html" className="dropzone"></form>
                  <br />
                  <br />
                  <br />
                  <br /> */}

                  {/* https://docs.dropzone.dev/configuration/tutorials/combine-form-data-with-files#show-me-the-code */}
                  <form id="upload-form" className="dropzone" ref={dropzoneRef}>
                      {/* <!-- this is were the previews should be shown. --> */}
                      <div className="previews"></div>

                      {/* <!-- Now setup your input fields --> */}
                      {/* <input type="email" name="username" />
                      <input type="password" name="password" />

                      <button type="submit">Submit data and files!</button> */}

                      <input type="hidden" name="evidence" ref={evidenceInput} />
                  </form>
                </div>
                {/* https://getbootstrap.com/docs/4.1/utilities/flex/ */}
                <div className="d-flex p-2 bd-highlight">
                  <div className="flex-fill">
                    <button type="button" className="btn btn-primary" ref={clearButtonMugShot} disabled={!isLoaded}>Remove all</button>
                  </div>
                  {/* <div style={{display: "none"}} className="" ref={dropzoneControlsRef}>
                      <button type="submit" className="btn btn-success" ref={submitButtonMugShot} disabled={!isLoaded}>
                          {!isLoaded &&
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          }
                          Submit
                      </button>
                  </div> */}
                </div>
              </div>
              <div className="ln_solid"></div>
                {/* https://getbootstrap.com/docs/4.1/utilities/flex/ */}
                <div className="d-flex p-2 bd-highlight">
                  <div className="flex-fill">
                    <button className="btn btn-danger" type="button" ref={deleteButton} onClick={() => setModalShow(true)} disabled={!isLoaded}>Delete</button>
                  </div>
                  <div className="">
                    <button type="button" className="btn btn-primary" ref={cancelButton} onClick={() => {resetForm()}} disabled={!isLoaded}>Cancel</button>
                    <button type="submit" className="btn btn-success" form="evidence-form" ref={submitButton} disabled={!isLoaded}>
                        {!isLoaded &&
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        }
                        Submit
                    </button>
                  </div>
                </div>
            </div>
            </div>
        </div>
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleconfirm={deleteResource}
            heading="Delete Evidence Person"
            title="Are you sure?"
            body="This action cannot be undone."
            isloading={!isLoaded}
            />
        <MyVerticallyCenteredModal
            show={modalShowEvidenceItemImage}
            onHide={() => setModalShowEvidenceItemImage(false)}
            handleconfirm={deleteResourceEvidenceItemEvidence}
            heading="Delete Evidence Item Image Person"
            title="Are you sure?"
            body="This action cannot be undone."
            isloading={!isLoaded}
            />
    </div>
  );
}