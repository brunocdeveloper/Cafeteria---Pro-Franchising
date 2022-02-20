const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/api');

describe('Post api/user', async () => {
  let response;
  const DBServer = new MongoMemoryServer();
  
  before(async () => {
    const URLMock = await DBServer.getUri();

    const connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);

    response = await chai.request(app).post('/user')
      .send({
        "name": "Bruno",
        "email": "newuser@adm.com",
        "password": "123456"
      });
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quanto usuário é criado com sucesso', () => {
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
