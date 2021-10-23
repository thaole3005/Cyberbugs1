import React, {useEffect} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import ProjectCategoryReducer from '../../../redux/reducers/ProjectCategoryReducer';



//!props của component CreateProject vừa bao gồm prop của formik vừa prop của connect vừa prop của route vừa prop của component
function CreateProject(props) {

    // console.log("props of CreateProject", props);
    // console.log("helu")


    //lấy mảng category từ redux Store về
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    // console.log("arrProjectCategory", arrProjectCategory)

    const dispatch = useDispatch();


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





    const handleEditorChange = (content, editor) => {
        // console.log("props of CreateProject", props);
        // console.log("content was updated", content);
        // console.log("content was updated", editor);
        setFieldValue('description', content);
    }


    //lúc mới vào trang web thì dispatch action call api để lấy về các product category rồi lưu vào redux Store
    useEffect(()=> {
        // console.log("useEffect dispatch");
        //dispatch action api lên saga
        dispatch({type: 'GET_ALL_PROJECT_CATEGORY_SAGA',})
    }, [])







    return (
        <div className="container mt-4">
            <h3>CreateProject</h3>
            <form className="container"onSubmit={handleSubmit} >
                <div className="form-group">
                    <p>Name</p>
                    <input className="form-control"
                        onChange = {handleChange} name = "projectName"/>
                </div>
                <div className="form-group">
                    <p>Description</p>
                    <input className="form-control" name = "description"/>
                    <>
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
                            onEditorChange={handleEditorChange}
                        />
                    </>
                </div>
                <div className="form-group">
                    <select className="form-control" name = "categoryId" 
                        onChange = {handleChange}>
                       
                        {arrProjectCategory.map((item, index) => {
                            return <option key ={index} value = {item.id}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button className="btn btn-success" type ="submit">Create project</button>
            </form>
        </div>
    )
}




//!component createProjectForm là HOC của component CreateProject
const createProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        // console.log("mapPropsToValues");
        console.log("props in withFormik", props)


      return {
        projectName: '',
        description: '',
        categoryId: props.arrProjectCategory[0]?.id,
      }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        console.log("values", values);
        // console.log("props in handleSubmit withFormik", props)
        //dispatch action saga
        props.dispatch({
            type: 'CREATE_PROJECT_SAGA',
            newProject: values,
        })
    },
    displayName: 'CreateProjectFormik',
})(CreateProject);


const mapStateToProps = (state) => {
    
    // console.log("mapStateToProps");
    return {
            //Lấy ra mangr arrProjectCategory từ reduxStore về
            arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
    }

}



export default connect(mapStateToProps) (createProjectForm);