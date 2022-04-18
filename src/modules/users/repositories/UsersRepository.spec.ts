import { InMemoryUsersRepository } from "./in-memory/InMemoryUsersRepository"
import { IUsersRepository } from "./IUsersRepository"


describe('UsersService', () => {
  let service: IUsersRepository

  beforeEach(async () => {
    service = new InMemoryUsersRepository()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('Should create a new user', async () => {
    const auth = await service.create({
      email: 'teste1@email.com',
      password: 'any_password',
      name: 'any_name',
    })

    expect(auth).toBeDefined()

    expect(auth).toHaveProperty('email')
    expect(auth).toHaveProperty('password')
    expect(auth).toHaveProperty('name')
    expect(auth).toHaveProperty('id')
  })

  it('Should find By Email', async () => {
    const auth = await service.create({
      email: 'teste2@email.com',
      password: 'any_password',
      name: 'any_name',
    })

    expect(auth).toBeDefined()

    const user = await service.findByEmail('teste2@email.com')


    expect(user).toBeDefined()

    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('password')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('id')

    expect(user?.email).toEqual(auth.email)
    expect(user?.id).toEqual(auth.id)
  })

  it('Should find By Id', async () => {
    const auth = await service.create({
      email: 'teste2@email.com',
      password: 'any_password',
      name: 'any_name',
    })

    expect(auth).toBeDefined()

    const user = await service.findById(auth.id!)

    expect(user).toBeDefined()

    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('password')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('id')

    expect(user?.email).toEqual(auth.email)
    expect(user?.id).toEqual(auth.id)
  })


})
