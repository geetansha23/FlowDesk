function LeadFilters({
  filters,
  setFilters
}) {
  return (
    <div className="filters-bar">
      <input
        placeholder="Search leads"
        value={filters.search}
        onChange={(e) =>
          setFilters({
            ...filters,
            search:
              e.target.value
          })
        }
      />

      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({
            ...filters,
            status:
              e.target.value
          })
        }
      >
        <option value="">
          All Status
        </option>

        <option value="New">
          New
        </option>

        <option value="Interested">
          Interested
        </option>

        <option value="Applied">
          Applied
        </option>

        <option value="Admitted">
          Admitted
        </option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) =>
          setFilters({
            ...filters,
            priority:
              e.target.value
          })
        }
      >
        <option value="">
          Priority
        </option>

        <option value="High">
          High
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="Low">
          Low
        </option>
      </select>
    </div>
  );
}

export default LeadFilters;