import { OperationType } from "../entities/Statement"
import { ICreateStatementDTO } from "../useCases/createStatement/ICreateStatementDTO"
import { InMemoryStatementsRepository } from "./in-memory/InMemoryStatementsRepository"
import { IStatementsRepository } from "./IStatementsRepository"


describe('UsersService', () => {
  let service: IStatementsRepository

  beforeEach(async () => {
    service = new InMemoryStatementsRepository()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('Should create a new Statement', async () => {

    const data: ICreateStatementDTO = {
      user_id: "any",
      description: "any",
      amount: 150,
      type: OperationType.DEPOSIT
    }

    const auth = await service.create(data)

    expect(auth).toBeDefined()

    expect(auth).toHaveProperty('id')
    expect(auth).toHaveProperty('user_id')
    expect(auth).toHaveProperty('description')
    expect(auth).toHaveProperty('amount')
    expect(auth).toHaveProperty('type')
  })


  it('Should get user balance', async () => {

    let result: any = await service.getUserBalance({
      user_id: "any",
      with_statement: false
    })

    expect(result).toHaveProperty('balance')
    expect(result).not.toHaveProperty('statement')

    expect(result.balance).toBeDefined()
    expect(result.statement).not.toBeDefined()

    result = await service.getUserBalance({
      user_id: "any",
      with_statement: true
    })

    expect(result).toHaveProperty('balance')
    expect(result).toHaveProperty('statement')

    expect(result.balance).toBeDefined()
    expect(result.statement).toBeDefined()
  })

  it('Should find statement by operation', async () => {
    const statement: any = await service.create({
      user_id: "any",
      description: "any",
      amount: 100,
      type: OperationType.WITHDRAW
    })

    expect(statement).toBeDefined()

    const statementOperation: any = await service.findStatementOperation({
      statement_id: statement.id!,
      user_id: statement.user_id,
    })

    expect(statementOperation).toBeDefined()


    Object.keys(statement).forEach((key: string) => {
      expect(statementOperation).toHaveProperty(key)
      expect(statement[`${key}`]).toEqual(statementOperation[`${key}`])
    });
  })


})

