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
            firstname: "Ridwan",
            lastname: "Aditya",
            email: "muhammadfuaditrockz@gmail.com",
            password: "123",
            gender: "female",
            avatar: "HEleh.jpg",
            device_name: "Iphone X",
            device_id: "122212"
        }

        it('Should be statusCode: 201', done => {
            chai.request(apiUrl)
                .post('/v1/register')
                .send(body)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    console.log("Response: ", res.body)
                })
            done();
        })
    })
})