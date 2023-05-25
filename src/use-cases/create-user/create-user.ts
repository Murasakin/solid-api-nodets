import { User } from '../../entities/user';
import { EmailProvider } from '../../provider/email-provider';
import { UsersRepository } from '../../repositories/users-repository';
import { CreateUserCommand } from './create-user.command';

export class CreateUser {
  constructor(private usersRepository: UsersRepository, private emailProvider: EmailProvider) {}

  async execute(command: CreateUserCommand) {
    const userAlreadyExists = await this.usersRepository.findByEmail(command.email);

    if (userAlreadyExists) {
      throw new Error(`User with email ${command.email} already exists!`);
    }

    const user = new User(command);

    await this.usersRepository.save(user);

    this.emailProvider.sendMail({
      to: {
        name: command.name,
        email: command.email,
      },
      from: {
        name: 'Equipe do meu App',
        email: 'no-reply@meuapp.com',
      },
      subject: 'Seja bem-vindo ao meu App',
      body: '<p>Você já pode fazer login no meu App!</p>',
    });
  }
}
