import { useEffect, useState } from 'react';
import API from '../services/api';

function LeadModal({
  onClose,
  onSave,
  editLead
}) {
  const [counselors, setCounselors] =
    useState([]);

  const [formData, setFormData] =
    useState({
      fullName: '',
      email: '',
      phoneNumber: '',
      country: '',
      courseInterested: '',
      leadSource: '',
      assignedCounselor: '',
      leadStatus: 'New',
      priority: 'Medium',
      notes: ''
    });

  /*
    LOAD COUNSELORS
  */
  useEffect(() => {
    fetchCounselors();
  }, []);

  /*
    EDIT MODE
  */
  useEffect(() => {
    if (editLead) {
      setFormData(editLead);
    }
  }, [editLead]);

  /*
    FETCH COUNSELORS
  */
  const fetchCounselors =
    async () => {
      try {
        const res = await API.get(
          '/auth/counselors'
        );

        setCounselors(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  /*
    HANDLE CHANGE
  */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  /*
    SUBMIT
  */
  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="lead-modal">
        <h2>
          {editLead
            ? 'Edit Lead'
            : 'Add New Lead'}
        </h2>

        <div className="lead-form-grid">
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />

          <input
            name="courseInterested"
            placeholder="Course Interested"
            value={
              formData.courseInterested
            }
            onChange={handleChange}
          />

          <input
            name="leadSource"
            placeholder="Lead Source"
            value={formData.leadSource}
            onChange={handleChange}
          />

          <select
            name="assignedCounselor"
            value={
              formData.assignedCounselor
            }
            onChange={handleChange}
          >
            <option value="">
              Select Counselor
            </option>

            {counselors.map(
              (counselor) => (
                <option
                  key={counselor._id}
                  value={counselor.name}
                >
                  {counselor.name}
                </option>
              )
            )}
          </select>

          <select
            name="leadStatus"
            value={formData.leadStatus}
            onChange={handleChange}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Interested</option>
            <option>Applied</option>
            <option>Admitted</option>
            <option>Rejected</option>
            <option>
              Needs Attention
            </option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <div className="modal-actions">
          <button
            className="btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn-save"
            onClick={handleSubmit}
          >
            Save Lead
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadModal;