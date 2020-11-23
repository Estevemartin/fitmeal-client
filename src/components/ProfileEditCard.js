import React from 'react'
import { Link } from 'react-router-dom'


//card edit profile
const ProfileEditCard = (props) => {

    return (
        <div className="card-profile">
            <img src={props.imageUrl} style={{width: "100px"}} alt="img"/>
            <div className="info-card-profile">
                <h3>{props.title}</h3>
                <div className="icons-actions">
                        <ion-icon name="close-circle-outline" onClick={props.deleteCard}></ion-icon>
                        <ion-icon name="create-outline"></ion-icon>
                </div>
            </div>
        </div>
    )
}

export default ProfileEditCard