import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
// import ProfileEditCard from "../components/ProfileEditCard"
import service from "../api/service";
import auth from "../lib/auth-service"; // Importamos funciones para llamadas axios a la API


class EditProfile extends Component {
    state={
    }

    getMyRecipes = async () => {
        const res = await service.getMyRecipes(this.props.user._id);
        // console.log(res);
        this.setState({recipes: res})
    }
    componentDidMount = () => {
        this.getMyRecipes()
        this.setState({state:this.props.user})
    }

    // HANDLE FILE UPLOADS
    handleBackgroundFileUpload = async (e) => {
        // console.log("the file to be uploaded is: ", e.target.files[0]);
        e.preventDefault();
    
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
    
        try {
          const res = await service.handleUpload(uploadData);
          // console.log("response is", res);
          this.props.user.backgroundPictureUrl = res
          this.setState({ user: this.props.user });
        } catch (error) {
          console.log("Error while uploading the file: ", error);
        }
    }
    handleProfileFileUpload = async (e) => {
        // console.log("the file to be uploaded is: ", e.target.files[0]);
        e.preventDefault();
    
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
    
        try {
          const res = await service.handleUpload(uploadData);
          // console.log("response is", res);
          this.props.user.profilePictureUrl = res
          this.setState({ user: this.props.user });
        } catch (error) {
          console.log("Error while uploading the file: ", error);
        }
    }

    // CHANGE HANDLERS
    
    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        
        this.setState(prevState=> ({
            user:{
                ...prevState.user,
                [name]: value
            }
        }));
    }

    // FORM SUBMIT
    handleSaveProfileSubmit = async (event) => {
        event.preventDefault();
        try {

            let currentUser = this.state.user
            console.log(currentUser)
            var res
            res = await service.updateUserProfile(currentUser);
            console.log("PROFILE UPDATED TO -->", res);
            this.props.updateUser(currentUser._id)
            // var successMsg = "Recipe Successfully Created!"
            
            // console.log("CREATED / UPDATED RECIPE -->", res);
            
            // const res = await service.saveNewRecipe(this.state);
            
            // console.log(this.state.imageUrl)
            
            // this.setState({
            //     imageUrl: "", 
            //     author: this.props.user.username,
            //     title: "Write a nice title",
            //     prepTime: 0,
            //     difficulty: "easy",
            //     portions:"",
            //     ingredients: [{ingredientId:0,name:"",amount:"",units:""}],
            //     steps: [''],
            //     numberOfIngredients: [0],
            //     numberOfSteps:[0],
            //     errorMsg:null,
            //     successMsg:null
            // });
            // this.props.history.push('/recipes/'+res._id)

            // return this.props.history.push("/")
            // this.props.getRecipes()
            // this.setState({successMsg:"Recipe Successfully Created!"})

        } catch (error) {
            this.setState({errorMsg:"Make sure to fullfill all the required fields."})
            // console.log("Error while adding the recipe: ", error);
        }
    };

    componentDidMount = () => {
        this.setState({user:this.props.user})
    }

    render() {
        const displayProfilePicture = profilePictureUrl => {
            if(profilePictureUrl){
                return (
                    <label className="edit-avatar" htmlFor="profile-pic-url">
                        <ion-icon name="image-outline"></ion-icon>
                        <img className="profile-picture2 profile-stroke" src={profilePictureUrl} alt="profileImg"/>
                        <input style={{display:"none"}} id="profile-pic-url" className='image-selector'  type='file' name='profilePictureUrl' onChange={(e) => this.handleProfileFileUpload(e)}/>
                    </label>
                )
            } else {
                return (
                    <label  className="edit-avatar" htmlFor="profile-pic-url">
                        <ion-icon name="image-outline"></ion-icon>
                        <div className="profile-picture2 avatar-green profile-stroke"><ion-icon name="image-outline"></ion-icon></div>
                        <input style={{display:"none"}} id="profile-pic-url" className='image-selector'  type='file' name='profilePictureUrl' onChange={(e) => this.handleProfileFileUpload(e)}/>
                    </label>
                    )
            }
        }

        const displayBackgroundPicture = backgroundPictureUrl => {
            if(backgroundPictureUrl){

                return (
                    <div className="bg-edit">
                    <span>
                        <Link to="/profile">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </Link>
                    </span>
                    <label htmlFor="bg-pic-url">
                        <ion-icon name="image-outline"></ion-icon>
                        <div className="bg">
                            <img src={backgroundPictureUrl} alt="backgroundImg"/>
                            <input  style={{display:"none"}} id="bg-pic-url" className='image-selector'  type='file' name='backgroundPictureUrl' onChange={(e) => this.handleBackgroundFileUpload(e)} />
                        </div>
                    </label>
                    </div>
                )

            } else {

                return (
                    <div className="bg-edit">
                    <span>  
                        <Link to="/profile">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </Link>
                    </span>
                    <label htmlFor="bg-pic-url">
                        <div className="bg">
                            <input  style={{display:"none"}} id="bg-pic-url" className='image-selector'  type='file' name='backgroundPictureUrl' onChange={(e) => this.handleBackgroundFileUpload(e)}/>
                        </div>
                    </label>
                    </div>
                )

            }
        }

        
        // const displayUserName = () =>{
        //     if (this.state.user!==undefined){
        //         console.log(this.state.user.username)
        //         return this.state.user.username
        //     }
        // }
    
        const { profilePictureUrl, backgroundPictureUrl, username } = this.props.user
        
        // console.log(username)
        return(
            <>
                <form method="POST" action="" className='add-new-recipe-form' onSubmit={this.handleSaveProfileSubmit}>
                    {displayBackgroundPicture(backgroundPictureUrl)}
                    <div className="container-profile">
                    <div className="user-info">
                        {displayProfilePicture(profilePictureUrl)}
                        <div className="user-info-container">
                            <h4>@{username}</h4>
                        </div>
                        <button className="a-btn" type="submit">save</button>
                    </div>

                    {/* FIELDS */}
                    <div className="create-section">
                        {/* <input className="input-title-recipe" type='text' name='username' placeholder="Write your new username" onChange={this.handleChange} /><br></br> */}
                        <input className="input-title-recipe" type='text' name='email' placeholder="Write your new email" onChange={this.handleChange} /><br></br>
                    </div>
                    <div className="user-info">
                    </div>
                    </div>
                </form>
                
            </>
        )
    }
}

export default withAuth(EditProfile)