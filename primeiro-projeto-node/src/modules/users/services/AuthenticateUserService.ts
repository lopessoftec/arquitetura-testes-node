import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
    ){}

  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // user.password - Senha criptografada
    // password - senha não-criptografada

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    //primeiro é payload colocamos informações que não iremos precisar muito e não são tão importante, ate permissões do usuario
    //segundo parametro é a chave secrete, podemos e no site do d5 e pegar uma hash de uma string
    //terceiro parametro é as configurações do token
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    //Usuario autenticado

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
