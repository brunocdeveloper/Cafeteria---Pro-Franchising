const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/api');
const { getConnection } = require('./connectionMock');

describe('Get api/stock', async () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await MongoClient.connect.restore();
  });
  
  describe('Quando a rota não tem autorização JWT', () => {
    let response;

    before(async () => {
      response = await chai.request(app).get('/stock')
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

  describe('Quando a rota retorna com sucesso', () => {
    let token;
    let response;

    before(async () => {
      await chai.request(app).post('/user')
      .send({
        "name": "Bruno",
        "email": "bruno@adm.com",
        "password": "123456"
      });
  
      token = await chai.request(app).post('/login')
        .send({
        "email": "bruno@adm.com",
        "password": "123456"
        }).then((res) => res.body.token);
      
      await connectionMock.db('CoffeShop')
      .collection('ingredients')
      .insertMany([
        {
          name: "Leite",
          quantity: 8000,
          measure: "ML",
          cost: {
            price: 4.52,
            measurement: 1000,
            size: "ML"
          }
        },
        {
          name: "Queijo minas",
          quantity: 2600,
          measure: "Gramas",
          cost: {
            price: 15.50,
            measurement: 500,
            size: "Gramas"
          }
        },
      ]);

      response = await chai.request(app).get('/stock')
        .set('authorization', token);
    });

    it('Retorna o código de status "200"', () => {
      expect(response).to.have.status(200);
    });
    
    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto possui a propriedade "ingredientInfos"', () => {
      expect(response.body).to.have.property('ingredientInfos');
    });
  });
});

