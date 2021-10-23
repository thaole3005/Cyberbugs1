import React, { useState }  from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DrawerCyberbugsReducer from './../../redux/reducers/DrawerCyberbugsReducer';
import { useSelector, useDispatch } from 'react-redux';



export default function ModalCyberbugs(props) {

    // const [state, setState] = useState(
    //                             { visible: false }
    //                         );

    const {visible, ComponentContentDrawer, callBackSubmit, title} = useSelector(state => state.DrawerCyberbugsReducer);
    // console.log("visible", visible);
    console.log("callBackSubmit", callBackSubmit);
    // console.log("ComponentContentDrawer", ComponentContentDrawer);
    const dispatch = useDispatch();


  const showDrawer = () => {
    dispatch({ 
        type: 'OPEN_DRAWER',
    })
  };

  const onClose = () => {
    dispatch({ 
        type: 'CLOSE_DRAWER',
    })
  };


    return (
        <>
        <button onClick = {showDrawer}>showDrawer</button>
        <Drawer
          title= {title}
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={callBackSubmit} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          {/* Nội dung thay đổi của Drawer */}
          {ComponentContentDrawer}
          {/* <ComponentContentDrawer/> */}
        </Drawer>
      </>
    )
}
