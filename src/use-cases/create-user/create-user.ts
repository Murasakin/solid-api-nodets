import { User } from '../../entities/user';
import { UsersRepository } from '../../repositories/users-repository';
import { CreateUserCommand } from './create-user.command';

export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(command: CreateUserCommand) {
    const userAlreadyExists = await this.usersRepository.findByEmail(command.email);

    if (userAlreadyExists) {
      throw new Error(`User with email ${command.email} already exists!`);
    }

    const user = new User(command);

    await this.usersRepository.save(user);
  }
}
