import React, { useState } from "react";
import { authService } from "../fBase";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [ newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const onLogOutClick = () => {
      authService.signOut();
      history.push("/");
    };

    const onChange = (e) => {
        const { target: { value } } = e;
        setNewDisplayName(value)
    } 

    const onSubmit = async(e) => {
        e.preventDefault()
        if ( newDisplayName !== userObj.displayName ) {
          await userObj.updateProfile({
            displayName: newDisplayName,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/twitter-f2f75.appspot.com/o/%EC%88%98%EC%A0%95%EB%90%A8.jpg?alt=media&token=a3f0917e-7a91-4311-bef4-cd9e3fde82b5"
          })
          refreshUser()
        }
    }

    return (
      <>
      <form onSubmit={onSubmit }>
        <input type="text" onChange={onChange} value={newDisplayName}  />
        <input type="submit" />
      </form>
      <img src={userObj.photoURL} width="150px" />
      <button onClick={onLogOutClick}>Log Out</button>
      </>
    );
  };

export default Profile