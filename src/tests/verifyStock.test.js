const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/api');
const { getConnection } = require('./connectionMock');

describe('Get api/inventory', async () => {
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


  describe('Quando a rota não permite venda', () => {
    let response;
    let token;

    before(async () => {
      const productCollection = connectionMock.db('CoffeShop')
      .collection('products');
    
    await productCollection.insertOne({
      name: "Café",
      image: '',
      price: 2.50,
      ingredients: [
        {
          name: "Pó de café",
          measure: "Gramas",
          quantity: 30,
        },
      ]
    });

    const ingredientsCollection =  connectionMock.db('CoffeShop')
      .collection('ingredients');
    
      await ingredientsCollection.insertOne(
        {
          name: "Pó de café",
          quantity: 15,
          measure: "Gramas",
          cost: {
            price: 34.90,
            measurement: 500,
            size: "Gramas"
          }
        }
      );

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

      response = await chai.request(app).get('/inventory')
        .send({ name: 'Café' })
        .set('authorization', token);
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

    it('Retorna o texto "Unauthorized. Missing product:"', () => {
      expect(response.body.message)
        .to.include("Unauthorized. Missing product:");
    });
  });

  describe('Quando a rota valida com sucesso', () => {
    let response;
    let token;

    before(async () => {
      const productCollection = connectionMock.db('CoffeShop')
        .collection('products');
      
      await productCollection.insertOne({
        name: "Café",
        image: '',
        price: 2.50,
        ingredients: [
          {
            name: "Pó de café",
            measure: "Gramas",
            quantity: 30,
          },
        ]
      });

      const ingredientsCollection =  connectionMock.db('CoffeShop')
        .collection('ingredients');
      
        await ingredientsCollection.insertOne(
          {
            name: "Pó de café",
            quantity: 30,
            measure: "Gramas",
            cost: {
              price: 34.90,
              measurement: 500,
              size: "Gramas"
            }
          }
        );

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

      response = await chai.request(app).get('/inventory')
        .send({ name: 'Café' })
        .set('authorization', token);
    });

  
    it('Retorna o código de status "200"', () => {
      expect(response).to.have.status(200);
    });
    
    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Retorna o texto "Unauthorized. Missing token validation"', () => {
      expect(response.body.message)
        .to.be.equal("Ok");
    });
  });
});

