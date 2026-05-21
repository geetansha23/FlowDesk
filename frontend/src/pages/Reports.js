function Reports() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">
          Reports & Analytics
        </h1>

        <p className="page-subtitle">
          View admissions insights and lead performance.
        </p>
      </div>

      <div className="dashboard-widgets">
        <div className="card">
          <h3>Total Admissions</h3>
          <div className="conversion-number">
            128
          </div>
        </div>

        <div className="card">
          <h3>Conversion Rate</h3>
          <div className="conversion-number">
            74%
          </div>
        </div>

        <div className="card">
          <h3>Top Country</h3>
          <div className="conversion-number">
            India
          </div>
        </div>

        <div className="card">
          <h3>Pending Follow Ups</h3>
          <div className="conversion-number">
            14
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;