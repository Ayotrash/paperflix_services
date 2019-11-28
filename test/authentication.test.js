const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

const apiUrl = 'http://localhost:8080';

describe('AUTHENTICATION SERVICES', function () {
    describe('/register', function () {

        const body = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: "123",
            gender: "female",
            avatar: faker.system.fileName(),
            device_name: "Iphone X",
            device_id: "122212"
        }

        context('Test endpoints.', function () {
            it('Should be statusCode: 201', done => {
                let response;
                chai.request(apiUrl)
                    .post('/v1/register')
                    .send(body)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        response = res.body
                    })

                done();
            })
        })

    })
})