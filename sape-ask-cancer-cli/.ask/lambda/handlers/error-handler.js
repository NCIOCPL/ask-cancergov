/**
 * This is the handler for an error. We will know the error coming into us so we should
 * respond with an appropriate response.
 */
const ErrorHandler = {
  canHandle() {
    // This is where you would define what you can handle.
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

module.exports = ErrorHandler;
