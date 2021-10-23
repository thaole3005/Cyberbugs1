import React from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import {withFormik, Form} from 'formik';
import * as Yup from "yup";
import {connect} from 'react-redux';
import { USER_SIGNIN_CYBERBUGS_API } from './../../../redux/constants/Cyberbugs/Cyberbugs';
import { signinCyberBugsAction } from './../../../redux/actions/CyberBugsAction/CyberBugsAction';


function LoginCyberBugs(props) {
    //props lúc này k chỉ bảo gồm props của component mà còn cả props của formik
    // console.log("PROPS", props);
    //bóc tách phần tử
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;



    return (
        <div className="container">
            <form onSubmit = {handleSubmit} className=" d-flex flex-column justify-content-center align-items-center" style = {{height: window.innerHeight,}}>
                <h3 className="text-center">LoginCyberBugs</h3>
                <Input name = "email" size = "large" onChange = {handleChange} placeholder="enter your email" prefix={<UserOutlined />}/>
                <div className ="text-danger">{errors.email}</div>


                <Input type="password" name = "password" onChange = {handleChange} size = "large" placeholder="enter your password" prefix={<LockOutlined />} className="m-4"/>   
                <div className ="text-danger">{errors.password}</div>
                

                <Button htmlType = "submit" size = "large" className = "mt-5 w-50 text-center"
                 style = {{backgroundColor: 'rgb(131,199,93)', color: 'white'}}>Login</Button>         
                <div className="social mt-3 d-flex">
                    <Button type="primary" shape="circle" icon={<FacebookOutlined />} size={"large"}></Button>
                    <Button type="primary" className="ml-3" shape="circle" icon={<TwitterOutlined />} size={"large"}></Button>
                </div>
            </form>

           
        </div>
    )
}



//hàm withFormik cho phép chuyển đổi các props của thư viện Formik thành props của component HOC LoginCyberBugs
const LoginCyberBugsWithFormik =  withFormik({
    mapPropsToValues: () => ({
        email: '', 
        password:''
    }),

    

    //hàm lấy dữ liệu từ form khi submit
    handleSubmit: (values, {props, setSubmitting }) => {
        console.log("values", values);
        //!props lúc này vừa bao gồm props của formik vừa bao gồm props của redux
        // console.log("props", props);


        // let action = {
        //     type: USER_SIGNIN_CYBERBUGS_API,
        //     userLogin: {
        //         email: values.email,
        //         password: values.password,
        //     }
        // }

        //?truyền thêm prop history của Route đến saga để thực hiện redirect đến trang home nếu đăng nhập thành công
        //?redirect C1: truyền prop history
        // props.dispatch(signinCyberBugsAction(values.email, values.password,props.history));
        props.dispatch(signinCyberBugsAction(values.email, values.password));

    },

    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email không được để trống').email('email không hợp lệ'),
        password: Yup.string().required('password không được để trống').min(5,'password không được nhỏ hơn 6 kí tự').max(15,'password không được lơn hơn 15 kí tự'),

    }),

    displayName: 'LoginCyberBugs',

  })(LoginCyberBugs);


//hàm connect cho phép chuyển đổi các props của thư viện redux thành props của component HOC LoginCyberBugs
export default connect() (LoginCyberBugsWithFormik);