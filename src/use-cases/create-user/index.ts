import { MailTrapEmailProvider } from '../../provider/implementations/mailtrap-email-provider';
import { InMemoryUsersRepository } from '../../repositories/implementations/in-memory-users-repository';
import { CreateUser } from './create-user';
import { CreateUserController } from './create-user.controller';

const mailtrapMailProvider = new MailTrapEmailProvider();
const inMemoryUsersRepository = new InMemoryUsersRepository();

const createUser = new CreateUser(inMemoryUsersRepository, mailtrapMailProvider);

const createUserController = new CreateUserController(createUser);

export { createUser, createUserController };
