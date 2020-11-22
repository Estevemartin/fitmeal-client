import React from 'react'

const recipeDetails = (props) =>{
    return (
        <div className='container-recipe-details'> 
            <div className="image-recipe">image</div>
            <div className="media">
                <span><ion-icon name="heart-outline"> </ion-icon>{props.popularity} likes</span>
                <span><ion-icon name="bookmark-outline"></ion-icon>Save</span>
            </div>
            
            <div className="author">
                <span style={{width: "30px", padding: "0px 5px", height:"30px", borderRadius: "25px"}} className="profile-picture-mobile avatar-color">a</span>
                <h4>Username</h4>
            </div>

            <article>
            <p className="create-recipe-titles">Difficulty</p>
            <p>Easy</p>
            </article>
            
            <section>
                    <article>
                    <p className="create-recipe-titles">Prep Time</p>
                    <p>20 min</p>
                    </article>

                    <article>
                    <p className="create-recipe-titles">Serving</p>
                    <p>1 serving</p>
                    </article>
            </section>

            <section>
                    <article>
                    <p className="create-recipe-titles">Ingredients</p>
                        <ul>lista ingredientes</ul>
                    </article>

                    <article>
                    <p className="create-recipe-titles">Steps</p>
                            <ul>lista steps</ul>
                    </article>
            </section>


        </div>
      )
    }

export default recipeDetails;