import * as React from 'react';
import {StyledMainDashboard} from "./MainDashboard";

interface Props{
    classname?: string;
}

class MainIndexPage extends React.Component<Props> {

    public render() {
        return (
                <StyledMainDashboard />
        );
    }
}

export default MainIndexPage;




