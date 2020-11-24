import React from 'react'
import { Link } from 'react-router-dom'


//card recipe home & searchbar & filter categories
const CardRecipe = ({imageUrl, title, prepTime, popularity, _id}) => {

    return (
        <div className="card-recipe">
            <Link to={"/recipes/"+_id}><img src={imageUrl}  alt="img"/></Link>
            <div className="info-card-recipe">
                <h3>{title}</h3>
                <div className="icons-container">
                    <div><ion-icon name="time-outline"></ion-icon><span>{prepTime.replace(" mins", "''").replace(" -", "'' -")}</span></div>
                    <div><ion-icon name="heart-outline"></ion-icon><span>{popularity}</span></div>
                    <ion-icon name="bookmark-outline"></ion-icon>
                </div>
            </div>
        </div>
    )
}

export default CardRecipe