import { useState,  useEffect, useRef } from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { config } from '../../Constants'
import OccurrenceDetail from '../../routes/occurrence_book/occurrence_detail';
import { toast } from 'react-toastify';
import FormValidator from '@yaireo/validator';
import { updateQueryStringParameter, getQueryVariable } from '../../utility/url';
import { handleErrorAxios } from '../../utility/notification';
import Cookies from 'js-cookie'

const axios = require('axios').default;

// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
var url = config.url.API_URL
// var url_users = config.url.API_URL_USERS

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#add-some-routes
export default function Second(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedIPRS_Person, setIsLoadedIPRS_Person] = useState(false);
  const [resourcesOccurrenceCategory, setResourcesOccurrenceCategory] = useState([]);
  const [selectedResourceOccurrenceCategory, setSelectedResourceOccurrenceCategory] = useState(null);
  const [selectedResourceOccurrenceDetailID, setSelectedResourceOccurrenceDetailID] = useState(null);
  // const [selectedResourceOccurrenceDetail, setSelectedResourceOccurrenceDetail] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  const resourceOccurrenceDetailForm = useRef(null);
  const categoryInput = useRef(null);

  useEffect(() => {
    getResourcesOccurrenceCategory();

    const occurrence_detail = getQueryVariable('detail');
    setSelectedResourceOccurrenceDetailID(occurrence_detail);
    if(occurrence_detail) {
      getResourceOccurrenceDetail(occurrence_detail);
    }

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

  }, [params.resourceId, location.search])

  // REST ACTIIONS
  function getResourcesOccurrenceCategory() {
    axios.get(`${url}/vps/api/v0/occurrence-categories`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setResourcesOccurrenceCategory(response.data.results);
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

  function getResourceOccurrenceDetail(id) {
    axios.get(`${url}/vps/api/v0/occurrence-details/${id}`)
    .then(function (response) {
        // handle success
        console.log(response);
        const result = response.data
        setIsLoaded(true);

        // setSelectedResourceOccurrenceDetail(result.details);
        categoryInput.current.value = result.category
        setSelectedResourceOccurrenceCategory(result.category);
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);

      // navigate('..', {replace: true});
      handlewrite(true);
      
      handleErrorAxios(error, "Occurrence Detail")
    })
    .then(function () {
      // always executed
    });
  }

  function handleOccurrenceDetailSelect(e) {
    setSelectedResourceOccurrenceCategory(e.target.value)
  }
 

  function postResourceOccurrenceDetail(data) {
    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.post(`${url}/vps/api/v0/occurrence-details`, data, config)
    .then(function (response) {
      // handle success
      console.log(response);
      const result = response.data
      setIsLoaded(true);

      resetForm();
      handlewrite(true, );

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Occurrence Detail posted successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);
      
      handleErrorAxios(error, 'Occurrence Detail')
    })
    .then(function () {
      // always executed
    });
  }

  function putResourceOccurrenceDetail(id, data) {
    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.put(`${url}/vps/api/v0/occurrence-details/${id}`, data, config)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);

      handlewrite(true)

      // TODO https://fkhadra.github.io/react-toastify/positioning-toast
      toast.success("Occurrence Detail updated successfully", {
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

  function handleSubmitOccurrenceDetail(event) {
    event.preventDefault();

    // initialize a validator instance from the "FormValidator" constructor.
    // A "<form>" element is optionally passed as an argument, but is not a must
    // TODO https://github.com/yairEO/validator#usage-example---validate-on-field-blurinputchange-events
    var validator = new FormValidator({
      "events": ['blur', 'input', 'change'],
      alerts: false // TODO https://github.com/yairEO/validator#example-for-a-given-type-date-field-lets-set-a-custom-general-error-message-like-so
    }, event.target);

    // on form "submit" event
    // TODO https://github.com/yairEO/validator#usage-example---validate-on-submit
    // resourceForm.current.onsubmit = function(e) {
      var submit = true,
          validatorResult = validator.checkAll(event.target);
      console.log(validatorResult);
      if (!!!validatorResult.valid) {
        return
      }
    // };

    setIsLoaded(false);

    const details = {}

    const inputs = event.target.querySelectorAll('input, textarea, select')

    // programmatic form validation since form has "novalidate" attribute
    for (let index = 0; index < inputs.length; index++) {
      const element = inputs[index];
      details[element.name] = element.value;
      if(element.required) {
        if(!element.value) {
          setIsLoaded(true);
          return;
        }
      }
    }

    // TODO https://stackoverflow.com/a/14976565/10401826
    // var sel = document.getElementById("box1");
    var sel = categoryInput.current;
    var text = sel.options[sel.selectedIndex].text;
    details["category_name"] = text;

    const data = {
      occurrence: params.resourceId,
      category: selectedResourceOccurrenceCategory,
      details: JSON.stringify(details),
    }

    const id = event.target.querySelector('[name="id"]').value;

    if(parseInt(id)) {
      putResourceOccurrenceDetail(id, data)
    } else {
      postResourceOccurrenceDetail(data)
    }
  }

  // UI ACTIONS
  function handlewrite(stayInPage = false, detail='') {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const query_string = location.search
    let update_query_string = updateQueryStringParameter(query_string, 'updated', timestamp);
    update_query_string = updateQueryStringParameter(update_query_string, 'detail', detail);
    if(stayInPage) {
        navigate(`?${update_query_string}`, { replace: true })
    } else {
        navigate(`..?${update_query_string}`, { replace: true })
    }
  }

  function resetForm() {
    handlewrite(true);
    categoryInput.current.value = ""
    setSelectedResourceOccurrenceCategory(null);
  }

  return (
    <div id={"step-"+props.currentStep}>
      <div className="row">
        <div className="col-md-12">
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
              <form className="form-label-left input_mask" ref={resourceOccurrenceDetailForm} onSubmit={handleSubmitOccurrenceDetail} noValidate>

              <div className="row justify-content-end">
                <div className="field col-md-4 col-sm-12  form-group">
                    <label>Category<span className="required">*</span></label>
                    {/* <input type="number" placeholder="Nationality" className="form-control" ref={nationalityInput} name="nationality" required="required" /> */}
                    <select className="form-control" ref={categoryInput} name="category" onChange={(e) => handleOccurrenceDetailSelect(e)} >
                      <option value="">Select category</option>
                      {resourcesOccurrenceCategory.map(item => (
                          <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                </div>
                <div className='col'></div>
                <div className="field col-md-1 col-sm-12  form-group d-flex justify-content-end align-items-end">
                  <button type="button" className="btn btn-primary" onClick={() => {resetForm()}} disabled={!selectedResourceOccurrenceCategory}>cancel</button>
                  <button type="submit" className="btn btn-success" disabled={!selectedResourceOccurrenceCategory}>Submit</button>
                </div>
              </div>

              <OccurrenceDetail
                category={selectedResourceOccurrenceCategory}
                id={selectedResourceOccurrenceDetailID}
                // datails={selectedResourceOccurrenceDetail?.details}
                />
              
              {/* <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3 ">Nationality</label>
                  <div className="col-md-9 col-sm-9 ">
                  <input type="text" className="form-control" placeholder="nationality" ref={nationalityInput} required="required"/>
                  </div>
              </div> */}

              </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
  }