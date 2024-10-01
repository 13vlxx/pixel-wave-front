import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsChatLeftTextFill } from "react-icons/bs";
import { FaCommentDots, FaUsers } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoApps, IoGameController } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { toast } from "sonner";
import { useResponsive } from "../_utils/useResponsive";
import AdminRequest from "../stores/admin/admin.request";
import { useAdminStore } from "../stores/admin/admin.store";

export const AdminNavbarLayout = () => {
  const { setData, toggleLoadingState, isLoading } = useAdminStore();
  const { isMobile } = useResponsive();

  useEffectOnce(() => {
    document.title = "Admin - Dashboard";

    AdminRequest.getData()
      .then((res) => {
        setData(res);
        toggleLoadingState();
      })
      .catch(() => toast.error("Une erreur est survenue, veuillez réessayer plus tard"));
  });

  const navLinks = [
    {
      title: "Utilisateurs",
      icon: <FaUsers className="mr-2" />,
      to: "/admin/users",
    },
    {
      title: "Posts",
      icon: <FaCommentDots className="mr-2" />,
      to: "/admin/analytics",
    },
    {
      title: "Jeux",
      icon: <IoGameController className="mr-2" />,
      to: "/admin/settings",
    },
    {
      title: "Plateformes",
      icon: <IoApps className="mr-2" />,
      to: "/admin/settings",
    },
    {
      title: "Catégories",
      icon: <BiSolidCategoryAlt className="mr-2" />,
      to: "/admin/settings",
    },
    {
      title: "Avis",
      icon: <BsChatLeftTextFill className="mr-2" />,
      to: "/admin/settings",
    },
    {
      title: "Demandes de staff",
      icon: <MdAdminPanelSettings className="mr-2" />,
      to: "/admin/settings",
    },
    {
      title: "Quitter",
      icon: <FaArrowLeftLong className="mr-2" />,
      to: "/profile/me",
    },
  ];

  if (isMobile) {
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }

  if (isMobile)
    return (
      <div className="h-screen flex gap-4 flex-col items-center justify-center p-20 text-xl font-semibold text-center">
        <p>Le Backoffice est disponible uniquement sur PC, vous allez être redirigé vers l'accueil...</p>
      </div>
    );

  return (
    <section className="h-screen flex">
      <nav className="bg-base-200 w-64 p-6 space-y-8">
        <NavLink to={"/admin"} className="text-3xl font-bold mb-8 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
          PixelWave
        </NavLink>
        <ul className="space-y-4">
          {isLoading ? (
            <div className="flex">
              <span className="loading loading-spinner loading-sm mx-auto bg-secondary"></span>
            </div>
          ) : (
            <>
              {navLinks.map((x, i) => (
                <li key={i}>
                  <NavLink
                    to={x.to}
                    className={({ isActive }) =>
                      `flex items-center text-lg font-semibold ${isActive ? "text-accent" : "text-secondary"} hover:text-accent transition-all`
                    }
                  >
                    {x.icon}
                    {x.title}
                  </NavLink>
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>
      <section className="bg-base-200 flex-1 overflow-y-auto">
        <div className="bg-primary h-screen rounded-s-2xl overflow-auto p-8">
          <Outlet />
        </div>
      </section>
    </section>
  );
};
