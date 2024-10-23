import { Outlet } from "react-router";
import Nav from "./components/zother/Nav/Nav"
import SelfIntro from "./components/zother/SelfIntro/SelfIntro"

function App() {
  return (
    <div className="App">
      <SelfIntro />
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
