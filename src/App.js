import styled from 'styled-components';
import TheBoard from "./components/TheBoard";

/*===========================================*/
/*              STYLED COMPONENTS            */
/*===========================================*/

const AppBg = styled.div`
padding: 2rem;
  height : 100vh;
  width: 100vw;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  overflow: hidden;

  background: var(--background-color);
`

const ClickHere = styled.a`
  cursor: pointer;
  opacity: 0.6;
  color: white;
  z-index: 2000;
  font-family: sans-serif;
  text-decoration: none;

  transition: all 0.2s ease-in-out;

  &:is(:hover, :active: :focus, :focus-visible) {
    opacity: 1;
  }
`;

/*===========================================*/
/*                 COMPONENT                 */
/*===========================================*/

function App() {

  return (
    <AppBg>
      <TheBoard></TheBoard>
      <ClickHere href="https://www.youtube.com/watch?v=9l4gqhRkZoo">Clique ici Rémi</ClickHere>
    </AppBg>
  );
}

export default App;
