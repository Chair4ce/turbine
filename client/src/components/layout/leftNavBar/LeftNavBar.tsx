import * as React from 'react';
import SettingsIcon from "../../icons/SettingsIcon";
import styled from "../../../utils/styled";
import {shine} from "../../animations/transitions";
import {connect} from "react-redux";
import {squadronsFetchRequest} from "../../../store/squadrons/actions";
import {ApplicationState} from "../../../store";
import MenuTitleBar from "../../icons/MenuTitleBar";
import GlassBallIcon from "../../icons/GlassBall";
import SquadronModel from "../../../store/squadrons/SquadronModel";
import ItemRow from "../LeftNavMenu";
import FlightModel from "../../../store/flights/FlightModel";
import AETModel from "../../../store/AETs/AETModel";
import {flightsFetchRequest} from "../../../store/flights/actions";
import {AETsFetchRequest} from "../../../store/AETs/actions";

interface PropsFromState {
    squadronsLoading: boolean;
    squadrons: SquadronModel[];
    flights: FlightModel[];
    AETs: AETModel[];
    addSquadron?: boolean;
    addFlight?: boolean;
    addAET?: boolean;
    squadronsErrors?: string;
}

interface PropsFromDispatch {
    squadronsFetchRequest: typeof squadronsFetchRequest;
    flightsFetchRequest: typeof flightsFetchRequest;
    AETsFetchRequest: typeof AETsFetchRequest;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch;

class LeftNavBar extends React.Component<AllProps> {
    public componentDidMount() {
        const {squadronsFetchRequest: sfr, flightsFetchRequest: ffr, AETsFetchRequest: afr} = this.props;
        sfr();
        ffr();
        afr();
    }

    public render() {
        return (
            <Wrapper>
                <LeftNavBarTitle>
                    <AppTitle
                        className="chrome">{"Turbine"}</AppTitle>
                </LeftNavBarTitle>
                {this.renderSquadronMenu()}
                {this.renderflightsMenu()}
                {this.renderAETsMenu()}
                <AppButtonSection>
                    <SettingsIcon/>
                </AppButtonSection>
                <NavBorder>
                </NavBorder>
            </Wrapper>
        );
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
            </MenuWrapper>
        )
    }

    private renderflightsMenu() {
        const {flights} = this.props;
        return (
            <MenuWrapper>
                <MenuTitle>
                    <span>{"Flights"}</span>
                    <MenuTitleBar/>
                </MenuTitle>
                <Menu>

                    {flights.map((flight, index) =>
                        <ItemRow
                            key={index}
                            item={flight.org_id}
                            clickItem={() => {}}
                        />
                    )}
                    {/*{addFlights && (*/}
                    {/*    <AddFlightRow/>*/}
                    {/*)}*/}
                </Menu>
            </MenuWrapper>
        )
    }

    private renderAETsMenu() {
        const {AETs} = this.props;
        return (
            <MenuWrapper>
                <MenuTitle>
                    <span>{"AETs"}</span>
                    <MenuTitleBar/>
                </MenuTitle>

                <Menu>

                    {AETs.map((AET, index) =>
                        <ItemRow
                            key={index}
                            item={AET.org_id}
                            clickItem={() => {}}
                        />
                    )}

                    {/*{addAET && (*/}
                    {/*    <AddAETRow/>*/}
                    {/*)}*/}
                </Menu>
            </MenuWrapper>
        )
    }
}

const mapStateToProps = ({squadrons, flights, AETs}: ApplicationState) => ({
    squadronsLoading: squadrons.loading,
    squadronsErrors: squadrons.errors,
    squadrons: squadrons.squadrons,
    flightsLoading: flights.loading,
    flightsErrors: flights.errors,
    flights: flights.flights,
    AETsLoading: AETs.loading,
    AETsErrors: AETs.errors,
    AETs: AETs.AETs,
});


const mapDispatchToProps = {
    squadronsFetchRequest,
    flightsFetchRequest,
    AETsFetchRequest,
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
  margin-bottom: 1px;
  
  .MenuItemRow {
  :hover {
   background: #333;
}
  }
`;

const Menu = styled('div')`
width: inherit;
`;


const MenuTitle = styled('div')`
  width: 100%;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  
span {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    width: 100%;
    height: 29px;
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
background: rgba(148,148,148,0.38);
/* Borders */

box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);

`;





