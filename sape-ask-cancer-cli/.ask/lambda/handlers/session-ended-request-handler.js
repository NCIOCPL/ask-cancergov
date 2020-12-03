/**
 * This is what is called when the skill ends. It can be used to clean up
 * any session info. (e.g. when creating an interactive skill that has many
 * questions you probably need to keep track of previous responses. This is
 * where you can clean it up.)
 */
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

module.exports = SessionEndedRequestHandler;
