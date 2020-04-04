import React from 'react';

export default function Login() {

    const onSubmit = e => {
        e.preventDefault();
        console.log('submit');
    }

    return (
        <div>
            <button onSubmit={onSubmit}>
                normal login
            </button>
        </div>
    )
}