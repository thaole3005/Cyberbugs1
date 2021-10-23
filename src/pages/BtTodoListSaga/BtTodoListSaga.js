import React from 'react';
import Axios from 'axios';
import style from './TodoList.css';
import { useState, useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {GET_TASKLIST_API, ADD_TASK_API, DELETE_TASK_API, DONE_TASK_API, REJECT_TASK_API} from '../../redux/constants/TodoListConstants';



export default function BtTodoListSaga() {

    const [state, setState] = useState({
        taskList: [],
        values: {
            taskName: '',
        },
        errors: {
            taskName: ''
        }
    })


    const dispatch = useDispatch();
    const {taskList} = useSelector(state => state.TodoListReducer);


    // console.log("state in RFC", state)






    

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











    const getTaskList = () => {
       dispatch({
           //dispatch lên middleWare tên của action Saga
           type: GET_TASKLIST_API,
           data: 'abc',
       })
    }


    //mặc định sau khi hàm render chạy xong thì sẽ chạy hàm này
    useEffect(() => {

        //gọi hàm getTaskList
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
                        <button className="complete" type = "button" onClick = {() => {checkTask(task.taskName)}}>
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









    const addTask = (e) => {
        e.preventDefault();
        dispatch({
            type: ADD_TASK_API, 
            taskName: state.values.taskName,
        })
    }



    

    //hàm xóa task
    const deleteTask = (taskName) => {
       

        dispatch({
            type: DELETE_TASK_API,
            taskName: taskName,
        })
    }




    //xử lí done task
    const checkTask = (taskName) => {
        dispatch({
            type: DONE_TASK_API,
            taskName: taskName,
        })
    }



    //xử lí undoTask đã hoàn thành 

    const rejectTask = (taskName) => {
        dispatch({
            type: REJECT_TASK_API,
            taskName: taskName,
        })
    }








    return (
        <div className="card">
            <button className="btn btn-success" onClick={() => {
                dispatch({
                    type: 'getTaskListApiAction'
                })
            }}
            >Dispatch getTaskListApiAction SAGA</button>
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