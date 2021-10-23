import React from "react";
import { useSelector } from "react-redux";

export default function Home(props) {


  const userLogin = useSelector(
    (state) => state.UserCyberBugsReducer.userLogin
  );

  console.log("userLogin from ReduxStore", userLogin)

  return (
    <div>
      <h2>Trang chủ</h2>
      <div className="card bg-dark">
        <img className="card-img-top" src={userLogin.avatar} alt = {userLogin.name} />
        <div className="card-body text-white">
          <h4 className="card-title text-white">User: {userLogin?.name}</h4>
          <h4 className="card-title text-white">soDT: {userLogin?.phoneNumber}</h4>
        </div>
      </div>
    </div>
  );
}
