"use strict";

const axios = require('axios');

class DictionaryClient {
  constructor( // /Patient/en/leukemia?matchType=Begins&size=100
  baseUrl = 'https://webapis.cancer.gov/glossary/v1/Terms/search/Cancer.gov', dictionary = 'Terms', language = 'en', audience = 'Patient') {
    this.client = axios.create({
      baseURL: baseUrl
    });
    this.dictionary = dictionary;
    this.language = language;
    this.audience = audience;
  }
  /**
   * Finds the term id of a definition based on a keyword search.
   * @param {*} keyword
   */


  async findDefinition(keyword) {
      
      console.log();
    //https://www.cancer.gov/Dictionary.Service/v1/searchSuggest?dictionary=term&searchText=cancer&language=English&searchType=begins
    try {
      const res = await this.client.get(`/Patient/en/${keyword}?matchType=Begins&size=100`, {
        params: {}
      });

      if (res.status !== 200) {
        console.warn("Non-200 status");
        return {
          "meta": {
            "result_count": 0,
            "message": ["Search Error"]
          },
          "result": []
        };
      }

      return res.data;
    } catch (error) {
      console.error(error);
      return {
        "meta": {
          "result_count": 0,
          "message": ["Search Error"]
        },
        "result": []
      };
    }
  }

}

module.exports = DictionaryClient;
