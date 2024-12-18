import { useCallback, useState } from "react";

import "../Component/Notification/notification.css";
import Notification from "../Component/Notification/notification";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const TriggerNotification = useCallback(
    (notificationProps) => {
      const id = Date.now(); // Unique ID for the notification
      const newNotification = { id, ...notificationProps };

      setNotifications((prev) => [newNotification, ...prev]);

      // Auto-remove notification after the specified duration
      setTimeout(() => {
        removeNotification(id);
      }, notificationProps.duration);
    },
    [removeNotification]
  );

  const NotificationComponent = (
    <div className=" notification-container">
      {notifications.map((notif) => (
        <Notification
          key={notif.id}
          {...notif}
          onClose={() => removeNotification(notif.id)}
        />
      ))}
    </div>
  );

  return { NotificationComponent, TriggerNotification };
};

export default useNotification;
