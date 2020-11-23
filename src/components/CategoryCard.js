import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCard = ({imageUrl, category}) => {

    return (
        <Link to={"/category/"+category} >
            
            <div className="category-card">
                <h3>{category}</h3>
                <div></div>
                <img src={imageUrl} alt="category" />
            </div>
        </Link>
    )
}

export default CategoryCard