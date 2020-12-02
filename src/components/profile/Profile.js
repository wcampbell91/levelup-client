import React, { useEffect, useContext } from "react"
import { ProfileContext, profileContext } from './ProfileProvider'
import "./Profile.css"

export const Profile = () => {
  const { profile, getProfile } = useContext(ProfileContext)

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <article className="profile">
      <header>
        <h1>Your Profile</h1>
      </header>
      <section className="profile__info">
        <header className="profile__header">
          <h3>Your Info</h3>
        </header>
        <div className="profile__name">
          Welcome: {profile.gamer && profile.gamer.user.first_name} {profile.gamer && profile.gamer.user.last_name}
        </div>
        <div className="profile__username">Username: {profile.gamer && profile.gamer.user.username}</div>
        <div className="profile__bio">About you: {profile.gamer && profile.gamer.bio}</div>
      </section>
      <section className="profile__registrations">
        <header className="registrations__header">
          <h3>Your Events</h3>
        </header>
        <div className="registrations">
          {
            profile.events.map(e => {
              return  <div className="registration" key={e.id}>{e.game.title}
                        <div>{e.description}</div>
                        <div>
                          {e.date} @ {e.time}
                        </div>
                      </div>
            })
          }
        </div>
      </section>
    </article>
  )
}
