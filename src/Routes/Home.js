import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../fBase";
import Nweet from 'Components/Nweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [ nweet, setNweet ] = useState("");
  const [ nweets, setNtweets ] = useState([]);
  const [ attachment, setAttachment ] = useState("");

  const LoadNweets = async() => {
    const dbNweets = await dbService.collection("nweets").get()
    dbNweets.forEach( document => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      }
      setNtweets( (prev) => [...prev, nweetObject])
    })
  }

  useEffect( () => {
    LoadNweets();
    dbService.collection("nweets").orderBy("createdAt","desc").onSnapshot( snapshot => {
      const nweetArray = snapshot.docs.map( doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setNtweets(nweetArray)
    })

  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
      const response = await fileRef.putString(attachment, "data_url")
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      user: userObj.uid,
      attachmentUrl,
    }
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onChangeFile = (e) => {
    const { target: {files} } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: {result} } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
    
  }

  const onClickClearPhoto = () => setAttachment("")


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onChangeFile} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img alt="#" src={attachment} width="150px" height="150px"/>
            <button onClick={onClickClearPhoto} >Clear</button>
          </div> 
          )}
      </form>
    
      <div>
        {nweets && nweets.map( nweet => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.user === userObj.uid} />
        ))}
      </div>

    </div>
  );
};
export default Home;