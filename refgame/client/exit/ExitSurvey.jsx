import React from "react";

import { Centered } from "meteor/empirica:core";

import {
    Button,
    Classes,
    FormGroup,
    RadioGroup,
    TextArea,
    Intent,
    Radio,
} from "@blueprintjs/core";

export default class ExitSurvey extends React.Component {
    static stepName = "ExitSurvey";
    state = {
        engaged: "",
        correctness: "",
        english: "",
        human: "",
        newpartner: "",
        strategy: "",
        fair: "",
        feedback: "",
        satisfied: "",
        workedWell: "",
        perspective: "",
        chatComfort: "",
        chatUseful: "",
        events: "",
    };

    handleChange = (event) => {
        const el = event.currentTarget;
        this.setState({ [el.name]: el.value });
    };

    handleSubmit = (event) => {
      event.preventDefault();
      console.log(this.state);
        this.props.onSubmit(this.state);
    };


    exitForm = () => {
        const {
            engaged,
            correctness,
            english,
            human,
            newpartner,
            strategy,
            fair,
            feedback,
            satisfied,
            workedWell,
            perspective,
            chatComfort,
            events,
            chatUseful,
        } = this.state;

        return (
            <div>
              {" "}
              <h1>
                Finally, please answer the following short survey. 
              </h1>
              <h3>
                You do not have to provide any information you feel uncomfortable with.
              </h3>
              <form onSubmit={this.handleSubmit}>
                  <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="engaged"
                                label="On a scale of 1-10 (where 10 is the most engaged), please rate how engaged you were while performing the task:"
                                onChange={this.handleChange}
                                selectedValue={engaged}
                            >
                                <Radio
                                    label="10 - Very engaged"
                                    value="10"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="9"
                                    value="9"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="8"
                                    value="8"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="7"
                                    value="7"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="6"
                                    value="6"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="5 - Moderately engaged"
                                    value="5"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="4"
                                    value="4"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="3"
                                    value="3"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="2"
                                    value="2"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="1 - Not engaged"
                                    value="1"
                                    className={"pt-inline"}
                                />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="correctness"
                                label="Did you read the instructions and think you did the tasks correctly?"
                                onChange={this.handleChange}
                                selectedValue={correctness}
                            >
                                <Radio
                                    label="Yes"
                                    value="yes"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="No, I was confused"
                                    value="no"
                                    className={"pt-inline"}
                                />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="english"
                                label="Is English your native language?"
                                onChange={this.handleChange}
                                selectedValue={english}
                            >
                                <Radio
                                    label="Yes"
                                    value="yes"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="No"
                                    value="no"
                                    className={"pt-inline"}
                                />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="human"
                                label="Did you believe that you were playing with real human partners?"
                                onChange={this.handleChange}
                                selectedValue={human}
                            >
                                <Radio
                                    label="Yes, my partners were real participants."
                                    value="yes"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="No, my partners were secretly computers."
                                    value="no"
                                    className={"pt-inline"}
                                />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="newpartner"
                                label="Did you believe all of your partners were new?"
                                onChange={this.handleChange}
                                selectedValue={newpartner}
                            >
                                <Radio
                                    label="Yes, all partners were new."
                                    value="yes"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="No, I thought I had already interacted with my partners."
                                    value="no"
                                    className={"pt-inline"}
                                />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="satisfied"
                                label="How satisfied are you with your community's performance in the game?"
                                onChange={this.handleChange}
                                selectedValue={satisfied}
                            >
                                <Radio
                                    label="Very satisfied"
                                    value="verySatisfied"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="Satisfied"
                                    value="somewhatSatisfied"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="Neutral"
                                    value="neutral"
                                    className={"pt-inline"}
                                />

                                <Radio
                                    label="Dissatisfied"
                                    value="somewhatDissatisfied"
                                    className={"pt-inline"}
                                />
                                <Radio
                                    label="Very dissatisfied"
                                    value="veryDissatisfied"
                                    className={"pt-inline"}
                                />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="pt-form-group">
                        <div className="pt-form-content">
                            <RadioGroup
                                name="workedWell"
                                label="Do you think your community worked well together?"
                                onChange={this.handleChange}
                                selectedValue={workedWell}
                            >
                                <Radio
                                    label="Strongly agree"
                                    value="stronglyAgree"
                                    className={"pt-inline"}
                                />
                                <Radio label="Agree" value="agree" className={"pt-inline"} />
                                <Radio
                                    label="Neutral"
                                    value="neutral"
                                    className={"pt-inline"}
                                />

                                <Radio
                                    label="Disagree"
                                    value="disagree"
                                    className={"pt-inline"}
                                />

                                <Radio
                                    label="Strongly disagree"
                                    value="stronglyDisagree"
                                    className={"pt-inline"}
                                />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="form-line thirds">
                        <FormGroup
                            className={"form-group"}
                            inline={false}
                            label={"How would you describe your strategy in the game?"}
                            labelFor={"strategy"}
                            //className={"form-group"}
                        >
                            <TextArea
                                id="strategy"
                                large={true}
                                intent={Intent.PRIMARY}
                                onChange={this.handleChange}
                                value={strategy}
                                fill={true}
                                name="strategy"
                            />
                        </FormGroup>

                        <FormGroup
                            className={"form-group"}
                            inline={false}
                            label={"Do you feel the pay was fair?"}
                            labelFor={"fair"}
                            //className={"form-group"}
                        >
                            <TextArea
                                id="fair"
                                name="fair"
                                large={true}
                                intent={Intent.PRIMARY}
                                onChange={this.handleChange}
                                value={fair}
                                fill={true}
                            />
                        </FormGroup>
                    </div>

                  <div className="form-line thirds">
                    <FormGroup
                      className={"form-group"}
                      inline={false}
                      label={"Did you notice any problems or have any other comments about the study?"}
                      labelFor={"feedback"}
                      //className={"form-group"}
                    >
                    <TextArea
                      id="feedback"
                      name="feedback"
                      large={true}
                      intent={Intent.PRIMARY}
                      onChange={this.handleChange}
                      value={feedback}
                      fill={true}
                    />
                    </FormGroup>

                        <FormGroup
                            className={"form-group"}
                            inline={false}
                            label={"Was the in-game chat feature easy to use?"}
                            labelFor={"chatUseful"}
                            //className={"form-group"}
                        >
                            <TextArea
                                id="chatUseful"
                                name="chatUseful"
                                large={true}
                                intent={Intent.PRIMARY}
                                onChange={this.handleChange}
                                value={chatUseful}
                                fill={true}
                            />
                        </FormGroup>
                    </div>

                    <button type="submit" className="pt-button pt-intent-primary">
                        Submit
                        <span className="pt-icon-standard pt-icon-key-enter pt-align-right" />
                    </button>
                </form>{" "}
            </div>
        );
    };

    componentWillMount() {}

    render() {
        const { player, game } = this.props;
        return (
            <Centered>
                <div className="exit-survey">
                    {this.exitForm()}
                </div>
            </Centered>
        );
    }
}
