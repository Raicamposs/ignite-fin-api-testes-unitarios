
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { IncorrectEmailOrPasswordError } from './IncorrectEmailOrPasswordError'

describe('AuthenticateUserUseCase', () => {
  let useCase: AuthenticateUserUseCase
  let service: IUsersRepository
  let userCreated: any

  beforeEach(async () => {
    service = new InMemoryUsersRepository()
    userCreated = await service.create({
      email: 'teste@email.com',
      password: await hash('password', 8),
      name: 'any',
    })

    useCase = new AuthenticateUserUseCase(service)

  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(userCreated).toBeDefined()
    expect(useCase).toBeDefined()
  })


  it('Should authenticate session', async () => {

    const auth = await useCase.execute({
      email: userCreated.email,
      password: 'password',
    })

    expect(auth).toHaveProperty('user')
    expect(auth).toHaveProperty('token')
  })

  it('Should not authenticate session', async () => {
    expect(async () => {
      await useCase.execute({
        email: userCreated.email,
        password: 'any',
      })
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  })
})
