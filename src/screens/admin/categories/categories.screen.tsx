import { CustomModal } from "@components/modals/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { fieldsValidation } from "@utils/yup.utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InferType, mixed, object } from "yup";
import { CategoriesTable } from "../tables/categories.table";

const CreateCategoryDataSchema = object().shape({
  name: fieldsValidation.REQUIRED_STRING,
  image: mixed().required("Image is required"),
});

export type CreateCategoryDataValidationType = InferType<typeof CreateCategoryDataSchema>;

export const CategoriesScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm<CreateCategoryDataValidationType>({
    resolver: yupResolver(CreateCategoryDataSchema),
    mode: "all",
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    console.log(data.name);

    formData.append("name", data.name);

    console.log(formData);

    setIsModalOpen(false);
    setValue("name", "");
    setValue("image", null);
  });

  return (
    <section>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold pb-4">Categories</h1>
        <button className="btn btn-sm btn-outline" onClick={() => setIsModalOpen(true)}>
          Ajouter
        </button>
      </div>
      <CategoriesTable />
      {isModalOpen && (
        <CustomModal title="Ajout de catégorie" onSubmit={onSubmit} onClose={() => setIsModalOpen(false)} disabled={!isValid}>
          <form className="flex flex-col gap-2">
            <input {...register("name")} placeholder="Nom de catégorie" type="text" className="input input-bordered" />
            <input {...register("image")} id="image" type="file" />
          </form>
        </CustomModal>
      )}
    </section>
  );
};
