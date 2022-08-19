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
import { useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";

export default function App() {
	function doSomething(e) {
        // 
    }

	useEffect(() => {
		const scripts = [
			'/static/gentelella/build/js/custom.js',
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
	  }, []);

  return (
    <div className="main_container">
		<div className="col-md-3 left_col">
			<div className="left_col scroll-view">
				<div className="navbar nav_title" style={{ border: 0 }}>
					<a href="index.html" className="site_title"><i className="fa fa-paw"></i> <span>Gentelella Alela!</span></a>
				</div>

				<div className="clearfix"></div>

				{/* <!-- menu profile quick info --> */}
				<div className="profile clearfix">
					<div className="profile_pic">
						<img src="images/img.jpg" alt="..." className="img-circle profile_img"/>
					</div>
					<div className="profile_info">
						<span>Welcome,</span>
						<h2>John Doe</h2>
					</div>
				</div>
				{/* <!-- /menu profile quick info --> */}

				<br />

				{/* <!-- sidebar menu --> */}
				<div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
					<div className="menu_section">
						<h3>General</h3>
						<ul className="nav side-menu">
							<li><button><i className="fa fa-home"></i> Home <span className="fa fa-chevron-down"></span></button>
								<ul className="nav child_menu">
									<li><a href="index.html">Dashboard</a></li>
									<li><a href="index2.html">Dashboard2</a></li>
									<li><a href="index3.html">Dashboard3</a></li>
								</ul>
							</li>
							<li><button><i className="fa fa-edit"></i> Forms <span className="fa fa-chevron-down"></span></button>
								<ul className="nav child_menu">
									<li><Link to="/form">General Form</Link></li>
									<li><a href="form_advanced.html">Advanced Components</a></li>
									<li><a href="form_validation.html">Form Validation</a></li>
									<li><a href="form_wizards.html">Form Wizard</a></li>
									<li><a href="form_upload.html">Form Upload</a></li>
									<li><a href="form_buttons.html">Form Buttons</a></li>
								</ul>
							</li>
							<li><button><i className="fa fa-desktop"></i> UI Elements <span className="fa fa-chevron-down"></span></button>
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
							<li><button><i className="fa fa-table"></i> Tables <span className="fa fa-chevron-down"></span></button>
								<ul className="nav child_menu">
									<li><a href="tables.html">Tables</a></li>
									<li><a href="tables_dynamic.html">Table Dynamic</a></li>
								</ul>
							</li>
							<li><button><i className="fa fa-bar-chart-o"></i> Data Presentation <span className="fa fa-chevron-down"></span></button>
								<ul className="nav child_menu">
									<li><a href="chartjs.html">Chart JS</a></li>
									<li><a href="chartjs2.html">Chart JS2</a></li>
									<li><a href="morisjs.html">Moris JS</a></li>
									<li><a href="echarts.html">ECharts</a></li>
									<li><a href="other_charts.html">Other Charts</a></li>
								</ul>
							</li>
							<li><button><i className="fa fa-clone"></i>Layouts <span className="fa fa-chevron-down"></span></button>
								<ul className="nav child_menu">
									<li><a href="fixed_sidebar.html">Fixed Sidebar</a></li>
									<li><a href="fixed_footer.html">Fixed Footer</a></li>
								</ul>
							</li>
						</ul>
					</div>
					<div className="menu_section">
						<h3>Live On</h3>
						<ul className="nav side-menu">
							<li><button><i className="fa fa-bug"></i> Additional Pages <span className="fa fa-chevron-down"></span></button>
								<ul className="nav child_menu">
									<li><a href="e_commerce.html">E-commerce</a></li>
									<li><a href="projects.html">Projects</a></li>
									<li><a href="project_detail.html">Project Detail</a></li>
									<li><a href="contacts.html">Contacts</a></li>
									<li><a href="profile.html">Profile</a></li>
								</ul>
							</li>
							<li><button><i className="fa fa-windows"></i> Extras <span className="fa fa-chevron-down"></span></button>
								<ul className="nav child_menu">
									<li><a href="page_403.html">403 Error</a></li>
									<li><a href="page_404.html">404 Error</a></li>
									<li><a href="page_500.html">500 Error</a></li>
									<li><a href="plain_page.html">Plain Page</a></li>
									<li><a href="login.html">Login Page</a></li>
									<li><a href="pricing_tables.html">Pricing Tables</a></li>
								</ul>
							</li>
							<li><button><i className="fa fa-sitemap"></i> Multilevel Menu <span className="fa fa-chevron-down"></span></button>
								<ul className="nav child_menu">
									<li><a href="#level1_1">Level One</a></li>
									<li><button>Level One<span className="fa fa-chevron-down"></span></button>
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
							<li><button onClick={doSomething}><i className="fa fa-laptop"></i> Landing Page <span className="label label-success pull-right">Coming Soon</span></button></li>
						</ul>
					</div>

				</div>
				{/* <!-- /sidebar menu --> */}

				{/* <!-- /menu footer buttons --> */}
				<div className="sidebar-footer hidden-small">
					<button data-toggle="tooltip" data-placement="top" title="Settings">
						<span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
					</button>
					<button data-toggle="tooltip" data-placement="top" title="FullScreen">
						<span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
					</button>
					<button data-toggle="tooltip" data-placement="top" title="Lock">
						<span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
					</button>
					<a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
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
					<button id="menu_toggle"><i className="fa fa-bars"></i></button>
				</div>
				<nav className="nav navbar-nav">
					<ul className=" navbar-right">
						<li className="nav-item dropdown open" style={{ paddingLeft: '15px' }}>
							<button onClick={doSomething} className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
								<img src="images/img.jpg" alt=""/>John Doe
							</button>
							<div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
								<button className="dropdown-item" onClick={doSomething}> Profile</button>
								<button className="dropdown-item" onClick={doSomething}>
									<span className="badge bg-red pull-right">50%</span>
									<span>Settings</span>
								</button>
								<button className="dropdown-item" onClick={doSomething}>Help</button>
								<button className="dropdown-item" href="login.html"><i className="fa fa-sign-out pull-right"></i> Log Out</button>
							</div>
						</li>

						<li role="presentation" className="nav-item dropdown open">
							<button onClick={doSomething} className="dropdown-toggle info-number" id="navbarDropdown1" data-toggle="dropdown" aria-expanded="false">
								<i className="fa fa-envelope-o"></i>
								<span className="badge bg-green">6</span>
							</button>
							<ul className="dropdown-menu list-unstyled msg_list" role="menu" aria-labelledby="navbarDropdown1">
								<li className="nav-item">
									<button className="dropdown-item">
										<span className="image"><img src="images/img.jpg" alt="Profile" /></span>
										<span>
											<span>John Smith</span>
											<span className="time">3 mins ago</span>
										</span>
										<span className="message">
											Film festivals used to be do-or-die moments for movie makers. They were where...
										</span>
									</button>
								</li>
								<li className="nav-item">
									<button className="dropdown-item">
										<span className="image"><img src="images/img.jpg" alt="Profile" /></span>
										<span>
											<span>John Smith</span>
											<span className="time">3 mins ago</span>
										</span>
										<span className="message">
											Film festivals used to be do-or-die moments for movie makers. They were where...
										</span>
									</button>
								</li>
								<li className="nav-item">
									<button className="dropdown-item">
										<span className="image"><img src="images/img.jpg" alt="Profile" /></span>
										<span>
											<span>John Smith</span>
											<span className="time">3 mins ago</span>
										</span>
										<span className="message">
											Film festivals used to be do-or-die moments for movie makers. They were where...
										</span>
									</button>
								</li>
								<li className="nav-item">
									<button className="dropdown-item">
										<span className="image"><img src="images/img.jpg" alt="Profile" /></span>
										<span>
											<span>John Smith</span>
											<span className="time">3 mins ago</span>
										</span>
										<span className="message">
											Film festivals used to be do-or-die moments for movie makers. They were where...
										</span>
									</button>
								</li>
								<li className="nav-item">
									<div className="text-center">
										<button className="dropdown-item">
											<strong>See All Alerts</strong>
											<i className="fa fa-angle-right"></i>
										</button>
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
				Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
			</div>
			<div className="clearfix"></div>
		</footer>
		{/* <!-- /footer content --> */}
	</div>
  );
}