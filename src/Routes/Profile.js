import { authService } from 'fBase';
import React from 'react';

export default () => {
    const onClickLogOut = () => {
        authService.signOut()
    }

    return(
        <span onClick={onClickLogOut} >Profile</span>
    )
}