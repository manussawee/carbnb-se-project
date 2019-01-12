const chai = require('chai');
const chaiHTTP = require('chai-http');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');

const app = require('../app');

const User = require('../routes/model/users');

const { expect } = chai;

chai.use(chaiHTTP);

let db;

const dropIfExist = async (collection) => {
  try {
    await db.connection.collections[collection].drop();
  } catch (err) {
    //
  }
};

before(async () => {
  try {
    db = await mongoose.connect(
      `mongodb://${config.db.host}:${config.db.port}`,
      { dbName: config.db.dbName, useNewUrlParser: true },
    );
    dropIfExist('users');
  } catch (error) {
    throw error;
  }
});

describe('tests', () => {
  describe('/auth', () => {
    before(async () => {
      await User.deleteMany({});
    });

    describe('/', () => {
      before((done) => {
        chai.request(app)
          .post('/api/auth/register')
          .send({
            username: 'testuser',
            password: 'testpassword',
            fullname: 'Test User',
          })
          .end(() => {
            done();
          });
      });

      it('works', (done) => {
        chai.request(app)
          .post('/api/auth')
          .send({
            username: 'testuser',
            password: 'testpassword',
          })
          .end((error, response) => {
            const { token, role } = response.body;
            expect(response).to.have.status(200);
            expect(role).to.equal('User');
            expect(jwt.verify(token, config.auth.jwt.key));
            done();
          });
      });

      after(async () => {
        await User.deleteMany({});
      });
    });

    describe('/register', () => {
      it('works', (done) => {
        chai.request(app)
          .post('/api/auth/register')
          .send({
            username: 'testuser',
            password: 'testpassword',
            fullname: 'Test User',
          })
          .end((error, response) => {
            expect(response).to.have.status(200);
            done();
          });
      });

      it('adds user to database', async () => {
        const user = await User.findOne({ username: 'testuser' });
        expect(user).not.to.be.undefined;
        expect(user.fullname).to.equal('Test User');
        expect(user.role).to.equal('User');
      });
    });
  });
});
