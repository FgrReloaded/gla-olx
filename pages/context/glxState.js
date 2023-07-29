import React, { useEffect, useState } from "react"
import glxContext from "./glxContext";
import { useRouter } from "next/navigation";

const GlxState = ({ children }) => {
    const [user, setUser] = useState(null)
    const [items, setItems] = useState([])
    const router = useRouter()

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
        const { title, desc, price, category, seller, sellerName, sellerPic } = item
        const metaData = { title, desc, price, category, seller, sellerName, sellerPic }
        const formData = new FormData()
        item.images.forEach((file) => formData.append("media", file));
        console.log(formData.getAll('media'))
        formData.append('metaData', JSON.stringify(metaData))
        const res = await fetch('/api/item', {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        if(data.success){   
            setItems([...items, data.data])
            router.push("/")
        }
    }

    return (
        <glxContext.Provider value={{ createItem, getItem, items, getUser, user }}>
            {children}
        </glxContext.Provider>
    )
}

export default GlxState;