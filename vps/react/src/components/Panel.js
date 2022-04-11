import {
    Link,
    Outlet,
    useSearchParams,
  } from "react-router-dom";

function Panel(props) {
    return (
      <div class="x_panel">
          <div class="x_title">
              <h2>{props.name} <small>{props.desscription}</small></h2>
              <ul class="nav navbar-right panel_toolbox">
                  <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                  </li>
                  <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                      <ul class="dropdown-menu" role="menu">
                          <li><a class="dropdown-item" href="#">Settings 1</a>
                          </li>
                          <li><a class="dropdown-item" href="#">Settings 2</a>
                          </li>
                      </ul>
                  </li>
                  <li><a class="close-link"><i class="fa fa-close"></i></a>
                  </li>
              </ul>
              <div class="clearfix"></div>
          </div>
          <div class="x_content">
              <br />
              <Outlet />
          </div>
      </div>
    );
  }

export default Panel;