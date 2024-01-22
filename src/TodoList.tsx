import {FilterValuesType} from "./App.tsx";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, title: string) => void
}

export function TodoList(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodoList = () => props.removeTodoList(props.id)
    const addTask = (title: string) => props.addTask(title, props.id)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((task: TaskType) => {
                        const onRemoveHandler = () => props.removeTask(task.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(task.id, newValue, props.id)

                        }
                        return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeStatusHandler}/>
                            <EditableSpan title={task.title}
                                          onChange={onChangeTitleHandler}/>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

