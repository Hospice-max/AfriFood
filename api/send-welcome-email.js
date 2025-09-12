import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Bienvenue à AfriFood Newsletter',
    html: `
      <h2>Bienvenue chez AfriFood !</h2>
      <p>Merci de vous être inscrit à notre newsletter.</p>
      <p>Vous recevrez nos dernières recettes et actualités culinaires africaines.</p>
      <p>L'équipe AfriFood</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email envoyé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur envoi email' });
  }
}