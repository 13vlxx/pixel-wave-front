import { Card } from "@components/cards/card";
import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const NewMonthlyUsersChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Nouveaux utilisateurs depuis le début du mois",
        data: [0, 2, 12, 23, 2, 2],
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.4)",
      },
      {
        label: "Nouveaux posts depuis le début du mois",
        data: [5, 20, 3, 3, 24, 20],
        backgroundColor: "rgb(70, 238, 255",
        borderColor: "rgba(70, 238, 255, 0.4)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      // tooltip: {
      //   callbacks: {
      //     label: function (tooltipItem) {
      //       return `${tooltipItem.dataset.label}: ${tooltipItem.raw} utilisateurs/posts`;
      //     },
      //   },
      // },
    },
    scales: {
      x: {
        title: {
          display: true,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
        },
        // ticks: {
        //   stepSize: 5,
        // },
      },
    },
    elements: {
      line: {
        tension: 0.2,
      },
    },
  };

  return (
    <Card>
      <Line data={data} options={options} />
    </Card>
  );
};
