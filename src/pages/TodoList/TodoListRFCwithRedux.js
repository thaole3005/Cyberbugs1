import React from 'react';
import Axios from 'axios';
import style from './TodoList.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TodoListReducer } from './../../redux/reducers/TodoListReducer';
import {getTaskListApi, addTaskApi,addTaskDoneApi, deleteTaskApi, rejectTaskApi} from '../../redux/actions/TodoListAction';


export default function TodoListRFCwithRedux(props) {



    //lấy taskList từ redux về
    const {taskList} = useSelector(state => state.TodoListReducer);
    const dispatch = useDispatch();

 
    console.log("taskList from REDUX", taskList);




    const [state, setState] = useState({
        taskList: [],
        values: {
            taskName: '',
        },
        errors: {
            taskName: ''
        }
    })




    const getTaskList = () => {
        dispatch(getTaskListApi());
      
    }


    //mặc định sau khi hàm render chạy xong thì sẽ chạy hàm này
    useEffect(() => {
       getTaskList();
       return () => {

       }
    }, [])


    const renderTaskTodo = () => {
        return taskList.filter(task => !task.status).map((task, index) => {
            return  <li key = {index}>
                        <span>{task.taskName}</span>
                        <div className="buttons">
                        <button className="remove" type = "button" onClick={ () => {deleteTask(task.taskName)}}>
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button className="complete" type = "button" onClick = {() => {addTaskDone(task.taskName)}}>
                            <i className="far fa-check-circle" />
                            <i className="fas fa-check-circle" />
                        </button>
                        </div>
                    </li>
        })
    }




    const renderTaskTodoDone = () => {
        return taskList.filter(task=> task.status).map((task, index) => {
            return  <li key = {index}>
                        <span>{task.taskName}</span>
                        <div className="buttons">
                        <button className="remove" type = "button" onClick={ () => {deleteTask(task.taskName)}}>
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button type = "button" className="complete" onClick = {()=> {rejectTask(task.taskName)}}>
                            <i className="far fa-undo" />
                            <i className="fas fa-undo" />
                        </button>
                        </div>
                    </li> 
          

        })
    }









    const handleChange = (e) => {
        let { value, name } = e.target;
        console.log(value, name);
        let newValues = { ...state.values };

        newValues = { ...newValues, [name]: value };

        let newErrors = { ...state.errors };

        let regexString = /^[a-z A-Z]+$/;

        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid !';
        } else {
            newErrors[name] = '';
        }


        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })

    }


    const addTask = (e) => {
        e.preventDefault();

        //xử lí nhận dữ liệu từ người dùng nhập => gọi action addTaskApi
        dispatch(addTaskApi(state.values.taskName));
    }



    

    //hàm xóa task
    const deleteTask = (taskName) => {
      dispatch(deleteTaskApi(taskName));
    }




    //xử lí done task
    const addTaskDone = (taskName) => {
       dispatch(addTaskDoneApi(taskName));
    }



    //xử lí undoTask đã hoàn thành 

    const rejectTask = (taskName) => {
      dispatch(rejectTaskApi(taskName));
    }








    return (
        <div className="card">
            <div className="card__header">
                <img src={require('./bg.png')} />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body" onSubmit = {addTask}>
                <div className="card__content">
                <div className="card__title">
                    <h2>My Tasks</h2>
                    <p>September 9,2020</p>
                </div>
                <div className="card__add">
                    <input id="newTask" name = "taskName" onChange = {handleChange} 
                     type="text" placeholder="Enter an activity..." />
                    <button id="addItem" type = "button" onClick = {addTask}>
                    <i className="fa fa-plus" />
                    </button>
                </div>
                <p className="text-danger"> {state.errors.taskName}</p>

                <div className="card__todo">
                    {/* Uncompleted tasks */}
                    <ul className="todo" id="todo">
                        {renderTaskTodo()}
                    </ul>
                    {/* Completed tasks */}
                    <ul className="todo" id="completed">
                        {renderTaskTodoDone()}
                    </ul>
                </div>
                </div>
            </form>
    </div>

    )
}
