import { useState,  useEffect, useRef } from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { config } from '../../Constants'
import OccurrenceDetail from '../../routes/occurrence_book/occurrence_detail';
import MyVerticallyCenteredModal from '../../components/modal_react_bootstrap';
import { toast } from 'react-toastify';
import { updateQueryStringParameter } from '../../utility/url';
import { handleErrorAxios } from '../../utility/notification';
import Cookies from 'js-cookie';

const axios = require('axios').default;

// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
var url = config.url.API_URL
// var url_users = config.url.API_URL_USERS

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#add-some-routes
export default function Last(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resourcesOccurrenceDetail, setResourcesOccurrenceDetail] = useState([]);
  const [modalShow, setModalShow] = useState(false); // TODO https://react-bootstrap.github.io/components/modal/#vertically-centered
  const [modalShowCloseSession, setModalShowCloseSession] = useState(false);
  const [modalShowEmailAbstract, setModalShowEmailAbstract] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  
  useEffect(() => {
    if(params.resourceId) {
      getResourcesOccurrenceDetail({occurrence: params.resourceId})
    } else {
      setResourcesOccurrenceDetail([])
    }

  }, [params.resourceId, location.search])

  // REST ACTIIONS
  function getResourcesOccurrenceDetail(params) {
    axios.get(`${url}/vps/api/v0/occurrence-details`, {params})
    .then(function (response) {
        // handle success
        console.log(response);
        const result = response.data.results
        setResourcesOccurrenceDetail(result);
    })
    .catch(function(error){
      // handle error
      console.error(error);

      // navigate('..', {replace: true});
      
      handleErrorAxios(error, "Occurrence Detail")
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
    axios.put(`${url}/vps/api/v0/occurrences/${id}`, data, config)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      
      props.goToStep(1)
      setModalShowCloseSession(false);
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

  function deleteResource() {
    const id = params.resourceId

    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.delete(`${url}/vps/api/v0/occurrences/${id}`, config)
        .then(function (response) {
            // handle success
            console.log(response);
            setIsLoaded(true);

            navigate('/vps', {replace: true})

            // TODO https://fkhadra.github.io/react-toastify/positioning-toast
            toast.warning("Occurrence deleted successfully", {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .catch(function(error){
            // handle error
            console.error(error);
            setIsLoaded(true);
            
            handleErrorAxios(error, 'Occurrence')
        })
        .then(function () {
            // always executed
        });
  }

  function handleClose() {
    const id = params.resourceId
    const data = {is_closed: true}

    putResource(id, data)
  }

  function emailAbstract() {
    const id = params.resourceId;
    
    const config = {
      // `headers` are custom headers to be sent
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    axios.put(`${url}/vps/api/v0/occurrences/${id}/email-abstract`, {}, config)
      .then(function (response) {
        // handle success
        console.log(response);
        setIsLoaded(true);

        handlewrite(true)

        // TODO https://fkhadra.github.io/react-toastify/positioning-toast
        toast.success("Email sent successfully", {
          position: toast.POSITION.TOP_RIGHT
        });

        setModalShowEmailAbstract(false);
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
    <div id={"step-"+props.currentStep}>
      <div className="row">
        <div className="col-md-12">

            {resourcesOccurrenceDetail.map(item => (
              <div key={item.id} className="x_panel">
                <div className="x_content">
                  <OccurrenceDetail
                    key={item.id}
                    category={item.category}
                    id={item.id}
                    details={item.details}
                    is_closed={props.is_closed}
                    read_only={true}
                    goToStep={props.goToStep} />
                </div>
              </div>
            ))}

            <div className="row mt-2 mb-3">
            {!props.is_closed &&
              <div className="col-md-2">
                  <button type="button" className="btn btn-warning btn-block" disabled={!params.resourceId || props.is_closed || !resourcesOccurrenceDetail.length} onClick={() => setModalShowCloseSession(true)}><i className="fa fa-archive"></i>&nbsp; CLOSE SESSION</button>
              </div>}
              <div className="col-md-2">
                <button type="button" className="btn btn-primary btn-block my-3-sm" disabled={!params.resourceId} onClick={() => setModalShowEmailAbstract(true)}><i className="fa fa-envelope"></i>&nbsp; EMAIL ABSTRACT</button>
              </div>
              <div className="col"></div>
              <div className="col-md-2">
                <button type="button" className="btn btn-danger btn-block" disabled={!params.resourceId} onClick={() => setModalShow(true)} ><i className="fa fa-exclamation-triangle"></i>&nbsp; DELETE OCCURRENCE</button>
              </div>
            </div>

        </div>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleconfirm={deleteResource}
        heading="Delete Occurrence"
        title="Are you sure?"
        body="This action cannot be undone."
        // isloading={!isLoaded}
        />

      <MyVerticallyCenteredModal
        show={modalShowCloseSession}
        onHide={() => setModalShowCloseSession(false)}
        handleconfirm={handleClose}
        heading="Close session"
        title="Are you sure?"
        body="You cannot edit an ocurrence after the session is closed"
        // isloading={!isLoaded}
        />

    <MyVerticallyCenteredModal
        show={modalShowEmailAbstract}
        onHide={() => setModalShowEmailAbstract(false)}
        handleconfirm={emailAbstract}
        heading="Email abstract"
        title="Are you sure?"
        body="The abstract will be sent to all reporters of this occurrence"
        // isloading={!isLoaded}
        />
    </div>
  );
}