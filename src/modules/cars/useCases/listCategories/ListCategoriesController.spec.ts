import request from 'supertest'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import { app } from '@shared/infra/http/app'

import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm'

let connection: Connection

describe('List Category Controller', () => {
  beforeEach(async () => {
    connection = await createConnection()

    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash('admin', 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", "createdAt", "driverLicense" )
        values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXX')
      `
    )
  })

  afterEach(async () => {
    await connection.dropDatabase()
    await connection.close()
  })
  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/session')
      .send({
        email: 'admin@rentx.com',
        password: 'admin'
      })

    const { token } = responseToken.body
    console.log(token)
    await request(app).post('/categories').send({
      name: "List all category",
      description: "List all category"
    }).set({
      Authorization: `Bearer ${token}`
    })

    const response = await request(app).get('/categories')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toEqual('List all category')
  })
})
