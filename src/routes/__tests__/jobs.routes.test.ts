import request from 'supertest'
import app from '../../server'
import { port } from '../../server'

describe('Test /jobs route', () => {
    let jobId = 0
    test('It should add a new job and response with the job added', done => {
        request(`http://localhost:${port}`)
            .post('/jobs')
            .send({
                role: 'Game Designer',
                company: 'https://wwww.teste.com.br',
                companyWebsite: 'https://wwww.teste.com.br/',
                companyEmail: 'contact@teste.com.br',
                contactEmail: 'jobs@teste.com.br',
                description: 'Teste',
                applicationUrl: 'https://wwww.teste.com.br/jobs',
                paymentStatus: '',
                expirationDate: '2020-12-20',
                createdAt: '2020-11-20'
            })
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('success')
                expect(response.body.success).toHaveProperty('id')
                jobId = response.body.success.id
                done()
            })
    })

    test('It should return an error if has invalid properties', done => {
        request(`http://localhost:${port}`)
            .post('/jobs')
            .send({ role: 'teste' })
            .then(response => {
                expect(response.status).toBe(422)
                expect(response.body).toHaveProperty('error')
                expect(response.body.error).toHaveProperty('message')
                done()
            })
    })

    test('It should return job of desired ID', done => {
        request(`http://localhost:${port}`)
            .get(`/jobs/${jobId}`)
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('success')
                expect(response.body.success).toHaveProperty('role')
                done()
            })
    })

    test('It should return all jobs', done => {
        request(`http://localhost:${port}`)
            .get('/jobs')
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('success')
                expect(response.body.success).toHaveProperty('jobs')
                done()
            })
    })

    test("It should return error if job doesn't exists", done => {
        request(`http://localhost:${port}`)
            .get('/jobs/9999999')
            .then(response => {
                expect(response.status).toBe(404)
                expect(response.body).toHaveProperty('error')
                expect(response.body.error).toHaveProperty('message')
                done()
            })
    })
})
