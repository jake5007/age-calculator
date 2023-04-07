import React from 'react';

const Input = ({ item, onChange }) => {

    const handleInputChange = (item, event) => {
        onChange(item, event);
    }

    return (
        <div>
            <label htmlFor={item.id} className={`${!item.isValid ? 'red-font' : null}`}>
                {item.id.toUpperCase()}
            </label>
            <input
                className={`${!item.isValid ? 'red-border' : null}`}
                id={item.id} 
                type='text'
                value={item.value}
                onChange={(event) => handleInputChange(item, event)}
                placeholder={item.placeholder} 
            />
            {
                item.msg ? <span className={`msg ${!item.isValid ? 'red-font' : null}`}>{item.msg}</span> : null
            } 
        </div>
    )
}

export default Input;
