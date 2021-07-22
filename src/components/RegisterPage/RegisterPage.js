import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Button, Card, createStyles, Divider, Grid, TextField, Typography, withStyles } from '@material-ui/core';
import { brandActions, userActions } from '../../_actions';
import './register.css'
import Person from '@material-ui/icons/Person';
import { DateRange, Email, Label, LocationCity, LocationOn, Lock, PeopleAltOutlined, Phone, Store } from '@material-ui/icons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Male, Female } from "react-gender";
const options = [
    'Male', 'Female'
];
var defaultOption = options[0];
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                generalInfo: {
                    username: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    dob: '',
                    gender: defaultOption,
                    type: '',
                    email: '',
                    phone: '',
                    address: '',
                },
                brand: {
                    name: '',
                    address: '',
                    logoImg: '',
                    hotline: '',
                },
            },

            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, namebrand, value } = event.target;
        const { user, brand } = this.state;
        this.setState({
            user: {
                ...user,
                generalInfo: {
                    ...user.generalInfo,
                    [name]: value
                },
                brand: {
                    ...user.brand,
                    [name]: value
                },
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user, brand } = this.state;
        if(defaultOption === "Female")
        user.generalInfo.gender = 0;
        else user.generalInfo.gender = 1;
        console.log(user.brand.name)
        console.log(user.brand.address)
        console.log(user.generalInfo.username)
        console.log(user.generalInfo.password)
        if (user.generalInfo.firstName && user.generalInfo.lastName && user.generalInfo.username && user.generalInfo.password) {
            this.props.register(user, brand);
            // this.props.createBrand(brand);
        }
    }

    _onSelect() {
        if (defaultOption === options[0]) defaultOption = options[1];
        else defaultOption = options[0];
        console.log(defaultOption)
    }
    render() {
        const { registering } = this.props;
        const { user, submitted, brand } = this.state;

        return (
            <React.Fragment>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '40vw' }}
                >
                    <br />
                    <Typography variant="h1" style={{ textAlign: 'center' }} color='primary'>Register</Typography>
                    <br />
                    <Divider></Divider>
                    <br />

                    <form name="form">
                        <div className="input-group form-group">
                            <Person color="primary" />
                            <TextField style={{ height: '7px', width: '380px' }} type="text" name="username" placeholder="User name" value={user.generalInfo.username} onChange={this.handleChange} />
                        </div>
                        {submitted && !user.generalInfo.username &&
                            <div style={{ color: 'red', }} className="help-block">Username is required</div>
                        }
                        {/* {submitted && user.generalInfo.username.length < 4 &&
                            <div style={{ color: 'red', }} className="help-block">Username is must be more than 4</div>
                        } */}
                        <br />
                        <div className="input-group form-group">
                            <Lock color="primary" />
                            <TextField style={{ height: '7px', width: '380px' }} type="password" name="password" placeholder="Password" value={user.generalInfo.password} onChange={this.handleChange} />
                        </div>
                        {submitted && !user.generalInfo.password &&
                            <div style={{ color: 'red', }} className="help-block">Password is required</div>
                        }
                        <br />
                        <Grid container direction="row" spacing={1}>
                            <div className="input-group form-group">
                                <Person color="primary" />
                                <TextField style={{ height: '7px', width: '180px' }} type="firstName" name="firstName" placeholder="First name" value={user.generalInfo.firstName} onChange={this.handleChange} />
                            </div>

                            <br />
                            <div className="input-group form-group">
                                <Person color="primary" />
                                <TextField style={{ height: '7px', width: '180px' }} type="lastName" name="lastName" placeholder="Last name" value={user.generalInfo.lastName} onChange={this.handleChange} />
                            </div>

                        </Grid>
                        <br />
                        <div className="input-group form-group">
                            <DateRange color="primary" />
                            <TextField style={{ height: '7px', width: '380px' }} type="Date" name="dob" placeholder="Date of birth" value={user.generalInfo.dob} onChange={this.handleChange} />
                        </div>
                        <br />
                        <div className="input-group form-group">
                            {/* < color="primary" /> */}
                            {/* <Male style={{}} color="#419fcf" />
                            <Female color="#f378ac" /> */}
                            <Dropdown style={{}} name="gender" variant="outlined" options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select gender" />

                        </div>
                        {/* <br/>
                            {submitted && !user.generalInfo.firstName &&
                                <div style={{ color: 'red', }} className="help-block">First Name is required</div>
                            }
                            {submitted && !user.generalInfo.lastName &&
                                <div style={{ color: 'red', }} className="help-block">Last Name is required</div>
                            } */}
                        <br />
                        <div className="input-group form-group">
                            <Email color="primary" />
                            <TextField style={{ height: '7px', width: '380px' }} type="email" name="email" placeholder="Email" value={user.generalInfo.email} onChange={this.handleChange} />
                        </div>
                        {submitted && !user.generalInfo.email &&
                            <div style={{ color: 'red', }} className="help-block">Email is required</div>
                        }
                        <br />
                        <div className="input-group form-group">
                            <Phone color="primary" />
                            <TextField style={{ height: '7px', width: '380px' }} type="phone" name="phone" placeholder="Phone" value={user.generalInfo.phone} onChange={this.handleChange} />
                        </div>
                        {submitted && !user.generalInfo.phone &&
                            <div style={{ color: 'red', }} className="help-block">Phone is required</div>
                        }
                        <br />
                        <div className="input-group form-group">
                            <LocationCity color="primary" />
                            <TextField style={{ height: '7px', width: '380px' }} type="address" name="address" placeholder="Address" value={user.generalInfo.address} onChange={this.handleChange} />
                        </div>
                        {submitted && !user.generalInfo.address &&
                            <div style={{ color: 'red', }} className="help-block">Address is required</div>
                        }
                        <br />
                        <Typography variant="h4" style={{ textAlign: 'center' }} >Brand Information</Typography>
                        <br />
                        <div className="input-group form-group">
                            <Store color="primary" />
                            <TextField style={{ height: '7px', width: '380px' }} type="text" name="name" placeholder="Brand Name" value={user.brand.name} onChange={this.handleChange} />
                        </div>
                        {submitted && !user.brand.name &&
                            <div style={{ color: 'red', }} className="help-block">Brand Name is required</div>
                        }
                        <br />
                        <div className="input-group form-group">
                            <LocationOn color="primary" />
                            <TextField style={{ height: '7px', width: '380px' }} type="hotline" name="hotline" placeholder="Hotline" value={user.brand.hotline} onChange={this.handleChange} />
                        </div>
                        {submitted && !user.brand.hotline &&
                            <div style={{ color: 'red', }} className="help-block">Hotline is required</div>
                        }
                        <br />
                        <div className="input-group form-group">
                            <LocationOn color="primary" />
                            <TextField style={{ height: '7px', width: '380px' }} type="address" name="address" placeholder="Address" value={user.brand.address} onChange={this.handleChange} />
                        </div>
                        {submitted && !user.brand.address &&
                            <div style={{ color: 'red', }} className="help-block">Address is required</div>
                        }
                        <br />
                        <div className="form-group">
                            {/* <button className="btn btn-primary">Add</button> */}
                            <div>
                                {registering &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                                <Button style={{ height: '40px', width: '160px', marginLeft: '80px' }} color="primary" variant="contained" onClick={this.handleSubmit}>Register</Button>
                                <Button component={Link} to="/login" className="btn btn-link">Cancel</Button>
                            </div>

                        </div>
                    </form>

                </Grid>
            </React.Fragment>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register,
    createBrand: brandActions.create,

}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };