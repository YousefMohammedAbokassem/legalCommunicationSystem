import Echo from "laravel-echo";
import Pusher from "pusher-js"; // استيراد مكتبة Pusher

window.Pusher = Pusher; // تأكد من إضافة Pusher إلى نافذة المتصفح

const echo = new Echo({
  broadcaster: "pusher",
  key: "7e221c9a276e6d97951f",
  cluster: "mt1",
  forceTLS: true,
  authEndpoint: "http://osamanaser806-32078.portmap.io:32078/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`, // استخدم التوكن الخاص بك
    },
  },
});

export default echo;
