import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";

// const ProfileEditCard =  (props) => {
class ProfileEditCard extends Component {
    
    deleteRecipe = async (recipeId) => {
        if (recipeId !== undefined){
            await service.deleteRecipe(recipeId)
            // const res = await service.deleteRecipe(recipeId)

            window.location.reload();
        }
    }
    
    // componentDidMount = () =>{
        
    // }
    
    render() {

        // const displayIcons = (recipeId) => {
        //     console.log(this.props)
        //     if (recipeId !== undefined && this.props.location!== undefined){
        //         // console.log(this.props)
        //         let currentUrl = this.props.location.pathname
        //         console.log(this.props)
        //         console.log(currentUrl)
    
        //         if (currentUrl.includes("savedRecipes")){
        //             return (
        //                 <div className="icons-actions">
        //                     {/* <ion-icon name="close-circle-outline" onClick={()=>this.deleteRecipe(this.props.id)}></ion-icon>
        //                     <Link to ={"/recipe/"+recipeId} ><ion-icon name="create-outline"></ion-icon></Link> */}
        //                     <ion-icon name="bookmark"></ion-icon>
        //                 </div>
        //             )
        //         } else {
        //             return (
        //                 <div className="icons-actions">
        //                     <ion-icon name="close-circle-outline" onClick={()=>this.deleteRecipe(this.props.id)}></ion-icon>
        //                     <Link to ={"/recipe/"+recipeId} ><ion-icon name="create-outline"></ion-icon></Link>
        //                     {/* <ion-icon name="bookmark"></ion-icon> */}
        //                 </div>
        //             )
        //         }
        //     } 
        // }

        return (
            <div className="card-profile">
                <Link to={"/recipes/"+this.props.id}> <img src={this.props.imageUrl}  alt="img"/></Link>
                <div className="info-card-profile">
                    <h3>{this.props.title}</h3>
                    {/* {displayIcons(this.props.id)} */}
                    <div className="icons-actions">
                        <ion-icon name="close-circle-outline" onClick={()=>this.deleteRecipe(this.props.id)}></ion-icon>
                        <ion-icon name="create-outline"></ion-icon>
                    </div>
                </div>
            </div>
        )
    }
   
}

export default withAuth(ProfileEditCard)