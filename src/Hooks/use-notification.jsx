import { useCallback, useState } from "react";
import Notification from "../Component/Notification/notification";
import '../Component/Notification/notification.css'
const useNotification = (position="top-right") => {
  const [notification, setNotification] = useState(null);

  let timer;
  const TriggerNotification = useCallback((notificationProps) => {
    clearTimeout(timer);
    setNotification(notificationProps);
    timer = setTimeout(() => {
      setNotification(null);
    }, notificationProps.duration);
  }, []);

  const closeNotification = ()=>{
    clearTimeout(timer);
    setNotification(null);
  }
  const NotificationComponent = notification ? (
    <div className="notification-container">
      
      <Notification {...notification} onClose={closeNotification} />
    </div>
  ) : null

  return { NotificationComponent, TriggerNotification };
};

export default useNotification;
