import React from "react"
import { Route } from "react-router-dom"
import { GameList } from './game/GameList'
import { EventList } from './event/EventList'
import { GameProvider } from './game/GameProvider'
import { EventProvider } from './event/EventProvider'

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
                <Route exact path="/">
                    <GameList />
                </Route>
            </GameProvider>
            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
            </EventProvider>
        </main>
    </>
}
