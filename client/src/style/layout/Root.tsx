import * as React from 'react';
import styled from "styled-components";

interface RootProps {
    className?: string;
}

const Root: React.FC<RootProps> = ({ children }) => <Wrapper>{children}</Wrapper>;

export default Root;

const Wrapper = styled('div')`
`;
