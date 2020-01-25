import * as React from 'react';
import styled from "../../../utils/styled";
import {connect} from "react-redux";

import {
    showSquadronInput,
    squadronPostRequest,
    squadronsFetchRequest,
} from "../../../store/squadrons/actions";
import {ApplicationState} from "../../../store";
import SquadronModel from "../../../store/squadrons/SquadronModel";
import {useState} from "react";
import {postNewSquadron} from "../../../store/squadrons/sagas";
import {EaseIn} from "../../animations/transitions";

interface Props {
}

interface PropsFromDispatch {
    fetchSquadrons: typeof squadronsFetchRequest;
    showInput: typeof showSquadronInput;
}

type AllProps = Props & PropsFromDispatch;

const AddSquadronBar: React.FC<AllProps> = props => {
    const [newSqName, updateSqName] = useState("");
    const [newSqPAS, updatePAS] = useState("");
    const [validInput, updateValidInput] = useState("");

    async function handleClick() {

        if (newSqName.length > 0 && newSqPAS.length > 0) {
            updateValidInput("");
            await postNewSquadron(new SquadronModel(newSqName.toUpperCase(), newSqPAS.toUpperCase()));
            await props.fetchSquadrons();
            await toggleForm();
        } else {
            updateValidInput("Please fill in both fields")
        }

    }

    function toggleForm() {
        props.showInput();
    }

    return (
        <Wrapper>
            <span
                className={"title"}>
                Enter New Squadron
            </span>
                    <InputGrp>
                        <input
                            onChange={(e: any) => updateSqName(e.target.value)}
                            className={"SquadronInput"}
                            placeholder={"Name"}>
                        </input>
                        <input
                            onChange={(e: any) => updatePAS(e.target.value)}
                            className={"PASInput"}
                            placeholder={"PAS Code"}>
                        </input>
                    </InputGrp>
                    <div
                        className={"btn-box"}>
                        <button
                            className={"Btn hvr-grow"}
                            onClick={() => {
                                handleClick();
                            }}
                        >
                            SAVE
                        </button>
                        <button
                            className={"Btn hvr-grow"}
                            onClick={() => {
                                toggleForm();
                            }}
                        >
                            CANCEL
                        </button>

                    </div>
                    {validInput.length > 0 && (<span
                        className={"validText"}>
                    {validInput}
                </span>)}
        </Wrapper>
    )
};

const mapStateToProps = ({squadrons}: ApplicationState) => ({
    newSquadron: squadrons.newInput,
    post: squadrons.posting,
});


const mapDispatchToProps = {
    postNewSquadron: squadronPostRequest,
    fetchSquadrons: squadronsFetchRequest,
    showInput: showSquadronInput,
};

export const StyledAddSquadronBar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddSquadronBar);

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  font-family: ${props => props.theme.fonts.headings};
  font-size: 16px;
  margin-top: 5px;
   box-shadow: 0 0 3px rgba(0, 0, 0, 0);
  .title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 5px;
  }
  
  .validText {
  color: cornflowerblue;
  }
  
  .SquadronInput {
  text-align: center;
  outline: none;
  width: 80%;
  height: 20px;
  background: rgba(33,33,33,0.69);
  border: solid 1px rgba(95,95,95,0.1);
  border-radius: 4px;
  color: rgba(211,211,211,0.89);
    :hover {
  background: rgba(33,33,33,0.42);
  }
  }
  
  .PASInput {
  text-align: center;
  outline: none;
   width: 80%;
  height: 20px;
    background: rgba(33,33,33,0.69);
  border: solid 1px rgba(95,95,95,0.1);
  border-radius: 4px;
  color: #d3d3d3;
  :hover {
  background: rgba(33,33,33,0.42);
  }
  }
  
  .Btn {
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.brand};
  text-align: center;
  outline: none;
  cursor: pointer;
  width: 100%;
  height: 25px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease 0s;
  
  }
  
  .btn-box {
   display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  }
  
  .hvr-grow {
    display: inline-block;
    vertical-align: middle;
    transform: translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    transition-duration: 0.3s;
    transition-property: transform;
}

.hvr-grow:hover,
.hvr-grow:focus,
.hvr-grow:active {
    transform: scale(1.1);
}
`;

const InputGrp = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
`;