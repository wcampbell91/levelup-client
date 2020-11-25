import React, { useContext, useState, useEffect } from "react"
import { GameContext } from '../game/GameProvider'
import { EventContext } from './EventProvider'

export const EventForm = props => {
  const [event, setEvent] = useState({
    gameId: 0,
    description: '',
    date: '',
    time: ''
  })
  const { getGames, games } = useContext(GameContext)
  const { createEvent } = useContext(EventContext)

  useEffect(() => {
    getGames()
  }, [])
  
  const handleControlledInputChange = (e) => {
    event[e.target.name] = e.target.value 
    setEvent(event)
  };

  return (
    <form className="eventForm">
      <h2 className="eventForm__title">Schedule New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameId">Game: </label>
          <select name="gameId" defaultValue={event.gameId} onChange={handleControlledInputChange} className="form-control">
            <option value="0">Select a game...</option>
            {
              games.map(g => <option key={g.id} value={g.id}>{g.title}</option>)
            }
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input 
            type="text" 
            name="description" 
            required 
            autoFocus 
            className="form-control" 
            defaultValue={event.description} 
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <input 
            type="date" 
            name="date" 
            required 
            autoFocus 
            className="form-control" 
            defaultValue={event.date} 
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="time">Time: </label>
          <input 
            type="time" 
            name="time" 
            required 
            autoFocus 
            className="form-control" 
            defaultValue={event.time} 
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <button type="submit"
        onClick={e => {
          e.preventDefault();
          
          const newEvent = {
            gameId: event.gameId,
            description: event.description,
            date: event.date,
            time: event.time
          }
          createEvent(newEvent)
            .then(props.history.push({pathname: "/events"}))
        }}
        className="btn btn-primary">Create Event</button>
    </form>
  )
}
