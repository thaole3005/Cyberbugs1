import React from 'react';
import {Redirect} from 'react-router-dom';
//?Redirect giúp chuyển hướng ở phần rerender


export default function Profile(props) {
    console.log("loginn profile");
    
    if(localStorage.getItem("userLogin")) {   //nếu ng nhập đã đăng nhập rồi
        return (
            <div>
                My profile
            </div>
        )
    } else {     //người dùng chưa đăng nhập
        alert('Vui lòng đăng nhập để vào trang Profile');
        return <Redirect to="/login"/>
    }


  
}
