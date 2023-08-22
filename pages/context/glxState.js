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
    const [users, setUsers] = useState([])
    const [items, setItems] = useState([])
    const [userItems, setUserItems] = useState([])
    const [loadMoreBtn, setLoadMore] = useState(true)
    const [show, setShow] = useState("hidden")
    const [message, setMessage] = useState("")
    const [showSkeleton, setShowSkeleton] = useState(false)
    const router = useRouter()
    const [searchItem, setSearchItem] = useState([])

    // Function to get Items
    const getItem = async (limit) => {
        setShowSkeleton(true);
        const res = await fetch(`/api/item?limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const { data, loadMore } = await res.json()
        setItems(data)
        if (loadMore === false) {
            setLoadMore(false)
        }
        setShowSkeleton(false);
    }

    // Function to get User Items
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

    // Function to add user in chat
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

    //  Function to get Item By Search 
    const getItemBySearch = async (search, limit) => {
        setShowSkeleton(true);
        const res = await fetch(`/api/searchItem?search=${search}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const { data } = await res.json()
        setSearchItem(data)
        setShowSkeleton(false);
    }

    // Function to create Item
    const createItem = async (item) => {
        setShowSkeleton(true);
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
            setMessage("Ad Created Successfully")
            showAlert()
            setItems([...items, result.data])
            setShowSkeleton(false);
            router.push("/myads")
        }
    }

    // Function to add user into chat list
    const getChattingWith = async () => {  // Working Fine
        setShowSkeleton(true);
        let currentUser = localStorage.getItem("currentUserId");
        let res = await fetch(`/api/chattingwith?id=${currentUser}`)
        let data = await res.json();
        if (data.success) {
            getAllUsersData(data.chattingWith.chattingWith)
        }
    }

    // Function to getAllUsersData in chat
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
        setShowSkeleton(false);
    }

    // Function to show Alert Box
    const showAlert = () => {
        setShow("")
        setTimeout(() => {
            setShow("hidden")
        }, 2500)
    }
    return (
        <glxContext.Provider value={{ createItem, getItem, getItemBySearch, items, addUser, searchItem, setSearchItem, getChattingWith, getAllUsersData, users, show, message, setShow, getUserItem, userItems, showSkeleton, loadMoreBtn, showAlert }}>
            {children}
        </glxContext.Provider>
    )
}

export default GlxState;