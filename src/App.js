import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import './App.css';
import { Layout } from 'antd';
import { default as Header} from'./components/Header';
import API from './.data/wbget/API';
import Home from './view/Home';
import Signup from './view/Signup';
import Login from './view/Login';
import PostBlog from './view/PostBlog';
import User from './view/User';
import Postdetail from './view/Postdetail';

const {
  Footer, Sider,
 } = Layout;


class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    API.getMe()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Layout>
            <Header/>
            <Layout>
              {/* <Sider>Sider</Sider> */}
              <Route path="/" exact component={Home} />
              <Route path="/signup" exact component={Signup}/>
              <Route path="/login" exact component={Login}/>
              {/* <Route path="/signUp" exact component={SignUp}/> */}
              <Route path="/post-blog" exact component={PostBlog}/>
              <Route path="/user/:id" exact component={User}/>
              <Route path="/post-detail/:id" exact component={Postdetail}/>
            </Layout>
            <Footer>ReBLOG</Footer>
          </Layout>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return { user: state.user };
};

// const 
export default connect(
  mapStateToProps
)(App);
