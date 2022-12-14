const request = require('supertest')
const app = require('./server')
const jwt = require("jsonwebtoken");

let token
let firstIncomeId

describe('Income Api Testing', () => {
    test('Login', async () => {
        const res = await request(app).post('/api/login').send({
            email: "xxx@gmail.com",
            password: "12345678"
        })
        expect(res.statusCode).toBe(200)
        token = res.body.data.token
    })

    test('Add Income', async () => {
        const decoded = jwt.verify(token, process.env.TOKEN_CODE)
        const res = await request(app).post('/api/income')
        .set('Authorization', `Bearer ${token}`).send({
            user_id: decoded.id,
            nama_pemasukan: "Kalung",
            deskripsi: "Bahan bahan terbaik",
            harga: 100000
        })
        expect(res.statusCode).toBe(200)
    })

    test('List Income', async () => {
        const res = await request(app).get('/api/income')
        .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        firstIncomeId = res.body.data[0].id
    })

    test('Update Income', async () => {
        const res = await request(app).put(`/api/income/${firstIncomeId}`)
        .set('Authorization', `Bearer ${token}`).send({
            nama_pemasukan: "Topit",
            deskripsi: "Bahan bahan terbaiks",
            harga: 700000
        })
        expect(res.statusCode).toBe(200)
    })

    test('Delete Income', async () => {
        const res = await request(app).delete(`/api/income/${firstIncomeId}`)
        .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})