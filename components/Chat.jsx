
import { useState, useEffect, useRef } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import Message from "./Message";
import SendMessage from "./SendMessage";

const Chat = () => {
    //Save messages
    const [message, setMessage] = useState([]);
    const scroll = useRef();
    const [user] = useAuthState(auth);

    //Update new messages
    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messages = []
            querySnapshot.forEach(doc => {
                messages.push({...doc.data(), id: doc.id})
            });
            setMessage(messages);
        })
        return () => unsubscribe();
    }, [])

    //Show All Messages
    return ( 
        <>
            <section className="chat-content">
                {
                    message && message.map(item => (
                        <Message
                            key={item.id}
                            message={item}
                        />
                    ))
                }
            { user && <SendMessage scroll={scroll}/> }
            
            <span ref={scroll}></span>
            </section>
        </>
     );
}
 
export default Chat;