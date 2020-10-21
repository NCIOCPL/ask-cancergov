"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelloAplDocument = void 0;

var React = _interopRequireWildcard(require("react"));

var _askSdkJsxForApl = require("ask-sdk-jsx-for-apl");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class HelloAplDocument extends React.Component {
  constructor(props) {
    super(props);
    this.launchMessage = 'Hello World!';
  }

  render() {
    return /*#__PURE__*/React.createElement(_askSdkJsxForApl.APL, {
      theme: "dark"
    }, /*#__PURE__*/React.createElement(_askSdkJsxForApl.MainTemplate, null, /*#__PURE__*/React.createElement(_askSdkJsxForApl.Container, {
      alignItems: "center",
      justifyContent: "spaceAround"
    }, /*#__PURE__*/React.createElement(_askSdkJsxForApl.Text, {
      text: this.launchMessage,
      fontSize: "50px",
      color: "rgb(0,202,255)"
    }))));
  }

}

exports.HelloAplDocument = HelloAplDocument;