import React from 'react';
import { Map } from "./components"
import styled from 'styled-components';

const Container = styled.div`
  position:relative;
`

const App = () => {

  return (
    <Container>
      <Map />
      <div>hello</div>
    </Container>
  );

}

export default App;
