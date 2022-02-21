const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/api');
const { getConnection } = require('./connectionMock');

describe('Get api/inventory', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  })

  after(async () => {
    await MongoClient.connect.restore();
  });


  describe('Quando a rota não tem autorização JWT', () => {
    let response;

    before(async () => {
    response = await chai.request(app).get('/inventory')
      .send({ name: 'Café' });
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

