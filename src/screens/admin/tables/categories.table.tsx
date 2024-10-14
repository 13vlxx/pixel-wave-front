import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAdminStore } from "../../../stores/admin/admin.store";

export const CategoriesTable = () => {
  const categories = useAdminStore().data?.categories;

  return (
    <div className="h-full">
      <div className="overflow-x-auto border border-neutral rounded-xl max-h-[500px]">
        <table className="table">
          <thead className="bg-neutral">
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr className="hover transition-all duration-150" key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <Link className="text-accent" to={category.image}>
                    <img className="w-32 rounded-md" src={category.image} />
                  </Link>
                </td>
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
