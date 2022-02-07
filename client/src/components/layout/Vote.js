import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { withRouter } from 'react-router'

const Vote = props => {

  const reviewId = props.reviewId
  const [voteCount, setVoteCount] = useState(props.voteCount || { upVote: 0, downVote: 0 }) 

  const addVote = async (voteValue) => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}/votes`, {
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

  let upButton
  let downButton
  let signInMessage = <Link to="/user-sessions/new">Sign in to vote</Link>

  if (props.user) {
    signInMessage = null
    upButton = <button className="button" onClick={upClickHandler}>Upvote</button>
    downButton = <button className="button" onClick={downClickHandler}>Downvote</button>
  }

  return (
    <div>
      {signInMessage}
      {upButton}
      <div>Upvote Count: {voteCount.upVote}</div>
      {downButton}
      <div>Downvote Count: {voteCount.downVote}</div>
    </div>
  )
}

export default withRouter(Vote)