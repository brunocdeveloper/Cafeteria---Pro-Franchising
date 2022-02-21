const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/api');
const { getConnection } = require('./connectionMock');

describe('Post api/user', async () => {
  let connectionMock;
  let response;
  
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await MongoClient.connect.restore();
  });

  describe('Quanto usuário é criado com sucesso', () => {
    before(async () => {
      response = await chai.request(app).post('/user')
      .send({
        "name": "Bruno",
        "email": "newuser@adm.com",
        "password": "123456"
      });
    });

    it('Retorna o código de status 200', () => {
      expect(response).to.have.status(201);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('Retorna todas as informações de criação', () => {
      const objectResponse = { _id: true, name: true, email: true };
      expect(response.body.user).to.have.all.keys(objectResponse);
    });
  });

  describe('Quando o usuário já existe', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/user')
        .send({
          "name": "Bruno",
          "email": "newuser@adm.com",
          "password": "123456"
        });
    });

    it('Verifica se possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('Retorna o texto "Conflict. user already exists"', () => {
      expect(response.body.message)
        .to.be.equal('Conflict. user already exists');
    });
  });
});
