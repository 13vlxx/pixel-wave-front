import NotificationRequest from "@stores/notifications/notification.request";
import { GetNotificationsDto } from "@stores/user/user.model";
import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";

const NotificationsScreen = () => {
    const [notifications, setNotifications] = useState<GetNotificationsDto | null>({ receiveNotifications: false })

    useEffect(() => {
        NotificationRequest.getNotifications().then((data) => setNotifications({ receiveNotifications: data }))
    }, []);

    const handleToggleReceiveNotifications = () => {
        NotificationRequest.toggleReceiveNotifications({ receiveNotifications: !notifications?.receiveNotifications })
            .then((x) => setNotifications({ ...notifications, receiveNotifications: x }))
    }

    return (
        <section className="px-4 mt-2">
            <header className="flex justify-between items-center">
                <h1 className="font-bold text-xl">Dernières notifications</h1>
                <div className="dropdown  dropdown-end">
                    <div tabIndex={0} role="button" className="m-1">
                        <IoMdSettings className="text-3xl" />
                    </div>
                    <ul className="menu w-60 bg-neutral dropdown-content rounded-box shadow">
                        <label htmlFor=""></label>
                        <div className="form-control">
                            <label className="label cursor-pointer flex flex-row-reverse gap-2">
                                <span className="label-text">Recevoir les notifications ?</span>
                                <input checked={notifications?.receiveNotifications} onChange={handleToggleReceiveNotifications} className="checkbox checkbox-accent" type="checkbox" />
                            </label>
                        </div>
                    </ul>
                </div>
            </header>
        </section>
    )
}

export default NotificationsScreen;