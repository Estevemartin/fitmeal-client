import React from 'react'
import { Link } from 'react-router-dom'


//card recipe home & searchbar & filter categories
const CardRecipe = ({imageUrl, title, popularity, _id}) => {

    return (
        <div className="card-recipe">
            <Link to={"/recipes/"+_id}><img src={imageUrl} style={{width: "100px"}} alt="img"/></Link>
            <div className="info-card-recipe">
                <h3>{title}</h3>
                <span>{popularity} <ion-icon name="heart-outline"></ion-icon></span>
                <ion-icon name="bookmark-outline"></ion-icon>
            </div>
        </div>
    )
}

export default CardRecipe