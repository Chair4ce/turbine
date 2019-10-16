import * as React from 'react';
import { ReactReduxContext } from 'react-redux';

import { ApplicationState } from '../store';
import { ThemeColors } from '../store/layout';
import * as layoutActions from '../store/layout/actions';

// Now here is an example of creating container components.
//
// Before React v16 I would've suggested against implementing container components that are
// separate from their connected view logic, since they intrude at the very definition of a view,
// but now with newer patterns (e.g. render props), it makes sense to use them once again.
//
// See how this works at `./src/components/Header`

// Redux-specific props.
interface LayoutContainerProps {
    theme: ThemeColors;
    setTheme: (theme: ThemeColors) => void;
}

// Wrapper props for render/children callback.
interface LayoutContainerRenderProps {
    render?: (props: LayoutContainerProps) => React.ReactNode;
    children?: (props: LayoutContainerProps) => React.ReactNode;
}

const LayoutContainer: React.FC<LayoutContainerRenderProps> = ({ render, children }) => {
    // Here we do a bit of a hack. Since the latest react-redux typings broke the
    // "children-props-as-redux-container" approach on the previous version of this guide,
    // we use the newly-introduced `ReactReduxContext` consumer to get our state, and map the
    // `theme` state and the `setTheme` action call inside it.
    return (
        <ReactReduxContext.Consumer>
            {({ store }) => {
                // Use the standard `store.getState()` redux function to get the root state, and cast
                // it with our ApplicationState type.
                const state: ApplicationState = store.getState();

                // Obtain the `theme` state and the `setTheme` action.
                // Note that per Redux conventions actions MUST be wrapped inside `store.dispatch()`
                const { theme } = state.layout;
                const setTheme = (tc: ThemeColors) => store.dispatch(layoutActions.setTheme(tc));

                // Create a render/children props wrapper with the above variables set as a callback.
                if (render) {
                    return render({ theme, setTheme });
                }

                if (children) {
                    return children({ theme, setTheme });
                }

                return null;
            }}
        </ReactReduxContext.Consumer>
    );
};

export default LayoutContainer;
