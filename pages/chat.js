import Head from 'next/head'
import React from 'react'
import styles from "@/styles/Chat.module.css"
import { Alice } from "next/font/google"
const alice = Alice({ subsets: ["latin"], weight: "400" })
import { IoIosSend } from "react-icons/io"
import { AiOutlinePaperClip } from "react-icons/ai"
// import { db, auth } from "@/middleware/firebase"
// import {
//     addDoc,
//     collection,
//     onSnapshot,
//     orderBy,
//     query,
// } from "firebase/firestore";
// import { useRouter } from 'next/navigation';





// const Chat = () => {
//     const [users, setUsers] = useState([]);

//     const [receiverData, setReceiverData] = useState(null);
//     const [chatMessage, setChatMessage] = useState("");

//     const [allMessages, setAllMessages] = useState([]);
//     const user = auth.currentUser;
//     const router = useRouter();

//     useEffect(() => {
//         const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
//             setUsers(snapshot.docs.map((doc) => doc.data()));
//         });
//         return unsub;
//     }, []);

//     useEffect(() => {
//         if (receiverData) {
//             const unsub = onSnapshot(
//                 query(
//                     collection(
//                         db,
//                         "users",
//                         user?.uid,
//                         "chatUsers",
//                         receiverData?.userId,
//                         "messages"
//                     ),
//                     orderBy("timestamp")
//                 ),
//                 (snapshot) => {
//                     setAllMessages(
//                         snapshot.docs.map((doc) => ({
//                             id: doc.id,
//                             messages: doc.data(),
//                         }))
//                     );
//                 }
//             );
//             return unsub;
//         }
//     }, [receiverData?.userId]);

//     const sendMessage = async () => {
//         // console.log(user, receiverData)
//         try {
//             if (user && receiverData) {
//                 await addDoc(
//                     collection(
//                         db,
//                         "users",
//                         user.uid,
//                         "chatUsers",
//                         receiverData.userId,
//                         "messages"
//                     ),
//                     {
//                         username: user.displayName,
//                         messageUserId: user.uid,
//                         message: chatMessage,
//                         timestamp: new Date(),
//                     }
//                 );

//                 await addDoc(
//                     collection(
//                         db,
//                         "users",
//                         receiverData.userId,
//                         "chatUsers",
//                         user.uid,
//                         "messages"
//                     ),
//                     {
//                         username: user.displayName,
//                         messageUserId: user.uid,
//                         message: chatMessage,
//                         timestamp: new Date(),
//                     }
//                 );
//             }
//         } catch (error) {
//             console.log(error);
//         }
//         setChatMessage("");
//     };


//     return (
//         <>
//             <UsersComponent
//                 users={users}
//                 setReceiverData={setReceiverData}
//                 router={router}
//                 currentUserId={user?.uid}
//             />


//             <div style={right}>
//                 <h4 style={{ margin: 2, padding: 10 }}>
//                     {receiverData ? receiverData.username : user?.displayName}{" "}
//                 </h4>

//                 <div style={messagesDiv}>
//                     {/* messages area */}

//                     {allMessages &&
//                         allMessages.map(({ id, messages }) => {
//                             return (
//                                 <div
//                                     key={id}
//                                     style={{
//                                         margin: 2,
//                                         display: "flex",
//                                         flexDirection:
//                                             user?.uid == messages.messageUserId
//                                                 ? "row-reverse"
//                                                 : "row",
//                                     }}
// >
//                                     <span
//                                         style={{
//                                             backgroundColor: "#BB8FCE",
//                                             padding: 6,
//                                             borderTopLeftRadius:
//                                                 user?.uid == messages.messageUserId ? 10 : 0,
//                                             borderTopRightRadius:
//                                                 user?.uid == messages.messageUserId ? 0 : 10,
//                                             borderBottomLeftRadius: 10,
//                                             borderBottomRightRadius: 10,
//                                             maxWidth: 400,
//                                             fontSize: 15,
//                                             textAlign:
//                                                 user?.uid == messages.messageUserId ? "right" : "left",
//                                         }}
//                                     >
//                                         {messages.message}
//                                     </span>
//                                 </div>
//                             );
//                         })}
//                 </div>

//                 <div style={{ width: "100%", display: "flex", flex: 0.08 }}>
//                     <input
//                         value={chatMessage}
//                         onChange={(e) => setChatMessage(e.target.value)}
//                         style={input}
//                         type="text"
//                         placeholder="Type message..."
//                     />
//                     <div onClick={sendMessage}>
//                         Send
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }



const chat = () => {
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <section className={styles.container}>
        <div className={styles.box}>
          <div className={styles.userListBox} style={alice.style}>
            <div>
              <h3>Chats</h3>
            </div>
            <ul>
              <li>
                <img src="/images/item1.jpg" />
                <a>William</a>
                <p>Buyer</p>
                <p>Msg</p>
              </li>
              <li>
                <img src="/images/item1.jpg" />
                <a>Eula</a>
                <p>Seller</p>
                <p>Msg</p>
              </li>
              <li>
                <img src="/images/item1.jpg" />
                <a>Luke</a>
                <p>Seller</p>
                <p>Msg</p>
              </li>
              <li>
                <img src="/images/item1.jpg" />
                <a>Sean</a>
                <p>Buyer</p>
                <p>Msg</p>
              </li>
              <li>
                <img src="/images/item1.jpg" />
                <a>Luella</a>
                <p>Seller</p>
                <p>Msg</p>
              </li>
              <li>
                <img src="/images/item1.jpg" />
                <a>Gilbert</a>
                <p>Seller</p>
                <p>Msg</p>
              </li>
              <li>
                <img src="/images/item1.jpg" />
                <a>Clayton</a>
                <p>Buyer</p>
                <p>Msg</p>
              </li>
            </ul>
          </div>
          <div className={styles.chatBox}>
            <div className={styles.chatContent}>
              <div className={styles.chatDetails}>
                  <img src="/images/item1.jpg" />
                  <h3 style={alice.style}>William</h3>
              </div>
              <div className={styles.chatItem}>
                <p className={styles.me}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.me}>Hi This is Nitish</p>                
                <p className={styles.me}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.me}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.me}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.me}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.me}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.me}>Hi This is Nitish</p>                
                <p className={styles.you}>Hi This is Nitish</p>                
                <p className={styles.me}>Hi This is Nitish</p>                
              </div>
            </div>
            <div className={styles.chatInput}>
              <div>
                <input type="text" placeholder='Enter a message'/>
                <span><AiOutlinePaperClip /></span>
              </div>
              <button>
                <IoIosSend />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default chat