import { FaHeart, FaRegHeart } from "react-icons/fa";

interface HearthGameButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export const HearthGameButton = (props: HearthGameButtonProps) => {
  const { isFavorite, onClick } = props;

  return isFavorite ? (
    <FaHeart onClick={onClick} className="cursor-pointer text-primary" />
  ) : (
    <FaRegHeart onClick={onClick} className="cursor-pointer text-primary" />
  );
};
