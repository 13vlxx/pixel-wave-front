import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsChatLeftTextFill } from "react-icons/bs";
import { FaCommentDots, FaUsers } from "react-icons/fa";
import { IoApps, IoGameController, IoNewspaper } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { useAdminStore } from "../../../stores/admin/admin.store";
import { DashboardCard } from "./components/dashbaord.card";

export const AdminDashboardScreen = () => {
  const { isLoading } = useAdminStore();

  if (isLoading)
    return (
      <main className="space-y-8">
        <section className="grid grid-cols-2 gap-2">
          <div className="skeleton bg-neutral h-[120px] w-full"></div>
          <div className="skeleton bg-neutral h-[120px] w-full"></div>
        </section>
        <section className="grid grid-cols-4 gap-2">
          <div className="skeleton bg-neutral h-[120px] w-full"></div>
          <div className="skeleton bg-neutral h-[120px] w-full"></div>
          <div className="skeleton bg-neutral h-[120px] w-full"></div>
          <div className="skeleton bg-neutral h-[120px] w-full"></div>
        </section>
        <section className="grid grid-cols-2 gap-2">
          <div className="skeleton bg-neutral h-[120px] w-full"></div>
          <div className="skeleton bg-neutral h-[120px] w-full"></div>
        </section>
      </main>
    );

  return (
    <main className="space-y-8">
      <section className="grid grid-cols-2 gap-2">
        <DashboardCard title="Utilisateurs" image={<FaUsers />} destination="/admin/users" />
        <DashboardCard title="Posts" image={<FaCommentDots />} destination="/admin/posts" />
      </section>
      <section className="grid grid-cols-4 gap-2">
        <DashboardCard title="Jeux" image={<IoGameController />} destination="/admin/games" />
        <DashboardCard title="Plateformes" image={<IoApps />} destination="/admin/platforms" />
        <DashboardCard title="Catégories" image={<BiSolidCategoryAlt />} destination="/admin/categories" />
        <DashboardCard title="Avis" image={<BsChatLeftTextFill />} destination="/admin/advices" />
      </section>
      <section className="grid grid-cols-2 gap-2">
        <DashboardCard title="Demande de staff" image={<MdAdminPanelSettings />} destination="/admin/games" />
        <DashboardCard title="News" image={<IoNewspaper />} destination="/admin/news" />
      </section>
    </main>
  );
};
