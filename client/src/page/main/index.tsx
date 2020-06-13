import * as React from 'react';
// import Member from "../../dispatchAndState/members/Member";
import MainDashboard from "./MainDashboard";

// Separate state props + dispatch props to their own interfaces.
interface Props{
    classname?: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so

class MainIndexPage extends React.Component<Props> {

    public render() {
        return (
                <MainDashboard />
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
export default MainIndexPage;




