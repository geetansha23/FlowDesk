import { useState } from 'react';

import API from '../../services/api';

function FollowupForm({
  leadId,
  refresh
}) {
  const [note, setNote] =
    useState('');

  const [date, setDate] =
    useState('');

  const submitFollowup =
    async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem(
            'user'
          )
        );

        await API.post(
          '/followups',
          {
            lead: leadId,
            counselor:
              user.name,
            note,
            nextFollowup:
              date
          }
        );

        setNote('');
        setDate('');

        refresh();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="card">
      <h3>Add Followup</h3>

      <textarea
        placeholder="Write note..."
        value={note}
        onChange={(e) =>
          setNote(
            e.target.value
          )
        }
      />

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(
            e.target.value
          )
        }
      />

      <button
        onClick={submitFollowup}
      >
        Save Followup
      </button>
    </div>
  );
}

export default FollowupForm;