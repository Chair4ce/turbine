import * as React from "react";
import {shallow} from "enzyme";
import {initStore} from "../../setupEnzyme";
import {Provider} from "react-redux";
import configureStore from "../../configureStore";


const initState = {
    ...initStore,
    members: {
        members: [],
        loading: true
    }
}

// @ts-ignore
const mockStore = configureStore(history, initState);

describe('Login Page', () => {

    beforeEach(() => {
      let subject = shallow(
            <Provider store={mockStore}>
            {/*<LoginDashboard />*/}
            </Provider>
        )
    })
});