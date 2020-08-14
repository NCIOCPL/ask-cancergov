const Alexa = require('ask-sdk-core');

const DefinitionIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'DefinitionIntent';
  },
  handle(handlerInput) {
    // So, synonyms will probably be a big deal for figuring out what
    // people are trying to define. Stage 3 Breast Cancer is probably how
    // Alexa will interpret someone saying "Stage 3 Breast Cancer", but it
    // is actually Stage III Breast Cancer. (What would Stage IIIB look like?)
    //
    // Synonyms can be configured on the slot type, but that is more appropriate
    // when the slot is an enumeration, and those are alternate phrases for that
    // enumeration key.
    //
    // Since we do not use synonyms in the skill, we don't need to worry about
    // slot resolution and can just use getSlotValue.
    const keyword = Alexa.getSlotValue(handlerInput.requestEnvelope, "keyword");

    const speechText = `I would define ${keyword}`;

    // TODO: Handle interactive response when there are more than 1 match?
    // e.g. I did not find an exact match, but I did find these other things...?

    return handlerInput.responseBuilder
      // Respond with this spoken text
      .speak(speechText)
      // Show this on the echo display
      .withSimpleCard('Hello World', speechText)
      // Indicate we are done.
      .withShouldEndSession(true)
      // Finalize the response
      .getResponse();
  }
};

module.exports = DefinitionIntentHandler;
