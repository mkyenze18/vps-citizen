import {
    useParams,
    Outlet,
    Link,
  } from "react-router-dom";

export default function Police_Officers(props) {
    let params = useParams();

    return(
    <div className="">
        <div className="page-title">
            <div className="title_left">
            <h3>Police Officers <small>Police Officers in the system</small></h3>
            </div>

            <div className="title_right">
                <div className="col-md-3 col-sm-5   form-group pull-right top_search">
                    {!params.resourceId &&
                    <Link to="add"><button className="btn btn-danger" type="button">Add</button></Link>}
                    {/* <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for..."/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button">Go!</button>
                    </span>
                    </div> */}
                </div>
            </div>
        </div>

        <div className="clearfix"></div>
            <Outlet />
        </div>
    );
}