import React from 'react';
import { useState } from 'react';
import {Prompt} from 'react-router-dom';


export default function Login(props) {

    const [userLogin, setUserLogin] = useState({
        userName: '',
        password: '',
        status: false,   //ban đầu khi vào trang login mà chưa nhập liệu gì thì có thể rời đi
    })


    console.log("userLogin", userLogin);



    const handleChange = (e) => {
        const {name, value} = e.target;
        const newUserLogin = {
            ...userLogin,
            [name]: value,
        };

        let valid =true;
        for(let key in newUserLogin) {
            if (key !== "status") {     
                //tính từ khi bắt đầu nhập form, nếu có một trường nào đó rỗng thì không cho rời đi
                if( newUserLogin[key] === "") {
                    valid = false;
                }
            }
        }
        if(!valid) {
            newUserLogin.status = true;
        } else {
            newUserLogin.status = false;
        }
        setUserLogin(newUserLogin);
    }


    //goBack(), push(), replace() giúp chuyển hướng ở phần xử lí chức năng

    const handleLogin =(event) => {
        event.preventDefault();
        if(userLogin.userName === "cyberSoft" && userLogin.password === "cyberSoft") {
            //!đăng nhập thành công thì chuyển về trang trước đó
            props.history.goBack();

            //! đăng nhập thành công thì chuyển hướng đến trang chỉ định và khi bấm nút trở về thì có thể trả về trang login đc
            // props.history.push("/home");

            //! đăng nhập thành công thì thay đổi nội dung path tương ứng, khi bám nút trở về thì trả về nội dung của path trước khi tới login
            //    props.history.replace("/home");
            //    console.log("localstorage login")
               localStorage.setItem("userLogin", JSON.stringify(userLogin));
            //    console.log("infor local",JSON.parse(localStorage.getItem("userLogin")));
        } else {
            alert("Login fails")
        }
    }


    return (
        <form className = "container" onSubmit = {handleLogin}>
            <h3 className="display-4">Log In</h3>
            <div className="form-group">
                <p>UserName</p>
                <input name="userName" className="form-control" onChange = {handleChange}/>
            </div>
            <div className="form-group">
                <p>Password</p>
                <input name="password" className="form-control" onChange = {handleChange}/>
            </div>
            <div className="form-group">
                <p>Password</p>
                <button className="btn btn-success">Đăng nhập</button>
            </div>
            
            <Prompt when = {userLogin.status} message = {(location) => {
                console.log("location", location)
                return "Bạn có chắc muốn rời khỏi trang này"
            }}
             />
        </form>
    )
}
