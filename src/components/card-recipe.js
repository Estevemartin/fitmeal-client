import React from 'react'

const CardRecipe = ({imageUrl, title, popularity}) => {
    return (
        <div className="card-recipe">
            <img src={imageUrl} style={{width:100}} alt="img"/>
            <div className="info-card-recipe">
                 <h3>{title}</h3>
                <span>{popularity} <ion-icon name="heart-outline"></ion-icon></span>
                <ion-icon name="bookmark-outline"></ion-icon>
            </div>
        </div>
    )
}

export default CardRecipe