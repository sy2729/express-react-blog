import React, { Component } from 'react';
import { Layout, Row, Col, Button, message, Icon } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import API from '../.data/wbget/API';

let {Header} = Layout;

const Nav = (props)=> {

  const logOut = ()=> {
    API.logOut()
      .then(()=> {
        message.info('Successfully logout');
      })
  }

  const getUserPost = ()=> {
    API.getUserPost(props.user._id)
  }
  return (
    <Header className='header'>
      <Row>
        <Link to='/'><Col span={8} offset={8}><h1 style={{color: '#fff'}}>ReBlog</h1></Col></Link>
        {props.user ?
           <>
           <Link to={`/user/${props.user._id}`} onClick={getUserPost} ><Col span={2} offset={4}><p><Icon type="user" /> {props.user.name}</p></Col></Link>
           <Col span={2}><Button type="primary" onClick={logOut} icon="logout">Log Out</Button></Col>
           </>
            :
           <>
            <Link to='/signup' style={{marginRight: '10px'}}><Button type="primary">Sign Up</Button></Link>
            <Link to='/login' className='underline'>Sign In</Link>
           </>}
      </Row>
    </Header>
  )
}

// styled component
// const signUo


const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps
)(Nav);
// export default Nav