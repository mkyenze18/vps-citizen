// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#using-a-bundler
// export default function App() {
//   return (
//     <div>
//       <h1>Bookkeeper!</h1>
//     </div>
//   );
// }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#connect-the-url
// import { Link } from "react-router-dom";

// export default function App() {
//   return (
//     <div>
//       <h1>Bookkeeper</h1>
//       <nav
//         style={{
//           borderBottom: "solid 1px",
//           paddingBottom: "1rem",
//         }}
//       >
//         <Link to="/invoices">Invoices</Link> |{" "}
//         <Link to="/expenses">Expenses</Link>
//       </nav>
//     </div>
//   );
// }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#nested-routes
// import { Outlet, Link } from "react-router-dom";

// export default function App() {
//   return (
//     <div>
//       <h1>Bookkeeper</h1>
//       <nav
//         style={{
//           borderBottom: "solid 1px",
//           paddingBottom: "1rem",
//         }}
//       >
//         <Link to="/invoices">Invoices</Link> |{" "}
//         <Link to="/expenses">Expenses</Link>
//       </nav>
//       <Outlet />
//     </div>
//   );
// }

// ! YOUR CODE STARTS HERE
// TODO ESLINT OVERRIDES
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/img-redundant-alt */

import { useState, useEffect } from 'react';
import {
  useNavigate
} from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { config } from './Constants'
import { handleErrorAxios } from './utility/notification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios').default;

// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
var url = config.url.API_URL
// var url_users = config.url.API_URL_USERS

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedResourcePoliceOfficer, setSelectedResourcePoliceOfficer] = useState(null);

  let navigate = useNavigate();

	function doSomething(e) {
        // 
    }

	useEffect(() => {
    getResourcePoliceOfficer(window.police_officer);

    // const stylesheets = [
		// 	'/static/gentelella/vendors/bootstrap/dist/css/bootstrap.min.css', // Bootstrap
    //   '/static/gentelella/vendors/font-awesome/css/font-awesome.min.css', // Font Awesome
    //   '/static/gentelella/vendors/nprogress/nprogress.css', // NProgress
    //   '/static/gentelella/vendors/iCheck/skins/flat/green.css', // iCheck
    //   '/static/gentelella/vendors/google-code-prettify/bin/prettify.min.css', // bootstrap-wysiwyg
    //   '/static/gentelella/vendors/select2/dist/css/select2.min.css', // Select2
    //   '/static/gentelella/vendors/switchery/dist/switchery.min.css', // Switchery
    //   '/static/gentelella/vendors/starrr/dist/starrr.css', // starrr
    //   '/static/gentelella/vendors/bootstrap-daterangepicker/daterangepicker.css', // bootstrap-daterangepicker
    //   '/static/gentelella/build/css/custom.min.css', // Custom Theme Style
		// ]
		// stylesheets.forEach(element => {
    //   // TODO https://stackoverflow.com/questions/28386125/dynamically-load-a-stylesheet-with-react
		// 	var head = document.head;
    //   var link = document.createElement("link");

    //   link.type = "text/css";
    //   link.rel = "stylesheet";
    //   link.href = element;

    //   head.appendChild(link);

    //   return () => { head.removeChild(link); }
		// });

		const scripts = [
      // '/static/gentelella/vendors/jquery/dist/jquery.min.js', // jQuery
      // '/static/gentelella/vendors/bootstrap/dist/js/bootstrap.bundle.min.js', // Bootstrap
      // '/static/gentelella/vendors/fastclick/lib/fastclick.js', // FastClick
      // '/static/gentelella/vendors/nprogress/nprogress.js', // NProgress
      // '/static/gentelella/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js', // bootstrap-progressbar
      // '/static/gentelella/vendors/iCheck/icheck.min.js', // iCheck
      // '/static/gentelella/vendors/moment/min/moment.min.js', // bootstrap-daterangepicker
      // '/static/gentelella/vendors/bootstrap-daterangepicker/daterangepicker.js',
      // '/static/gentelella/vendors/bootstrap-wysiwyg/js/bootstrap-wysiwyg.min.js', // bootstrap-wysiwyg
      // '/static/gentelella/vendors/jquery.hotkeys/jquery.hotkeys.js', 
      // '/static/gentelella/vendors/google-code-prettify/src/prettify.js', 
      // '/static/gentelella/vendors/jquery.tagsinput/src/jquery.tagsinput.js', // jQuery Tags Input
      // '/static/gentelella/vendors/switchery/dist/switchery.min.js', // Switchery
      // '/static/gentelella/vendors/select2/dist/js/select2.full.min.js', // Select2
      // '/static/gentelella/vendors/parsleyjs/dist/parsley.min.js', // Parsley
      // '/static/gentelella/vendors/autosize/dist/autosize.min.js', // Autosize
      // '/static/gentelella/vendors/devbridge-autocomplete/dist/jquery.autocomplete.min.js', // jQuery autocomplete
      // '/static/gentelella/vendors/starrr/dist/starrr.js', // starrr
      // '/static/vps/gentelella_validation_form.js', // form_validation.html
			'/static/gentelella/build/js/custom.js', // Custom Theme Scripts
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
	}, [selectedResourcePoliceOfficer?.id]);

  function getResourcePoliceOfficer(id) {
    axios.get(`${url}/vps/api/v0/police-officers/${id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      setIsLoaded(true);
      setSelectedResourcePoliceOfficer(response.data);
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

  return (
    <div className="container body">
      <div className="main_container">
        <div className="col-md-3 left_col">
          <div className="left_col scroll-view">
            <div className="navbar nav_title" style={{ border: 0 }}>
              <Link to="/vps" className="site_title">
                {/* <i className="fa fa-paw"></i> */}
                <img src="/static/vps/logo.png" alt="ie" style={{ objectFit: "contain" }} />
                {/* <span>VPS</span> */}
              </Link>
            </div>

            <div className="clearfix"></div>

            {/* <!-- menu profile quick info --> */}
            <div className="profile clearfix">
              <div className="profile_pic">
                <img src={selectedResourcePoliceOfficer ? url+selectedResourcePoliceOfficer?.mug_shot : "/static/gentelella/production/images/img.jpg"} alt="..." className="img-circle profile_img"/>
              </div>
              <div className="profile_info">
                <span>Welcome,</span>
                <h2>{selectedResourcePoliceOfficer?.service_number}</h2>
              </div>
            </div>
            {/* <!-- /menu profile quick info --> */}

            <br />

            {/* <!-- sidebar menu --> */}
            <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
              <div className="menu_section">
                <h3>General</h3>
                <ul className="nav side-menu">
                  <li><Link to="occurrences"><i className="fa fa-book"></i>Occurrences</Link></li>
                  <li><Link to="police-officers"><i className="fa fa-user"></i>Police Officer</Link></li>
                  <li><Link to="iprs-persons"><i className="fa fa-users"></i>IPRS Person</Link></li>
                  <li><a><i className="fa fa-cogs"></i> System <span className="fa fa-chevron-down"></span></a>
                    <ul className="nav child_menu">
                      <li><Link to="genders">Genders</Link></li>
                      <li><Link to="countries">Countries</Link></li>
                      <li><Link to="ranks">Ranks</Link></li>
                      <li><Link to="police-stations">Police Stations</Link></li>
                      <li><Link to="occurrence-categories">Occurrence Categories</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="menu_section">
                <ul className="nav side-menu">
                  <li><a><i className="fa fa-bug"></i> Samples <span className="fa fa-chevron-down"></span></a>
                    <ul className="nav child_menu">
                      <li><a><i className="fa fa-home"></i> Home <span className="fa fa-chevron-down"></span></a>
                        <ul className="nav child_menu">
                          <li><Link to="index1">Dashboard</Link></li>
                          <li><a href="index2.html">Dashboard2</a></li>
                          <li><a href="index3.html">Dashboard3</a></li>
                        </ul>
                      </li>
                      <li><a><i className="fa fa-edit"></i> Forms <span className="fa fa-chevron-down"></span></a>
                        <ul className="nav child_menu">
                          <li><Link to="form">General Form</Link></li>
                          <li><a href="form_advanced.html">Advanced Components</a></li>
                          <li><a href="form_validation.html">Form Validation</a></li>
                          <li><a href="form_wizards.html">Form Wizard</a></li>
                          <li><a href="form_upload.html">Form Upload</a></li>
                          <li><a href="form_buttons.html">Form Buttons</a></li>
                        </ul>
                      </li>
                      <li><a><i className="fa fa-desktop"></i> UI Elements <span className="fa fa-chevron-down"></span></a>
                        <ul className="nav child_menu">
                          <li><a href="general_elements.html">General Elements</a></li>
                          <li><a href="media_gallery.html">Media Gallery</a></li>
                          <li><a href="typography.html">Typography</a></li>
                          <li><a href="icons.html">Icons</a></li>
                          <li><a href="glyphicons.html">Glyphicons</a></li>
                          <li><a href="widgets.html">Widgets</a></li>
                          <li><a href="invoice.html">Invoice</a></li>
                          <li><a href="inbox.html">Inbox</a></li>
                          <li><a href="calendar.html">Calendar</a></li>
                        </ul>
                      </li>
                      <li><a><i className="fa fa-table"></i> Tables <span className="fa fa-chevron-down"></span></a>
                        <ul className="nav child_menu">
                          <li><a href="tables.html">Tables</a></li>
                          <li><a href="tables_dynamic.html">Table Dynamic</a></li>
                        </ul>
                      </li>
                      <li><a><i className="fa fa-bar-chart-o"></i> Data Presentation <span className="fa fa-chevron-down"></span></a>
                        <ul className="nav child_menu">
                          <li><a href="chartjs.html">Chart JS</a></li>
                          <li><a href="chartjs2.html">Chart JS2</a></li>
                          <li><a href="morisjs.html">Moris JS</a></li>
                          <li><a href="echarts.html">ECharts</a></li>
                          <li><a href="other_charts.html">Other Charts</a></li>
                        </ul>
                      </li>
                      <li><a><i className="fa fa-clone"></i>Layouts <span className="fa fa-chevron-down"></span></a>
                        <ul className="nav child_menu">
                          <li><a href="fixed_sidebar.html">Fixed Sidebar</a></li>
                          <li><a href="fixed_footer.html">Fixed Footer</a></li>
                        </ul>
                      </li>
                    </ul>
                    <ul className="nav child_menu">
                      <li><a><i className="fa fa-bug"></i> Additional Pages <span className="fa fa-chevron-down"></span></a>
                        <ul className="nav child_menu">
                          <li><a href="e_commerce.html">E-commerce</a></li>
                          <li><a href="projects.html">Projects</a></li>
                          <li><a href="project_detail.html">Project Detail</a></li>
                          <li><a href="contacts.html">Contacts</a></li>
                          <li><a href="profile.html">Profile</a></li>
                        </ul>
                      </li>
                      <li><a><i className="fa fa-windows"></i> Extras <span className="fa fa-chevron-down"></span></a>
                        <ul className="nav child_menu">
                          <li><a href="page_403.html">403 Error</a></li>
                          <li><a href="page_404.html">404 Error</a></li>
                          <li><a href="page_500.html">500 Error</a></li>
                          <li><a href="plain_page.html">Plain Page</a></li>
                          <li><a href="login.html">Login Page</a></li>
                          <li><a href="pricing_tables.html">Pricing Tables</a></li>
                        </ul>
                      </li>
                      <li><a><i className="fa fa-sitemap"></i> Multilevel Menu <span className="fa fa-chevron-down"></span></a>
                        <ul className="nav child_menu">
                            <li><a href="#level1_1">Level One</a></li>
                            <li><a>Level One<span className="fa fa-chevron-down"></span></a>
                              <ul className="nav child_menu">
                                <li className="sub_menu"><a href="level2.html">Level Two</a>
                                </li>
                                <li><a href="#level2_1">Level Two</a>
                                </li>
                                <li><a href="#level2_2">Level Two</a>
                                </li>
                              </ul>
                            </li>
                            <li><a href="#level1_2">Level One</a>
                            </li>
                        </ul>
                      </li>                  
                      <li><a href="javascript:;"><i className="fa fa-laptop"></i> Landing Page <span className="label label-success pull-right">Coming Soon</span></a></li>
                    </ul>
                  </li>
                </ul>
              </div>
              

            </div>
            {/* <!-- /sidebar menu --> */}

            {/* <!-- /menu footer buttons --> */}
            <div className="sidebar-footer hidden-small">
              <a data-toggle="tooltip" data-placement="top" title="Settings">
                <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Lock">
                <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Logout" href="/user/logout">
                <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
              </a>
            </div>
            {/* <!-- /menu footer buttons --> */}
          </div>
        </div>

        {/* <!-- top navigation --> */}
        <div className="top_nav">
          <div className="nav_menu">
              <div className="nav toggle">
                <a id="menu_toggle"><i className="fa fa-bars"></i></a>
              </div>
              <nav className="nav navbar-nav">
              <ul className=" navbar-right">
                <li className="nav-item dropdown open" style={{ paddingeft: '15px' }}>
                  <a href="javascript:;" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                    <img src={selectedResourcePoliceOfficer ? url+selectedResourcePoliceOfficer?.mug_shot : "/static/gentelella/production/images/img.jpg"} alt=""/>{selectedResourcePoliceOfficer?.service_number}
                  </a>
                  <div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                    {/* <a className="dropdown-item"  href="javascript:;"> Profile</a>
                    <a className="dropdown-item"  href="javascript:;">
                      <span className="badge bg-red pull-right">50%</span>
                      <span>Settings</span>
                    </a>
                    <a className="dropdown-item"  href="javascript:;">Help</a> */}
                    <a className="dropdown-item"  href="/task_manager/tasks"><i className="fa fa-tasks pull-right"></i> Tasks</a>
                    <a className="dropdown-item"  href="/user/logout"><i className="fa fa-sign-out pull-right"></i> Log Out</a>
                  </div>
                </li>

                <li role="presentation" className="nav-item dropdown open">
                  <a href="javascript:;" className="dropdown-toggle info-number" id="navbarDropdown1" data-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-envelope-o"></i>
                    <span className="badge bg-green">6</span>
                  </a>
                  <ul className="dropdown-menu list-unstyled msg_list" role="menu" aria-labelledby="navbarDropdown1">
                    <li className="nav-item">
                      <a className="dropdown-item">
                        <span className="image"><img src="/static/gentelella/production/images/img.jpg" alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="dropdown-item">
                        <span className="image"><img src="/static/gentelella/production/images/img.jpg" alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="dropdown-item">
                        <span className="image"><img src="/static/gentelella/production/images/img.jpg" alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="dropdown-item">
                        <span className="image"><img src="/static/gentelella/production/images/img.jpg" alt="Profile" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <div className="text-center">
                        <a className="dropdown-item">
                          <strong>See All Alerts</strong>
                          <i className="fa fa-angle-right"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* <!-- /top navigation --> */}

        {/* <!-- page content --> */}
        <div className="right_col" role="main">
          <Outlet />
        </div>
        {/* <!-- /page content --> */}

        {/* <!-- footer content --> */}
        <footer>
          <div className="pull-right">
            VPS - Protorype created by <a href="https://ingenious.or.ke" target="_blank">ingenious.or.ke</a>
          </div>
          <div className="clearfix"></div>
        </footer>
        {/* <!-- /footer content --> */}

        <ToastContainer />
      </div>
    </div>
  );
}