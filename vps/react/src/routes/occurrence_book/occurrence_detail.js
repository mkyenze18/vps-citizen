// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#add-some-routes
import { useState,  useEffect, useRef } from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { config } from '../../Constants'
import MyVerticallyCenteredModal from '../../components/modal_react_bootstrap';
import { toast } from 'react-toastify';
import { updateQueryStringParameter } from '../../utility/url';
import { handleErrorAxios } from '../../utility/notification';
import 'icheck/skins/all.css'; // or single skin css
import {Checkbox, Radio, RadioGroup } from 'react-icheck';
import Cookies from 'js-cookie'

const axios = require('axios').default;

// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
var url = config.url.API_URL
// var url_users = config.url.API_URL_USERS

export default function OccurrenceDetail(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resources, setResources] = useState([]);
  const [selectedResourceOccurrenceDetailID, setSelectedResourceOccurrenceDetailID] = useState(null);
  const [selectedResourceOccurrenceDetail, setSelectedResourceOccurrenceDetail] = useState(null);
  const [modalShowOccurrenceDetail, setModalShowOccurrenceDetail] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();
  // let params = useParams();

  const detailRef = useRef(null);

  let details;

  useEffect(() => {

    setResources([]);
    if(props.category) {
      getResources({occurrence_category: props.category});

      // if(props.id && !props.details) {
      //   getResourceOccurrenceDetail(props.id)
      // }
    }

  }, [props.category, props.details])
  
  function getResourceOccurrenceDetail(id) {
    axios.get(`${url}/vps/api/v0/occurrence-details/${id}`)
    .then(function (response) {
        // handle success
        console.log(response);
        const result = response.data
        setIsLoaded(true);

        const details = JSON.parse(result.details);
        populateOccurrenceDetails(details)
    })
    .catch(function(error){
      // handle error
      console.error(error);
      setIsLoaded(true);

      navigate('..', {replace: true});
      
      handleErrorAxios(error, "Occurrence Detail")
    })
    .then(function () {
      // always executed
    });
  }

  function getResources(params) {
    axios.get(`${url}/vps/api/v0/occurrence-category-inputs`, {params})
    .then(function (response) {
        // handle success
        console.log(response);
        const result = response.data.results
        setResources(result);
        if (props.details) {
          details = JSON.parse(props.details);

          setSelectedResourceOccurrenceDetail(details);
          populateOccurrenceDetails(details);

          return;
        }

        if(props.id) {
          getResourceOccurrenceDetail(props.id)
        }
    })
    .catch(function(error){
      // handle error
      console.error(error);

      // navigate('..', {replace: true});
      
      handleErrorAxios(error, "Occurrence Category Input")
    })
    .then(function () {
      // always executed
    });
  }

  function populateOccurrenceDetails(details) {
    Object.keys(details).forEach(element => {
      detailRef.current.querySelector(`[name="${element}"]`).value = details[element];
    });
  }

  function createInput(item) {
    if(item.type === 'select') {
      const choices = item.choices.split(",");

      return <div key={item.id} className="field col-md-12 col-sm-12  form-group">
          <label>{item.label}<span className="required">*</span></label>
          {/* <input type="number" placeholder="Gender" className="form-control" ref={genderInput} name="gender" required="required" /> */}
          <select className="form-control"  name={item.name} >
            <option value="">Select {item.label}</option>
            {choices.map(item => (
                <option key={item} value={item}>{item}</option>
            ))}
          </select>
      </div>

    } else if (item.type === 'radio') {
      const choices = item.choices.split(",");

      return <div key={item.id} className="field col-md-12 col-sm-12  form-group">
        <label className="col-md-3 col-sm-3  control-label pl-0">{item.label}
          {/* <br>
          <small className="text-navy">Normal Bootstrap elements</small> */}
        </label>
        <div className="col-md-9 col-sm-9 ">
        {/* <RadioGroup name="radio"> */}
          {choices.map(choice => (
            // <div key={choice} className="radio">
              // <Radio
              //   value={choice}
              //   name={choice}
              //   // radioClass="iradio_square-blue"
              //   radioClass="iradio_flat-green"
              //   // increaseArea="20%"
              //   label={choice}
              // />
            // </div>
            <div key={choice} className="radio">
              <label>
                <input type="radio" className="flat" name={item.name} /> {choice}
              </label>
            </div>
          ))}
        {/* </RadioGroup> */}
        </div>
      </div>
    
    } else if (item.type === 'checkbox') {
      const choices = item.choices.split(",");

      return <div key={item.id} className="field col-md-12 col-sm-12  form-group">
        <label className="col-md-3 col-sm-3  control-label pl-0">{item.label}
          {/* <br>
          <small className="text-navy">Normal Bootstrap elements</small> */}
        </label>
        <div className="col-md-9 col-sm-9 ">
          {choices.map(choice => (
            // <div key={choice} className="checkbox">
            //   <Checkbox
            //     name={choice}
            //     // checkboxClass="icheckbox_square-blue"
            //     checkboxClass="icheckbox_flat-green"
            //     // increaseArea="20%"
            //     label={choice}
            //   />
            // </div>

            <div key={choice} className="checkbox">
              <label>
                <input type="checkbox" className="flat" name={item.name} /> {choice}
              </label>
            </div>
          ))}
        </div>
      </div>
    
    } else if(item.type === 'textarea') {

      return <div key={item.id} className="field col-md-12 col-sm-12  form-group">
        <label>{item.label}</label>
        <textarea className="form-control" rows="3" placeholder={item.label} name={item.name}></textarea>
      </div>

    } else  {
      // text
      // date
      return <div key={item.id} className="field col-md-12 col-sm-12  form-group">
        <label>{item.label}</label>
        <input type={item.type} placeholder={item.label} className="form-control" name={item.name} />
      </div>

    }
  }

  function deleteResourceReporter() {
    const id = selectedResourceOccurrenceDetailID;

    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.delete(`${url}/vps/api/v0/occurrence-details/${id}`, config)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setModalShowOccurrenceDetail(false);

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

  function handleDeleteOccurrenceDetail(id) {
    setModalShowOccurrenceDetail(true);
    setSelectedResourceOccurrenceDetailID(id);
  }

  // UI ACTIONS

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

  return (
    <div className="row" ref={detailRef}>
      {(props.id && props.details && !props.is_closed) &&
      <div className="col-md-12 d-flex justify-content-between">
        <h2>#{props.id} {selectedResourceOccurrenceDetail?.category_name}</h2>
        <div>
          <button className="btn btn-round btn-warning" type="button" onClick={() => {navigate(`?detail=${props.id}`); props.goToStep(2)}}><i className="fa fa-edit"></i></button>
          <button className="btn btn-round btn-danger" type="button" onClick={() => handleDeleteOccurrenceDetail(props.id)}><i className="fa fa-trash"></i></button>
        </div>
      </div>}

      <fieldset className="col-md-12" disabled={props?.read_only}>
        <input type="hidden" name="id" defaultValue={props.id} readOnly="readonly" />
        <input type="hidden" name="category" defaultValue="0" readOnly="readonly" />
        <input type="hidden" name="category_name" defaultValue="0" readOnly="readonly" />

        {resources?.map(createInput)}
      </fieldset>

      <MyVerticallyCenteredModal
          show={modalShowOccurrenceDetail}
          onHide={() => setModalShowOccurrenceDetail(false)}
          handleconfirm={deleteResourceReporter}
          heading="Delete Occurrence Detail"
          title="Are you sure?"
          body="This action cannot be undone."
          // isloading={!isLoaded}
          />
    </div>
  );
}