import { useState } from 'react'
import './StudentForm.css'

type Props = {
  addStudent: (student: any) => void
  onClose: () => void
}

function StudentForm({ addStudent, onClose }: Props) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [department, setDepartment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Prevents page reload artifacts
    if (!name || !role || !department) {
      alert('Please fill out all input fields!')
      return
    }

    addStudent({
      name,
      role,
      department,
      image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`
    })

    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation prevents modal closing when clicking inside the white area */}
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add a New Student</h2>

        <form onSubmit={handleSubmit} className="form-fields-stack">
          <input 
            type="text" 
            placeholder="Enter Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input 
            type="text" 
            placeholder="Enter Role" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            type="text" 
            placeholder="Enter Department" 
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <div className="form-buttons">
            <button type="button" className="cancel-link-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentForm