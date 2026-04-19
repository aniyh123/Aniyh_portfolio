import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Vérifier que c'est une requête POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { pseudo, email, whatsapp, message } = req.body;

  // Validation
  if (!pseudo || !email || !whatsapp || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    // 1. Email à TOI (le propriétaire)
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [process.env.DESTINATION_EMAIL || process.env.EMAIL_USER],
      subject: `📬 Nouveau message de ${pseudo}`,
      html: `
        <h2>Nouveau message de ${pseudo}</h2>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>WhatsApp :</strong> ${whatsapp}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `
    });

    // 2. Email au VISITEUR (accusé de réception)
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [email],
      subject: '✅ Votre message a bien été reçu',
      html: `
        <h2>Bonjour ${pseudo} !</h2>
        <p>Merci pour votre message. Je vous répondrai dans les 24h.</p>
        <p>Cordialement,<br>Votre développeuse</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi' });
  }
}