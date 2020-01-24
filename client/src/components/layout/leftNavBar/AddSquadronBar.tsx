import * as React from 'react';
import styled from "../../../utils/styled";
import {connect} from "react-redux";
import {
    showSquadronInput,
    squadronPostRequest,
    squadronsFetchRequest,
    updateSquadronInputState
} from "../../../store/squadrons/actions";
import {ApplicationState} from "../../../store";
import SquadronModel from "../../../store/squadrons/SquadronModel";
import {useState} from "react";
import {postNewSquadron} from "../../../store/squadrons/sagas";

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

    async function handleClick() {
        await postNewSquadron(new SquadronModel(newSqName, newSqPAS));
        await props.fetchSquadrons();
        props.showInput();
    }

    return (
        <Wrapper>
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
            <button
                onClick={() => {
                    handleClick()
                }}
            >
                save
            </button>
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
  justify-content: space-around;
  width: 100%;
  font-family: ${props => props.theme.fonts.headings};
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  
  .SquadronInput {
  width: 60px;
  height: 20px;
  background: none;
  border: solid 1px white;
  border-radius: 4px;
  color: white;
  }
  
  .PASInput {
   width: 120px;
  height: 20px;
   background: none;
  border: solid 1px white;
  border-radius: 4px;
  color: white;
  ;
  }
 
`;