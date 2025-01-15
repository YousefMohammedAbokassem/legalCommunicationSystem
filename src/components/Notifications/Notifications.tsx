import React, { useEffect, useState } from "react";
import echo from "../../services/echo";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // الاستماع إلى القناة العامة أو الخاصة
    echo
      .channel("notifications") // استبدل باسم القناة
      .listen("NotificationSent", (data) => {
        console.log("Notification received:", data);
        setNotifications((prev) => [...prev, data.message]);
      });

    // تنظيف الاتصال عند التفكيك
    return () => {
      echo.leaveChannel("notifications");
    };
  }, []);
  
  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
