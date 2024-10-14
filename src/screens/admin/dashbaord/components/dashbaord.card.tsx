import { PagesBackoffice } from "@utils/router/routes";
import { Link } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  image: React.ReactNode;
  value: number;
  destination: PagesBackoffice;
}

export const DashboardCard = (props: DashboardCardProps) => {
  const { title, image, value, destination } = props;

  return (
    <Link to={destination} className="card card-compact border-neutral border-2 shadow-lg hover:border-accent transition-all hover:shadow-accent">
      <div className="stats">
        <div className="stat">
          <div className="stat-title flex items-center gap-2">
            {title} {image}
          </div>
          <div className="stat-value">{value}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </div>
    </Link>
  );
};
