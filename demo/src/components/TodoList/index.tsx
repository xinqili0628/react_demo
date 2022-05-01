import React, { FC, ReactElement, useCallback, useEffect, useReducer, useState } from "react";
import { todoReducer } from "../../redux";
import TdInput from "./Input";
import TdList from "./List";
import { ITodo,IState, ACTION_TYPE } from "./typings";
import {Card} from 'antd'


function init(initTodoList: ITodo[]):IState{
    return {
        todoList: initTodoList
    }
}

const TodoList:FC = ():ReactElement =>{
    // 惰性初始化的写法
    const [ state, dispatch] = useReducer(todoReducer,[],init)

    useEffect(()=>{
        const list = localStorage.getItem('todolist' || '[]');
        if(list){
            const todoLists = JSON.parse(list);
            dispatch({
                type: ACTION_TYPE.INIT_TODOLIST,
                payload: todoLists
            })
        }
    },[])
    useEffect(()=>{
       localStorage.setItem('todolist',JSON.stringify(state.todoList))
    },[state.todoList])

    const addTodo = useCallback((todo:ITodo) => {
        dispatch({
            type:ACTION_TYPE.ADD_TODO,
            payload: todo
        })
    },[])

    // 删除
    const removeTodo = useCallback((id:number)=>{
        dispatch({
            type: ACTION_TYPE.REMOVE_TODO,
            payload: id
        })
    },[])

    // 假删除
    const toggleTodo = useCallback((id:number)=>{
        dispatch({
            type: ACTION_TYPE.TOGGLE_TODO,
            payload: id
        })
    },[])

    return(
        <div className="todo-list">
            <Card title="待办事项" bordered={true} style={{ width: 300 }}>
            <TdInput 
                addTodo={addTodo}
                todoList={state.todoList}
            />
            <TdList
                todoList={state.todoList}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            />
            </Card>
        </div>
    )
}

export default TodoList;