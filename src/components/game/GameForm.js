import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from './GameProvider'

export const GameForm = props => {
  const { createGame, getGameTypes, gameTypes, getGame, editGame } = useContext(GameContext)
  /*
      since the input fields are bound to the values of 
      the properties of this state variable, you need to 
      provide some default values
  */
  const [currentGame, setCurrentGame] = useState({
    skill_level: 1,
    number_of_players: 0,
    title: "",
    maker: "",
    gameTypeId: 0
  })

  /*
      Get game types on initialization so that the <select>
      element presents game type choices to the user
  */
  
  useEffect(() => {
    getGameTypes()
  }, [])

  useEffect(() => {
    if ("gameId" in props.match.params) {
      getGame(props.match.params.gameId)
      .then(game => {
        setCurrentGame({
          skill_level: game.skill_level,
          number_of_players: game.number_of_players,
          title: game.title,
          maker: game.maker,
          gameTypeId: game.game_type_id
        })
      })
    }
  }, [props.match.params.gameId])

  /*
      Update the `currentGame` state variable every time 
      the state of one of the input fields changes
  */
  const handleControlledInputChange = (e) => {
    currentGame[e.target.name] = e.target.value 
    setCurrentGame(currentGame)
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input 
            type="text" 
            name="title" 
            required 
            autoFocus 
            className="form-control" 
            defaultValue={currentGame.title} 
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Maker: </label>
          <input 
            type="text" 
            name="maker" 
            required 
            className="form-control" 
            defaultValue={currentGame.maker} 
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="skill_level">Skill Level: </label>
          <input 
          type="text"
          name="skill_level"
          required 
          value={currentGame.skill_level}
          className='form-control'
          onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="number_of_players">Number of Players</label>
          <input 
            type="text" 
            name="number_of_players" 
            required 
            className="form-control" 
            value={currentGame.number_of_players} 
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameTypeId">Game Type: </label>
          <select name="gameTypeId" id="gameTypes" defaultValue={currentGame.gameTypeId} onChange={handleControlledInputChange}>
            {
              gameTypes.map((gt) => <option key={gt.id} value={gt.id}>{gt.label}</option>)
            }
          </select>
        </div>
      </fieldset>
      {
        ("gameId" in props.match.params)
          ? <button
              onClick={e => {
                e.preventDefault();
                editGame({
                  id: props.match.params.gameId,
                  maker: currentGame.maker,
                  title: currentGame.title,
                  number_of_players: currentGame.number_of_players,
                  skill_level: parseInt(currentGame.skill_level),
                  gameTypeId: parseInt(currentGame.gameTypeId)
                })
                .then(() => props.history.push("/games"))
              }}
              className="btn btn-primary">Edit</button>
          : <button type="submit"
            onClick={(e) => {
              // Prevent form from being submitted
              e.preventDefault();
              
              const game = {
                maker: currentGame.maker,
                title: currentGame.title,
                number_of_players: parseInt(currentGame.number_of_players),
                skill_level: parseInt(currentGame.skill_level),
                gameTypeId: parseInt(currentGame.gameTypeId)
              }
              
              // send POST request to your API
              createGame(game)
                .then(props.history.push({pathname: "/"}))
            }}
            className="btn btn-primary">Create</button>
      }
    </form>
  )
}
