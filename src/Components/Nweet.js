import { dbService } from 'fBase'
import React, { useState }from 'react'

const Nweet = ({ nweetObj, isOwner }) => {
    const [ editing, setEditing ] = useState(false);
    const [ newNweet, setNewNweet ] = useState(nweetObj.text);

    const onClickDelete = async () => {
        const ok = window.confirm("이 트윗을 삭제하시겠습니까?")
        if( ok ) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete()
        }
    }
    
    const toggleEditing = () => setEditing(prev => !prev)

    const onSubmit = async (e) => {
        e.preventDefault()
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet
        })
        setEditing(false)
    }

    const onChange = (e) => {
        const { target: {value} } = e
        setNewNweet(value)
    }

    return(
        <div>
            {editing ? (
                <>
                <form onSubmit={onSubmit} >
                    <input type="text" onChange={onChange} value={newNweet} required />
                    <input type="submit" value="edit nweet" />
                </form>
                <button onClick={toggleEditing} >cancel</button>
                </>
            ) : (
                <div>
                    <h4>{nweetObj.text}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onClickDelete}>delete</button>
                                <button onClick={toggleEditing}>edit</button>
                            </>
                        )}
                </div>
            )}

        </div>
    )
}
export default Nweet