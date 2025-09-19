import { QRCodeCanvas } from "qrcode.react";

export default function RSVPQRCode() {
  const url = "https://your-rsvp-app.vercel.app"; // replace with deployed URL

  return (
    <div className="container">
      <div className="card">
        <h2 className="heading">Scan to RSVP 📱</h2>
        <QRCodeCanvas value={url} size={200} />
      </div>
    </div>
  );
}
