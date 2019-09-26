process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/app');
const knex = require('../src/db/connection');

<<<<<<< HEAD
describe('Lists API Routes', () => {
=======
<<<<<<< HEAD:services/items/tests/routes.lists.test.js
describe('Items API Routes', () => {
=======
describe('Lists API Routes', () => {
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056:services/lists/tests/routes.lists.test.js
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

<<<<<<< HEAD
=======
<<<<<<< HEAD:services/items/tests/routes.lists.test.js
  describe('GET /items/ping', () => {
    it('should return "pong"', () => {
      chai.request(server)
      .get('/items/ping')
=======
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056
  describe('GET /lists/ping', () => {
    it('should return "pong"', () => {
      chai.request(server)
      .get('/lists/ping')
<<<<<<< HEAD
=======
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056:services/lists/tests/routes.lists.test.js
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056
      .end((err, res) => {
        res.type.should.eql('text/html');
        res.text.should.eql('pong');
      });
    });
  });

<<<<<<< HEAD
=======
<<<<<<< HEAD:services/items/tests/routes.lists.test.js
  describe('GET /items/user', () => {
    it('should return saved items', () => {
      chai.request(server)
      .get('/items/user')
=======
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056
  describe('GET /lists/user', () => {
    it('should return saved lists', () => {
      chai.request(server)
      .get('/lists/user')
<<<<<<< HEAD
=======
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056:services/lists/tests/routes.lists.test.js
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056
      .set('authorization', `Bearer foobar`)
      .end((err, res) => {
        res.type.should.equal('application/json');
        res.body.status.should.equal('success');
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(1);
        res.body.data[0].should.have.property('user_id');
        res.body.data[0].should.have.property('title');
        res.body.data[0].should.have.property('created_at');
      });
    });
  });

<<<<<<< HEAD
=======
<<<<<<< HEAD:services/items/tests/routes.lists.test.js
  describe('POST /items', () => {
    it('should create a new item', () => {
      chai.request(server)
      .post('/items')
=======
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056
  describe('POST /lists', () => {
    it('should create a new list', () => {
      chai.request(server)
      .post('/lists')
<<<<<<< HEAD
=======
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056:services/lists/tests/routes.lists.test.js
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056
      .set('authorization', `Bearer foobar`)
      .send({ title: 'groceries' })
      .end((err, res) => {
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('object');
        res.body.status.should.equal('success');
<<<<<<< HEAD
        res.body.data.should.equal('List Added!');
        chai.request(server)
        .get('/lists/user')
=======
<<<<<<< HEAD:services/items/tests/routes.lists.test.js
        res.body.data.should.equal('Item Added!');
        chai.request(server)
        .get('/items/user')
=======
        res.body.data.should.equal('List Added!');
        chai.request(server)
        .get('/lists/user')
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056:services/lists/tests/routes.lists.test.js
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056
        .set('authorization', `Bearer foobar`)
        .end((err, res) => {
          res.type.should.equal('application/json');
          res.body.status.should.equal('success');
          res.body.data.should.be.a('array');
          res.body.data.length.should.equal(2);
          res.body.data[1].title.should.eql('groceries');
        });
      });
    });
  });

});
