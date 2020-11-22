import React from 'react'
import { Link } from 'react-router-dom'

const CardRecipe = ({imageUrl, title, popularity, _id}) => {

    return (
        <div className="card-recipe">
            <Link to={"/recipes/"+_id}><img src={imageUrl}  alt="img"/></Link>
            <div className="info-card-recipe">
                <h3>{title}</h3>
                <div className="icons-container">
                    <div><span>{popularity}</span> <ion-icon name="heart-outline"></ion-icon></div>
                    <ion-icon name="bookmark-outline"></ion-icon>
                </div>
            </div>
        </div>
    )
}

export default CardRecipe