import React, { Component } from 'react';
import Axios from 'axios';
import style from './TodoList.css';

class TodoListRCC extends Component {

    state = {
        taskList: [],
        values: {
            taskName: '',
        },
        errors: {
            taskName: ''
        }
    }


    getTaskList = () => {
        //Axios trả về 1 promise
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET',
        });
        promise.then((response) => {
            console.log("response", response.data);
            //? Nếu gọi api lấy về mảng taskList thì set lại state taskList vs mảng đc lấy về
            this.setState({
                // ...this.state,
                taskList: response.data,
            }, ()=> {console.log("state in RCC", this.state)})
        });

        promise.catch((error) => {
            console.log("error", error);
        })
    }


    


    renderTaskTodo = () => {
        return this.state.taskList.filter(task => !task.status).map((task, index) => {
            return  <li key = {index}>
                        <span>{task.taskName}</span>
                        <div className="buttons">
                        <button className="remove" type = "button" onClick={ () => {this.deleteTask(task.taskName)}}>
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button className="complete" type = "button" onClick = {() => {this.checkTask(task.taskName)}}>
                            <i className="far fa-check-circle" />
                            <i className="fas fa-check-circle" />
                        </button>
                        </div>
                    </li>
        })
    }




    renderTaskTodoDone = () => {
        return this.state.taskList.filter(task=> task.status).map((task, index) => {
            return  <li key = {index}>
                        <span>{task.taskName}</span>
                        <div className="buttons">
                        <button className="remove" type = "button" onClick={ () => {this.deleteTask(task.taskName)}}>
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button type = "button" className="complete" onClick = {()=> {this.rejectTask(task.taskName)}}>
                            <i className="far fa-undo" />
                            <i className="fas fa-undo" />
                        </button>
                        </div>
                    </li> 
          

        })
    }




    //? hàm sẽ tự động thực thi sau khi nội dung component đc render
    //mởi bật web lên thì sau khi chạy xong hàm render phải get đc taskList
    componentDidMount() {
        this.getTaskList();
    }



    handleChange = (e) => {
        
        let { value, name } = e.target;
        console.log(value, name);
        let newValues = { ...this.state.values };

        newValues = { ...newValues, [name]: value };

        let newErrors = { ...this.state.errors };

        let regexString = /^[a-z A-Z]+$/;

        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid !';
        } else {
            newErrors[name] = '';
        }


        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        })
    }







    addTask = (e) => {
        e.preventDefault();
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: {taskName: this.state.values.taskName},  //gửi lên serve 1 task mới
        });
        promise.then((response) => {
            // console.log("response", response);
            //sau khi đưa dữ liệu thành công lên serve thì gọi hàm getTaskList lại để load lại danh sách taskList(bao gồm taskName)
            this.getTaskList();
        })

        promise.catch((errors) => {
            alert(errors.response.data);     //task name is already exists!
        })
    }




    //hàm xóa task
    deleteTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE',
        })

        promise.then((response) => {
            console.log("response", response);
            this.getTaskList();
        });

        promise.catch((errors) => {
            console.log(errors.response.data); 
        })
    }




    //xử lí done task
    checkTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT',
        })

        promise.then((response) => {
            console.log("response", response);
            this.getTaskList();
        });

        promise.catch((errors) => {
            console.log(errors.response.data); 
        })
    }



    //xử lí undoTask đã hoàn thành 

    rejectTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT',
        })

        promise.then((response) => {
            console.log("response", response);
            this.getTaskList();
        });

        promise.catch((errors) => {
            console.log(errors.response.data); 
        })
    }




    render() {
        return (
            <form onSubmit = {this.addTask}>
                {/* <button className="btn btn-success" onClick = {() => {this.getTaskList()}}>Get Task List</button> */}
                <div className="card">
                    <div className="card__header">
                    <img src={require('./bg.png')} alt="todolist" />
                    </div>
                    {/* <h2>hello!</h2> */}
                    <div className="card__body">
                        <div className="card__content">
                            <div className = "form-group">
                                <div className="card__title">
                                    <h2>My Tasks</h2>
                                    <p>September 9,2020</p>
                                </div>
                                <div className="card__add">
                                    <input name = "taskName" id="newTask" onChange = {this.handleChange} type="text" placeholder="Enter an activity..." />
                                    <button id="addItem" type = "submit" onClick = {this.addTask}>
                                        <i className="fa fa-plus" />
                                    </button>

                                </div>
                                    <p className="text-danger"> {this.state.errors.taskName}</p>
                                
                            </div>
                            <div className="card__todo">
                                    {/* Uncompleted tasks */}
                                    <ul className="todo" id="todo">
                                        {this.renderTaskTodo()}
                                    </ul>
                                    {/* Completed tasks */}
                                    <ul className="todo" id="completed">
                                        {this.renderTaskTodoDone()}
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default TodoListRCC;