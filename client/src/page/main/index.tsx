import * as React from 'react';
import MainDashboard from "./MainDashboard";

interface Props{
    classname?: string;
}

class MainIndexPage extends React.Component<Props> {

    public render() {
        return (
                <MainDashboard />
        );
    }
}

export default MainIndexPage;




