import * as React from 'react';
import SettingsIcon from "../../icons/SettingsIcon";
import styled from "../../../utils/styled";
import {shine} from "../../animations/transitions";
import {connect} from "react-redux";
import {fetchRequest} from "../../../store/squadrons/actions";
import {ApplicationState} from "../../../store";
import MenuTitleBar from "../../icons/MenuTitleBar";
import GlassBallIcon from "../../icons/GlassBall";
import SquadronModel from "../../../store/squadrons/SquadronModel";
import ItemRow from "../LeftNavMenu";

interface PropsFromState {
    loading: boolean;
    squadrons: SquadronModel[];
    addSquadron?: boolean;
    errors?: string;
}

interface PropsFromDispatch {
    fetchRequest: typeof fetchRequest;
    // filterMembers: typeof filterMembers;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch;

class LeftNavBar extends React.Component<AllProps> {
    public componentDidMount() {
        const {fetchRequest: fr} = this.props;
        fr();
    }

    private renderSquadronMenu() {
        const {squadrons} = this.props;
        return (
            <MenuWrapper>
                <MenuTitle>
                    <span>{"Squadrons"}</span>
                    <MenuTitleBar/>
                </MenuTitle>

                <Menu>
                    {squadrons.map((squadron, index) =>
                        <ItemRow
                            key={index}
                            item={squadron.squadron}
                            clickItem={() => {}}
                        />
                    )}
                    {/*{addSquadron && (*/}
                    {/*    <AddSquadronRow/>*/}
                    {/*)}*/}
                </Menu>

                <MenuActionBall>
                    <GlassBallIcon/>
                </MenuActionBall>

            </MenuWrapper>
        )
    }

    public render() {
        return (
            <Wrapper>
                <LeftNavBarTitle>
                    <AppTitle
                        className="chrome">{"Turbine"}</AppTitle>
                </LeftNavBarTitle>
                {this.renderSquadronMenu()}
                <AppButtonSection>
                    <SettingsIcon/>
                </AppButtonSection>
                <NavBorder>
                </NavBorder>
            </Wrapper>
        );
    }
}

const mapStateToProps = ({squadrons}: ApplicationState) => ({
    loading: squadrons.loading,
    errors: squadrons.errors,
    squadrons: squadrons.squadrons,
});


const mapDispatchToProps = {
    fetchRequest,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LeftNavBar);

const MenuWrapper = styled('div')`
display: block;
width: 100%;
  font-family: ${props => props.theme.fonts.headings};
  font-size: large;
`;

const Menu = styled('div')`
width: inherit;
`;

const MenuActionBall = styled('div')`
cursor: pointer;
position: absolute;
right: 6px;
top: 50px;
`;

const MenuTitle = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
span {
    width: 90%;
    height: 24px;
    position: absolute;
}

`;

const AppButtonSection = styled('div')`
width: inherit;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
padding-left: 10px;
position: fixed;
bottom: 0;
height: 45px;
`;

const Wrapper = styled('div')`
    position: fixed;
    display: block;
    width: 198px;
    height: 100vh;
    background: ${props => props.theme.colors.MenuBackground};
    color: ${props => props.theme.colors.brand};
    font-family: ${props => props.theme.fonts.headings};
    z-index: 100;
`;

const LeftNavBarTitle = styled('div')`
    
html {
background-color: #333;
text-align: center
}

body {
padding-top: 3em;
}

.chrome {
margin: 0 auto;
    height: 46px;
    padding: 10px
}

.chrome {
background: #222 -webkit-linear-gradient(-40deg, transparent 0%, transparent 40%, #fff 50%, transparent 60%, transparent 100%) no-repeat 0 0;
-webkit-background-size: 200px;
color: rgba(255, 255, 255, 0.3);
-webkit-background-clip: text;
-webkit-animation-name: ${shine};
-webkit-animation-duration: 20s;
-webkit-animation-iteration-count: infinite;
text-shadow: 0 0 0 rgba(255, 255, 255, 0.5);
}

`;

const AppTitle = styled('h2')`
    font-weight: 500;
`;

const NavBorder = styled('div')`
position: absolute;
width: 1px;
height: 100%;
left: 198px;
top: 0px;
background: #949494;
/* Borders */

box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);

`;





