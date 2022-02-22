const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/api');
const { getConnection } = require('./connectionMock');

describe('Get api/report/product', async () => {
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
    response = await chai.request(app).get('/report/')
      .send({ name: 'Pão de queijo' });
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
  });

  describe('Quando retorna o produto e preço', () => {
    let response;
    let token;

    before(async () => {
      const productCollection = connectionMock.db('CoffeShop')
        .collection('products');

      await productCollection.insertMany([
        {
          name: "Pão de queijo",
          image: '',
          price: 9.00,
          ingredients: [
            {
              name: "Queijo minas",
              measure: "Gramas",
              quantity: 150,
            },
            {
              name: "Leite",
              measure: "ML",
              quantity: 200,
            },
          ]
        },
      ]);

      const ingredientsCollection =  connectionMock.db('CoffeShop')
        .collection('ingredients');
    
      await ingredientsCollection.insertMany(
        [ 
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
        ]
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

      response = await chai.request(app).get('/report/product')
        .send({ name: 'Café' })
        .set('authorization', token);
    });

    it('Retorna o código de status "200"', () => {
      expect(response).to.have.status(200);
    });
    
    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
  });
});

