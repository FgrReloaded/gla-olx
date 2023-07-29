// import connectDB from "@/middleware/connect";
// import firebase from "@/middleware/firebase";


// const handler = async (req, res) => {
//     const { method } = req;
//     if(method === "POST"){
//         // get data from firebaase
//         const data = await firebase.firestore().collection("users").get();
//         const users = data.docs.map((doc) => {
//             return { id: doc.id, ...doc.data() }
//         }
//         )

//     }

// }

export default connectDB(handler);
