import React, { useEffect, useState } from "react"
import glxContext from "./glxContext";
import { useRouter } from "next/navigation";
import {
    doc, getDoc, addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    deleteDoc,
} from "firebase/firestore";
import { db } from "@/middleware/firebase"


const GlxState = ({ children }) => {
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [items, setItems] = useState([])
    const [userItems, setUserItems] = useState([])
    const [show, setShow] = useState("hidden")
    const [message, setMessage] = useState("")
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
        const { data } = await res.json()
        setItems(data)
    }
    const getUserItem = async (id) => {
        const res = await fetch('/api/useritem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        const { data } = await res.json()
        setUserItems(data);
    }

    const createItem = async (item) => {
        const { title, desc, price, category, subCategory, seller, sellerName, sellerPic } = item
        const metaData = { title, desc, price, category, subCategory, seller, sellerName, sellerPic }
        const formData = new FormData()
        item.images.forEach((file) => formData.append("media", file));
        formData.append('metaData', JSON.stringify(metaData))
        const res = await fetch('/api/item', {
            method: 'POST',
            body: formData
        })
        const result = await res.json()
        if (result.success) {
            setItems([...items, result.data])
            setMessage("Ad Created Successfully")
            showAlert()
        }
    }
    const addUser = async (userToken, currentUser, itemName, itemPrice) => {
        try {
            let res = await fetch(`/api/addchattingwith`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userToken, currentUser, itemName, itemPrice })
            })
            let { data } = await res.json()
            if (data) {
                getAllUsersData(data.chattingWith)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const getChattingWith = async () => {  // Working Fine
        let currentUser = localStorage.getItem("currentUserId");
        let res = await fetch(`/api/chattingwith?id=${currentUser}`)
        let data = await res.json()
        getAllUsersData(data.chattingWith.chattingWith)
    }

    const getAllUsersData = async (chattingWith) => {
        let newUsers = []
        for (let i = 0; i < chattingWith.length; i++) {
            const docRef = doc(db, "users", chattingWith[i].userToken);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                newUsers.push({ itemName: chattingWith[i].itemName, itemPrice: chattingWith[i].itemPrice, ...docSnap.data() })
            }
        }
        setUsers(newUsers)
    }

    const showAlert = () => {
        setShow("")
        setTimeout(() => {
            setShow("hidden")
        }, 2500)
    }
    return (
        <glxContext.Provider value={{ createItem, getItem, items, getUser, user, getChattingWith, getAllUsersData, users, addUser, show, message, setShow, getUserItem,userItems,  }}>
            {children}
        </glxContext.Provider>
    )
}

export default GlxState;