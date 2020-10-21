const {
  AlexaTest,
  //IntentRequestBuilder,
  LaunchRequestBuilder,
  //SkillSettings
} = require('ask-sdk-test');
const { handler } = require('../index.js');

// initialize the testing framework
const skillSettings = {
    appId: 'amzn1.ask.skill.00000000-0000-0000-0000-000000000000',
    userId: 'amzn1.ask.account.VOID',
    deviceId: 'amzn1.ask.device.VOID',
    locale: 'en-US',
};

const alexaTest = new AlexaTest(handler, skillSettings);

describe('LaunchRequest', () => {
  alexaTest.test([
    {
      request: new LaunchRequestBuilder(skillSettings).build(),
      says: `Welcome to CancerGov, the National Cancer Institute\'s skill. You can ask me to define a cancer-related word.`,
      repromptsNothing: true,
      shouldEndSession: true,
    },
  ]);
});
