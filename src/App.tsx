import {TaskType, TodoList} from "./TodoList.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";


export type FilterValuesType = "all" | "completed" | "active"
type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
            {id: v1(), title: "REDUX", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true},]
    })
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "active"},
        {id: todoListId2, title: "What to buy", filter: "completed"},
    ])

    function removeTodoList(todoListId: string) {
        const filteredTodoLists = todoLists.filter(tL => tL.id !== todoListId)
        setTodoLists(filteredTodoLists)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }
    function changeTodoListTitle(id: string, newTitle: string) {
        const todoList = todoLists.find(tL => tL.id === id)
        if (todoList) todoList.title = newTitle
        setTodoLists([...todoLists])
    }
    function removeTask(id: string, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTask(title: string, todoListId: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        const tasks = tasksObj[todoListId]
        const newTasks = [newTask, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const TasksChangeIsDone = tasks.map(task => {
            if (id && task.id === id) task.isDone = isDone
            return task
        })
        tasksObj[todoListId] = TasksChangeIsDone
        setTasksObj({...tasksObj})
    }
    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const TasksChangeIsDone = tasks.map(task => {
            if (id && task.id === id) task.title = newTitle
            return task
        })
        tasksObj[todoListId] = TasksChangeIsDone
        setTasksObj({...tasksObj})
    }
    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tL => tL.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function addTodoList(title: string) {
        const todoList: TodoListType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodoLists([todoList, ...todoLists])
        setTasksObj({...tasksObj, [todoList.id]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((tL) => {
                    let tasksForTodoList = tasksObj[tL.id]
                    if (tL.filter === "completed") tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                    if (tL.filter === "active") tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                    return <TodoList title={tL.title}
                                     key={tL.id}
                                     id={tL.id}
                                     tasks={tasksForTodoList}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={tL.filter}
                                     removeTodoList={removeTodoList}
                                     changeTaskTitle={changeTaskTitle}
                                     changeTodoListTitle={changeTodoListTitle}
                    />
                })
            }
        </div>)
}

export default App
