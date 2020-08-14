const axios   = require('axios');

class DictionaryClient {
  constructor(
    baseUrl = 'https://www.cancer.gov/Dictionary.Service/v1',
    dictionary = 'term',
    language = 'English',
    audience = 'Patient'
  ) {
    this.client = axios.create({
      baseURL: baseUrl
    })
    this.dictionary = dictionary;
    this.language = language;
    this.audience = audience;
  }

  /**
   * Fetches a definition from the Dictionary
   * @param {int} id The Term ID
   */
  async getDefinition(id) {
    //v1/GetTerm?termID={termId}&language={language}&dictionary={dictionary}&audience={audience}"
    try {
      const res = await this.client.get(
        '/GetTerm',
        {
          params: {
            termID: id,
            language: this.language,
            dictionary: this.dictionary,
            audience: this.audience
          }
        }
      );

      if (res.status !== 200) {
        console.warn("Non-200 status");
        return null;
      }

      return res.data.term;

    } catch (error) {
      console.error(error);
      return null;
    }

  }

  /**
   * Finds the term id of a definition based on a keyword search.
   * @param {*} keyword
   */
  async findDefinition(keyword) {
    //https://www.cancer.gov/Dictionary.Service/v1/searchSuggest?dictionary=term&searchText=cancer&language=English&searchType=begins
    try {
      const res = await this.client.get(
        '/searchSuggest',
        {
          params: {
            dictionary: 'term',
            searchText: keyword,
            language: 'English',
            searchType: 'begins'
          }
        }
      );

      if (res.status !== 200) {
        console.warn("Non-200 status");
        return {
          "meta": {
            "result_count": 0,
            "message": ["Search Error"]
          },"result": []
        };
      }

      return res.data;
    } catch (error) {
      console.error(error);
      return {
        "meta": {
          "result_count": 0,
          "message": ["Search Error"]
        },"result": []
      };
    }
  }

}



module.exports = DictionaryClient;
