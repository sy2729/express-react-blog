import React, { Component } from 'react';
import { connect } from "react-redux";
import compose from 'recompose/compose'
import {withRouter, Link} from "react-router-dom";
import {Row, Col, List, Layout} from 'antd'
import styled from 'styled-components';
import { createMargin } from '../components/style-component/styledComp';
import API from '../.data/wbget/API';
import trimText from '../util/trimText';
import {passPost} from '../.data/localget/localReducer';
import getDate from '../util/transformDate';
let { Content } = Layout;

class User extends Component {
  state = {};
  clickPost = (obj) => {
    passPost(obj)
  }
  componentDidMount(){
    API.getDisplayUser(this.props.match.params.id)
    API.getUserPost(this.props.match.params.id)
    // this.props.user && API.getUserPost(this.props.user._id)
      // .then(res=> {
      //   // this.setState({posts: res.data})
      // })
  }

  render() {
    if(!this.props.match.params.id) this.props.history.push("/");
    let posts = this.props.userPosts && <List
          itemLayout="horizontal"
          dataSource={this.props.userPosts}
          renderItem={i => (
            <Link to={`/post-detail/${i._id}`} onClick={()=>this.clickPost(i)}>
              <List.Item className='auto' style={{width: '80%'}}>
                <List.Item.Meta
                  className="t-left"
                  // avatar={<Avatar src={'https://web.500px.com/static/media/discover.abf367ed.jpg'} />}
                  title={i.title}
                  description={trimText(i.content, 100)}
                />
              </List.Item>
            </Link>
          )}
        />
    // let posts = this.props.userPosts && this.props.userPosts.map((i, index)=>
    //   <Link key={index} to={`/post-detail/${i._id}`}>
    //     <Col span={24/this.props.userPosts.length}>
    //       <Card 
    //             title={i.title}
    //             style={{ width: 300 }}>
    //             {i.content}
    //             <br/>
    //             <Meta
    //               title={i.author.name}
    //               description="This is the author"
    //             />
    //             {getDate(i.createDate)}
    //       </Card>
    //     </Col>
    //   </Link>
    // )


    return (
      <Content className='content'>
        <Margin />
        <Row type='flex' justify='start' style={{alignItems: 'center'}}>
          <Col span={3} offset={2}>
            <Profile style={{backgroundImage: `url(${(this.props.displayUser &&this.props.displayUser.img) || 'https://web.500px.com/static/media/discover.abf367ed.jpg'})`}}/>
          </Col>
          <Col span={3} className="t-left"><h2>{this.props.displayUser && this.props.displayUser.name}</h2></Col>
        </Row>
          {posts}
      </Content>
    )
  }
}


let Profile = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: transparent center no-repeat;
  background-size: cover;
`
let Margin = createMargin();

const mapStateToProps = state => {
  return { 
    userPosts: state.userPosts,
    displayUser: state.displayUser
  };
};

// export default connect(
//   mapStateToProps
// )(User);

export default compose(
  connect(mapStateToProps)
)(withRouter(User))
// export default User






