import { Link } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  image: React.ReactNode;
  destination: string;
}

export const DashboardCard = (props: DashboardCardProps) => {
  const { title, image, destination } = props;

  return (
    <Link to={destination} className="card card-compact border-neutral border-2 shadow-xl hover:border-accent transition-all hover:shadow-accent">
      <figure className="pt-4 max-lg:text-2xl text-4xl">{image}</figure>
      <div className="card-body w-full flex flex-col items-center">
        <h2 className="card-title max-lg:text-sm">{title}</h2>
      </div>
    </Link>
  );
};
