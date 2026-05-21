import { Link } from 'react-router-dom';

function LeadTable({
  leads = [],
  onEdit,
  onDelete
}) {
  /*
    SAFETY CHECK
  */
  if (!Array.isArray(leads)) {
    return (
      <div className="empty-state">
        <p>Failed to load leads.</p>
      </div>
    );
  }

  /*
    EMPTY STATE
  */
  if (leads.length === 0) {
    return (
      <div className="empty-state">
        <p>No leads found.</p>
      </div>
    );
  }

  /*
    TABLE
  */
  return (
    <div className="table-wrapper">
      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Course</th>
            <th>Counselor</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => {
            /*
              SAFE VALUES
            */
            const status =
              lead?.leadStatus || 'New';

            const priority =
              lead?.priority || 'Medium';

            const counselor =
              typeof lead?.assignedCounselor ===
              'object'
                ? lead.assignedCounselor
                    ?.name
                : lead?.assignedCounselor;

            return (
              <tr key={lead?._id}>
                {/* NAME */}
                <td>
                  <Link
                    className="lead-link"
                    to={`/leads/${lead?._id}`}
                  >
                    {lead?.fullName ||
                      'Unnamed'}
                  </Link>
                </td>

                {/* COUNTRY */}
                <td>
                  {lead?.country ||
                    '-'}
                </td>

                {/* COURSE */}
                <td>
                  {lead?.courseInterested ||
                    '-'}
                </td>

                {/* COUNSELOR */}
                <td>
                  {counselor ||
                    'Unassigned'}
                </td>

                {/* STATUS */}
                <td>
                  <span
                    className={`badge badge-${status
                      .replace(/\s+/g, '-')
                      .toLowerCase()}`}
                  >
                    {status}
                  </span>
                </td>

                {/* PRIORITY */}
                <td>
                  <span
                    className={`priority-${priority.toLowerCase()}`}
                  >
                    {priority}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="actions">
                  <button
                    className="btn-edit"
                    onClick={() =>
                      onEdit &&
                      onEdit(lead)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() =>
                      onDelete &&
                      onDelete(
                        lead._id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;