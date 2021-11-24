import React from 'react';

interface Props {
    display: string;
}

export const Screen: React.FC<Props> = ({display}) => {
    return (
        <div className="screen">
            <div className="textArea">{display}</div>
        </div>
    );
}