// TODO ESLINT OVERRIDES
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link } from "react-router-dom";

export default function Home() {
    return (
      <div className="">
        <div className="page-title">
          <div className="title_left">
            <h3>Actions</h3>
          </div>

          {/* <div className="title_right">
            <div className="col-md-5 col-sm-5   form-group pull-right top_search">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." />
                <span className="input-group-btn">
                  <button className="btn btn-secondary" type="button">Go!</button>
                </span>
              </div>
            </div>
          </div> */}
        </div>

        <div className="clearfix"></div>

        {/* https://bbbootstrap.com/snippets/bootstrap-list-grid-view-template-74271163 */}
        <div className="col-md-4" style={{ marginTop: '27px' }}>
          <Link to="occurrence-book/add" >
            <div className="card p-3">
                <div className="d-flex flex-row mb-3 align-items-center">
                  {/* <img src="https://i.imgur.com/ccMhxvC.png" width="70" alt="" /> */}
                  <i className="fa fa-book" style={{ fontSize: '30px' }}></i>
                  <div className="d-flex flex-column ml-2">
                    <h3>Occurrence Book</h3>
                    {/* <span className="text-black-50">Payment Services</span> */}
                    {/* <span className="ratings">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </span> */}
                  </div>
                </div>
                <h6>Make a new entry into the occurence book</h6>
                <div className="d-flex justify-content-between install mt-3">
                  <span></span>
                  {/* <span style={{fontSize: '12px' }}>Installed 172 times</span> */}
                  {/* <span class="text-primary">View&nbsp;<i class="fa fa-angle-right"></i></span> */}
                </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4" style={{ marginTop: '27px' }}>
          <Link to="arrests" >
            <div className="card p-3">
                <div className="d-flex flex-row mb-3 align-items-center">
                  {/* <img src="https://i.imgur.com/ccMhxvC.png" width="70" alt="" /> */}
                  <i className="fa fa-key" style={{ fontSize: '30px' }}></i>
                  <div className="d-flex flex-column ml-2">
                    <h3>Arrest</h3>
                    {/* <span className="text-black-50">Payment Services</span> */}
                    {/* <span className="ratings">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </span> */}
                  </div>
                </div>
                <h6>Make a new arrest</h6>
                <div className="d-flex justify-content-between install mt-3">
                  <span></span>
                  {/* <span style={{fontSize: '12px' }}>Installed 172 times</span> */}
                  {/* <span class="text-primary">View&nbsp;<i class="fa fa-angle-right"></i></span> */}
                </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4" style={{ marginTop: '27px' }}>
          <Link to="evidences" >
            <div className="card p-3">
                <div className="d-flex flex-row mb-3 align-items-center">
                  {/* <img src="https://i.imgur.com/ccMhxvC.png" width="70" alt="" /> */}
                  <i className="fa fa-briefcase" style={{ fontSize: '30px' }}></i>
                  <div className="d-flex flex-column ml-2">
                    <h3>Evidence</h3>
                    {/* <span className="text-black-50">Payment Services</span> */}
                    {/* <span className="ratings">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </span> */}
                  </div>
                </div>
                <h6>Make a new entry into the evidence</h6>
                <div className="d-flex justify-content-between install mt-3">
                  <span></span>
                  {/* <span style={{fontSize: '12px' }}>Installed 172 times</span> */}
                  {/* <span class="text-primary">View&nbsp;<i class="fa fa-angle-right"></i></span> */}
                </div>
            </div>
          </Link>
        </div>

        <div className="clearfix"></div>

        <div className="col-md-4" style={{ marginTop: '27px' }}>
          <Link to="ob-report" >
            <div className="card p-3">
                <div className="d-flex flex-row mb-3 align-items-center">
                  {/* <img src="https://i.imgur.com/ccMhxvC.png" width="70" alt="" /> */}
                  <i className="fa fa-book" style={{ fontSize: '30px' }}></i>
                  <div className="d-flex flex-column ml-2">
                    <h3>Minor Offences</h3>
                    {/* <span className="text-black-50">Payment Services</span> */}
                    {/* <span className="ratings">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </span> */}
                  </div>
                </div>
                <h6>Make a new entry into the occurence book</h6>
                <div className="d-flex justify-content-between install mt-3">
                  <span></span>
                  {/* <span style={{fontSize: '12px' }}>Installed 172 times</span> */}
                  {/* <span class="text-primary">View&nbsp;<i class="fa fa-angle-right"></i></span> */}
                </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4" style={{ marginTop: '27px' }}>
          <Link to="ob-report" >
            <div className="card p-3">
                <div className="d-flex flex-row mb-3 align-items-center">
                  {/* <img src="https://i.imgur.com/ccMhxvC.png" width="70" alt="" /> */}
                  <i className="fa fa-book" style={{ fontSize: '30px' }}></i>
                  <div className="d-flex flex-column ml-2">
                    <h3>Traffic</h3>
                    {/* <span className="text-black-50">Payment Services</span> */}
                    {/* <span className="ratings">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </span> */}
                  </div>
                </div>
                <h6>Make a new entry into the occurence book</h6>
                <div className="d-flex justify-content-between install mt-3">
                  <span></span>
                  {/* <span style={{fontSize: '12px' }}>Installed 172 times</span> */}
                  {/* <span class="text-primary">View&nbsp;<i class="fa fa-angle-right"></i></span> */}
                </div>
            </div>
            </Link>
        </div>
        <div className="col-md-4" style={{ marginTop: '27px' }}>
          <Link to="ob-report" >
            <div className="card p-3">
                <div className="d-flex flex-row mb-3 align-items-center">
                  {/* <img src="https://i.imgur.com/ccMhxvC.png" width="70" alt="" /> */}
                  <i className="fa fa-book" style={{ fontSize: '30px' }}></i>
                  <div className="d-flex flex-column ml-2">
                    <h3>Applications</h3>
                    {/* <span className="text-black-50">Payment Services</span> */}
                    {/* <span className="ratings">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </span> */}
                  </div>
                </div>
                <h6>Make a new entry into the occurence book</h6>
                <div className="d-flex justify-content-between install mt-3">
                  <span></span>
                  {/* <span style={{fontSize: '12px' }}>Installed 172 times</span> */}
                  {/* <span class="text-primary">View&nbsp;<i class="fa fa-angle-right"></i></span> */}
                </div>
            </div>
          </Link>
        </div>

        <div className="clearfix"></div>

        <div className="col-md-4" style={{ marginTop: '27px' }}>
          <Link to="ob-report" >
            <div className="card p-3">
                <div className="d-flex flex-row mb-3 align-items-center">
                  {/* <img src="https://i.imgur.com/ccMhxvC.png" width="70" alt="" /> */}
                  <i className="fa fa-book" style={{ fontSize: '30px' }}></i>
                  <div className="d-flex flex-column ml-2">
                    <h3>VPS Citizen</h3>
                    {/* <span className="text-black-50">Payment Services</span> */}
                    {/* <span className="ratings">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </span> */}
                  </div>
                </div>
                <h6>Make a new entry into the occurence book</h6>
                <div className="d-flex justify-content-between install mt-3">
                  <span></span>
                  {/* <span style={{fontSize: '12px' }}>Installed 172 times</span> */}
                  {/* <span class="text-primary">View&nbsp;<i class="fa fa-angle-right"></i></span> */}
                </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4" style={{ marginTop: '27px' }}>
          <Link to="ob-report" >
            <div className="card p-3">
                <div className="d-flex flex-row mb-3 align-items-center">
                  {/* <img src="https://i.imgur.com/ccMhxvC.png" width="70" alt="" /> */}
                  <i className="fa fa-book" style={{ fontSize: '30px' }}></i>
                  <div className="d-flex flex-column ml-2">
                    <h3>OCS Actions</h3>
                    {/* <span className="text-black-50">Payment Services</span> */}
                    {/* <span className="ratings">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </span> */}
                  </div>
                </div>
                <h6>Make a new entry into the occurence book</h6>
                <div className="d-flex justify-content-between install mt-3">
                  <span></span>
                  {/* <span style={{fontSize: '12px' }}>Installed 172 times</span> */}
                  {/* <span class="text-primary">View&nbsp;<i class="fa fa-angle-right"></i></span> */}
                </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4" style={{ marginTop: '27px' }}>
          <Link to="ob-report" >
            <div className="card p-3">
                <div className="d-flex flex-row mb-3 align-items-center">
                  {/* <img src="https://i.imgur.com/ccMhxvC.png" width="70" alt="" /> */}
                  <i className="fa fa-book" style={{ fontSize: '30px' }}></i>
                  <div className="d-flex flex-column ml-2">
                    <h3>BI Reports</h3>
                    {/* <span className="text-black-50">Payment Services</span> */}
                    {/* <span className="ratings">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </span> */}
                  </div>
                </div>
                <h6>Make a new entry into the occurence book</h6>
                <div className="d-flex justify-content-between install mt-3">
                  <span></span>
                  {/* <span style={{fontSize: '12px' }}>Installed 172 times</span> */}
                  {/* <span class="text-primary">View&nbsp;<i class="fa fa-angle-right"></i></span> */}
                </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }