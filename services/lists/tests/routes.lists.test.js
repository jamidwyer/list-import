process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/app');
const knex = require('../src/db/connection');

describe('Lists API Routes', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /lists/ping', () => {
    it('should return "pong"', () => {
      chai.request(server)
      .get('/lists/ping')
      .end((err, res) => {
        res.type.should.eql('text/html');
        res.text.should.eql('pong');
      });
    });
  });

  describe('GET /lists/user', () => {
    it('should return saved lists', () => {
      chai.request(server)
      .get('/lists/user')
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

  describe('POST /lists', () => {
    it('should create a new list', () => {
      chai.request(server)
      .post('/lists')
      .set('authorization', `Bearer foobar`)
      .send({ title: 'groceries' })
      .end((err, res) => {
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('object');
        res.body.status.should.equal('success');
        res.body.data.should.equal('List Added!');
        chai.request(server)
        .get('/lists/user')
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
