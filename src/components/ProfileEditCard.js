import React from 'react'
import { Link } from 'react-router-dom'

const ProfileEditCard = (props) => {

    return (
        <div className="card-profile">
            <Link to={"/recipes/"+props.id}> <img src={props.imageUrl}  alt="img"/></Link>
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