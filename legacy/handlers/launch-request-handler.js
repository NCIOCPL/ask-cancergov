/**
 * The Launch Request is used when a user tries to open the Skill without an
 * intent. E.g. Alexa, open CancerGov. So the response should say what we
 * can do.
 */
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = `Welcome to CancerGov, the National Cancer Institute\'s skill. You can ask me to define a cancer-related word.`;

    return handlerInput.responseBuilder
    // What should we say?
    .speak(speechText)
    // We will not ask for a reprompt but we could say something else if the user has not
    // responded within 8 seconds.
    // What should we display on a screen if there is one?
    .withSimpleCard('Hello World', speechText)
    .getResponse();
  }
};

module.exports = LaunchRequestHandler;
