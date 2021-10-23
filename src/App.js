import React, {useEffect, useState,} from 'react';
import {BrowserRouter, Route, Switch, NavLink, useHistory} from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Header from './components/Home/Header/Header';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import PagenNotFound from './pages/PagenNotFound/PagenNotFound';
import Profile from './pages/Profile/Profile';
import TodoListRCC from './pages/TodoList/TodoListRCC'
import TodoListRFC from './pages/TodoList/TodoListRFC';
import TodoListRFCwithRedux from './pages/TodoList/TodoListRFCwithRedux';
import BtTodoListSaga from './pages/BtTodoListSaga/BtTodoListSaga';
import LoadingComponent from './components/globalSetting/LoadingComponent/LoadingComponent';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import { useDispatch } from 'react-redux';
import { CyberbugsTemplate } from './templates/HomeTemplate/CyberbugsTemplate';
import IndexCyberBugs from './redux/sagas/CyberBugs/IndexCyberBugs';
import CreateProject from './pages/CyberBugs/ProjectCyberBugs/CreateProject';
import ProjectManagement from './pages/CyberBugs/ProjectCyberBugs/ProjectManagement';
import ModalCyberbugs from './HOC/CyberbugsHOC/ModalCyberbugs';
import NotifyCationComponent from './components/NotifyCation/NotifyCationComponent';



function App(props) {
  // console.log("PROPS in APP", props)

  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("history in APP", history);
    //mới vào website thì dispatch history lên redux để cái nào muốn chuyển trag thì giọ history từ redux xuống để sài
    dispatch({ type: 'ADD_HISTORY', history: history });
  })






  return(
    <>
    {/* những component nào muốn luôn xuất hiện thì để ngoài componnet switch, còn components nào có thể xuất hiện hay không tùy ng dùng thay đổi url or click vào component đó mới đc xuất hiện, thì để bên trong component <switch></switch> */}

      {/* <Header/> */}
      <LoadingComponent/>
      <ModalCyberbugs/>
   

      <Switch>

        {/* <Route exact path = "/home" component={Home}/>
        <Route exact path = "/contact" component={Contact}/>
        <Route exact path = "/about" component={About}/>
        <Route exact path = "/" component={Home}/>
        <Route exact path = "/login" component={Login}/>

        <Route exact path = "/detail/:id" component={Detail}/>
        <Route exact path="/profile" component={Profile}/> */}


        {/* -----Uứng dụng TODOLIST--------- */}
        {/* <Route exact path="/todolistrcc" component={TodoListRCC}/>
        <Route exact path="/todolistrfc" component={TodoListRFC}/>
        <Route exact path="/todolistrfcWithRedux" component={TodoListRFCwithRedux}/>
        <Route exact path="/todolistSaga" component={BtTodoListSaga}/> */}



        {/* path="*" đại diện cho đường dẫn bậy bạ */}
        {/* <Route path="*" component={PagenNotFound}/> */}


        <HomeTemplate exact path = "/home" Component={Home}/>
        <HomeTemplate exact path = "/contact" Component={Contact}/>
        <HomeTemplate exact path = "/about" Component={About}/>
        <HomeTemplate exact path = "/" Component={Home}/>

        {/* trang login có chưa header */}
        {/* <HomeTemplate exact path = "/login" Component={Login}/> */}


       {/* trang login k chứa header */}
        <UserLoginTemplate exact path = "/login" Component={Login}/>




        <HomeTemplate exact path = "/detail/:id" Component={Detail}/>
        <HomeTemplate exact path="/profile" Component={Profile}/>


        {/* -----Uứng dụng TODOLIST--------- */}
        <HomeTemplate exact path="/todolistrcc" Component={TodoListRCC}/>
        <HomeTemplate exact path="/todolistrfc" Component={TodoListRFC}/>
        <HomeTemplate exact path="/todolistrfcWithRedux" Component={TodoListRFCwithRedux}/>
        <HomeTemplate exact path="/todolistSaga" Component={BtTodoListSaga}/>



        {/* -----------Project CyberBugs------- */}
        <UserLoginTemplate exact path = "/logincyberbugs" Component={LoginCyberBugs}/>
        <CyberbugsTemplate exact path = "/cyberbugs" Component={IndexCyberBugs}/>
        <CyberbugsTemplate exact path='/createproject' Component={CreateProject} />
        <CyberbugsTemplate exact path='/projectmanagement' Component={ProjectManagement} />
        <CyberbugsTemplate exact path='/projectdetail/:projectId' Component={IndexCyberBugs} />
        




        {/* path="*" đại diện cho đường dẫn bậy bạ */}
        <HomeTemplate path="*" Component={PagenNotFound}/>



      </Switch>

    
    </>
  )
}

export default App;
