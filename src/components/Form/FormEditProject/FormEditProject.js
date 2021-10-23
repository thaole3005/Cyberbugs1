import React, {useState, useEffect} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';


function FormEditProject(props) {
    // const [useState, setState] = useState();
    const dispatch = useDispatch();
    console.log("props of HOC EditProjectForm", props);


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
    console.log("values in HOC EditProjectForm", values);

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    console.log("arrProjectCategory", arrProjectCategory)


    useEffect(() => {
        //khi coomponent FormEditProject đc render thì đầu tiên phải dispatch saga để lấy đc mảng arrProjectCategory để hiển thị các thẻ option
        dispatch({type: 'GET_ALL_PROJECT_CATEGORY_SAGA'})


        //!khi bấm vào nút edit của component ProjectManagement thì dispatch hàm handleSubmit của formik ở component FormEditProject 
        // lên DrawerCyberbugsReducer, để component ModalCyberbugs kéo về hàm callBackSubmit mới khi click vào submit của component ModalCyberbugsư
        const action = {
            type: 'SET_SUBMIT_EDIT_PROJECT',
            submitFunction: handleSubmit,
        }
        dispatch(action);

    }, []);



    const handleEditorChange = (content, editor) => {
        console.log("handleEditorChange", content);
        setFieldValue('description', content);

    }
    


    // const submitForm = (event) => {
    //     event.preventDefault();
    //     console.log("chạy hàm submit");
    //     alert("submit edit");
    // }

    console.log("run component FormEditProject");


    return (
        <form className = "container-fluid" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <h5 className="font-weight-bold">Project Id</h5>
                        <input value = {values.id} disabled className="form-control" type = "text" name = "id"/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <h5 className="font-weight-bold">Project Name</h5>
                        <input value = {values.projectName} className="form-control" type = "text"
                         name = "projectName" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <h5 className="font-weight-bold">Project Category</h5>
                        <select name = "categoryId" value = {values.categoryId} onChange={handleChange}>
                            {arrProjectCategory.map((item, index) => {
                                return <option value = {item.id} key = {index}>
                                    {item.projectCategoryName}
                                </option>
                            })}
                        </select>
                    </div>
                </div>
                <div className = "col-12">
                    <div className="form-group">
                    <h5 className="font-weight-bold">Project Description</h5>
                        <Editor
                                name = "descriptionEdit"
                                initialValue={values.description}
                                value={values.description}
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
                                onEditorChange={handleEditorChange}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}



const EditProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        // console.log("mapPropsToValues");
        //?component EditProjectForm đc bỏ trong hàm connect = > tạo ra props có hàm dispatch
        console.log("props in withFormik of EditProjectForm", props);
        const {projectEdit} = props;

        //cái gì đc return ở hàm mapPropsToValues của withFormik chính là gtri props.values
      return {
        id: projectEdit?.id,
        projectName: projectEdit?.projectName,
        description: projectEdit?.description,
        categoryId: projectEdit?.categoryId,
      }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        //values chính là gtri của ng dùng sau khi thay đổi
        console.log("values in handleSubmit", values);
        //khi người dùng bấm submit ==> đưa dữ liệu về backend thông qua api
        const action = {
            type: 'UPDATE_PROJECT_SAGA',
            projectUpdate: values,
        }
        //gọi saga
        props.dispatch(action);

    },
    displayName: 'EditProjectForm',
})(FormEditProject);


const mapStateToProps = (state) => {
    console.log("mapStateToProps")
    return {
        projectEdit: state.ProjectReducer.projectEdit,
    }
}



export default connect(mapStateToProps) (EditProjectForm);