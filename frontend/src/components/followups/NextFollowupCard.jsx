function NextFollowupCard({ date }) {
  return (
    <div className="card">
      <h3>Next Followup</h3>

      <h2>
        {new Date(date).toLocaleDateString()}
      </h2>
    </div>
  );
}

export default NextFollowupCard;