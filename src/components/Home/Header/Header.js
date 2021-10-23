import React from "react";
import {NavLink} from "react-router-dom";
import './Header.css';


export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          Cybersoft
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="activeNavItem" activeStyle={{fontWeight: 'bold',}} to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="activeNavItem" activeStyle={{fontWeight: 'bold',}} to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="activeNavItem" activeStyle={{fontWeight: 'bold',}} to="/contact">
                Contact
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="activeNavItem" activeStyle={{fontWeight: 'bold',}} to="/login">
                Login
              </NavLink>
            </li>

            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bài tập</a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                    <NavLink className="dropdown-item" to="/todolistrcc">TodoListRCC</NavLink>
                    <NavLink className="dropdown-item" to="/todolistrfc">TodoListRFC</NavLink>
                    <NavLink className="dropdown-item" to="/todolistrfcWithRedux">TodoListRFCwithRedux</NavLink>
                    <NavLink className="dropdown-item" to="/todolistSaga">TodoListSaga</NavLink>
                </div>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="activeNavItem" activeStyle={{fontWeight: 'bold',}} to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="activeNavItem" activeStyle={{fontWeight: 'bold',}} to="/logincyberbugs">
                Login CyberBugs
              </NavLink>
            </li>


            



           
          </ul>
      
        </div>
      </nav>
    </div>
  );
}



