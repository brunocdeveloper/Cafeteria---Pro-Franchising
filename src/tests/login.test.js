const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/api');
const { getConnection } = require('./connectionMock');

describe('Post api/login', async () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await MongoClient.connect.restore();
  });

  describe('Quando o login é feito com sucesso', () => {
    let response;

    before(async () => {
      await chai.request(app).post('/user')
      .send({
        "name": "Bruno",
        "email": "bruno@adm.com",
        "password": "123456"
      });
      
      response = await chai.request(app).post('/login')
        .send({
          "email": "bruno@adm.com",
          "password": "123456"
        });
    });

    it('Retorna o código de status "200"', () => {
      expect(response).to.have.status(200);
    });
    
    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    })
  });

  describe('Quando o login não é feito com sucesso', () => {
    let response;
    
    before(async () => {
      response = await chai.request(app).post('/login')
        .send({
        "email": "brno@adm.com",
        "password": "123456"
        });
    });

    it('Retorna o código de status "401"', () => {
      expect(response).to.have.status(401);
    });
    
    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto possui a propriedade "token"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Retorna o texto "Conflict. user already exists"', () => {
      expect(response.body.message)
        .to.be.equal("Incorrect email or inexistent");
    });
  });
});

