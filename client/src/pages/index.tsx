import * as React from 'react'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'
import styled from '../utils/styled'

function Main() {
    return (
        <Page>
            <TopBorder>
                <Container>
                    <PageContent>
                        <h1>Welcome to Turbine!</h1>
                    </PageContent>
                </Container>
            </TopBorder>
        </Page>
    )
}

export default Main

const TopBorder = styled('div')`
position: absolute;
width: 100vw;
height: 1px;
left: 198px;
top: 46px;
background: #949494;
box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25)`;

const PageContent = styled('article')`
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  line-height: 1.6;

  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.fonts.headings};
    line-height: 1.25;
  }
`;
