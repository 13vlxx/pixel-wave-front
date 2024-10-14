import { useAdminStore } from "@stores/admin/admin.store";
import { PagesBackoffice } from "@utils/router/routes";
import { FaCommentDots, FaUsers } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { DashboardCard } from "./components/dashbaord.card";
import { NewMonthlyUsersChart } from "./components/new-monthly-users.chart";

export const AdminDashboardScreen = () => {
  const { isLoading } = useAdminStore();
  const data = useAdminStore().data;

  if (isLoading)
    return (
      <main className="space-y-8">
        <section className="grid grid-cols-4 gap-2">
          <div className="skeleton bg-neutral h-[112px] w-full"></div>
          <div className="skeleton bg-neutral h-[112px] w-full"></div>
          <div className="skeleton bg-neutral h-[112px] w-full"></div>
          <div className="skeleton bg-neutral h-[112px] w-full"></div>
        </section>
      </main>
    );

  return (
    <main className="space-y-8">
      <section className="grid grid-cols-4 gap-2">
        <DashboardCard title="Utilisateurs" image={<FaUsers />} value={data?.users.length ?? 0} destination={PagesBackoffice.USERS} />
        <DashboardCard title="Jeux" image={<IoGameController />} value={20} destination={PagesBackoffice.GAMES} />
        <DashboardCard title="Posts" image={<FaCommentDots />} value={3000} destination={PagesBackoffice.POSTS} />
        <DashboardCard title="Demande de staff" image={<MdAdminPanelSettings />} value={35} destination={PagesBackoffice.STAFF_REQUESTS} />
      </section>
      <div className="">
        <NewMonthlyUsersChart />
      </div>
    </main>
  );
};
