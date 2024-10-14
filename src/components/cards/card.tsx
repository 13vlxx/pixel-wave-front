interface CardProps {
  children: React.ReactNode;
}

export const Card = (props: CardProps) => {
  const { children } = props;

  return (
    <div className="card card-compact border-neutral border-2 shadow-lg hover:border-accent transition-all hover:shadow-accent flex items-center p-4">
      {children}
    </div>
  );
};
