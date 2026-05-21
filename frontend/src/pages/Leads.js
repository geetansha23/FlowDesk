import { useEffect, useState } from 'react';

import API from '../services/api';

import LeadTable from '../components/LeadTable';

function Leads() {
  /*
    STATES
  */
  const [leads, setLeads] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [editingLead, setEditingLead] =
    useState(null);

  const [counselors, setCounselors] =
    useState([]);

  /*
    FORM STATE
  */
  const initialForm = {
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
  };

  const [form, setForm] =
    useState(initialForm);

  /*
    FETCH LEADS
  */
  const fetchLeads =
    async () => {
      try {
        setLoading(true);

        const res =
          await API.get('/leads');

        /*
          FIXED RESPONSE
        */
        if (
          Array.isArray(
            res.data
          )
        ) {
          setLeads(res.data);
        } else if (
          Array.isArray(
            res.data.leads
          )
        ) {
          setLeads(
            res.data.leads
          );
        } else {
          setLeads([]);
        }

      } catch (error) {

        console.log(
          'Fetch Leads Error:',
          error
        );

        setLeads([]);

      } finally {

        setLoading(false);

      }
    };

  /*
    FETCH COUNSELORS
  */
  const fetchCounselors =
    async () => {
      try {

        const res =
          await API.get(
            '/auth/counselors'
          );

        setCounselors(
          Array.isArray(
            res.data
          )
            ? res.data
            : []
        );

      } catch (error) {

        console.log(
          'Counselor Fetch Error:',
          error
        );

        setCounselors([]);

      }
    };

  /*
    INITIAL LOAD
  */
  useEffect(() => {

    fetchLeads();

    fetchCounselors();

  }, []);

  /*
    HANDLE INPUT
  */
  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  /*
    OPEN ADD MODAL
  */
  const handleAdd = () => {

    setEditingLead(null);

    setForm(initialForm);

    setShowModal(true);

  };

  /*
    EDIT LEAD
  */
  const handleEdit = (
    lead
  ) => {

    setEditingLead(lead);

    setForm({
      fullName:
        lead.fullName || '',

      email:
        lead.email || '',

      phoneNumber:
        lead.phoneNumber || '',

      country:
        lead.country || '',

      courseInterested:
        lead.courseInterested || '',

      leadSource:
        lead.leadSource || '',

      assignedCounselor:
        lead.assignedCounselor || '',

      leadStatus:
        lead.leadStatus || 'New',

      priority:
        lead.priority || 'Medium',

      notes:
        lead.notes || ''
    });

    setShowModal(true);

  };

  /*
    SAVE LEAD
  */
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        /*
          UPDATE
        */
        if (editingLead) {

          await API.put(
            `/leads/${editingLead._id}`,
            form
          );

        }

        /*
          CREATE
        */
        else {

          await API.post(
            '/leads',
            form
          );

        }

        /*
          REFRESH LEADS
        */
        await fetchLeads();

        /*
          RESET
        */
        setShowModal(false);

        setEditingLead(null);

        setForm(initialForm);

      } catch (error) {

        console.log(
          'Save Lead Error:',
          error
        );

      }
    };

  /*
    DELETE LEAD
  */
  const handleDelete =
    async (id) => {

      try {

        await API.delete(
          `/leads/${id}`
        );

        /*
          REFRESH
        */
        fetchLeads();

      } catch (error) {

        console.log(
          'Delete Error:',
          error
        );

      }
    };

  return (
    <div className="page-container">

      {/* HEADER */}
      <div className="page-header">

        <div>
          <h1 className="page-title">
            Lead Management
          </h1>

          <p className="page-subtitle">
            Manage admissions leads and followups.
          </p>
        </div>

        <button
          className="add-btn"
          onClick={handleAdd}
        >
          + Add Lead
        </button>

      </div>

      {/* TABLE */}
      {loading ? (

        <div className="loading-box">
          Loading leads...
        </div>

      ) : (

        <LeadTable
          leads={leads}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      )}

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">

          <div className="lead-modal">

            <h2>
              {editingLead
                ? 'Edit Lead'
                : 'Add New Lead'}
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
            >

              <div className="lead-form-grid">

                <input
                  name="fullName"
                  placeholder="Full Name"
                  value={
                    form.fullName
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <input
                  name="email"
                  placeholder="Email"
                  value={
                    form.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <input
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={
                    form.phoneNumber
                  }
                  onChange={
                    handleChange
                  }
                />

                <input
                  name="country"
                  placeholder="Country"
                  value={
                    form.country
                  }
                  onChange={
                    handleChange
                  }
                />

                <input
                  name="courseInterested"
                  placeholder="Course Interested"
                  value={
                    form.courseInterested
                  }
                  onChange={
                    handleChange
                  }
                />

                <input
                  name="leadSource"
                  placeholder="Lead Source"
                  value={
                    form.leadSource
                  }
                  onChange={
                    handleChange
                  }
                />

                {/* COUNSELOR */}
                <select
                  name="assignedCounselor"
                  value={
                    form.assignedCounselor
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="">
                    Select Counselor
                  </option>

                  {counselors.map(
                    (
                      counselor
                    ) => (
                      <option
                        key={
                          counselor._id
                        }
                        value={
                          counselor.name
                        }
                      >
                        {
                          counselor.name
                        }
                      </option>
                    )
                  )}

                </select>

                {/* STATUS */}
                <select
                  name="leadStatus"
                  value={
                    form.leadStatus
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option>
                    New
                  </option>

                  <option>
                    Contacted
                  </option>

                  <option>
                    Interested
                  </option>

                  <option>
                    Applied
                  </option>

                  <option>
                    Admitted
                  </option>

                  <option>
                    Rejected
                  </option>

                  <option>
                    Needs Attention
                  </option>

                </select>

                {/* PRIORITY */}
                <select
                  name="priority"
                  value={
                    form.priority
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option>
                    Low
                  </option>

                  <option>
                    Medium
                  </option>

                  <option>
                    High
                  </option>

                </select>

              </div>

              {/* NOTES */}
              <textarea
                name="notes"
                placeholder="Notes"
                value={
                  form.notes
                }
                onChange={
                  handleChange
                }
              />

              {/* ACTIONS */}
              <div className="modal-actions">

                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {

                    setShowModal(
                      false
                    );

                    setEditingLead(
                      null
                    );

                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-save"
                >
                  Save Lead
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </div>
  );
}

export default Leads;