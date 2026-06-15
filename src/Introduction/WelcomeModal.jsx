function WelcomeModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="welcome-modal">

        <h1>👋 Welcome</h1>

        <h2>React Internship Project</h2>

        <p>
          Welcome to my React Learning Portfolio.
        </p>

        <button onClick={onClose}>
          Start Exploring →
        </button>

      </div>
    </div>
  )
}

export default WelcomeModal