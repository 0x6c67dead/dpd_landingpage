"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export async function sendContactEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  const website = formData.get("website") as string;
  const middleName = formData.get("middleName") as string;
  if (website || middleName) return;

  if (!email || !name || !message) return;

  const safeMessage = message
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

  await sleep(random(800, 2000))

  await resend.emails.send({
  from: "Contato DPD <contato@dancandopordentro.com.br>",
  to: String(process.env.RESEND_TO),
  replyTo: email,
  subject: `📩 Novo contato de ${name}`,
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto;">
      
      <h1 style="font-size: 24px; margin-bottom: 24px;">
        Novo contato recebido pelo site
      </h1>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0 0 12px;">
          <strong>Nome:</strong><br />
          ${name}
        </p>

        <p style="margin: 0 0 12px;">
          <strong>Email:</strong><br />
          ${email}
        </p>
      </div>

      <div>
        <h2 style="font-size: 18px; margin-bottom: 12px;">
          Mensagem
        </h2>

        <div style="background: #fafafa; border-left: 4px solid #000; padding: 16px; border-radius: 4px; white-space: pre-wrap;">
          ${safeMessage}
        </div>
      </div>

      <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />

      <p style="font-size: 12px; color: #666;">
        Esta mensagem foi enviada através do formulário de contato do site.
      </p>
    </div>
  `
});
}