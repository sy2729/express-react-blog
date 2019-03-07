import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import LoginForm from '../components/LoginForm';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import {createMargin} from '../components/style-component/styledComp';



class Login extends Component {


  render() {
    // console.log(this.props.user)
    if(this.props.user) {
      return <Redirect to="/"/>
    }
    return (
      <div className='content'>
      <Margin />
      <Row>
        <h1>Login IN</h1>
        <Col xs={{span:20, offset:2}} md={{span:12, offset:6}} lg={{span:6, offset:9}}>
            <LoginForm />
        </Col>
      </Row>
      </div>
    )
  }
}

const Margin = createMargin(100);

const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(
  mapStateToProps
)(Login);
// export default Login