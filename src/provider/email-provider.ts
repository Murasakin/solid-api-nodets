export type EmailAddress = {
  name: string;
  email: string;
};

export type EmailMessage = {
  to: EmailAddress;
  from: EmailAddress;
  subject: string;
  body: string;
};

export interface EmailProvider {
  sendMail(message: EmailMessage): Promise<void>;
}
