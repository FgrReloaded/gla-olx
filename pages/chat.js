import Head from 'next/head'
import React, { useEffect, useState, useRef, useContext } from 'react'
import styles from "@/styles/Chat.module.css"
import { Alice, Noto_Sans } from "next/font/google"
const alice = Alice({ subsets: ["latin"], weight: "400" })
const noto = Noto_Sans({ subsets: ["latin"], weight: "800" })
import { IoSendSharp } from "react-icons/io5"
import { GrSearch } from "react-icons/gr"
import { AiOutlinePaperClip, AiOutlineClose } from "react-icons/ai"
import { PiChatsFill } from "react-icons/pi"
import {
  doc, addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "@/middleware/firebase"
import { useRouter } from 'next/navigation';
import glxContext from './context/glxContext';



const chat = () => {
  const context = useContext(glxContext);
  const ref = useRef(null)
  const router = useRouter()
  const [hidden, setHidden] = useState(true)
  const [receiverData, setReceiverData] = useState(null)
  const [allMessages, setAllMessages] = useState([])
  const [chatMessage, setChatMessage] = useState("");
  const myUser = auth.currentUser;
  const [currentDate, setCurrentDate] = useState([])
  const [currentUserMessageId, setCurrentUserMessageId] = useState([])
  const { getChattingWith, users, getAllUsersData, addUser } = context;

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let userToken = urlParams.get('userTempToken')
    let currentUser = urlParams.get('currentUser')
    let item = urlParams.get('item')
    let price = urlParams.get('itemPrice')
    if (userToken && currentUser && item && price) {
      addUser(userToken, currentUser, item, price)
    } else {
      getChattingWith()
    }
    if (receiverData) {
      const unsub = onSnapshot(
        query(
          collection(
            db,
            "users",
            myUser?.uid,
            "chatUsers",
            receiverData?.id,
            "messages"
          ),
          orderBy("timestamp")
        ),
        (snapshot) => {
          let d = {}
          let msgId = []
          snapshot.docs.map((doc) => {
            if (doc.data().item === receiverData?.item) {
              msgId.push(doc.id)
              let date = doc.data().timestamp.toDate().toDateString().split(" ").slice(1).join(" ")
              let today = new Date().toDateString().split(" ").slice(1).join(" ")
              if (date === today) {
                date = "Today"
              }
              d[date] = [...d[date] || [], doc.data()]
            }
          })
          setAllMessages(d)
          setCurrentUserMessageId(msgId)
        }
      );
      return unsub;
    }
  }, [receiverData])




  const sendMessage = async () => { // Working Fine
    try {
      if (myUser && receiverData && chatMessage) {
        await addDoc(
          collection(
            db,
            "users",
            myUser.uid,
            "chatUsers",
            receiverData?.id,
            "messages"
          ),
          {
            username: myUser.displayName,
            messageUserId: myUser.uid,
            message: chatMessage,
            item: receiverData?.item,
            timestamp: new Date(),
          }
        );

        await addDoc(
          collection(
            db,
            "users",
            receiverData?.id,
            "chatUsers",
            myUser.uid,
            "messages"
          ),
          {
            username: myUser.displayName,
            messageUserId: myUser.uid,
            message: chatMessage,
            item: receiverData?.item,
            timestamp: new Date(),
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
    setChatMessage("");
  };
  const handleReceiver = (id, item, price) => { // Working Fine
    setReceiverData({ id, item, price })
  }
  const showDeleteBtn = (e) => { // Working Fine
    if (e.target.children.length > 0) {
      e.target.children[0].classList.toggle("hidden")
    }
  }
  const deleteMsg = async () => { // Working Fine
    try {
      if (myUser && receiverData) {
        for (let i = 0; i < currentUserMessageId.length; i++) {
          const docRef = doc(db, "users", myUser.uid, "chatUsers", receiverData.id, "messages", currentUserMessageId[i]);
          await deleteDoc(docRef)
        }
        let res = await fetch(`/api/chattingwith`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: myUser.uid, receiver: receiverData.id, item: receiverData.item })
        })
        let { data } = await res.json()
        setReceiverData(null)
        getAllUsersData(data.chattingWith)
      }
    } catch (error) {
      console.log(error.message);
    }
  }



  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <section className={styles.container}>
        <div className={styles.box}>
          <div className={styles.userListBox}>
            <div className={styles.chatHeader} style={noto.style}>
              <h3>Inbox</h3>
              <div>
                <GrSearch color='#728D90' size={25} /> <span color='#728D90'>&#8942;</span>
              </div>
            </div>
            <div className={styles.quickFilter}>
              <p>Quick filters</p>
              <div>
                <span className={styles.active}>All</span>
                <span>Meeting</span>
                <span>Unread</span>
                <span>Important</span>
              </div>
            </div>
            <ul>
              {users.length > 0 &&
                users.toReversed().map((user, index) => {
                  return (
                    <li onClick={() => { handleReceiver(user.userId, user.itemName, user.itemPrice) }} key={index}>
                      <img src={user.profilePic} style={{ objectFit: "cover" }} />
                      <a>{user.fullname}</a>
                      <p>{user.itemName}</p>
                      {/* <p>pehli fursat me nikal</p> */}
                      <span onClick={showDeleteBtn} color='#728D90'>&#8942; <div onClick={deleteMsg} className='hidden'>Delete</div></span>
                    </li>
                  )
                })}
            </ul>
          </div>
          <div className={`${styles.chatBox} ${!receiverData ? styles.noChat : null}`}>
            {!receiverData &&
              <div className={styles.noChats}>
                <PiChatsFill size={80} color='var(--secondary)' />
                <p>Select a User to Chat</p>
              </div>
            }
            {receiverData &&
              <div className={styles.chatContent}>
                <div className={styles.chatDetails}>
                  <div className={styles.chatUser}>
                    <img src={receiverData && users.filter(user => user.userId === receiverData?.id)[0].profilePic} style={{ objectFit: "cover" }} />
                    <h3 style={noto.style}>{
                      receiverData && users.filter(user => user.userId === receiverData?.id)[0].fullname
                    }</h3>
                    <span onClick={() => { setReceiverData(null) }}><AiOutlineClose size={20} /></span>
                  </div>
                  <div className={styles.userProduct}>
                    <span>Product: {receiverData && receiverData?.item}</span><span>Price: Rs {receiverData && receiverData?.price}</span>
                  </div>
                </div>
                <div className={styles.chatItem}>
                  {
                    Object.keys(allMessages).length > 0 &&
                    Object.keys(allMessages).map((date) => {
                      return (
                        <div key={date}>
                          <h6>
                            {date}
                          </h6>
                          {
                            allMessages[date].map((messages, id) => {
                              return (
                                <p key={id} className={`${myUser.uid === messages.messageUserId ? styles.me : styles.you}`}>
                                  {messages.message}
                                  <span>
                                    {
                                      new Date(messages.timestamp?.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    }
                                  </span>
                                </p>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            }
            {receiverData &&
              <div className={styles.chatInput}>
                <div>
                  <input type="text" placeholder='Enter a message' value={chatMessage} onKeyDown={(e) => { e.key === "Enter" ? ref.current.click() : null }} onChange={(e) => setChatMessage(e.target.value)} />
                  <span><AiOutlinePaperClip /></span>
                </div>
                <button ref={ref} onClick={sendMessage}>
                  <IoSendSharp color="var(--secondary)" size={40} />
                </button>
              </div>
            }
          </div>
        </div>
      </section >
    </>
  )
}

export default chat