import Enzyme from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import {RouterState} from "connected-react-router";
import {ApplicationState} from "./store";

Enzyme.configure({adapter: new Adapter()});
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