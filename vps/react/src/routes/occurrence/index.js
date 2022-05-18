import { useState,  useEffect, useRef } from 'react';
import {
    useParams,
    useLocation,
    Outlet,
    Link,
} from "react-router-dom";
import { config } from '../../Constants'
import { updateQueryStringParameter, getQueryVariable } from '../../utility/url';
import { handleErrorAxios } from '../../utility/notification';

  const axios = require('axios').default;

// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
var url = config.url.API_URL
// var url_users = config.url.API_URL_USERS

export default function Occurrences(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [resourcesPoliceStation, setResourcesPoliceStation] = useState([]);
    const [selectedPoliceStationID, setSelectedPoliceStationID] = useState(null);

    let location = useLocation();
    let params = useParams();

    const policeStationInput = useRef(null);

    useEffect(() => {
        getResourcesPoliceStation();
    }, [location.search])

    // REST ACTIIONS

    function getResourcesPoliceStation() {
        axios.get(`${url}/vps/api/v0/police-stations`)
        .then(function (response) {
          // handle success
          console.log(response);
          setIsLoaded(true);
          setResourcesPoliceStation(response.data);
        //   setSelectedPoliceStationID();
            const police_station = getQueryVariable('police_station');
            policeStationInput.current.value =  police_station ? police_station : '';
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

    return(
    <div className="">
        <div className="page-title">
            <div className="title_left">
            <h3>Occurrences <small>Occurrences in the system</small></h3>
            </div>

            <div className="title_right">
                <div className="col-md-3 col-sm-5   form-group pull-right top_search">
                    {/* {!params.resourceId &&
                    <Link to="add"><button className="btn btn-danger" type="button">Add</button></Link>} */}
                    <form>
                        <div className="input-group">
                            {/* <input type="text" className="form-control" placeholder="Search for..."/> */}
                            <select className="form-control" ref={policeStationInput} name="police_station" >
                                <option value="">Select station</option>
                                {resourcesPoliceStation.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                                </select>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="submit">Go!</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="clearfix"></div>
            <Outlet />
        </div>
    );
}