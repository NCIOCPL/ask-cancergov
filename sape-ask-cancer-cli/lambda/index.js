const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = 'Welcome to Ask Cancer';

    // The response builder contains is an object that handles generating the
    // JSON response that your skill returns.
    return handlerInput.responseBuilder
      .speak(speakOutput) // The text passed to speak, is what Alexa will say.
      .getResponse();
  },
};


// The Cancer-gov Ask Intent
const AskHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AskIntent';
  },
  handle(handlerInput) {
    // This is text that Alexa will speak back
    // when the user says, "Ask Sape cancer-gov for [information]"
    
  const term =  Alexa.getSlotValue(handlerInput.requestEnvelope, 'information');
  const speakOutput = 'This is information on ' + term;
    return handlerInput.responseBuilder
      .speak(speakOutput) 
      .getResponse();
  },
};


const HelpHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const CancelAndStopHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speakOutput = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(error.trace);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    AskHandler,

    HelpHandler,
    CancelAndStopHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();