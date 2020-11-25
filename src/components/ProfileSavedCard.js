import React, {Component} from 'react'
import { Link, Redirect } from 'react-router-dom'
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";

// const ProfileEditCard =  (props) => {
class ProfileSavedCard extends Component {
    state = {

    }
    
    save = async (recipeId) => {
        if(this.props.user !== undefined){
            var userId = this.props.user._id
            console.log(userId)
            const savedUser = await service.save(userId,recipeId);
            // console.log(savedUser.currentUser.saved)
            var recipeSaved
            if (savedUser.currentUser.saved.includes(recipeId)){
                // console.log("Saved")
                recipeSaved=true
            } else {
                // console.log("Unsaved")
                recipeSaved=false
            }
            this.setState({
                user:savedUser,
                saved:recipeSaved,
            })
            // this.props.history.push('/profile')
            // <Redirect to="/profile"/>
            window.location.reload();


        }
    }
    
    render() {
        return (
            <div className="card-profile">
                <Link to={"/recipes/"+this.props.id}> <img src={this.props.imageUrl}  alt="img"/></Link>
                <div className="info-card-profile">
                    <h3>{this.props.title}</h3>
                    <div className="icons-actions">
                        <ion-icon name="bookmark" onClick={()=>this.save(this.props.id)}></ion-icon>
                    </div>
                </div>
            </div>
        )
    }
   
}

export default withAuth(ProfileSavedCard)