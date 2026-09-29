
import {auth} from '../firebase';

//Individual Message
const Message = ({ message }) => {
    let newStyles = '';
    //Change the style of our message and that of the other person
    if (auth.currentUser) {
        if (message.uid === auth.currentUser.uid ) {
            newStyles = 'my-message';
        } else {
            newStyles = 'message';
        }
    } else {
        newStyles = 'message';
    }
    
    // Format Date
    const date = new Date(message.timestamp?.seconds*1000);
    const options = { 
        month: 'long', 
        day: 'numeric' 
    };
    let h = date.getHours();
    let m = date.getMinutes();
    let time = h + ":" + m;

    const newDate = date.toLocaleDateString('en-US', options);
    return ( 
        <article className={newStyles}>
            <div>
                <div className='text-message'>
                    <p className="text">{ message.text }</p>
                </div>
                <p className="user">{`${newDate} - ${time}`}</p>
            </div>
            <img src={message.photo} alt="user photo" />
        </article>
     );
}
 
export default Message;