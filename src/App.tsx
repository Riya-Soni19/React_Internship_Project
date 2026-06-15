import { useState } from 'react'
import Introduction from './Introduction/Introduction'
import ProfileCard from './StudentProfile/ProfileCard'
import AddStudent from './StudentCards/AddStudent'
import Dashboard from './StudentDashboard/Dashboard'
import WelcomeModal from './Introduction/WelcomeModal'

// Layout Component Imports
import Header from './Layout/Header'
import Footer from './Layout/Footer'

import './Introduction/WelcomeModal.css'
import './Layout/Header.css'
import './Layout/Footer.css'
import './App.css'

function App() {
  const [currentDay, setCurrentDay] = useState(1)
  const [showModal, setShowModal] = useState(true)

  // Show ONLY popup first
  if (showModal) {
    return (
      <WelcomeModal
        onClose={() => setShowModal(false)}
      />
    )
  }

  return (
    <div className="app-layout">

      {/* Sidebar - Remains clean and structurally isolated on the left */}
      <div className="sidebar">
        <button
          className={currentDay === 1 ? 'day-btn active' : 'day-btn'}
          onClick={() => setCurrentDay(1)}
        >
          D1
        </button>

        <button
          className={currentDay === 2 ? 'day-btn active' : 'day-btn'}
          onClick={() => setCurrentDay(2)}
        >
          D2
        </button>

        <button
          className={currentDay === 3 ? 'day-btn active' : 'day-btn'}
          onClick={() => setCurrentDay(3)}
        >
          D3
        </button>
      </div>

      {/* Main Workspace Column */}
      <div className="content">
        
        {/* Header updates its top right content based on currentDay dynamically */}
        <Header currentDay={currentDay} />

        {/* Dynamic Inner Assignments Panels */}
        <div className="day-view-container">
          {currentDay === 1 && (
            <>
              <h1 className="page-title">
                Day 1 - Introduction
              </h1>
              <Introduction />
            </>
          )}

          {currentDay === 2 && (
            <>
              <h1 className="page-title">
                Day 2 - Student Profile Card
              </h1>

              <ProfileCard />

              <h1 className="page-title small">
                Student Cards
              </h1>

              <AddStudent />
            </>
          )}

          {currentDay === 3 && (
            <>
              <h1 className="page-title">
                Day 3 - Student Dashboard
              </h1>

              <Dashboard />
            </>
          )}
        </div>

        {/* Persistent Workspace Footer Panel */}
        <Footer />

      </div>

    </div>
  )
}

export default App