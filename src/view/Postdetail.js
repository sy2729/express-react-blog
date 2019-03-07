import React, { Component } from 'react';
import { connect } from "react-redux";
import compose from 'recompose/compose'
import {withRouter, Link} from "react-router-dom";
import styled from 'styled-components';
import {Row, Col} from 'antd';
import { createMargin, BlogBody } from '../components/style-component/styledComp';
import API from '../.data/wbget/API';
import transformDate from '../util/transformDate'

class Postdetail extends Component {

  componentDidMount(){
    // sent the request for single post if query this interface directly
    if(!this.props.currentPost) {
      API.getOnePost(this.props.match.params.id);
    }
  }

  render() {
    // let content = this.props.currentPost ? <h1>adasds</h1> : null
    let content = this.props.currentPost ?
     (<>
        <Margin />
        <Row>
          <Col span={16} offset={4}>
            <BlogBody>
              <h1>{this.props.currentPost.title}</h1>
              <Link to={`/user/${this.props.currentPost.author._id}`}><p>Author: {this.props.currentPost.author.name}</p></Link>
              <p>Post date: {transformDate(this.props.currentPost.createDate)}</p>
            </BlogBody>
          </Col>
        </Row>
        <Margin />
        <Row>
          <Col span={16} offset={4}>
            <BlogBody>
              <BlogText className="t-left">{this.props.currentPost.content}</BlogText>
            </BlogBody>
          </Col>
        </Row>
      </>) : null;
    return (
      <div className="content">
        {content}
      </div>
    )
  }
}

const Margin = createMargin(30);
const BlogText = styled.p`
  line-height: 2em;
`

const mapStateToProps = state => {
  return { 
    user: state.user,
    currentPost: state.currentPost
  };
};

// export default connect(
//   mapStateToProps
// )(Postdetail);

export default compose(
  connect(mapStateToProps)
)(withRouter(Postdetail))