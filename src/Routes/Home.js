import React, { useEffect, useState } from "react";
import { dbService } from "../fBase";
import Nweet from 'Components/Nweet';

const Home = ({ userObj }) => {
  const [ nweet, setNweet ] = useState("");
  const [ nweets, setNtweets ] = useState([]);

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
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      user: userObj.uid,
    });
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

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
        <input type="submit" value="Nweet" />
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