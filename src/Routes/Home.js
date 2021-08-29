import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';

const Home = ({userObj}) => {
    const [twitt, setTwitt] = useState("")
    const [ntwitts, setNtwitts] = useState([]);
    
    const getNwitts = async () => {
        console.log(userObj.uid)
        const dbTwitts = await dbService.collection("twitts").get();
        dbTwitts.forEach( document => {
            const ntwittsObject = {
                ...document.data(),
                id: document.id
            }
            setNtwitts( (prev) => [ntwittsObject, ...prev])
        })
    }

    useEffect(() => {
        getNwitts()
    }, [])

    const onChange = (event) => {
        const { target : {value} } = event;
        setTwitt(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("twitts").add({
            text: twitt,
            createdAt: Date.now(),
        })
        setTwitt("")
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    value={twitt} 
                    type="text" 
                    onChange={onChange} 
                    placeholder="What is on your mind?" 
                    maxLength="120" />
                <input 
                    type="submit" 
                    value="Twitt" />
            </form>
        
            <div>
                {ntwitts.map( (ntwitt) => (
                    <div key={ntwitt.id}>
                        <h4>{ntwitt.twitt}</h4>
                    </div>
                    ))}
            </div>
        </div>
    )
}
export default Home