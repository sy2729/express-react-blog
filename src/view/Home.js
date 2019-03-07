import React, { Component } from 'react';
import { Layout } from 'antd';
import API from '../.data/wbget/API';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { Card } from 'antd';
import { Row, Col, Button, List, Avatar } from 'antd';
import getDate from '../util/transformDate';
import {passPost} from '../.data/localget/localReducer';
import trimText from '../util/trimText';
import {CardBody, bgContainer} from '../components/style-component/styledComp';


const {Content} = Layout;
const {Meta} = Card;



class Home extends Component {

  state={loading: true}
  componentWillMount() {
    API.getPost()
      .then(i=>this.setState({loading: false}))
  }

  clickPost = (obj) => {
    passPost(obj)
  }

  render() {
    const posts = this.props.posts && <List
                    itemLayout="horizontal"
                    dataSource={this.props.posts}
                    renderItem={i => (
                      <Link to={`/post-detail/${i._id}`} onClick={()=>this.clickPost(i)} key={i._id}>
                        <CardBody style={{width: '80%', margin: '20px auto', padding: '10px 0 10px 20px'}}>
                          <List.Item className='auto align-center'>
                            <ProfileContainer style={{backgroundImage: `url(${ i.author.img ||'https://web.500px.com/static/media/discover.abf367ed.jpg'})`}} />
                            <PostText className='t-left' style={{padding: '0 20px'}}>
                              <h2 >{i.title}</h2>
                              <span className="date">{getDate(i.createDate).split(' ')[0]}</span>
                              <span >{i.author.name}</span>
                              <p >{trimText(i.content, 100)}</p>
                            </PostText>
                          </List.Item>
                        </CardBody>
                      </Link>
                    )}
                  />

    const postNewBlog = <Row>
                          <Col span={8} offset={16}><Link to='post-blog'><Button icon="book" type='primary'>Post A New Blog</Button></Link></Col>
                        </Row>
    return (
      <div>
        <Content className="content" style={{'padding': '20px 5px'}}>
          {this.props.user ? postNewBlog : null}
          <h2 className="t-center">All Post</h2>
          {posts}
        </Content>
      </div>
    )
  }
}

const ProfileContainer = styled(bgContainer)`
  min-width: 50px;
  height: 50px;
  border-radius: 50%;
`

const PostText = styled.div`
  color: #222;
  .date {
    color: #ababab;
    padding-right:10px;
  }
`


const mapStateToProps = state => {
  return { posts: state.posts, user: state.user };
};

// const 
export default connect(
  mapStateToProps
)(Home);
