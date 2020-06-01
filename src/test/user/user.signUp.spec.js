import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import db from '../../config/mariadb.config';

chai.use(chaiHttp);

const normalRequest = {
  email: 'testspec1J@naver.com',
  name: 'TESTSPEC1',
  password: 'testspec1',
};

const abNormalRequest = {
  email: '',
  name: '',
  password: '',
};

chai.request(server);

describe('POST /signup ::: 회원가입 테스트', async () => {
  it('가입정보 객체가 정상적으로 요청된 경우', (done) => {
    chai
      .request(server)
      .post('/signup')
      .send(normalRequest)
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res).to.have.status(200);
        // console.log(res.body);
        done();
      });
  });

  it('가입정보 객체가 비정상적으로 요청된 경우', (done) => {
    chai
      .request(server)
      .post('/signup')
      .send(abNormalRequest)
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res).to.have.header(
          'content-type',
          'application/json; charset=utf-8'
        );
        expect(res).to.have.status(422);
        // console.log(res.body);
        done();
      });
  });

  it('가입정보 중 이메일이 기 가입된 이메일이 요청된 경우', (done) => {
    chai
      .request(server)
      .post('/signup')
      .send(normalRequest)
      .end(async (error, res) => {
        expect(error).to.be.null;
        expect(res).to.have.status(409);
        done();
      });
  });
});
