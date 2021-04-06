import request from 'supertest'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import { app } from '@shared/infra/http/app'

import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm'

let connection: Connection

describe('Create Category Controller', () => {
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
  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@rentx.com',
        password: 'admin'
      })

    const { refresh_token } = responseToken.body

    const response = await request(app).post('/categories').send({
      name: "Category supertest",
      description: "Category supertest"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })

    expect(response.status).toBe(201)
  })
  it('should not be able to create a new category with same name exists', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@rentx.com',
        password: 'admin'
      })

    const { refresh_token } = responseToken.body

    const response = await request(app).post('/categories').send({
      name: "Category new supertest",
      description: "Category new supertest"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })

    expect(response.status).toBe(401)
  })
})
