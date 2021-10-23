import React from 'react';
import { Route } from 'react-router-dom';
import ContentMain from '../../components/Cyberbugs/Main/ContentMain';
import HeaderMain from '../../components/Cyberbugs/Main/HeaderMain';
import InfoMain from '../../components/Cyberbugs/Main/InfoMain';
import MenuCyberbugs from '../../components/Cyberbugs/MenuCyberbugs';
import SidebarCyberbugs from '../../components/Cyberbugs/SidebarCyberbugs';
import Header from '../../components/Home/Header/Header';
import '../../index.css';
import ModalCyberBugs from './../../components/Cyberbugs/ModalCyberBugs/ModalCyberBugs';

export const CyberbugsTemplate = (props) => {
    const {Component, ...restParam} = props;
    return <Route {...restParam} render = {(propsRoute) => {
        return <>
          
            <div className="jira">
                <SidebarCyberbugs/>
                <MenuCyberbugs/>
            
                    <Component {...propsRoute}/>
                <ModalCyberBugs/>
            </div>
        </>
    }}
    
    />
}