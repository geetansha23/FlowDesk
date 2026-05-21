import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function LeadsChart({ leads }) {
  const statusCounts = leads.reduce((acc, lead) => {
    const status = lead.leadStatus || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Leads by Status',
        data: Object.values(statusCounts),
        backgroundColor: [
          '#6c63ff', '#43e97b', '#fa709a', '#f6d365', '#a18cd1', '#fda085'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Lead Status Breakdown' }
    }
  };

  return (
    <div className="chart-wrapper">
      <Bar data={data} options={options} />
    </div>
  );
}

export default LeadsChart;
