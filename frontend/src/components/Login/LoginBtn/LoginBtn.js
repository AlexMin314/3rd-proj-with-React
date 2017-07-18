import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import static files
import '../../../libs/bootstrap-social.css';
import './LoginBtn.css';

// Import Action.
import { isFetching } from '../../../actions/fetchingActions';

/**
 * Login
 */
export class LoginBtn extends Component { // eslint-disable-line react/prefer-stateless-function

  facebookLogin = (e) => {
    e.preventDefault();
    this.props.isFetching(true);
    window.location.href = '/auth/facebook';
  }

  googleLogin = (e) => {
    e.preventDefault();
    this.props.isFetching(true);
    window.location.href = '/auth/google';
  }

  twitterLogin = (e) => {
    e.preventDefault();
    this.props.isFetching(true);
    window.location.href = '/auth/twitter';
  }

  render() {

    return (
      <div className="socialBtn col-xs-12">
        <div className="socialBtnCircle">
  				<div className="icon-circle">
  					<a onClick={this.facebookLogin} className="ifacebook">
              <i className="fa fa-facebook"></i>
            </a>
  				</div>
  			</div>
  			<div className="socialBtnCircle">
  				<div className="icon-circle">
  					<a onClick={this.twitterLogin} className="itwittter">
              <i className="fa fa-twitter"></i>
            </a>
  				</div>
  			</div>
  			<div className="socialBtnCircle">
  				<div className="icon-circle">
  					<a onClick={this.googleLogin} className="igoogle">
              <i className="fa fa-google-plus"></i>
            </a>
  				</div>
  			</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
    }
}


const mapDispatchToProps = (dispatch) => {
  return {
    isFetching: (result) => {
      dispatch(isFetching(result))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBtn);
