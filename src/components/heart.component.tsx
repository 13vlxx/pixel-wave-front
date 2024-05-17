import { FaHeart, FaRegHeart } from "react-icons/fa";

interface HeartProps {
    isFavorite: boolean;
    toggleFavorite?: () => void;
}

const Heart = (props: HeartProps) => {
    const { isFavorite, toggleFavorite } = props;
    return (
        <div onClick={toggleFavorite}>
            {isFavorite ? <FaHeart className="size-8 cursor-pointer" /> : <FaRegHeart className="size-8 cursor-pointer" />}
        </div>
    )
}

export default Heart;