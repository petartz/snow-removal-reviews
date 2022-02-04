import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import getCurrentUser from '../../services/getCurrentUser'

const Vote = props => {

  const reviewId = props.reviewId
  const [voteCount, setVoteCount] = useState({
    upVote: 0,
    downVote: 0
  })
  const [currentUser, setCurrentUser] = useState(undefined)

  // WILL NEED TO BE REMOVED ONCE THE OTHER GUYS MERGE THEIR BRANCH
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~ //

  const getVoteCount = async () => {
    try {
      const response = await fetch(`/api/v1/votes/${reviewId}`)    
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setVoteCount(body.totalCount)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getVoteCount()
    fetchCurrentUser()
  }, [])

  const addVote = async (voteValue) => {
    try {
      const response = await fetch(`/api/v1/votes/${reviewId}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          voteValue: voteValue
        }) 
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          alert(body.message)  
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setVoteCount(body.totalCount)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  const upClickHandler = async () => {
    await addVote(1)
  }

  const downClickHandler = async () => {
    await addVote(-1)
  }

  const deleteVote = async () => {
    try {
      const response = await fetch('/api/v1/votes', {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ reviewId }) 
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          alert(body.message)  
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setVoteCount(body.totalCount)
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  let upButton
  let downButton
  let deleteButton
  let signInMessage = <p>Sign in to vote</p>
  if (currentUser) {
    signInMessage = null
    upButton = <button className="button" onClick={upClickHandler}>Upvote</button>
    downButton = <button className="button" onClick={downClickHandler}>Downvote</button>
    deleteButton = <button className="button" onClick={deleteVote}>Delete my vote</button>
  }

  return (
    <div>
      {signInMessage}
      {upButton}
      <div>Upvote Count: {voteCount.upVote}</div>
      {downButton}
      <div>Downvote Count: {voteCount.downVote}</div>
      {deleteButton}
    </div>
  )
}

export default withRouter(Vote)