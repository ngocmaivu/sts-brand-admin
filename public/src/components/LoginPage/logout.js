// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

// import { userActions } from '../../_actions';
// import { styled } from '@material-ui/core';

// const StyledLink = styled(Link)`
//     text-decoration: none;

//     &:focus, &:hover, &:visited, &:link, &:active {
//         text-decoration: none;
//     }
// `;
// class Logout extends React.Component{
//     constructor(props) {
//         super(props);
//         // reset login status
//         this.props.logout();
//     }
//     render(){
//         const { loggingIn } = this.props;
//         // <Link href='/login'> Logout </Link>
//     }
// }
// function mapState(state) {
//     const { loggingIn } = state.authentication;
//     return { loggingIn };
// }

// const actionCreators = {
//     login: userActions.login,
//     logout: userActions.logout
// };

// const connectedLogout = connect(mapState, actionCreators)(Logout);
// export { connectedLogout as Logout };