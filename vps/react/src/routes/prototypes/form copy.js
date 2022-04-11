// import Panel from "../components/Panel" // In what direction should components flow

export default function Form() {
    function timeFunctionLong(e) {
        setTimeout(function() {
            // TODO https://reactjs.org/docs/events.html#mouse-events
            e.relatedTarget.input.type = 'text';
        }, 60000);
    }

    return (
        <div className="">
        <div className="page-title">
            <div className="title_left">
                <h3>Form Elements</h3>
            </div>

            <div className="title_right">
                <div className="col-md-5 col-sm-5  form-group pull-right top_search">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for..." />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button">Go!</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div className="clearfix"></div>
        <div className="row">
            <div className="col-md-12 col-sm-12 ">
                {/* <Panel name="Form Design" desscription="different form elements"/> */}
                
                <div className="x_panel">
                    <div className="x_title">
                        <h2>Form Design <small>different form elements</small></h2>
                        <ul className="nav navbar-right panel_toolbox">
                            <li><button className="collapse-link"><i className="fa fa-chevron-up"></i></button>
                            </li>
                            <li className="dropdown">
                                <button href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-wrench"></i></button>
                                <ul className="dropdown-menu" role="menu">
                                    <li><button className="dropdown-item" href="#">Settings 1</button>
                                    </li>
                                    <li><button className="dropdown-item" href="#">Settings 2</button>
                                    </li>
                                </ul>
                            </li>
                            <li><button className="close-link"><i className="fa fa-close"></i></button>
                            </li>
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <br />
                        <form id="demo-form2" data-parsley-validate className="form-horizontal form-label-left">

                            <div className="item form-group">
                                <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">First Name <span className="required">*</span>
                                </label>
                                <div className="col-md-6 col-sm-6 ">
                                    <input type="text" id="first-name" required="required" className="form-control "/>
                                </div>
                            </div>
                            <div className="item form-group">
                                <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Last Name <span className="required">*</span>
                                </label>
                                <div className="col-md-6 col-sm-6 ">
                                    <input type="text" id="last-name" name="last-name" required="required" className="form-control"/>
                                </div>
                            </div>
                            <div className="item form-group">
                                <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Middle Name / Initial</label>
                                <div className="col-md-6 col-sm-6 ">
                                    <input id="middle-name" className="form-control" type="text" name="middle-name"/>
                                </div>
                            </div>
                            <div className="item form-group">
                                <label className="col-form-label col-md-3 col-sm-3 label-align">Gender</label>
                                <div className="col-md-6 col-sm-6 ">
                                    <div id="gender" className="btn-group" data-toggle="buttons">
                                        <label className="btn btn-secondary" data-toggle-className="btn-primary" data-toggle-passive-className="btn-default">
                                            <input type="radio" name="gender" value="male" className="join-btn"/> &nbsp; Male &nbsp;
                                        </label>
                                        <label className="btn btn-primary" data-toggle-className="btn-primary" data-toggle-passive-className="btn-default">
                                            <input type="radio" name="gender" value="female" className="join-btn"/> Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="item form-group">
                                <label className="col-form-label col-md-3 col-sm-3 label-align">Date Of Birth <span className="required">*</span>
                                </label>
                                <div className="col-md-6 col-sm-6 ">
                                    <input id="birthday" className="date-picker form-control" placeholder="dd-mm-yyyy" type="text" required="required" onFocus="this.type='date'" onMouseOver="this.type='date'" onClick="this.type='date'" onBlur="this.type='text'" onMouseOut={timeFunctionLong}/>
                                </div>
                            </div>
                            <div className="ln_solid"></div>
                            <div className="item form-group">
                                <div className="col-md-6 col-sm-6 offset-md-3">
                                    <button className="btn btn-primary" type="button">Cancel</button>
                                    <button className="btn btn-primary" type="reset">Reset</button>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 ">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>Form Design <small>different form elements</small></h2>
                        <ul className="nav navbar-right panel_toolbox">
                            <li><button className="collapse-link"><i className="fa fa-chevron-up"></i></button>
                            </li>
                            <li className="dropdown">
                                <button href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-wrench"></i></button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button className="dropdown-item" href="#">Settings 1</button>
                                    <button className="dropdown-item" href="#">Settings 2</button>
                                </div>
                            </li>
                            <li><button className="close-link"><i className="fa fa-close"></i></button>
                            </li>
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <br />
                        <form className="form-label-left input_mask">

                            <div className="col-md-6 col-sm-6  form-group has-feedback">
                                <input type="text" className="form-control has-feedback-left" id="inputSuccess2" placeholder="First Name"/>
                                <span className="fa fa-user form-control-feedback left" aria-hidden="true"></span>
                            </div>

                            <div className="col-md-6 col-sm-6  form-group has-feedback">
                                <input type="text" className="form-control" id="inputSuccess3" placeholder="Last Name"/>
                                <span className="fa fa-user form-control-feedback right" aria-hidden="true"></span>
                            </div>

                            <div className="col-md-6 col-sm-6  form-group has-feedback">
                                <input type="email" className="form-control has-feedback-left" id="inputSuccess4" placeholder="Email"/>
                                <span className="fa fa-envelope form-control-feedback left" aria-hidden="true"></span>
                            </div>

                            <div className="col-md-6 col-sm-6  form-group has-feedback">
                                <input type="tel" className="form-control" id="inputSuccess5" placeholder="Phone"/>
                                <span className="fa fa-phone form-control-feedback right" aria-hidden="true"></span>
                            </div>

                            <div className="form-group row">
                                <label className="col-form-label col-md-3 col-sm-3 ">Default Input</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <input type="text" className="form-control" placeholder="Default Input"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3 col-sm-3 ">Disabled Input </label>
                                <div className="col-md-9 col-sm-9 ">
                                    <input type="text" className="form-control" disabled="disabled" placeholder="Disabled Input"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3 col-sm-3 ">Read-Only Input</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <input type="text" className="form-control" readonly="readonly" placeholder="Read-Only Input"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3 col-sm-3 ">Date Of Birth <span className="required">*</span>
                                </label>
                                <div className="col-md-9 col-sm-9 ">
                                    <input className="date-picker form-control" placeholder="dd-mm-yyyy" type="text" required="required" onFocus="this.type='date'" onMouseOver="this.type='date'" onClick="this.type='date'" onBlur="this.type='text'" onMouseOut="timeFunctionLong"/>
                                </div>
                            </div>
                            <div className="ln_solid"></div>
                            <div className="form-group row">
                                <div className="col-md-9 col-sm-9  offset-md-3">
                                    <button type="button" className="btn btn-primary">Cancel</button>
                                    <button className="btn btn-primary" type="reset">Reset</button>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

                <div className="x_panel">
                    <div className="x_title">
                        <h2>Star Rating</h2>
                        <ul className="nav navbar-right panel_toolbox">
                            <li><button className="collapse-link"><i className="fa fa-chevron-up"></i></button>
                            </li>
                            <li className="dropdown">
                                <button href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-wrench"></i></button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button className="dropdown-item" href="#">Settings 1</button>
                                    <button className="dropdown-item" href="#">Settings 2</button>
                                </div>
                            </li>
                            <li><button className="close-link"><i className="fa fa-close"></i></button>
                            </li>
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <h4>Star Ratings<small> Hover and click on a star</small></h4>
                        <div>
                            <div className="starrr stars"></div>
                            You gave a rating of <span className="stars-count">0</span> star(s)
                        </div>

                        <p>Also you can give a default rating by adding attribute data-rating</p>
                        <div className="starrr stars-existing" data-rating='4'></div>
                        You gave a rating of <span className="stars-count-existing">4</span> star(s)
                    </div>
                </div>

                <div className="x_panel">
                    <div className="x_title">
                        <h2>Registration Form <small>Click to validate</small></h2>
                        <ul className="nav navbar-right panel_toolbox">
                            <li><button className="collapse-link"><i className="fa fa-chevron-up"></i></button>
                            </li>
                            <li className="dropdown">
                                <button href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-wrench"></i></button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button className="dropdown-item" href="#">Settings 1</button>
                                    <button className="dropdown-item" href="#">Settings 2</button>
                                </div>
                            </li>
                            <li><button className="close-link"><i className="fa fa-close"></i></button>
                            </li>
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">

                        {/* <!-- start form for validation --> */}
                        <form id="demo-form" data-parsley-validate>
                            <label for="fullname">Full Name * :</label>
                            <input type="text" id="fullname" className="form-control" name="fullname" required />

                            <label for="email">Email * :</label>
                            <input type="email" id="email" className="form-control" name="email" data-parsley-trigger="change" required />

                            <label>Gender *:</label>
                            <p>
                                M:
                                <input type="radio" className="flat" name="gender" id="genderM" value="M" checked="" required /> F:
                                <input type="radio" className="flat" name="gender" id="genderF" value="F" />
                            </p>

                            <label>Hobbies (2 minimum):</label>
                            <p style={{ padding: '5px' }}>
                                <input type="checkbox" name="hobbies[]" id="hobby1" value="ski" data-parsley-mincheck="2" required className="flat" /> Skiing
                                <br />

                                <input type="checkbox" name="hobbies[]" id="hobby2" value="run" className="flat" /> Running
                                <br />

                                <input type="checkbox" name="hobbies[]" id="hobby3" value="eat" className="flat" /> Eating
                                <br />

                                <input type="checkbox" name="hobbies[]" id="hobby4" value="sleep" className="flat" /> Sleeping
                                <br />
        </p>
        <p>

          <label for="heard">Heard us by *:</label>
          <select id="heard" className="form-control" required>
            <option value="">Choose..</option>
            <option value="press">Press</option>
            <option value="net">Internet</option>
            <option value="mouth">Word of mouth</option>
          </select>

          <label for="message">Message (20 chars min, 100 max) :</label>
          <textarea id="message" required="required" className="form-control" name="message" data-parsley-trigger="keyup" data-parsley-minlength="20" data-parsley-maxlength="100" data-parsley-minlength-message="Come on! You need to enter at least a 20 caracters long comment.." data-parsley-validation-threshold="10"></textarea>

          <br />
          <span className="btn btn-primary">Validate form</span>
        </p>

                        </form>
                        {/* <!-- end form for validations --> */}

                    </div>
                </div>


            </div>

            <div className="col-md-6 ">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>Form Basic Elements <small>different form elements</small></h2>
                        <ul className="nav navbar-right panel_toolbox">
                            <li><button className="collapse-link"><i className="fa fa-chevron-up"></i></button>
                            </li>
                            <li className="dropdown">
                                <button href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-wrench"></i></button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button className="dropdown-item" href="#">Settings 1</button>
                                    <button className="dropdown-item" href="#">Settings 2</button>
                                </div>
                            </li>
                            <li><button className="close-link"><i className="fa fa-close"></i></button>
                            </li>
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <br />
                        <form className="form-horizontal form-label-left">

                            <div className="form-group row ">
                                <label className="control-label col-md-3 col-sm-3 ">Default Input</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <input type="text" className="form-control" placeholder="Default Input"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="control-label col-md-3 col-sm-3 ">Disabled Input </label>
                                <div className="col-md-9 col-sm-9 ">
                                    <input type="text" className="form-control" disabled="disabled" placeholder="Disabled Input"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="control-label col-md-3 col-sm-3 ">Read-Only Input</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <input type="text" className="form-control" readonly="readonly" placeholder="Read-Only Input"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="control-label col-md-3 col-sm-3 ">Date Of Birth <span className="required">*</span>
                                </label>
                                <div className="col-md-9 col-sm-9 ">
                                    <textarea className="form-control" rows="3" placeholder="Date Of Birth"></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="control-label col-md-3 col-sm-3 ">Password</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <input type="password" className="form-control" value="passwordonetwo"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="control-label col-md-3 col-sm-3 ">AutoComplete</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <input type="text" name="country" id="autocomplete-custom-append" className="form-control col-md-10" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="control-label col-md-3 col-sm-3 ">Select</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <select className="form-control">
                                        <option>Choose option</option>
                                        <option>Option one</option>
                                        <option>Option two</option>
                                        <option>Option three</option>
                                        <option>Option four</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="control-label col-md-3 col-sm-3 ">Select Custom</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <select className="select2_single form-control" tabindex="-1">
                                        <option></option>
                                        <option value="AK">Alaska</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="CA">California</option>
                                        <option value="NV">Nevada</option>
                                        <option value="OR">Oregon</option>
                                        <option value="WA">Washington</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="CO">Colorado</option>
                                        <option value="ID">Idaho</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="UT">Utah</option>
                                        <option value="WY">Wyoming</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TX">Texas</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="control-label col-md-3 col-sm-3 ">Select Grouped</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <select className="select2_group form-control">
                                        <optgroup label="Alaskan/Hawaiian Time Zone">
                                            <option value="AK">Alaska</option>
                                            <option value="HI">Hawaii</option>
                                        </optgroup>
                                        <optgroup label="Pacific Time Zone">
                                            <option value="CA">California</option>
                                            <option value="NV">Nevada</option>
                                            <option value="OR">Oregon</option>
                                            <option value="WA">Washington</option>
                                        </optgroup>
                                        <optgroup label="Mountain Time Zone">
                                            <option value="AZ">Arizona</option>
                                            <option value="CO">Colorado</option>
                                            <option value="ID">Idaho</option>
                                            <option value="MT">Montana</option>
                                            <option value="NE">Nebraska</option>
                                            <option value="NM">New Mexico</option>
                                            <option value="ND">North Dakota</option>
                                            <option value="UT">Utah</option>
                                            <option value="WY">Wyoming</option>
                                        </optgroup>
                                        <optgroup label="Central Time Zone">
                                            <option value="AL">Alabama</option>
                                            <option value="AR">Arkansas</option>
                                            <option value="IL">Illinois</option>
                                            <option value="IA">Iowa</option>
                                            <option value="KS">Kansas</option>
                                            <option value="KY">Kentucky</option>
                                            <option value="LA">Louisiana</option>
                                            <option value="MN">Minnesota</option>
                                            <option value="MS">Mississippi</option>
                                            <option value="MO">Missouri</option>
                                            <option value="OK">Oklahoma</option>
                                            <option value="SD">South Dakota</option>
                                            <option value="TX">Texas</option>
                                            <option value="TN">Tennessee</option>
                                            <option value="WI">Wisconsin</option>
                                        </optgroup>
                                        <optgroup label="Eastern Time Zone">
                                            <option value="CT">Connecticut</option>
                                            <option value="DE">Delaware</option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="IN">Indiana</option>
                                            <option value="ME">Maine</option>
                                            <option value="MD">Maryland</option>
                                            <option value="MA">Massachusetts</option>
                                            <option value="MI">Michigan</option>
                                            <option value="NH">New Hampshire</option>
                                            <option value="NJ">New Jersey</option>
                                            <option value="NY">New York</option>
                                            <option value="NC">North Carolina</option>
                                            <option value="OH">Ohio</option>
                                            <option value="PA">Pennsylvania</option>
                                            <option value="RI">Rhode Island</option>
                                            <option value="SC">South Carolina</option>
                                            <option value="VT">Vermont</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WV">West Virginia</option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="control-label col-md-3 col-sm-3 ">Select Multiple</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <select className="select2_multiple form-control" multiple="multiple">
                                        <option>Choose option</option>
                                        <option>Option one</option>
                                        <option>Option two</option>
                                        <option>Option three</option>
                                        <option>Option four</option>
                                        <option>Option five</option>
                                        <option>Option six</option>
                                    </select>
                                </div>
                            </div>

                            <div className="control-group row">
                                <label className="control-label col-md-3 col-sm-3 ">Input Tags</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <input id="tags_1" type="text" className="tags form-control" value="social, adverts, sales" />
                                    <div id="suggestions-container" style={{ position: 'relative', float: 'left', width: '250px', margin: '10px' }}></div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-sm-3  control-label">Checkboxes and radios
                                    <br/>
                                    <small className="text-navy">Normal Bootstrap elements</small>
                                </label>

                                <div className="col-md-9 col-sm-9 ">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" value=""/> Option one. select more than one options
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" value=""/> Option two. select more than one options
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" checked="" value="option1" id="optionsRadios1" name="optionsRadios"/> Option one. only select one option
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" value="option2" id="optionsRadios2" name="optionsRadios"/> Option two. only select one option
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 col-sm-3  control-label">Checkboxes and radios
                                    <br/>
                                    <small className="text-navy">Normal Bootstrap elements</small>
                                </label>

                                <div className="col-md-9 col-sm-9 ">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" className="flat" checked="checked"/> Checked
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" className="flat"/> Unchecked
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" className="flat" disabled="disabled"/> Disabled
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" className="flat" disabled="disabled" checked="checked"/> Disabled & checked
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" className="flat" checked name="iCheck"/> Checked
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" className="flat" name="iCheck"/> Unchecked
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" className="flat" name="iCheck" disabled="disabled"/> Disabled
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" className="flat" name="iCheck3" disabled="disabled" checked/> Disabled & Checked
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="control-label col-md-3 col-sm-3 ">Switch</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <div className="">
                                        <label>
                                            <input type="checkbox" className="js-switch" checked /> Checked
                                        </label>
                                    </div>
                                    <div className="">
                                        <label>
                                            <input type="checkbox" className="js-switch" /> Unchecked
                                        </label>
                                    </div>
                                    <div className="">
                                        <label>
                                            <input type="checkbox" className="js-switch" disabled="disabled" /> Disabled
                                        </label>
                                    </div>
                                    <div className="">
                                        <label>
                                            <input type="checkbox" className="js-switch" disabled="disabled" checked="checked" /> Disabled Checked
                                        </label>
                                    </div>
                                </div>
                            </div>


                            <div className="ln_solid"></div>
                            <div className="form-group">
                                <div className="col-md-9 col-sm-9  offset-md-3">
                                    <button type="button" className="btn btn-primary">Cancel</button>
                                    <button type="reset" className="btn btn-primary">Reset</button>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>


            <div className="col-md-6 col-sm-12 ">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>Form Buttons <small>Sessions</small></h2>
                        <ul className="nav navbar-right panel_toolbox">
                            <li><button className="collapse-link"><i className="fa fa-chevron-up"></i></button>
                            </li>
                            <li className="dropdown">
                                <button href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-wrench"></i></button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button className="dropdown-item" href="#">Settings 1</button>
                                    <button className="dropdown-item" href="#">Settings 2</button>
                                </div>
                            </li>
                            <li><button className="close-link"><i className="fa fa-close"></i></button>
                            </li>
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">

                        <form className="form-horizontal form-label-left">

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Button addons</label>

                                <div className="col-sm-9">
                                    <div className="input-group">
                                        <span className="input-group-btn">
                                            <button type="button" className="btn btn-primary go-class">Go!</button>
                                        </span>
                                        <input type="text" className="form-control"/>
                                    </div>
                                    <div className="input-group">
                                        <input type="text" className="form-control"/>
                                        <span className="input-group-btn">
                                            <button type="button" className="btn btn-primary">Go!</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="divider-dashed"></div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Button addons</label>

                                <div className="col-sm-9">
                                    <div className="dropdown input-group row">
                                        <input type="text" className="form-control" aria-label="Text input with dropdown button"/>
                                        <div className="input-group-btn">
                                            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Action <span className="caret"></span>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                                <li><button className="dropdown-item" href="#">Action</button>
                                                </li>
                                                <li><button className="dropdown-item" href="#">Another action</button>
                                                </li>
                                                <li><button className="dropdown-item" href="#">Something else here</button>
                                                </li>
                                                <li className="divider"></li>
                                                <li><button className="dropdown-item" href="#">Separated link</button>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* <!-- /btn-group --> */}
                                    </div>
                                    <div className="input-group">
                                        <input type="text" className="form-control"/>
                                        <span className="input-group-btn">
                                            <button type="button" className="btn btn-primary">Go!</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-md-12 col-sm-12 ">
            <div className="x_panel">
                <div className="x_title">
                    <h2>Text areas<small>Sessions</small></h2>
                    <ul className="nav navbar-right panel_toolbox">
                        <li><button className="collapse-link"><i className="fa fa-chevron-up"></i></button>
                        </li>
                        <li className="dropdown">
                            <button href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-wrench"></i></button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button className="dropdown-item" href="#">Settings 1</button>
                                <button className="dropdown-item" href="#">Settings 2</button>
                            </div>
                        </li>
                        <li><button className="close-link"><i className="fa fa-close"></i></button>
                        </li>
                    </ul>
                    <div className="clearfix"></div>
                </div>
                <div className="x_content">
                    <div id="alerts"></div>
                    <div className="btn-toolbar editor" data-role="editor-toolbar" data-target="#editor-one">
                        <div className="btn-group">
                            <button className="btn dropdown-toggle" data-toggle="dropdown" title="Font"><i className="fa fa-font"></i><b className="caret"></b></button>
                            <ul className="dropdown-menu">
                            </ul>
                        </div>

                        <div className="btn-group">
                            <button className="btn dropdown-toggle" data-toggle="dropdown" title="Font Size"><i className="fa fa-text-height"></i>&nbsp;<b className="caret"></b></button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button data-edit="fontSize 5">
                                        <p style={{ fontSize: '17px' }}>Huge</p>
                                    </button>
                                </li>
                                <li>
                                    <button data-edit="fontSize 3">
                                        <p style={{ fontSize: '14px' }}>Normal</p>
                                    </button>
                                </li>
                                <li>
                                    <button data-edit="fontSize 1">
                                        <p style={{ fontSize: '11px' }}>Small</p>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="btn-group">
                            <button className="btn" data-edit="bold" title="Bold (Ctrl/Cmd+B)"><i className="fa fa-bold"></i></button>
                            <button className="btn" data-edit="italic" title="Italic (Ctrl/Cmd+I)"><i className="fa fa-italic"></i></button>
                            <button className="btn" data-edit="strikethrough" title="Strikethrough"><i className="fa fa-strikethrough"></i></button>
                            <button className="btn" data-edit="underline" title="Underline (Ctrl/Cmd+U)"><i className="fa fa-underline"></i></button>
                        </div>

                        <div className="btn-group">
                            <button className="btn" data-edit="insertunorderedlist" title="Bullet list"><i className="fa fa-list-ul"></i></button>
                            <button className="btn" data-edit="insertorderedlist" title="Number list"><i className="fa fa-list-ol"></i></button>
                            <button className="btn" data-edit="outdent" title="Reduce indent (Shift+Tab)"><i className="fa fa-dedent"></i></button>
                            <button className="btn" data-edit="indent" title="Indent (Tab)"><i className="fa fa-indent"></i></button>
                        </div>

                        <div className="btn-group">
                            <button className="btn" data-edit="justifyleft" title="Align Left (Ctrl/Cmd+L)"><i className="fa fa-align-left"></i></button>
                            <button className="btn" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)"><i className="fa fa-align-center"></i></button>
                            <button className="btn" data-edit="justifyright" title="Align Right (Ctrl/Cmd+R)"><i className="fa fa-align-right"></i></button>
                            <button className="btn" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)"><i className="fa fa-align-justify"></i></button>
                        </div>

                        <div className="btn-group">
                            <button className="btn dropdown-toggle" data-toggle="dropdown" title="Hyperlink"><i className="fa fa-link"></i></button>
                            <div className="dropdown-menu input-append">
                                <input className="span2" placeholder="URL" type="text" data-edit="createLink" />
                                <button className="btn" type="button">Add</button>
                            </div>
                            <button className="btn" data-edit="unlink" title="Remove Hyperlink"><i className="fa fa-cut"></i></button>
                        </div>

                        <div className="btn-group">
                            <button className="btn" title="Insert picture (or just drag & drop)" id="pictureBtn"><i className="fa fa-picture-o"></i></button>
                            <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" />
                        </div>

                        <div className="btn-group">
                            <button className="btn" data-edit="undo" title="Undo (Ctrl/Cmd+Z)"><i className="fa fa-undo"></i></button>
                            <button className="btn" data-edit="redo" title="Redo (Ctrl/Cmd+Y)"><i className="fa fa-repeat"></i></button>
                        </div>
                    </div>

                    <div id="editor-one" className="editor-wrapper"></div>

                    <textarea name="descr" id="descr" style={{ display: 'none' }}></textarea>

                    <br />

                    <div className="ln_solid"></div>

                    <div className="form-group">
                        <label className="control-label col-md-3 col-sm-3 ">Resizable Text area</label>
                        <div className="col-md-9 col-sm-9 ">
                            <textarea className="resizable_textarea form-control" placeholder="This text area automatically resizes its height as you fill in more text courtesy of autosize-master it out..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="x_panel">
            <div className="x_title">
                <h2>Form Input Grid <small>form input </small></h2>
                <ul className="nav navbar-right panel_toolbox">
                    <li><button className="collapse-link"><i className="fa fa-chevron-up"></i></button>
                    </li>
                    <li className="dropdown">
                        <button href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-wrench"></i></button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" href="#">Settings 1</button>
                            <button className="dropdown-item" href="#">Settings 2</button>
                        </div>
                    </li>
                    <li><button className="close-link"><i className="fa fa-close"></i></button>
                    </li>
                </ul>
                <div className="clearfix"></div>
            </div>
            <div className="x_content">

                <div className="row">

                    <div className="col-md-12 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-12" className="form-control"/>
                    </div>

                    <div className="col-md-6 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-6" className="form-control"/>
                    </div>

                    <div className="col-md-6 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-6" className="form-control"/>
                    </div>


                    <div className="col-md-4 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-4" className="form-control"/>
                    </div>

                    <div className="col-md-4 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-4" className="form-control"/>
                    </div>

                    <div className="col-md-4 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-4" className="form-control"/>
                    </div>


                    <div className="col-md-3 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-3" className="form-control"/>
                    </div>

                    <div className="col-md-3 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-3" className="form-control"/>
                    </div>

                    <div className="col-md-3 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-3" className="form-control"/>
                    </div>

                    <div className="col-md-3 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-3" className="form-control"/>
                    </div>


                    <div className="col-md-2 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-2" className="form-control"/>
                    </div>

                    <div className="col-md-2 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-2" className="form-control"/>
                    </div>

                    <div className="col-md-2 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-2" className="form-control"/>
                    </div>

                    <div className="col-md-2 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-2" className="form-control"/>
                    </div>

                    <div className="col-md-2 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-2" className="form-control"/>
                    </div>

                    <div className="col-md-2 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-2" className="form-control"/>
                    </div>


                    <div className="col-md-1 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-1" className="form-control"/>
                    </div>

                    <div className="col-md-1 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-1" className="form-control"/>
                    </div>

                    <div className="col-md-1 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-1" className="form-control"/>
                    </div>

                    <div className="col-md-1 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-1" className="form-control"/>
                    </div>

                    <div className="col-md-1 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-1" className="form-control"/>
                    </div>

                    <div className="col-md-1 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-1" className="form-control"/>
                    </div>

                    <div className="col-md-1 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-1" className="form-control"/>
                    </div>

                    <div className="col-md-1 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-1" className="form-control"/>
                    </div>

                    <div className="col-md-1 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-1" className="form-control"/>
                    </div>

                    <div className="col-md-1 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-1" className="form-control"/>
                    </div>

                    <div className="col-md-1 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-1" className="form-control"/>
                    </div>

                    <div className="col-md-1 col-sm-12  form-group">
                        <input type="text" placeholder=".col-md-1" className="form-control"/>
                    </div>
                </div>

            </div>
        </div>

        <div className="x_panel">
            <div className="x_title">
                <h2>Form Design <small>different form elements</small></h2>
                <ul className="nav navbar-right panel_toolbox">
                    <li><button className="collapse-link"><i className="fa fa-chevron-up"></i></button>
                    </li>
                    <li className="dropdown">
                        <button href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-wrench"></i></button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" href="#">Settings 1</button>
                            <button className="dropdown-item" href="#">Settings 2</button>
                        </div>
                    </li>
                    <li><button className="close-link"><i className="fa fa-close"></i></button>
                    </li>
                </ul>
                <div className="clearfix"></div>
            </div>
            <div className="x_content">
                <br />

                <h4>Horizontal labels</h4>
                <p className="font-gray-dark">
                    Using the grid system you can control the position of the labels. The form example below has the <b>col-md-10</b> which sets the width to 10/12 and <b>center-margin</b> which centers it.
                </p>
                <form className="form-horizontal form-label-left">
                    <div className="form-group row">
                        <label className="control-label col-md-3" for="first-name">First Name <span className="required">*</span>
                        </label>
                        <div className="col-md-7">
                            <input type="text" id="first-name2" required="required" className="form-control col-md-7 "/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="control-label col-md-3" for="last-name">Last Name <span className="required">*</span>
                        </label>
                        <div className="col-md-7">
                            <input type="text" id="last-name2" name="last-name" required="required" className="form-control col-md-7 "/>
                        </div>
                    </div>
                </form>


                <h4>Vertical labels</h4>
                <p className="font-gray-dark">
                    For making labels vertical you have two options, either use the apropiate grid <b>.col-</b> class or wrap the form in the <b>form-vertical</b> class.
                </p>
                <div className="col-md-8 center-margin">
                    <form className="form-horizontal form-label-left">
                        <div className="form-group row">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email"/>
                        </div>
                        <div className="form-group row">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password"/>
                        </div>

                    </form>
                </div>

                <h4>Inline Form </h4>
                <p className="font-gray-dark">
                    Add .form-inline to your form (which doesn't have to be a &lt;form&gt;) for left-aligned and inline-block controls.
                </p>
                <form className="form-inline">
                    <div className="form-group">
                        <label for="ex3" className="col-form-label">Email address</label>
                        <input type="text" id="ex3" className="form-control" placeholder=" "/>
                    </div>
                    <div className="form-group">
                        <label for="ex4" className="col-form-label">Email address</label>
                        <input type="email" id="ex4" className="form-control" placeholder=" "/>
                    </div>
                    <div className="form-check">
                        <label>
                            <input type="checkbox"/> Remember me
                        </label>
                    </div>
                    <button type="submit" className="btn btn-secondary">Send invitation</button>
                </form>
            </div>
        </div>
    </div>
    );
  }