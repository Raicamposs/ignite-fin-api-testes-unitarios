
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { CreateUserError } from './CreateUserError'
import { CreateUserUseCase } from './CreateUserUseCase'
import { ICreateUserDTO } from './ICreateUserDTO'

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase
  let service: IUsersRepository

  beforeEach(async () => {
    service = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(service)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(createUserUseCase).toBeDefined()
  })


  it('Should be able to create a new user', async () => {
    const user: ICreateUserDTO = {
      name: 'User test',
      email: 'teste@email.com',
      password: 'password',
    }

    const userCreated = await createUserUseCase.execute(user)

    expect(userCreated).toHaveProperty('id')
    expect(userCreated).toHaveProperty('password')
    expect(userCreated.password).not.toEqual('password')

  })

  it('Should not be able to create a user when an email for merchant ID already exists', async () => {

    const user: ICreateUserDTO = {
      name: 'User test',
      email: 'teste@email.com',
      password: 'password',

    }

    const newUser: ICreateUserDTO = {
      name: 'User test',
      email: 'teste@email.com',
      password: 'password',

    }

    expect(async () => {
      await createUserUseCase.execute(user)
      await createUserUseCase.execute(newUser)
    }).rejects.toBeInstanceOf(CreateUserError)
  })
})
