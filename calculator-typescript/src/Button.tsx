import React from 'react';

interface Props{
    display: string;
    onClick: ButtonClick;
}

export const Button: React.FC<Props> = ({display, onClick}) => {
    return (
        <button className="button" onClick={() => onClick()}>
            {display}
        </button>
    );
}