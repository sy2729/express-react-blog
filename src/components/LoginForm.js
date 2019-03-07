import React, { Component } from 'react';
import API from '../.data/wbget/API';
import {withRouter} from "react-router-dom";
// import { connect } from "react-redux";
import {
  Form, Icon, Input, Button, message
} from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {
  
  state = {
    loading: false
  }
  enterLoading = () => {
    this.setState({ loading: true });
  }
  existLoading = ()=> {
    this.setState({ loading: false });
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.enterLoading();
        // console.log('Received values of form: ', values);
        API.login(values)
          .then(()=>{
            this.existLoading()
            message.info('login successfully')
            this.props.history.push("/");
          })
          .catch((e)=> {
            console.log(e)
          })
      }
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    
    const loginInterface =  <Form layout="vertical" onSubmit={this.handleSubmit}>
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            loading={this.state.loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    ;
    return (
      loginInterface
    )
  }
}

const WrappedLoginForm = Form.create({ name: 'horizontal_login' })(LoginForm);


// const mapStateToProps = state => {
//   return { user: state.user };
// };

// export default connect(
//   mapStateToProps
// )(WrappedLoginForm);

export default withRouter(WrappedLoginForm);