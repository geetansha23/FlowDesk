function WhatsappButton({ lead }) {
  const sendWhatsapp = () => {
    const text = `Hello ${lead.fullName}, your application status has been updated.`;

    window.open(
      `https://wa.me/${lead.phoneNumber}?text=${encodeURIComponent(text)}`
    );
  };

  return (
    <button onClick={sendWhatsapp}>
      WhatsApp
    </button>
  );
}

export default WhatsappButton;