import React, { useEffect, useState } from "react"
import glxContext from "./glxContext";


const GlxState = ({ children }) => {
    const [user, setUser] = useState(null)
    const [items, setItems] = useState([])


    const getUser = async () => {
        const res = await fetch('/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth': localStorage.getItem('token')
            }
        })
        const data = await res.json()
        setUser(data.user)
    }
    const getItem = async () => {
        const res = await fetch('/api/item', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setItems(data.data)
    }
    const createItem = async (item) => {
        const res = await fetch('/api/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        const data = await res.json()
        setItems([...items, data.data])
    }

    return (
        <glxContext.Provider value={{ createItem, getItem, items, getUser, user }}>
            {children}
        </glxContext.Provider>
    )
}

export default GlxState;