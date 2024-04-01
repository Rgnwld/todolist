import React, { useState } from 'react';
import './App.css';
import { uid } from './tools/uid';

type Task = {
    id: string;
    name: string;
};

function App() {
    const [todoList, setTodoList] = useState<Task[]>([]);
    const [doingList, setDoingList] = useState<Task[]>([]);
    const [doneList, setDoneList] = useState<Task[]>([]);

    function NewTask(actionType: ActionType) {
        let taskName: string = window.prompt('Name your Task', 'Task') ?? '';

        if (taskName == '' || taskName == null) return;

        let newTask: Task = {
            id: uid(),
            name: taskName,
        };

        switch (actionType) {
            case ActionType.Todo:
                setTodoList([...todoList, newTask]);
                break;
            case ActionType.Doing:
                setDoingList([...doingList, newTask]);
                break;
            case ActionType.Done:
                setDoneList([...doneList, newTask]);
                break;
        }
    }

    return (
        <div className="App">
            <div className="TASK_TODO">
                <h1>TODO</h1>
                <div className="listTable">
                    {todoList.map((e) => (
                        <div
                            onClick={() => {
                                if (!window.confirm(`Send "${e.name}" to "doing" list?`)) {
                                    return;
                                }
                                let newTodoList = todoList;
                                const index = newTodoList.indexOf(e);
                                newTodoList.splice(index, 1);
                                setDoingList([...doingList, e]);
                                setTodoList([...newTodoList]);
                            }}
                            className="item"
                        >
                            {e.name}
                        </div>
                    ))}
                </div>
                <div
                    className="addTask"
                    onClick={() => {
                        NewTask(ActionType.Todo);
                    }}
                >
                    +
                </div>
            </div>
            <div className="TASK_DOING">
                <h1>DOING</h1>
                <div className="listTable">
                    {doingList.map((e) => (
                        <div
                            onClick={() => {
                                if (!window.confirm(`Send "${e.name}" to "done" list?`)) {
                                    return;
                                }
                                let newDoingList = doingList;
                                const index = newDoingList.indexOf(e);
                                newDoingList.splice(index, 1);
                                setDoneList([...doneList, e]);
                                setDoingList([...newDoingList]);
                            }}
                            className="item"
                        >
                            {e.name}
                        </div>
                    ))}
                </div>
                <div
                    className="addTask"
                    onClick={() => {
                        NewTask(ActionType.Doing);
                    }}
                >
                    +
                </div>
            </div>
            <div className="TASK_DONE">
                <h1>DONE</h1>
                <div className="listTable">
                    {doneList.map((e) => (
                        <div
                            onClick={() => {
                                if (!window.confirm(`Confirm to remove "${e.name}" from the list`)) {
                                    return;
                                }
                                let newList = doneList;
                                const index = newList.indexOf(e);
                                newList.splice(index, 1);

                                setDoneList([...newList]);
                            }}
                            className="item"
                        >
                            {e.name}
                        </div>
                    ))}
                </div>
                <div
                    className="addTask"
                    onClick={() => {
                        NewTask(ActionType.Done);
                    }}
                >
                    +
                </div>
            </div>
        </div>
    );
}

function removeValue(value: Task, index: number, arr: Task[]) {
    console.log(index);
    arr.splice(index, 1);
    return true;
    // return false;
}

enum ActionType {
    Todo,
    Doing,
    Done,
}

export default App;
