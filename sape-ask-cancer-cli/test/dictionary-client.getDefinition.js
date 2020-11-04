const path        = require('path');
const nock        = require('nock');
const expect      = require('chai').expect;

const DictionaryClient = require('../lib/dictionary-client');

describe('DictionaryClient.getDefinition', () => {

  before(() => {
    nock.disableNetConnect();
  });

  //After each test, cleanup any remaining mocks
  afterEach(() => {
    nock.cleanAll();
  });

  after(() => {
    nock.enableNetConnect();
  });

  it("returns a matching term", () => {
    const api_scope = nock('http://localhost/Dictionary.Service/v1');

    const params = {
      termID: 445043,
      language: 'English',
      dictionary: 'term',
      audience: 'Patient',
    }

    api_scope.get('/GetTerm')
      .query(params)
      .replyWithFile(
        200,
        path.join(
          __dirname,
          '..',
          'test-data',
          'dictionary-client',
          'GetTerm',
          '445043_English_term_Patient.json'),
        { 'Content-Type': 'application/json' }
      );

    const client = new DictionaryClient('http://localhost/Dictionary.Service/v1');

    return client.getDefinition(445043).then((term) => {
      // Assert that the expected request was made.
      expect(term).to.not.be.null;
      expect(term.id).to.equal('445043');
      api_scope.done()
    })

  });

  it("returns null when no term", () => {
    const api_scope = nock('http://localhost/Dictionary.Service/v1');

    const params = {
      termID: 30,
      language: 'English',
      dictionary: 'term',
      audience: 'Patient',
    }

    api_scope.get('/GetTerm')
      .query(params)
      .replyWithFile(
        200,
        path.join(
          __dirname,
          '..',
          'test-data',
          'dictionary-client',
          'GetTerm',
          'not_found_term.json'),
        { 'Content-Type': 'application/json' }
      );

    const client = new DictionaryClient('http://localhost/Dictionary.Service/v1');

    return client.getDefinition(30).then((term) => {
      // Assert that the expected request was made.
      expect(term).to.be.null;
      api_scope.done()
    })
  })
});
