import * as React from 'react';
// import Member from "../../dispatchAndState/members/Member";
import Page from "../../style/layout/Page";
import color from "@material-ui/core/colors/blueGrey";
import styled from "styled-components";
import {Message} from "@material-ui/icons";


// Separate state props + dispatch props to their own interfaces.
interface Props{
    classname?: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so

class InProcessingIndexPage extends React.Component<Props> {

    public render() {
        return (
            <Page
                className="InProcessingPage"
            >
                <Message>
                <a>This will soon be a login page. Please add /members to the url above and press enter to see the main dashboard.</a>
                </Message>
                {/*<InProcessingPage />*/}
            </Page>
        );
    }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default InProcessingIndexPage;


// export const Message = styled('div')`
// color: #aaaaaa;
// `;