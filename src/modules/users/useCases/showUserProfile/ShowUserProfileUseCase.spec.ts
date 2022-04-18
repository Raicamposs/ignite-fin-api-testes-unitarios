
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ShowUserProfileError } from './ShowUserProfileError'
import { ShowUserProfileUseCase } from './ShowUserProfileUseCase'


describe('AuthenticateUserUseCase', () => {
  let useCase: ShowUserProfileUseCase
  let service: IUsersRepository
  let userCreated: any

  beforeEach(async () => {
    service = new InMemoryUsersRepository()
    userCreated = await service.create({
      email: 'teste@email.com',
      password: await hash('password', 8),
      name: 'any',
    })

    useCase = new ShowUserProfileUseCase(service)

  })


  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(userCreated).toBeDefined()
    expect(useCase).toBeDefined()
  })


  it('Should authenticate session', async () => {

    const user = await useCase.execute(userCreated.id)


    expect(user).toBeDefined()

    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('password')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('id')

    expect(user?.email).toEqual(userCreated.email)
    expect(user?.id).toEqual(userCreated.id)
  })

  it('Should not authenticate session', async () => {
    expect(async () => {
      await useCase.execute('any')
    }).rejects.toBeInstanceOf(ShowUserProfileError)
  })
})
