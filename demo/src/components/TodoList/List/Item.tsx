import react, { FC } from 'react'
import { ITodo } from '../typings';
import { Button} from 'antd'
interface IProps {
    todo : ITodo;
    toggleTodo : (id: number) => void
    removeTodo : (id: number) => void
}

const TdItem: FC<IProps> = ({
    todo,
    toggleTodo,
    removeTodo
}) => {
    const {id, content, completed} = todo
    return (
        <div className='todo-item'>
            <input 
            type="checkbox" 
            checked = { completed }
            onChange = { () => toggleTodo(id) }
            />
            <span style = { {textDecoration : completed ? 'line-through' : 'none'} }>
                { content}
            </span>
            <Button className='btnDel' type="primary" danger size='small' onClick={ () => removeTodo(id)}>删除</Button>
        </div>
    )
}
export default TdItem;