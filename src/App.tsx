import React from 'react';
import { Map, Tabs } from "./components"
import styled from 'styled-components';

const Container = styled.div`
  position:relative;
  .header{
    width: fit-content;
    margin: 0px 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2px;
  }
`


const Name:React.FC<{name:string}>=()=><div className='header' style={{width:'fit-content',margin: '0 10px'}}>Outbreaks</div>
const App = () => {

  return (
    <Container>
      <Map />
      <Tabs><Name name={'name'} /></Tabs>
    </Container>
  );

}

export default App;
