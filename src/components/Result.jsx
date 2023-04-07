import React from 'react';

const Result = ({ item }) => {

    return (
        <div>
            <span>{item.result ? item.result : '--'} </span>
            <span>{item.result > 1 ? `${item.id}s` : item.id}</span>
        </div>
    )
}

export default Result;