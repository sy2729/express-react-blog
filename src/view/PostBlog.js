import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import {withRouter} from "react-router-dom";
import compose from 'recompose/compose'
import { Row, Col, Input, Button, Form, message } from 'antd'
import API from '../.data/wbget/API';
const { TextArea } = Input


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class PostBlog extends Component {

  //title, content, authorr
  handleSubmit = (e)=> {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let postData = Object.assign({}, values, this.props.user)
        let {title, content} = postData
        let author = postData._id;
        API.postBlog({title, author, content, createDate: new Date().toString()})
          .then(()=> {
            message.info("Post successfully")
            this.props.history.push("/");
          })
      }
    })
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    // Only show error after a field is touched.
    const titleError = isFieldTouched('title') && getFieldError('title');
    const contentError = isFieldTouched('content') && getFieldError('content');

    if(!this.props.user) return <Redirect to="/"/>

    return (
      <Row style={{'minHeight': 'calc(100vh - 140px)'}}>
        <Form onSubmit={this.handleSubmit}>
        <Col span={14} offset={5}>
          <div style={{ margin: '24px 0' }} />
          <h1>Post Blog</h1>
          <div style={{ margin: '24px 0' }} />
          <Form.Item validateStatus={titleError ? 'error' : ''}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input your title!' }],
          })(
            <TextArea placeholder="Title of the blog" autosize />)}
          </Form.Item>
          <div style={{ margin: '24px 0' }} />
          <Form.Item validateStatus={contentError ? 'error' : ''}>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please input your content!' }],
          })(
            <TextArea placeholder="Content of the blog" autosize={{ minRows: 20, maxRows: 60 }} />
            )}
          </Form.Item>
          <div style={{ margin: '24px 0' }} />
          <Row>
            <Form.Item>
              <Col span={7} offset={17}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                  >Submit</Button>
              </Col>
            </Form.Item>
          </Row>
        </Col>
        </Form>
      </Row>
    )
  }
}

const WrappedLoginForm = Form.create({ name: 'post_blog' })(PostBlog);

const mapStateToProps = state => {
  return { user: state.user };
};

export default compose(
  connect(mapStateToProps)
)(withRouter(WrappedLoginForm))