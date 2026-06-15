import { useState } from 'react'
import './Dashboard.css'

interface Student {
  id: string
  name: string
  department: string
  gpa: number
  skills: string[]
  isActive: boolean
  email: string
}

function Dashboard() {
  // Initial Dataset
  const initialStudents: Student[] = [
    {
      id: 'S1',
      name: 'Jiya Patel',
      department: 'Computer Science',
      gpa: 9.4,
      skills: ['React', 'JavaScript'],
      isActive: true,
      email: 'jiya@email.com'
    },
    {
      id: 'S2',
      name: 'Rajvi Patel',
      department: 'Information Technology',
      gpa: 9.1,
      skills: ['HTML', 'CSS'],
      isActive: true,
      email: 'rajvi@email.com'
    },
    {
      id: 'S3',
      name: 'Harshil Shah',
      department: 'Computer Science',
      gpa: 8.9,
      skills: ['React', 'Node'],
      isActive: true,
      email: 'harshil@email.com'
    },
    {
      id: 'S4',
      name: 'Tanisha Mehta',
      department: 'Electronics',
      gpa: 8.6,
      skills: ['C', 'Arduino'],
      isActive: false,
      email: 'tanisha@email.com'
    },
    {
      id: 'S5',
      name: 'Anjali Joshi',
      department: 'Information Technology',
      gpa: 8.2,
      skills: ['Java', 'SQL'],
      isActive: true,
      email: 'anjali@email.com'
    },
    {
      id: 'S6',
      name: 'Karan Mehta',
      department: 'Computer Science',
      gpa: 7.9,
      skills: ['Python', 'Django'],
      isActive: false,
      email: 'karan@email.com'
    },
    {
      id: 'S7',
      name: 'Prachi Patel',
      department: 'Electronics',
      gpa: 7.4,
      skills: ['Embedded', 'C++'],
      isActive: true,
      email: 'prachi@email.com'
    },
    {
      id: 'S8',
      name: 'Riya Soni',
      department: 'Computer Science',
      gpa: 9.82,
      skills: ['Python', 'JAVA', 'ML'],
      isActive: true,
      email: 'riya@email.com'
    }
  ]

  // State Management
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [sortByGPA, setSortByGPA] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    department: 'Computer Science',
    gpa: 7.0,
    skills: '',
    email: '',
    isActive: true
  })
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: ''
  })

  // Helper Functions
  const formatGpa = (gpa: number) => gpa.toFixed(2)

  const departments = ['All', 'Computer Science', 'Information Technology', 'Electronics']

  // Derived Values - Filtered & Sorted Students
  let filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = selectedDept === 'All' || student.department === selectedDept
    return matchesSearch && matchesDept
  })

  if (sortByGPA) {
    filteredStudents = [...filteredStudents].sort((a, b) => b.gpa - a.gpa)
  } else {
    filteredStudents = [...filteredStudents].sort((a, b) => a.gpa - b.gpa)
  }

  // Derived Stats based strictly on current filters
  const totalSkills = filteredStudents.reduce(
    (sum, student) => sum + student.skills.length,
    0
  )

  const activeStudents = filteredStudents.filter(
    student => student.isActive
  ).length

  const averageGpa = filteredStudents.length > 0
    ? filteredStudents.reduce((sum, student) => sum + student.gpa, 0) / filteredStudents.length
    : 0

  const topPerformer = filteredStudents.length > 0
    ? filteredStudents.reduce((top, current) => current.gpa > top.gpa ? current : top)
    : null

  // Grouped by Department using only filtered items
  const groupedByDepartment = filteredStudents.reduce((group: any, student) => {
    const dept = student.department
    if (!group[dept]) group[dept] = []
    group[dept].push(student)
    return group
  }, {})

  // Add Student Handler
  const handleAddStudent = () => {
    let errors = { name: '', email: '' }
    
    if (!formData.name.trim()) {
      errors.name = 'Full Name is required'
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    }
    
    setFormErrors(errors)
    
    if (!formData.name.trim() || !formData.email.trim()) {
      return
    }

    const newStudent: Student = {
      id: `S${students.length + 1}`,
      name: formData.name,
      department: formData.department,
      gpa: formData.gpa,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      email: formData.email,
      isActive: formData.isActive
    }

    setStudents([...students, newStudent])
    setFormData({
      name: '',
      department: 'Computer Science',
      gpa: 7.0,
      skills: '',
      email: '',
      isActive: true
    })
    setFormErrors({ name: '', email: '' })
    setShowForm(false)
  }

  return (
    <div className="dashboard">
     
      
      <h3 className="main-title">Class Roster + Derived Stats</h3>

      {/* Search & Filter Section */}
      <div className="search-filter-section">
        <input
          type="text"
          placeholder="Search name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="filter-select"
        >
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>

        <button
          className={sortByGPA ? 'sort-btn active' : 'sort-btn'}
          onClick={() => setSortByGPA(!sortByGPA)}
        >
          GPA: {sortByGPA ? 'High - Low' : 'Low - High'}
        </button>

        <button className="add-student-btn" onClick={() => setShowForm(true)}>
          + Add Student
        </button>

        <button
          className="reset-btn"
          onClick={() => {
            setSearchTerm('')
            setSelectedDept('All')
            setSortByGPA(false)
          }}
        >
          Reset
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats">
        <div className="stat-card">
          <h3>{filteredStudents.length}</h3>
          <p>of {students.length} students</p>
        </div>

        <div className="stat-card">
          <h3>{formatGpa(averageGpa)}</h3>
          <p>GPA (average)</p>
        </div>

        <div className="stat-card">
          <h3>{topPerformer ? topPerformer.name.split(' ')[0] : '—'}</h3>
          <p>{topPerformer ? 'Top Performer' : 'GPA N/A'}</p>
        </div>

        <div className="stat-card">
          <h3>{activeStudents} · {totalSkills}</h3>
          <p>active students · total skills</p>
        </div>
      </div>

      {/* Names Section - map() */}
      <div className="section">
        <h4>Names of Students - map()</h4>
        {filteredStudents.length > 0 ? (
          <div className="names-chips">
            {filteredStudents.map((student) => (
              <span 
                key={student.id} 
                className="name-chip"
                onClick={() => setSelectedStudent(student)}
              >
                👨‍🎓 {student.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="no-results">No students match your filters.</p>
        )}
      </div>

      {/* High Performers Section */}
      <div className="section">
        <h4>High performers : GPA ≥ 8.5 - filter()</h4>
        <div className="students-list">
          {filteredStudents.filter(s => s.gpa >= 8.5).length > 0 ? (
            filteredStudents
              .filter(s => s.gpa >= 8.5)
              .map(student => (
                <div 
                  key={student.id} 
                  className="student-row"
                  onClick={() => setSelectedStudent(student)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="student-info">
                    <h5>{student.name}</h5>
                    <p className="student-email">{student?.email ?? 'N/A'}</p>
                  </div>
                  <span className="gpa-badge">GPA {formatGpa(student.gpa)}</span>
                </div>
              ))
          ) : (
            <p className="no-results">No one with GPA ≥ 8.5 in this view.</p>
          )}
        </div>
      </div>

      {/* Department Groups Section */}
      <div className="section">
        <h4>Grouped by department - reduce()</h4>
        {Object.keys(groupedByDepartment).length > 0 ? (
          <div className="dept-groups-grid">
            {Object.entries(groupedByDepartment).map(([dept, members]: any) => (
              <div key={dept} className="dept-group-card">
                <div className="dept-group-header">
                  <h5>{dept}</h5>
                  <span className="dept-group-count">{members.length}</span>
                </div>
                <div className="dept-group-students">
                  {members.map((student: Student) => (
                    <div 
                      key={student.id} 
                      className="dept-student-item"
                      onClick={() => setSelectedStudent(student)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className="student-name">{student.name}</span>
                      <span className="student-gpa">{formatGpa(student.gpa)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-results">No groups to show.</p>
        )}
      </div>

      {/* Contact Student Detail Modal Layout (Updated to match photo) */}
      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-content custom-contact-modal">
            <button className="custom-modal-close-x" onClick={() => setSelectedStudent(null)}>✕</button>
            
            <div className="custom-modal-header">
              <div className="custom-avatar-box">
                <span className="custom-avatar-icon">🎓</span>
              </div>
              <div className="custom-header-titles">
                <h3>Contact {selectedStudent.name}</h3>
                <p className="custom-header-subtitle">{selectedStudent.department}</p>
              </div>
            </div>

            <div className="custom-detail-table">
              <div className="custom-table-row">
                <span className="custom-row-label">DEPARTMENT</span>
                <span className="custom-row-value">{selectedStudent.department}</span>
              </div>

              <div className="custom-table-row">
                <span className="custom-row-label">GPA</span>
                <span className="custom-row-value">{formatGpa(selectedStudent.gpa)}</span>
              </div>

              <div className="custom-table-row">
                <span className="custom-row-label">STATUS</span>
                <span className={`custom-row-value status-text ${selectedStudent.isActive ? 'active' : 'inactive'}`}>
                  {selectedStudent.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="custom-table-row">
                <span className="custom-row-label">EMAIL</span>
                <span className="custom-row-value link-style">{selectedStudent.email}</span>
              </div>

              <div className="custom-table-row skills-row">
                <span className="custom-row-label">SKILLS</span>
                <div className="custom-row-skills-tags">
                  {selectedStudent.skills.length > 0 ? (
                    selectedStudent.skills.map((skill, idx) => (
                      <span key={idx} className="custom-skill-pill">{skill}</span>
                    ))
                  ) : (
                    <span className="custom-row-value">—</span>
                  )}
                </div>
              </div>
            </div>

            <div className="custom-modal-footer">
              <button className="custom-footer-close-btn" onClick={() => setSelectedStudent(null)}>
                Close
              </button>
              <button className="custom-footer-email-btn">
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add a new student</h3>
              <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
            </div>

            <p className="modal-subtitle">Practice arrays, objects, spread and validation in one place</p>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Test data"
                value={formData.name}
                onChange={(e) => {
                  setFormData({...formData, name: e.target.value})
                  if (e.target.value.trim()) {
                    setFormErrors({...formErrors, name: ''})
                  }
                }}
                className={formErrors.name ? 'error' : ''}
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                >
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Electronics</option>
                </select>
              </div>

              <div className="form-group">
                <label>GPA (0-10)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.gpa}
                  onChange={(e) => setFormData({...formData, gpa: parseFloat(e.target.value)})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Skills</label>
              <input
                type="text"
                placeholder="React, Node.js (comma separated)"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="john.smith@healthcareexample.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value})
                  if (e.target.value.trim()) {
                    setFormErrors({...formErrors, email: ''})
                  }
                }}
                className={formErrors.email ? 'error' : ''}
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>

            <div className="form-group-checkbox-container">
              <input
                type="checkbox"
                id="active"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="custom-checkbox"
              />
              <label htmlFor="active" className="checkbox-label">Active student</label>
            </div>

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleAddStudent}>
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard