import React from 'react';
import Axios from 'axios';
import style from './TodoList.css';
import { useState, useEffect } from 'react';


export default function TodoListRFC() {


    const [state, setState] = useState({
        taskList: [],
        values: {
            taskName: '',
        },
        errors: {
            taskName: ''
        }
    })


    console.log("state in RFC", state)


    const getTaskList = () => {
        //Axios trả về 1 promise
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET',
        });
        promise.then((response) => {
            console.log("response", response.data);
            //? Nếu gọi api lấy về mảng taskList thì set lại state taskList vs mảng đc lấy về
            setState({
                ...state,
                taskList: response.data,
            })
        });

        promise.catch((error) => {
            console.log("error", error);
        })
    }


    //mặc định sau khi hàm render chạy xong thì sẽ chạy hàm này
    useEffect(() => {
       getTaskList();
       return () => {

       }
    }, [])


    const renderTaskTodo = () => {
        return state.taskList.filter(task => !task.status).map((task, index) => {
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
        return state.taskList.filter(task=> task.status).map((task, index) => {
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

        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: {taskName: state.values.taskName},  //gửi lên serve 1 task mới
        });
        promise.then((response) => {
            // console.log("response", response);
            //sau khi đưa dữ liệu thành công lên serve thì gọi hàm getTaskList lại để load lại danh sách taskList(bao gồm taskName)
            getTaskList();
        })

        promise.catch((errors) => {
            alert(errors.response.data);     //task name is already exists!
        })
    }



    

    //hàm xóa task
    const deleteTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE',
        })

        promise.then((response) => {
            console.log("response", response);
            getTaskList();
        });

        promise.catch((errors) => {
            console.log(errors.response.data); 
        })
    }




    //xử lí done task
    const checkTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT',
        })

        promise.then((response) => {
            console.log("response", response);
            getTaskList();
        });

        promise.catch((errors) => {
            console.log(errors.response.data); 
        })
    }



    //xử lí undoTask đã hoàn thành 

    const rejectTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT',
        })

        promise.then((response) => {
            console.log("response", response);
            getTaskList();
        });

        promise.catch((errors) => {
            console.log(errors.response.data); 
        })
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
