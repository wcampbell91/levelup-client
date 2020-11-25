import React, { useContext, useEffect } from 'react'
import { GameContext } from './GameProvider.js'

export const GameList = (props) => {
  const { games, getGames } = useContext(GameContext)

  useEffect(() => {
    getGames()
    }, [])

  return (
  <div>
    <article className="games">
      <button className="btn btn-2 btn-sep icon-create text-center"
        onClick={() => {
          props.history.push({ pathname: "/games/new" })
        }}
      >Register New Game</button>
      {
        games.map(game => {
          return <section key={`game--${game.id}`} className="game">
            <div className="game__title">{game.title} by {game.maker}</div>
            <div className="game__players">{game.number_of_players} players needed</div>
            <div className="game__skillLevel">skill level is {game.skill_level}</div>
          </section>
        })
      } 
    </article>
  </div>
  )
}
