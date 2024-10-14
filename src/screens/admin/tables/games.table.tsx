import dayjs from "@utils/dayjs";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAdminStore } from "../../../stores/admin/admin.store";

export const GamesTable = () => {
  const games = useAdminStore().data?.games;

  return (
    <div className="h-full">
      <div className="overflow-x-auto border border-neutral rounded-xl max-h-[500px]">
        <table className="table">
          <thead className="bg-neutral">
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Image</th>
              <th>Nombre de media</th>
              <th>Description</th>
              <th>Date de publication</th>
              <th>Catégories</th>
              <th>Plateformes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games?.map((game) => (
              <tr className="hover transition-all duration-150" key={game.id}>
                <td>{game.id}</td>
                <td>{game.name}</td>
                <td>
                  <Link className="text-accent" to={game.logo}>
                    <img className="w-32 rounded-md" src={game.logo} />
                  </Link>
                </td>
                <td>{game.media.length}</td>
                <td>{game.description}</td>
                <td>{dayjs(game.releaseDate).format("DD MMM YYYY")}</td>
                <td>{game.categories.join(", ")}</td>
                <td>{game.platforms.join(", ")}</td>
                <td>
                  <button className="btn btn-square btn-sm btn-error">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
