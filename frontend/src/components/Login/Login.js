import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Child components
import LoginBtn from './LoginBtn/LoginBtn';
import Footer from '../Partials/Footer/Footer';

// Import static files
import './Login.css';

/**
 * Login
 */
export class Login extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="loginpage container-fluid">
        {/* If render status:true OR loginUserInfo: false -> nothing rendered*/}
        {/* If isFetching:ture -> render loading page */}
        { !this.props.renderWait[0] || this.props.user[0] ? (
          this.props.isFetching[0] ? (
            <div className="fetcherWrapper">
              {/* This is Wait! Screen*/}
              <i className="fa fa-spinner fa-5x fa-spin spinner" aria-hidden="true"></i>
              <div className="fetching">Preparing your tea...</div>
              </div>
          ) : (
            <div className="flexWrapper">
            {/* This is Login Screen*/}
            <div className="flexBody">
              <div id="mainWrapper">
                <div className="title col-xs-12">teaTime</div>
                <div className="subtitle col-xs-12">
                  live video chat that keeps getting better
                </div>
                <LoginBtn/>
              </div>
            </div>
            <Footer/>
          </div>
       )) : (
          <div className="flexWrapper"></div>
       )
     }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
      isFetching: state.isFetching,
      renderWait: state.renderWait
    }
}

export default connect(mapStateToProps)(Login);
