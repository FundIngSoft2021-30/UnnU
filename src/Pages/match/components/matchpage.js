import React, { useState, useEffect } from 'react'
import './matchpage.css';
import TinderCard from 'react-tinder-card'
import { auth, db } from "../../../DB/firebase";
function MatchPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('usuarios').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => doc.data()))
        })
        return () => {
            unsubscribe();
        };
    }, [])

    return (
        <div>


            <div className="tinderCard__cardContainer">
                {users.map(user => (


                    <TinderCard
                        className="swipe"
                        key={user.name}
                        preventSwipe={['up', 'down']} >

                        <div
                            style={{ backgroundImage: `url(${user.photoPerfil})` }}
                            className="card">
                            <h3>{user.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default MatchPage