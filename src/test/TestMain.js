import React, { useState }  from 'react';
import UserTest from './UserTest';

export default function TestMain() {
    const [hidden, setHidden] = useState(0);
    
    const onhideShow = () => {
        if(hidden) setHidden(0);
        else setHidden(1);
    };

    return (
        <div>
            <button onClick={onhideShow}>
                USER TEST
            </button>
            {hidden ? (<div> <UserTest /> </div>) : ""}
        </div>
    )
}