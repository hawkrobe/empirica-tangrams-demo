import React from "react";

import { Centered, ConsentButton } from "meteor/empirica:core";
import BrowserDetection from "react-browser-detection";

export default class Consent extends React.Component {
  static renderConsent() {
    return (
      <Centered>
        <div className="consent bp3-ui-text">
          <h5 className="bp3-heading">INTRODUCTION</h5>
          <p>
            Thank you for deciding to participate in this research project.
            This research is being conducted by Robert Hawkins, a postdoctoral
            research fellow, Irina Liu and Alicia Chen, research assistants, and Tom Griffiths, a faculty member,
            all at Princeton University. This study takes approximately 30 minutes to complete, but will
            vary a bit depending on how long you must wait for other participants to join.

            Your participation in this research is voluntary. You are free to refuse to take part,
            and you may stop taking part at any time. You are free to discontinue participation
            in this study at any time with no penalty. Below is a description of the research project, and your
            consent to participate. Read this information carefully. If you
            agree to participate, click "I agree" to indicate that you have read
            and understood the information provided on this consent form.
          </p>

          <h5 className="bp3-heading">PROCEDURES</h5>
          <p>
            If you agree to take part in the research, you will play a series of communication games
            with other participants: one of you will describe a picture for the other to choose out of
            a lineup of other pictures. All of the information we obtain during the research will be
            kept confidential, and not associated with your name in any way. However, while the study
            is running it will be associated with your worker id. Once the study is complete we will replace your worker id with a random string.
          </p>

          <h5 className="bp3-heading">Benefits and Risks</h5>
          <p>
            <strong>Benefits:</strong> The research team expects to learn about
            how humans communicate and solve problems together, which we hope
            will result in one or more academic publications. You will receive
            payment after completing this session as well as any public benefit
            that may come these Research Results being shared with the greater
            scientific community and public.{" "}
          </p>
          <p>
            <strong>Risks: </strong> During your participation, you may
            experience frustration if you are unable to communicate effectively with your partner or if one of your partners disconnect and terminate the game early. To help reduce such risks, the research team will include comprehension checking steps to ensure that all participants understand the task.
          </p>

          <h5 className="bp3-heading">YOUR AUTHORITY TO PARTICIPATE</h5>
          <p>
            You represent that you have the full right and authority to sign
            this form, and if you are a minor that you have the consent (as
            indicated below) of your legal guardian to sign and acknowledge this
            form. By signing this form, you confirm that you understand the
            purpose of the project and how it will be conducted and consent to
            participate on the terms set forth above.

            If you have any questions about this research, do not hesitate to contact Robert
            Hawkins at hawkrobe@gmail.com. If you have any questions about your rights or treatment
            as a participant in this research project, please contact the Princeton Office for
            Research Integrity and Assurance by phone at 609-258-0865 or by email at ria@princeton.edu.
          </p>

          <p>
            By consenting to participate, you acknowledge that you are 18 years or older,
            have read this consent form, agree to its contents, and agree to take part in this research.
            If you do not wish to consent, close this page and return the task.
          </p>

          <ConsentButton text="I AGREE" />
        </div>
      </Centered>
    );
  }

  renderNoFirefox = () => {
    console.log("this is fire fox");
    return (
      <div className="consent">
        <h1 className="bp3-heading" style={{ textAlign: "center", color: "red" }}>
          DO NOT USE FIREFOX!!
        </h1>
        <p style={{ textAlign: "center" }}>
          Please, don't use firefox! It breaks our game and ruins the experience
          for your potential teammates!
        </p>
      </div>
    );
  };

  render() {
    const browserHandler = {
      default: browser =>
        browser === "firefox" ? this.renderNoFirefox() : Consent.renderConsent()
    };

    return (
      <Centered>
        <BrowserDetection>{browserHandler}</BrowserDetection>
      </Centered>
    );
  }
}
