import './Contact.css'

type Props = {
  onClose: () => void
}

function Contact({ onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* e.stopPropagation prevents closing the modal when clicking inside the white box */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Right Subtle Close Cross */}
        <button className="modal-dismiss-x" onClick={onClose}>×</button>

        {/* Header Layout Section */}
        <div className="modal-header-block">
          <h2>Contact Riya Patadiya</h2>
          <p className="modal-subtitle">Student Profile Record</p>
        </div>

        {/* Data Sheet Grid Section */}
        <div className="modal-data-table">
          <div className="data-row">
            <span className="data-label">NAME</span>
            <span className="data-value">Riya Patadiya</span>
          </div>
          
          <div className="data-row">
            <span className="data-label">EMAIL</span>
            <span className="data-value data-link">riya@gmail.com</span>
          </div>

          <div className="data-row">
            <span className="data-label">PHONE</span>
            <span className="data-value">+91 98765 43210</span>
          </div>
        </div>

        {/* Message Input Area */}
        <textarea
          placeholder="Enter your message..."
          rows={4}
          className="contact-textarea"
        ></textarea>

        {/* Action Panel Buttons */}
        <div className="btn-group">
          <button className="close-text-link" onClick={onClose}>
            Close
          </button>
          <button className="send-btn" onClick={() => alert('Message Sent Successfully!')}>
            Send Email
          </button>
        </div>

      </div>
    </div>
  )
}

export default Contact