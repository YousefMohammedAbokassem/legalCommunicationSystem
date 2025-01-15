import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// إعداد Pusher
Pusher.logToConsole = true; // يُستخدم فقط للتصحيح، قم بإزالته في الإنتاج.

const echo = new Echo({
  broadcaster: 'pusher',
  key: '7e221c9a276e6d97951f', // استبدل بـ PUSHER_APP_KEY
  cluster: 'mt', // استبدل بـ PUSHER_APP_CLUSTER
  forceTLS: true, // لتفعيل HTTPS
});

export default echo;
