import { useState } from 'react'
import './ProfileCard.css'
import profileImg from '../assets/profile.png'
import Contact from './Contact'

function ProfileCard() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="card">

        <img src={profileImg} alt="Profile" className="profile-img"/>

        <h2>Riya Patadiya</h2>

        <p>
          <strong>College:</strong> Indus University
        </p>

        <p>
          <strong>Department:</strong> CSE
        </p>

        <h3>Skills</h3>

        <div className="skill-list">
          <span className="skill">HTML</span>
          <span className="skill">CSS</span>
          <span className="skill">JavaScript</span>
          <span className="skill">React</span>
        </div>

        <button
          className="contact-btn"
          onClick={() => setShowModal(true)}
        >
          Contact
        </button>

      </div>

      {showModal && (
        <Contact
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export default ProfileCard