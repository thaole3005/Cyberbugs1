import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import { Button, Layout  } from 'antd';



const { Header, Footer, Sider, Content } = Layout;



export const UserLoginTemplate = (props) => {


    const [size, setSize] = useState({width: Math.round(window.innerWidth), height: Math.round(window.innerHeight)});
    //*hoặc viết bằng cách bóc tách phần tử
    // const [{width, height}, setSize] = useState({width: window.innerWidth, height: window.innerHeight});


    //tương tự vs componentDidmount
    useEffect(() => {
        console.log("WINDOW resized");
        window.onresize = () => {
            console.log("window.onresize")
            setSize({
                width:Math.round( window.innerWidth),
                height: Math.round(window.innerHeight),
            })
        }
    },[])


    let {Component, ...restRoute} = props;
    console.log("UserLoginTemplate render")
    
    return <Route {...restRoute} render = {(propsRoute) => {
        return <>
        <Layout>
            <Sider 
                width = {size.width/2}
                style = {{height: size.height, backgroundImage: `url("https://picsum.photos/${Math.round(size.width/2)}/${Math.round(size.height/2)}")`, backgroundSize: 'cover'}}
            ></Sider>
            <Content>
                <Component {...propsRoute}/>
            </Content>
        </Layout>
        </>
    }}
    
    />
}