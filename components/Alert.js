import React, { useState, useContext } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import glxContext from '@/pages/context/glxContext'

const Alert = () => {
    let context = useContext(glxContext)
    const { show, message, setShow } = context
    
    return (
        <>
            <div className={`alertBox ${show}`}>
                <span>
                    <AiOutlineCloseCircle onClick={()=>{setShow("")}} size={20} />
                </span>
                <p>{message}</p>
            </div>
        </>
    )
}

export default Alert