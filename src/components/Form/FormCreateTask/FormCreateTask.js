import React, {useState, useEffect} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Select, Slider  } from 'antd';
import  {connect, useSelector, useDispatch} from 'react-redux';
import { GET_ALL_PROJECT_SAGA } from './../../../redux/constants/Cyberbugs/ProjectCyberBugsConstants';
import { TaskTypeReducer } from './../../../redux/reducers/TaskTypeReducer';
import { GET_ALL_TAKSK_TYPE_SAGA } from './../../../redux/constants/Cyberbugs/TaskTypeConstant';
import { GET_ALL_PRIORITY_SAGA } from './../../../redux/constants/Cyberbugs/PriorityConstant';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { GET_ALL_STATUS_SAGA } from './../../../redux/constants/Cyberbugs/StatusConstant';
import { GET_USERS_BY_ID_PROJECT_SAGA } from './../../../redux/constants/Cyberbugs/UserConstant';




const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function FormCreateTask(props) {


    
    //!do kết nối với formik => component có các prop của formik
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,     //cho phép set lại nguyên cả object values khi submit mà không cần thông qua handle change, có thể gọi hàm này để set lại value ở bất cứ hàm nào
        setFieldValue  //cho phép set lại value của 1 field nào đó, còn value các trường còn lại giữ nguyên, khi submit mà không cần thông qua handle change, có thể gọi hàm này để set lại value ở bất cứ hàm nào
    } = props;
    console.log("values in HOC FrmCreateTask", values);




    const dispatch = useDispatch();

    //lấy dữ liệu từ redux
    const {arrProject} = useSelector(rootReducer => rootReducer.ProjectCyberBugsReducer);
    // console.log("arrProject", arrProject);
    const {arrTaskType} = useSelector(rootReducer => rootReducer.TaskTypeReducer);
    // console.log("arrTaskType", arrTaskType);
    const {arrPriority} = useSelector(rootReducer => rootReducer.PriorityReducer);
    // console.log("handleSearch",handleSearch);
    
    const {arrStatus} = useSelector(rootReducer => rootReducer.StatusReducer);
    // console.log("arrStatus", arrStatus);

    const {arrUser} = useSelector(rootReducer => rootReducer.UserCyberBugsReducer);
    console.log("arrUser", arrUser);
    //tạo ra mảng option từ arrUser (chứa các option là các user đc assign tương ứng vào project)
    const usersOption = arrUser.map((user, index) => {
        return {label: user.name, value: user.userId};
    })

    console.log("userOption", usersOption);

    
    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })


    //hook
    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA,
        });

        dispatch({
            type: GET_ALL_TAKSK_TYPE_SAGA,
        });

        dispatch({
            type: GET_ALL_PRIORITY_SAGA,
        });

        dispatch({
            type: GET_ALL_STATUS_SAGA,
        })

        //đưa làm handleSubmit lên ModalCyberbugs để cập nhận lại sự kiện cho nút submit
        dispatch({
            type: 'SET_SUBMIT_CREATE_TASK',
            submitFunction: handleSubmit,
        })
      
    }, [])






  
  

    const handleMultiSelectChange = (values) => {
        //?Hàm này đc chạy khi select 1 option và lấy ra mảng value các option đc chọn
        console.log("selected array id  users",values);

        //!đây là handleChange của thẻ Select của Andesign nên k thể lấy dữ liệu khi submit như các thẻ select khác (là chỉ cần để onChange = {handleChange} thì formik sẽ tự động lấy)
        // * ==> phải sử dụng hàm setField và truyền vào tham số thứ nhất là tên của field muốn lấy dữ liệu, tham số thứ 2 là dữ liệu
        setFieldValue("listUserAsign", values);
      }



    const handleSearch = (value) => {
        //? Hàm này đc chạy khi ng dùng nhập vào ô multi select
        console.log("value ng dùng nhập", value);
        //mỗi lần search thì call api lấy về mảng user gồm tất cả các user
        dispatch({
            type: 'GET_USER_CYBERBUGS_SAGA',
            keyWord: '',
        })
    }
    

    return (
        <form className = "container" onSubmit = {handleSubmit}>
            <div className = "form-group">
                <p>Project Name</p>
                <select name = "projectId" className = "form-control" onChange={(e) => {
                    // //cập nhật giá trị cho trường projectId
                    setFieldValue("projectId", e.target.value);

                    //?mỗi lần select 1 project thì gọi action saga get users assigned trong project này và gửi vào mảng arrUser trên UserCyberBugsReducer
                    let {value} = e.target;
                    console.log("value khi onChange select Project Name ", value);
                    dispatch({
                        type: GET_USERS_BY_ID_PROJECT_SAGA,
                        idProject: value,
                    })

                }} >
                    {arrProject.map((project, index) => {
                        return <option value = {project.id} key = {index}>{project.projectName}</option>
                    })}
                   
                </select>
            </div>
            <div className="form-group">
                <p>Task Name</p>
                <input className = "form-control" name = "taskName" onChange={handleChange} />
            </div>
            <div className="form-group">
                <p>Status Id</p>
                <select className = "form-control" name = "statusId">
                    {arrStatus.map((statusItem, index) => {
                        return <option key={index} value = {statusItem.statusId}>{statusItem.statusName}</option>;
                    })}
                </select>
            </div>
            <div className = "form-group">
                <div className = "row">
                    <div className = "col-6">
                        <p>Priority</p>
                        <select name = "prioritytId" className = "form-control" onChange={handleChange}>
                            {
                                arrPriority.map((taskPriority, index) => {
                                    return <option key = {index} value = {taskPriority.priorityId}> {taskPriority.priority}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className = "col-6">
                        <p>Task Type</p>
                        <select name = "typeId" className = "form-control" onChange={handleChange}>
                            {arrTaskType.map((taskType,index)=>{
                                return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className = "form-group">
                <div className = "form-group">
                    <div className = "row">
                        <div className = "col-6">
                            <p>Assign Members</p>
                            <Select

                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                // defaultValue={['a10', 'c12']}
                                options = {usersOption}
                                optionFilterProp = "label"
                                onChange={handleMultiSelectChange}
                                onSearch = {handleSearch}
                                onSelect = {(value) => {
                                    console.log("selected present userId", value)
                                }}
                                >
                                {children}
                               
                            </Select>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <p>Original Estimate</p>
                                    <input className="form-control" type = "number" defaultValue = "0" min ="0" name = "originalEstimate"  onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className = "col-6">
                            <p>Time Tracking</p>
                            <Slider value = {Number(timeTracking.timeTrackingSpent)}
                                max = {Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                            
                            <div className="row">
                                <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent} h logged</div>
                                <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingRemaining} h remaining</div>
                            </div>
                            
                            <div className = "row" style = {{marginTop: '5px'}}>
                                <div className = "col-6">
                                    <p className = "text-info">Time spent</p>
                                    <input type = "number" defaultValue = "0" min = "0" className="form-control" name = "timeTrackingSpent"
                                        onChange = {(e) => {
                                            setTimeTracking({
                                                ...timeTracking,
                                                timeTrackingSpent: e.target.value,
                                            });

                                            setFieldValue("timeTrackingSpent", e.target.value);
                                        }}
                                    />
                                </div>
                                <div className = "col-6">
                                    <p className = "text-info">Time remaining</p>
                                    <input type = "number" defaultValue = "0" min = "0" className="form-control" name = "timeTrackingRemaining"
                                        onChange = {(e) => {
                                            setTimeTracking({
                                                ...timeTracking,
                                                timeTrackingRemaining: e.target.value,
                                            });
                                            setFieldValue("timeTrackingRemaining", e.target.value);

                                        }}
                                    />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                            name = "description"
                            initialValue="<p>This is the description of your project.</p>"
                            init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                             'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={(content, editor) => {
                                console.log("content", content);
                                console.log("editor", editor);
                                setFieldValue("description", content);

                            }}
                />
            </div>
            
            <button type = "submit">Submit test</button>
        </form>
    )
}





//!withFormik k phải là RFC nên k thể lấy dữ liệu từ redux về bằng uselelector Hook  ===> phải tạo ra coponent FrmCreateTask và phải kết nối component này bằng hàm connect thì component FrmCreateTask này sẽ tự động chứa các props của redux
const FrmCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {

        const {arrProject, arrPriority, arrTaskType, arrStatus} = props;
        console.log("arrProject in FrmCreateTask", arrProject);
        // console.log("mapPropsToValues");
        //?component EditProjectForm đc bỏ trong hàm connect = > tạo ra props có hàm dispatch
        console.log("props in withFormik of EditProjectForm", props);
        const {projectEdit} = props;


        //lấy về list user asigned cho project đầu tiên ở select Project Name (hiển thị mặc định lần đầu)
        // if(arrProject.length > 0 ) {
        //     props.dispatch({
        //         type: GET_USERS_BY_ID_PROJECT_SAGA,
        //         idProject: arrProject[0]?.id,
        //     })
        // }

        //cái gì đc return ở hàm mapPropsToValues của withFormik chính là gtri props.values
      return {
        taskName: '',
        description: '',
        statusId: arrStatus[0]?.statusId,
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
        projectId: arrProject[0]?.id,
        typeId: arrTaskType[0]?.id,
        priority: arrPriority[0]?.priorityId,
        listUserAsign: [],
      }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        console.log("values of FrmCreateTask", values);
        console.log("PROPS of handleSubmit in FrmCreateTask",props);
        
        //!sau khi lấy đc values từ tất cả các trường thì khi bấm nút submit sẽ vào hàm này, và dispatch saga action
        props.dispatch({
            type: 'CREATE_TASK_SAGA',
            taskObject: values,
        })
    },
    displayName: 'CreateTaskForm',
})(FormCreateTask);


