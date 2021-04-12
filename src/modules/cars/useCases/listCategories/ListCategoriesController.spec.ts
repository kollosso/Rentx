import request from 'supertest'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import { app } from '@shared/infra/http/app'

import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm'

let connection: Connection

describe('List Category Controller', () => {
  beforeAll(async () => {
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

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })
  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin'
    })

    const { refresh_token } = responseToken.body

    await request(app).post('/categories').send({
      name: "Category 01",
      description: "Category 01"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })

    const response = await request(app).get('/categories')
    console.log(response.body)

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toEqual('Category 01')
  })
})
