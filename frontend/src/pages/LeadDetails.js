import {
  useEffect,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import API from '../services/api';

import FollowupForm from '../components/followups/FollowupForm';

import FollowupTimeline from '../components/followups/FollowupTimeline';

function LeadDetails() {
  const { id } = useParams();

  const [lead, setLead] =
    useState(null);

  const [followups, setFollowups] =
    useState([]);

  useEffect(() => {
    fetchLead();
    fetchFollowups();
  }, []);

  const fetchLead = async () => {
    const res = await API.get(
      `/leads/${id}`
    );

    setLead(res.data);
  };

  const fetchFollowups =
    async () => {
      const res = await API.get(
        `/followups/${id}`
      );

      setFollowups(res.data);
    };

  if (!lead) return null;

  return (
    <div className="lead-details-page">
      <div className="card">
        <h2>{lead.fullName}</h2>

        <p>{lead.email}</p>

        <p>{lead.phoneNumber}</p>

        <p>
          Status:{' '}
          {lead.leadStatus}
        </p>

        <p>
          Counselor:{' '}
          {
            lead.assignedCounselor
          }
        </p>
      </div>

      <FollowupForm
        leadId={id}
        refresh={fetchFollowups}
      />

      <FollowupTimeline
        followups={followups}
      />
    </div>
  );
}

export default LeadDetails;