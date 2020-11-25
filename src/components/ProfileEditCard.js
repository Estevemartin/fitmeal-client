import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import service from "../api/service";

const ProfileEditCard =  (props) => {

    const deleteRecipe = async (recipeId) => {
        if (recipeId !== undefined){
            const res = await service.deleteRecipe(recipeId)
            window.location.reload();
        }
    }

    return (
        <div className="card-profile">
            <Link to={"/recipes/"+props.id}> <img src={props.imageUrl}  alt="img"/></Link>
            <div className="info-card-profile">
                <h3>{props.title}</h3>
                <div className="icons-actions">
                    <ion-icon name="close-circle-outline" onClick={()=>deleteRecipe(props.id)}></ion-icon>
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            </div>
        </div>
    )
}

export default ProfileEditCard