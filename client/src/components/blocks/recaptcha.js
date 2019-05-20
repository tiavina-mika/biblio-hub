import React from "react";
import ReactDOM from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";

const TEST_SITE_KEY = "6LebcaQUAAAAAPA591TTcaYALfIS84o06QftbZGd";
const DELAY = 1500;

class ReCaptcha extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      callback: "not fired",
      value: "[empty]",
      load: false,
      expired: "false"
    };
    this._reCaptchaRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ load: true });
    }, DELAY);
  }

  handleChange = value => {
    console.log("Captcha value:", value);
    this.setState({ value });
    // if value is null recaptcha expired
    if (value === null) this.setState({ expired: "true" });
  };

  asyncScriptOnLoad = () => {
    this.setState({ callback: "called!" });
  };

  render() {
    const { value, callback, load, expired } = this.state || {};
    return (
        load && (
          <ReCAPTCHA
            style={{ display: "inline-block" }}
            theme="dark"
            ref={this._reCaptchaRef}
            sitekey={TEST_SITE_KEY}
            onChange={this.handleChange}
            asyncScriptOnLoad={this.asyncScriptOnLoad}
          />
        )
    );
  }
}

export default ReCaptcha;