import NotificationCard from "@components/cards/notification.card";
import NotificationRequest from "@stores/notifications/notification.request";
import { GetNotificationsDto } from "@stores/user/user.model";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCallback, useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";

dayjs.locale('fr')
dayjs.extend(relativeTime)

const NotificationsScreen = () => {
    const [notifications, setNotifications] = useState<GetNotificationsDto[]>([])
    const [notificationsParam, setNotificationsParam] = useState({ receiveNotifications: false })

    const fetchNotifications = useCallback(() => {
        NotificationRequest.getNotifications().then(setNotifications);
    }, []);

    useEffect(() => {
        document.title = `Pixel Wave | Notifications`;
        fetchNotifications();
        NotificationRequest.check().then((x) => setNotificationsParam({ ...notificationsParam, receiveNotifications: x }))
    }, [fetchNotifications, notificationsParam]);

    const handleToggleReceiveNotifications = () => {
        NotificationRequest.toggleReceiveNotifications({ receiveNotifications: !notificationsParam?.receiveNotifications })
            .then((x) => {
                setNotificationsParam({ ...notificationsParam, receiveNotifications: x })
            })
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
                                <input checked={notificationsParam?.receiveNotifications} onChange={handleToggleReceiveNotifications} className="checkbox checkbox-accent" type="checkbox" />
                            </label>
                        </div>
                    </ul>
                </div>
            </header>
            <div className="pt-2"></div>
            {notifications.map((x) => (
                <NotificationCard key={x.destinationId} notification={x} />
            ))}
        </section>
    )
}

export default NotificationsScreen;