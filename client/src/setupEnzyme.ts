import {configure} from 'enzyme';
//@ts-ignore
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {RouterState} from "connected-react-router";
import {ApplicationState} from "./store";
import {MemberInitState} from "./store/members";
import {LayoutInitState} from "./store/layout";
import {SquadronInitState} from "./store/squadrons";
import {ShowModalInitState} from "./store/modals";
import {GainingInitState} from "./store/gaining";
import {ImportChangeInitState} from "./store/importChanges";

configure({ adapter: new EnzymeAdapter() });



const initRouter: RouterState = {
        location: {
            pathname: 'Pathname',
            search: 'Search',
            state: 'S',
            hash: 'Hash',
        },
        action: 'PUSH'
    }
;

export const initStore: ApplicationState = {
    layout: LayoutInitState,
    squadrons: SquadronInitState,
    showModal: ShowModalInitState,
    members: MemberInitState,
    gaining: GainingInitState,
    importChanges: ImportChangeInitState,
    router: initRouter,
};