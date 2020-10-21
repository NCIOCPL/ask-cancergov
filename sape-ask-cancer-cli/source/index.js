"use strict";

const Alexa = require('ask-sdk-core');

const React = require('react');

const DictionaryClient = require('./lib/dictionary-client');
const http = require("http")
const {
  AplDocument
} = require('ask-sdk-jsx-for-apl');

const {
  HelloAplDocument
} = require('./apl/helloapl');

const {
  InputUtil,
  ControlHandler,
  ControlManager,
  Control,
  ContainerControl,
  LiteralContentAct,
  renderActsInSequence
} = require('ask-sdk-controls');

class LiteralContentControl extends Control {
  constructor(literalContent, endSession) {
    super(new.target.name);
    this.literalContent = literalContent;
    this.endSession = endSession;
  }

  handle(input, resultBuilder) {
    if (this.literalContent) resultBuilder.addAct(new LiteralContentAct(this, {
      promptFragment: this.literalContent
    }));
    if (this.endSession) resultBuilder.endSession();
  }

  canTakeInitiative() {
    return false;
  }

}

class AplControl extends LiteralContentControl {
  constructor(literalContent, endSession, aplDocument) {
    super(literalContent, endSession);
    this.aplDocument = aplDocument;
  }

  renderAct(act, input, responseBuilder) {
    if (!responseBuilder.isDisplayUsed()) {
      if (Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
        responseBuilder.addDirective(this.aplDocument.getDirective());
      }
    }

    return act.render(input, responseBuilder);
  }

}

class LauncRequestControl extends LiteralContentControl {
  canHandle(input) {
    return InputUtil.isLaunchRequest(input);
  }

} // class DictionaryAPIIntentControl extends LiteralContentControl {
//     canHandle(input) { return InputUtil.isIntent(input, 'DictionaryAPIIntent'); }
// }
// class DictionaryAPIIntentControl extends AplControl {
//   canHandle(input) {
//     return InputUtil.isIntent(input, 'DictionaryAPIIntent');
//   }
//     handle(input, resultBuilder) {
//       //here is where I would make the API call
//       resultBuilder.addAct(new LiteralContentAct(this, {promptFragment: `You just triggered ${input.request.intent.name}`}));
//   }
// }


class DictionaryAPIIntentControl extends AplControl {
  canHandle(input) {
    return InputUtil.isIntent(input, 'DictionaryAPIIntent');
  }

async handle(input, resultBuilder) {

// Grab the phrase
    const keyword = input.request.intent.slots.Phrase.value;
    
// Initialize the dictionary client    
    const client = new DictionaryClient();
    
    
    let response = "";
    const result = await client.findDefinition(keyword);
    
    console.log("Searching for term - " + keyword);
    console.log("Number of Results - " + result.meta.totalResults);
    
    const totalResults = result.meta.totalResults;
    
    if (totalResults <= 0){
        response = `Sorry, I couldn't find an entry for ${keyword}`;
    }else{
        let   def = result.results[0].definition.text;
        response = `Here is the definition for ${keyword}. ${def}`;
    }
 
      // Add the speech response action
     resultBuilder.addAct(new LiteralContentAct(this, {
      promptFragment: `${response}.`
    }));
  
    // Add the APL response action
  }
}






class HelpIntentControl extends LiteralContentControl {
  canHandle(input) {
    return InputUtil.isIntent(input, 'AMAZON.HelpIntent');
  }

}

class StopOrCancelIntentControl extends LiteralContentControl {
  canHandle(input) {
    return InputUtil.isIntent(input, 'AMAZON.StopIntent') || InputUtil.isIntent(input, 'AMAZON.CancelIntent');
  }

}

class SessionEndedRequestControl extends LiteralContentControl {
  canHandle(input) {
    return InputUtil.isSessionEndedRequest(input);
  }

}

class IntentReflectorControl extends Control {
  canHandle(input) {
    return input.request.type === 'IntentRequest';
  }

  handle(input, resultBuilder) {
    resultBuilder.addAct(new LiteralContentAct(this, {
      promptFragment: `You just triggered ${input.request.intent.name}`
    }));
  }

  canTakeInitiative() {
    return false;
  }

}

class CancerDictionaryControl extends ContainerControl {
  constructor(props) {
    super(props);
    this.addChild(
      new LauncRequestControl('Welcome to CancerGov, the National Cancer Institute\'s skill. You can ask me to define a cancer-related term.', false))
      .addChild(new DictionaryAPIIntentControl('Input String', true, new AplDocument( /*#__PURE__*/React.createElement(HelloAplDocument, null))))
      .addChild(new HelpIntentControl('You can ask me to define a cancer term! How can I help?', false))
      .addChild(new StopOrCancelIntentControl('Goodbye!', true))
      .addChild(new IntentReflectorControl('IntentReflectorControl')).addChild(new SessionEndedRequestControl(null, false));
  }

}

class CancerDictionaryManager extends ControlManager {
  createControlTree() {
    return new CancerDictionaryControl({
      id: 'CancerDictionaryControl'
    });
  } //   render(result, input, responseBuilder) {
  //     renderActsInSequence(result.acts, input, responseBuilder);
  //     if (!responseBuilder.isDisplayUsed()) {
  //        if (getSupportedInterfaces(input)['Alexa.Presentation.APL']) {
  //            addDefaultScreenAPLDirective();
  //     }
  // }
  // }


}

exports.handler = Alexa.SkillBuilders.custom().addRequestHandlers(new ControlHandler(new CancerDictionaryManager())).lambda();
exports.CancerDictionaryManager = CancerDictionaryManager;