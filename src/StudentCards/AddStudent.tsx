import { useState } from 'react'
import './AddStudent.css'
import StudentForm from './StudentForm'

function AddStudent() {
  const [students, setStudents] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const addStudent = (student: any) => {
    setStudents([...students, student])
    setShowForm(false)
  }

  return (
    <div className="student-section">

      <button className="add-btn" onClick={() => {
        if (students.length >= 3) {
          alert('Only 3 students can be added!')
          return
        }
        setShowForm(true)
      }}>
        Add New Student
      </button>

      {showForm && (
        <StudentForm 
          addStudent={addStudent}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="student-container">
        {students.map((student, index) => (
          <div className="student-card" key={index}>
            <img src={student.image} alt="Profile" className="profile-img"/>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Role:</strong> {student.role}</p>
            <p><strong>Dept:</strong> {student.department}</p>
            <button className="contact-btn" onClick={() => setSelectedStudent(student)}>
              Contact
            </button>
          </div>
        ))}
      </div>

      {/* DISPLAYS ONLY THE CUSTOM FORM FILLED VALUES */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            
            {/* Top-right subtle dismiss button */}
            <button className="modal-dismiss-x" onClick={() => setSelectedStudent(null)}>×</button>

            {/* Header Layout Block */}
            <div className="modal-header-block">
              <div className="modal-header-text">
                <h2>Contact {selectedStudent.name}</h2>
                <p className="modal-subtitle">Student Profile Record</p>
              </div>
            </div>

            {/* Data Sheet Section - Strictly Form Fields */}
            <div className="modal-data-table">
              <div className="data-row">
                <span className="data-label">NAME</span>
                <span className="data-value">{selectedStudent.name}</span>
              </div>
              
              <div className="data-row">
                <span className="data-label">ROLE</span>
                <span className="data-value">{selectedStudent.role}</span>
              </div>
              
              <div className="data-row">
                <span className="data-label">DEPARTMENT</span>
                <span className="data-value">{selectedStudent.department}</span>
              </div>
            </div>

            {/* Action Panel Buttons */}
            <div className="modal-actions-panel">
              <button className="send-email-btn" onClick={() => setSelectedStudent(null)}>
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default AddStudent