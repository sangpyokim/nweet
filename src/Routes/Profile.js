import { authService } from 'fBase';
import React from 'react';


const Profile = () => {
    const onClickLogOut = () => {
        authService.signOut()
    }

    return(
        <span onClick={onClickLogOut} >Profile</span>
    )
}

export default Profile