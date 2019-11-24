const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const faker = require('faker');

const should = chai.should();

chai.use(chaiHttp);

describe('AUTHENTICATION', function () {
    describe('/register', function () {
        const body = {
            firstname: faker.name.firstname,
            lastname: faker.name.lastname,
            email: faker.internet.email,
            password: faker.internet.password,
            gender: "female",
            avatar: faker.random.image,
            device_name: faker.lorem.word,
            device_id: faker.random.uuid
        }
        it("Should be statusCode: 201", done => {
            console.log(server)
            chai.request(server)
                .post('/v1/register')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log("Response Body: ", res.statusCode)
                })
            done()
        })
    })
})