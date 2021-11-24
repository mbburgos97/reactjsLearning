import React, { useState } from 'react';

interface Props {
    submitTodo: SubmitTodo;
}

export const AddTodoForm: React.FC<Props> = ({submitTodo}) => {
    const [text, setText] = useState('');

    return (
        <form>
            <input type='text' value={text} onChange={(e) => {                
                setText(e.target.value);
            }}/>
            <button type='submit' onClick={(e) => {
                e.preventDefault();
                submitTodo(text);
                setText('');
            }}>Add Todo</button>
        </form>
    );
};