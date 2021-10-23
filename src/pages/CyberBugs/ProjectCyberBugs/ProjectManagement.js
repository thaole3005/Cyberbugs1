import React, { useState, useEffect, useRef  } from "react";
import { Table, Button, Space } from "antd";
import ReactHtmlParser from "html-react-parser"; //thư viện cho phép parse từ html tag sang jsx tag
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Tag, Divider } from "antd";
import FormEditProject from "./../../../components/Form/FormEditProject/FormEditProject";
import { Popconfirm, message } from "antd";
import { Avatar, Image, Popover, AutoComplete  } from 'antd';
import UserCyberBugsReducer from './../../../redux/reducers/UserCyberBugsReducer';
import { NavLink } from "react-router-dom";


// const confirm = (e) => {
//   console.log(e);
//   message.success("Click on Yes");
  
// };

const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};

export default function ProjectManagement(props) {
  //lấy projectList từ reducer về
  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList
  );


  //lấy userSearch từ UserCyberBugsReducer về
  const {userSearchList} = useSelector(state => state.UserCyberBugsReducer);


  //*tạo state để thay đổi giao diện từ userId => name khi ng dùng search để thêm member vào dự án
  const [value, setValue] = useState('Nhập tên member');


  
  //!sử dụng debounce search
  const searchRef = useRef(null);



  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  //sử dụng useDispatch để gọi action
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect");
    dispatch({
      type: "GET_PROJECT_LIST_SAGA",
    });
  }, []);

  console.log("test");

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;

  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => {
        //id là sắp xếp theo kiểu number
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
    },
    
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      //truyền id của project vào đường link của thẻ navlink
      render: (text, record, index) => {
        return <NavLink to = {`/projectdetail/${record.id}`}>{text}</NavLink>
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName.trim().toLowerCase();
        let projectName2 = item2.projectName.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "creator",
      //   dataIndex: 'creator',
      key: "creator",
      render: (text, record, index) => {
        // console.log("run render")

        // console.log("text in creator", text);
        // console.log("record", record);
        return (
          <Tag color="green" key={index}>
            {record.creator?.name}
          </Tag>
        );
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator.name.trim().toLowerCase();
        let creator2 = item2.creator.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1; //dảo thứ tự
        }
        return 1; //giữ nguyên
      },
    },
    {
      title: "CategoryName",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName.trim().toLowerCase();
        let categoryName2 = item2.categoryName.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1; //dảo thứ tự
        }
        return 1; //giữ nguyên
      },
    },

    {
      title: "description",
      dataIndex: "description",
      key: "description",
      render: (text, record, index) => {
        //hàm render sẽ return ra thẻ jsx trên giao diện
        // console.log("text description",  text);
        //   console.log("record", record);
        //   console.log("index", index);
        //?hàm HTMLReactParser nhận tham số là 1 string có dạng html tag
        let jsxContent = ReactHtmlParser(text);
        //   console.log("jsxContent", jsxContent);
        if (typeof text !== "string") {
          return "not a a string";
        } else {
          return <div key={index}>{jsxContent}</div>;
        }
      },
    },

    // {
    //       title: 'description',
    //       dataIndex: 'description',
    //       key: 'description',
    //       render: (text, record, index) => {
    //           let contentJSX = ReactHtmlParser(text);

    //           return <div>
    //               {contentJSX}
    //           </div>
    //       }
    //   },




    {

      title: "Member",
      key: "member",
      render: (text, record, index) => {
        // return <Avatar src="https://picsum.photos/50" />;
        return <div>
                    {
                    //? viết logic Js
                    record.members?.slice(0,3).map((member, index) => {
                      return <Popover placement = "top" title ="Members in project" key = {index}
                                content = {() => {
                                  return <table className="table">
                                      <thead>
                                        <tr>
                                          <td>userId</td>
                                          <td>Avatar</td>
                                          <td>Name</td>
                                          <td>Action</td>
                                        </tr>
                                      </thead>

                                      <tbody>
                                        {
                                          record.members.map((member, index) => (
                                            <tr key={index}>
                                              <td>{member.userId}</td>
                                              <td>
                                                <img src = {member.avatar} width = "30" height = "30" style = {{borderRadius: '50%'}}/>
                                              </td>
                                              <td>{member.name}</td>
                                              <td>
                                                <button className="btn btn-danger"
                                                  onClick = {() => {
                                                    const action = {
                                                      type: 'DELETE_USER_PROJECT_SAGA',
                                                      userProject: {
                                                        userId: member.userId,
                                                        projectId: record.id,
                                                      }
                                                    }
                                                    dispatch(action);
                                                  }}
                                                ><DeleteOutlined /></button>
                                              </td>
                                            </tr>
                                          ))
                                        }
                                      </tbody>
                                  </table>
                                }}
                              >
                                  <Avatar src={member.avatar} key={index} />
                            </Popover>
                  })}

                  {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

                  <Popover placement="rightTop" title={"add User"} content={() => {
                    return <AutoComplete 

                    //thuộc tính options của AutoComplete chỉ cho phép nhận vào mảng gồm các đối tượng vs thuộc tính là label vàvalue nên phải biến đổi 
                    //mảng userSearchList về mảng phù hợp, và thuộc tính value chỉ đc mang gtri kiểu string nên phải đồi userId (kiểu number) ==> kiểu string
                      options = {userSearchList?.map((user, index) => {
                        return {label: user.name, value: user.userId.toString()};
                      })}
                    

                      //?mỗi khi ng dùng nhập thì gtri từ onChange sẽ đc setVale, ta lấy gtri đc thay đổi đó hiển lên ô input
                      value = {value}

                      onChange = {(text) => {
                        console.log("vào hàm onChange", text);
                        setValue(text);

                      }}

                      onSelect = {(valueSelect, option) => {
                        console.log(" vào hàm onSelect");
                        //*option chính là object gồm 2 thuộc tính label và value đc khai báo ở options attribute
                        console.log("value khi onSelect chính là userId", value);
                        console.log("option of onSelect", option);
                        //!set giá trị trong hộp thoiaj bằng option.label (nghĩa là name của user)
                        setValue(option.label);

                        //!tuy nhiên api khi gửi về backend thì cần userId của member(option.value) chứ k phải name(option.label)
                        dispatch({
                          type: 'ADD_USER_PROJECT_SAGA',
                          userProject: {
                            "projectId": record.id,
                            "userId": valueSelect,
                          }
                        })
                      }}

                    className="w-100" 
                    
                    onSearch = {(value) => {
                      //VALUE ở dây chính là giá trị người dùng gõ vào
                      console.log("searchValue ở hàm onSearch", value);
                      //!nếu mỗi lần ng dùng search mà call api ngay lập tức có thể gây tràn RAM tại server => phải dùng debounce search

                      //lần đầu searchRef = null nên sẽ k chạy vào if
                      //mục đích => xóa searchRef.current của lần trước
                      if(searchRef.current) {
                        clearTimeout(searchRef.current);
                      }

                      //nếu tgian > 300ms thì mới call api
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: 'GET_USER_CYBERBUGS_SAGA',
                          keyWord: value,
                        })
                      }, 500)
                   
                    }}/>
                  }} trigger="click">
                  <Button style = {{borderRadius: '50%'}}>+</Button>
                </Popover>
              </div>
        
       
      }

    },







    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <button
            className="btn btn-info"
            onClick={() => {
              const action = {
                type: "OPEN_FORM_EDIT_PROJECT",
                title: 'Edit Project',
                Component: <FormEditProject />,
                // SubmitFunction:
              };
              dispatch(action);

              //dispatch dữ liệu dùng hiện tại
              const actionEditProject = {
                type: "EDIT_PROJECT",
                projectEditModel: record,
              };
              dispatch(actionEditProject);
            }}
          >
            <EditOutlined style={{ fontSize: 17 }} />
          </button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              //nếu confirm đồng ý xóa thì mới dispatch action lên saga
              dispatch({
                type: "DELETE_PROJECT_SAGA",
                idProject: record.id,
              });
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
             <button
            className="btn btn-danger"
            // onClick={() => {
            //   dispatch({
            //     type: "DELETE_PROJECT_SAGA",
            //     idProject: record.id,
            //   });
            // }}
          >
            <DeleteOutlined style={{ fontSize: 17 }} />
          </button>
          </Popconfirm>
          ,
         
        </Space>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h2>Project Management</h2>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
