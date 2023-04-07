import React from 'react';

const Divider = ({ children }) => {
    return (
        <div className='divider-container'>
            <div className='divider' />
            {children}
        </div>
    )
}

export default Divider;