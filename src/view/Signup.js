import React, { Component } from 'react';
import {
  Form, Icon, Input, Button, message, Layout, Row, Col
} from 'antd';
import API from '../.data/wbget/API';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import tokenOperation from '../.data/wbget/token';
import promiseTimer from '.././util/promiseTimer';
import {createMargin} from '../components/style-component/styledComp';

const { Content } = Layout

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.password !== values.confirmPassword) {
          message.error('please type in the same password');
          return;
        };
        // @params name - string
        // @params password - string
        let name = values.userName;
        let password = values.password
        API.signUp({name, password})
          .then(res=>{
            message.success(`Register successfully, welcome ${name}`);
            let {token} = res.data;
            tokenOperation.setToken({token});
            promiseTimer(2000)
              .then(()=> {
                message.success(`Login you in, ${name}, please wait`);
                // refresh the page, then the system automatically login, then automatically redirect to the homepage
                promiseTimer(1000)
                  .then(()=>window.location.reload())
              })
            
          })
      }
    });
  }

  render() {
    if(this.props.user) {
      return <Redirect to="/"/>
    }
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmPasswordError = isFieldTouched('confirmPassword') && getFieldError('confirmPassword');
    return (
      <Content className="content">
      <Margin />
      <h1>Sign Up</h1>
      <Row>
        <Col xs={{span:20, offset:2}} md={{span:12, offset:6}} lg={{span:6, offset:9}}>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item
              validateStatus={userNameError ? 'error' : ''}
              help={userNameError || ''}
            >
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </Form.Item>
            <Form.Item
              validateStatus={passwordError ? 'error' : ''}
              help={passwordError || ''}
            >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item
              validateStatus={confirmPasswordError ? 'error' : ''}
              help={confirmPasswordError || ''}
            >
              {getFieldDecorator('confirmPassword', {
                rules: [{ required: true, message: 'Please confirm your password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      </Content>
    );
  }
}
const Margin = createMargin(100);

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

// export default WrappedHorizontalLoginForm;
const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(
  mapStateToProps
)(WrappedHorizontalLoginForm);