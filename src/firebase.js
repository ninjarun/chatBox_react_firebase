import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC2AJ_ZJXi3QyZ7-E_8QPuL0L4Hj0Yt_NA",
    authDomain: "chatbox-29fe6.firebaseapp.com",
    projectId: "chatbox-29fe6",
    storageBucket: "chatbox-29fe6.appspot.com",
    messagingSenderId: "518225810547",
    appId: "1:518225810547:web:d1653a3f44ee2739854606"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();


export const db = getFirestore();

// // Custom Hook
// export function useAuth() {
//     const [currentUser, setCurrentUser] = useState();

//     useEffect(() => {
//         const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
//         return unsub;
//     }, [])

//     return currentUser;
// }