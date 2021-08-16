import React, {useEffect, useState} from 'react'

const syntax = () => {

    const [checkBoxValue, setCheckBoxValue] = useState(false);

    useEffect(() => {
        console.log("in useEffect")
        return () => {
            console.log("in useEffect cleanup")
        }
    },[checkBoxValue]);

    return (
        <div>
            <h1>Syntax page</h1>

        </div>
    )
}

export default syntax
