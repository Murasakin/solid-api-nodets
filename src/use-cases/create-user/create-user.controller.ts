import { Request, Response } from 'express';
import { CreateUser } from './create-user';

export class CreateUserController {
  constructor(private createUser: CreateUser) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      await this.createUser.execute({ name, email, password });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'An unexprected error occurred!',
      });
    }
  }
}
