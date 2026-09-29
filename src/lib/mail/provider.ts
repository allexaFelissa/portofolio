export interface MailMessage { name: string; email: string; subject: string; message: string; }
export interface MailProvider { send(message: MailMessage): Promise<void>; }
export class ResendProvider implements MailProvider {
  constructor(private apiKey = process.env.MAIL_API_KEY) {}
  async send(message: MailMessage): Promise<void> { if (!this.apiKey) throw new Error("Mail provider is not configured."); const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { authorization: `Bearer ${this.apiKey}`, "content-type": "application/json" }, body: JSON.stringify({ from: process.env.MAIL_FROM ?? "Portfolio <onboarding@resend.dev>", to: [process.env.MAIL_TO ?? "allexandrafelissa@gmail.com"], reply_to: message.email, subject: `[Portfolio] ${message.subject}`, text: `From: ${message.name} <${message.email}>\n\n${message.message}` }) }); if (!response.ok) throw new Error("Mail provider failed."); }
}
