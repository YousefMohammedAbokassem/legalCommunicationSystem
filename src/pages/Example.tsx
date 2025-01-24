import { useEffect } from "react";
import Pusher from "pusher-js";

const usePusher = () => {
  useEffect(() => {
    // استرجاع الـ token من الـ localStorage
    let accessToken = localStorage.getItem("access_token");

    // إذا كان هناك token قم باضافته في التوثيق (إذا كانت هذه هي حاجتك)
    console.log("Access Token:", accessToken);

    // إعداد Pusher
    let pusher = new Pusher("7e221c9a276e6d97951f", {
      cluster: "mt1",
      forceTLS: true,
      // إضافة الـ token للتوثيق (إذا كنت بحاجة إليه)
      auth: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    // التحقق من الاتصال بـ Pusher
    pusher.connection.bind("connected", () => {
      console.log("Connected to Pusher!");
    });

    pusher.connection.bind("error", (err) => {
      console.error("Pusher connection error:", err);
    });

    // الاشتراك في القنوات مباشرة بدون متغيرات
    pusher.subscribe("'conversation_76").bind("message.sent", (data) => {
      console.log("New message received from message.sent channel: ", data);
      alert(`New message: ${data.content}`); // يمكن إضافة رسالة منبثقة للاختبار
    });

    pusher
      .subscribe("send.notification.from.user.to.lawyer")
      .bind("new_notification", (data) => {
        console.log("New notification from user to lawyer: ", data);
      });

    pusher
      .subscribe("send.notification.from.representative.to.lawyer")
      .bind("new_notification", (data) => {
        console.log("New notification from representative to lawyer: ", data);
      });

    pusher
      .subscribe("send.notification.from.representative.to.user")
      .bind("new_notification", (data) => {
        console.log("New notification from representative to user: ", data);
      });

    pusher
      .subscribe("send.notification.from.lawyer.to.representative")
      .bind("new_notification", (data) => {
        console.log("New notification from lawyer to representative: ", data);
      });

    pusher
      .subscribe("send.notification.from.lawyer.to.user")
      .bind("new_notification", (data) => {
        console.log("New notification from lawyer to user: ", data);
      });

    // تنظيف عند مغادرة المكون
    return () => {
      pusher.unsubscribe("message.sent");
      pusher.unsubscribe("send.notification.from.user.to.lawyer");
      pusher.unsubscribe("send.notification.from.representative.to.lawyer");
      pusher.unsubscribe("send.notification.from.representative.to.user");
      pusher.unsubscribe("send.notification.from.lawyer.to.representative");
      pusher.unsubscribe("send.notification.from.lawyer.to.user");
    };
  }, []);

  return <div>Listening for messages...</div>;
};

export default usePusher;
