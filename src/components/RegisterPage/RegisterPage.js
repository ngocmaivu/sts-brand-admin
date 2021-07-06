import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import './register.css'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                dob: '',
                gender: '',
                email: '',
                phone: '',
                address: '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div classname='container'>
                <div className="d-flex justify-content-center h-200">
                    <div className="card">
                        <div className="card-header">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                    <label htmlFor="userName">User Name</label>
                                    <input type="text" className="form-control" name="userName" value={user.userName} onChange={this.handleChange} />
                                    {submitted && !user.userName &&
                                        <div className="help-block">User Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                    <label htmlFor="password">Password</label>
                                    <input type="text" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                    {submitted && !user.password &&
                                        <div className="help-block">Passwork is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                                    {submitted && !user.password &&
                                        <div className="help-block">First Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" name="email" value={user.lastName} onChange={this.handleChange} />
                                    {submitted && !user.lastName &&
                                        <div className="help-block">Last Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                                    {submitted && !user.email &&
                                        <div className="help-block">Email is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                    <label htmlFor="text">More Information</label>
                                    <input type="text" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                    {submitted && !user.password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Add</button>
                                    <Link to="/login" className="btn btn-link">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };