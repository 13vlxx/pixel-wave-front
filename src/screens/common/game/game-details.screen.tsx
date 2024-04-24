import { useParams } from "react-router-dom";

const GameDetailsScreen = () => {
    const { name } = useParams();

    return (
        <h1>{name}</h1>
    )
}

export default GameDetailsScreen;