import React, {Component} from 'react'
import { Link, Redirect } from 'react-router-dom'
// import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";

// const ProfileEditCard =  (props) => {
class ProfileIdCard extends Component {
    state = {

    }
    
    
    render() {

        return (
            <div className="card-profile">
                <Link to={"/recipes/"+this.props.id}> <img src={this.props.imageUrl}  alt="img"/></Link>
                <div className="info-card-profile">
                    <h3>{this.props.title}</h3>
                    {/* <div className="icons-actions">
                        <ion-icon name="bookmark" onClick={()=>this.save(this.props.id)}></ion-icon>
                    </div> */}
                </div>
            </div>
        )
    }
   
}

export default withAuth(ProfileIdCard)