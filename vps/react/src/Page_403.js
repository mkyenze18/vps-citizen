// TODO ESLINT OVERRIDES
/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Page_403() {
    return (
    <div className="container body">
      <div className="main_container">
        {/* <!-- page content --> */}
        <div className="col-md-12">
          <div className="col-middle">
            <div className="text-center text-center">
              <h1 className="error-number">403</h1>
              <h2>Access denied</h2>
              <p>Full authentication is required to access this resource. <a href="#">Report this?</a>
              </p>
              <div className="mid_center">
                <h3>Search</h3>
                <form>
                  <div className="  form-group pull-right top_search">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search for..." />
                      <span className="input-group-btn">
                              <button className="btn btn-secondary" type="button">Go!</button>
                          </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /page content --> */}
      </div>
    </div>
    );
}