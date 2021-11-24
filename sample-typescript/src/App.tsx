import React, {useState} from 'react';
import { AddTodoForm } from './AddTodoForm';
import { TodoList } from './TodoList';

const initialTodos: Todo[] = [
    {
        text: 'Walk the dog',
        complete: false,
    },
    {
        text: 'Write app',
        complete: true,
    },
]

function App() {
    const [todos, setTodos] = useState(initialTodos);
    
    const toggleTodo = (selectedTodo: Todo) => {
        const newTodos = todos.map(todo => {
            if (todo === selectedTodo) {
                return {
                    ...todo,
                    complete: !todo.complete
                };
            }
            return todo;
        });
        setTodos(newTodos);
    }

    const submitTodo = (toAddTodo: string) => {
        const newTodo = {text: toAddTodo, complete: false};
        setTodos([...todos, newTodo]);        
    }
    return (
        <>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <AddTodoForm submitTodo={submitTodo} />
        </>
    );
}

export default App;