const mapStateToProps = (rootReducer) => {
    console.log("mapStateToProps")
    return {
        arrProject: rootReducer.ProjectCyberBugsReducer.arrProject,
        arrTaskType: rootReducer.TaskTypeReducer.arrTaskType,
        arrPriority: rootReducer.PriorityReducer.arrPriority,
        arrStatus: rootReducer.StatusReducer.arrStatus, 

    }
}




export default connect(mapStateToProps) (FrmCreateTask);


    // //lấy dữ liệu từ redux
    // const {arrProject} = useSelector(rootReducer => rootReducer.ProjectCyberBugsReducer);
    // // console.log("arrProject", arrProject);
    // const {arrTaskType} = useSelector(rootReducer => rootReducer.TaskTypeReducer);
    // // console.log("arrTaskType", arrTaskType);
    // const {arrPriority} = useSelector(rootReducer => rootReducer.PriorityReducer);
    // // console.log("handleSearch",handleSearch);
    
    // const {arrStatus} = useSelector(rootReducer => rootReducer.StatusReducer);
    // // console.log("arrStatus", arrStatus);

    // const {userSearchList} = useSelector(rootReducer => rootReducer.UserCyberBugsReducer);
    // // console.log("userSearchList", userSearchList);
    // //tạo ra mảng option từ userSearchList
    // const usersOption = userSearchList.map((user, index) => {
    //     return {label: user.name, value: user.userId};
    // })