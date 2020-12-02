import React from "react"
import { Route } from "react-router-dom"
import { GameList } from './game/GameList'
import { EventList } from './event/EventList'
import { GameProvider } from './game/GameProvider'
import { EventProvider } from './event/EventProvider'
import { ProfileProvider } from './profile/ProfileProvider'
import { Profile } from './profile/Profile'
import { GameForm } from './game/GameForm'
import { EventForm } from './event/EventForm'

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
                <Route exact path="/" render={props => <GameList {...props} />} />
                <Route exact path="/games/new" render={props => <GameForm {...props} />} />
                <EventProvider>
                    <Route exact path="/events"render={props => <EventList {...props}/>} />
                    <Route exact path="/events/new"render={props => <EventForm {...props}/>} />
                </EventProvider>
            </GameProvider>
            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>
        </main>
    </>
}
