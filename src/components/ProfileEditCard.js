import React, {Component} from 'react'
import { Link, Redirect } from 'react-router-dom'
import service from "../api/service";

// const ProfileEditCard =  (props) => {
class ProfileEditCard extends Component {
    
    deleteRecipe = async (recipeId) => {
        if (recipeId !== undefined){
            const res = await service.deleteRecipe(recipeId)
            window.location.reload();
        }
    }

    displayIcons = (recipeId) => {
        
        if (recipeId !== undefined){
            console.log(this.props)
            let currentUrl = this.props.location.pathname
            if (currentUrl.includes("savedRecipes")){
                return (
                    <div className="icons-actions">
                        <ion-icon name="close-circle-outline" onClick={()=>this.deleteRecipe(this.props.id)}></ion-icon>
                        <ion-icon name="create-outline"></ion-icon>
                    </div>
                )
            } else {
                return (
                    <div className="icons-actions">
                        <ion-icon name="bookmark" ></ion-icon>
                    </div>
                )
            }
        } 
    }
    
    render() {
        
         return (
        <div className="card-profile">
            <Link to={"/recipes/"+this.props.id}> <img src={this.props.imageUrl}  alt="img"/></Link>
            <div className="info-card-profile">
                <h3>{this.props.title}</h3>
                {()=>this.displayIcons(this.props.id)}
                {/* <div className="icons-actions">
                    <ion-icon name="close-circle-outline" onClick={()=>this.deleteRecipe(this.props.id)}></ion-icon>
                    <ion-icon name="create-outline"></ion-icon>
                </div> */}
            </div>
        </div>
        )
    }
   
}

export default ProfileEditCard