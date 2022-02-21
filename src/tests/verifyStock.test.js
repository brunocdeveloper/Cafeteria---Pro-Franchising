const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/api');

describe('Get api/inventory', async () => {
  let response;
  let token;
  const DBServer = new MongoMemoryServer();

  describe('Quando a rota não tem autorização JWT', () => {
    before(async () => {
      const URLMock = await DBServer.getUri();
  
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
  
      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
      
      response = await chai.request(app).get('/inventory')
        .send({ name: 'Café' });
    });

    after(async () => {
      MongoClient.connect.restore();
    });


    it('Retorna o código de status "401"', () => {
      expect(response).to.have.status(401);
    });
    
    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Retorna o texto "Unauthorized. Missing token validation"', () => {
      expect(response.body.message)
        .to.be.equal("Unauthorized. Missing token validation");
    });
  });
});

