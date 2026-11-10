import { useEffect, useState } from 'react';
export default function Test() {

    const [unread, setUnread] = useState(3);

    useEffect(() => {
        if (unread > 0) {
            // Do something when there is unread messages
            console.log(`You have ${unread} unread messages`);
        } else {
            console.log(`You have no unread messages`);
        }
    }, [unread]);
    return (
        <>
            <p>You have {unread} unread messages</p>
            <button onClick={() => setUnread((prevUnread) => Math.max(prevUnread - 1, 0))}>Mark one as read</button>
        </>
    );
}