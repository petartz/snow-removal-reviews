import React, { useState } from 'react'
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
        body: JSON.stringify({ voteValue })
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

  let signInMessage = <Link to="/user-sessions/new">Sign in to vote</Link>
  let handleUpVote = null
  let handleDownVote = null

  if (props.user) {
    signInMessage = null
    handleUpVote = upClickHandler
    handleDownVote = downClickHandler
  }

  return (
    <div className="votes">
      {signInMessage}
      <div className="up-button">
        <i className="fas fa-chevron-up fa-lg icon-up" onClick={handleUpVote}></i>
        {voteCount.upVote}
      </div>
      <div>
        <i className="fas fa-chevron-down fa-lg icon-down" onClick={handleDownVote}></i>
        {voteCount.downVote}
      </div>
    </div>
  )
}

export default withRouter(Vote)