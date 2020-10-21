'use strict';

const Alexa = require('ask-sdk-core');

// Request Handlers
const LaunchRequestHandler        = require('./handlers/launch-request-handler');
const DefinitionIntentHandler     = require('./handlers/definition-intent-handler');
const HelpIntentHandler           = require('./handlers/help-intent-handler');
const CancelAndStopIntentHandler  = require('./handlers/cancel-and-stop-intent-handler');
const SessionEndedRequestHandler  = require('./handlers/session-ended-request-handler');

// Error Handlers
const ErrorHandler                = require('./handlers/error-handler');

// Return a lambda function for this skill.
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    DefinitionIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
