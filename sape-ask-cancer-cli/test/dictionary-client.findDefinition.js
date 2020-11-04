const path        = require('path');
const nock        = require('nock');
const expect      = require('chai').expect;

const DictionaryClient = require('../lib/dictionary-client');

describe('DictionaryClient.findDefinition', () => {

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

  it("returns a single matching term", () => {
    const api_scope = nock('http://localhost/Dictionary.Service/v1');

    const params = {
      searchText: 'metastatic',
      language: 'English',
      dictionary: 'term',
      searchType: 'begins',
      //audience: 'Patient',
    }

    api_scope.get('/SearchSuggest')
      .query(params)
      .replyWithFile(
        200,
        path.join(
          __dirname,
          '..',
          'test-data',
          'dictionary-client',
          'SearchSuggest',
          'metastatic_English_term_Patient.json'),
        { 'Content-Type': 'application/json' }
      );

    const client = new DictionaryClient('http://localhost/Dictionary.Service/v1');

    return client.findDefinition("metastatic").then((results) => {
      // Assert that the expected request was made.
      expect(term).to.not.be.null;
      expect(term.id).to.equal('445043');
      api_scope.done()
    })

  });

  it("returns multiple matching terms", () => {
    const api_scope = nock('http://localhost/Dictionary.Service/v1');

    const params = {
      searchText: 'alcohol',
      language: 'English',
      dictionary: 'term',
      searchType: 'begins',
      //audience: 'Patient',
    }

    api_scope.get('/SearchSuggest')
      .query(params)
      .replyWithFile(
        200,
        path.join(
          __dirname,
          '..',
          'test-data',
          'dictionary-client',
          'SearchSuggest',
          'alcohol_English_term_Patient.json'),
        { 'Content-Type': 'application/json' }
      );

    const client = new DictionaryClient('http://localhost/Dictionary.Service/v1');

    return client.findDefinition("alcohol").then((results) => {
      // Assert that the expected request was made.
      expect(term).to.be.null;
      api_scope.done()
    })
  })

  it("returns no matching terms", () => {
    const api_scope = nock('http://localhost/Dictionary.Service/v1');

    const params = {
      searchText: 'chicken',
      language: 'English',
      dictionary: 'term',
      searchType: 'begins',
      //audience: 'Patient',
    }

    api_scope.get('/SearchSuggest')
      .query(params)
      .replyWithFile(
        200,
        path.join(
          __dirname,
          '..',
          'test-data',
          'dictionary-client',
          'SearchSuggest',
          'chicken_English_term_Patient.json'),
        { 'Content-Type': 'application/json' }
      );

    const client = new DictionaryClient('http://localhost/Dictionary.Service/v1');

    return client.findDefinition("chicken").then((results) => {
      // Assert that the expected request was made.
      expect(term).to.be.null;
      api_scope.done()
    })
  })

});
