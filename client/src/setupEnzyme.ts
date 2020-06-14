import {configure} from 'enzyme';
//@ts-ignore
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {RouterState} from "connected-react-router";
import {ApplicationState} from "./store";

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
    router: initRouter,
};