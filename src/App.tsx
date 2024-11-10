import { Outlet, useLocation } from "react-router";
import Nav from "./components/zother/Nav/Nav"
import SelfIntro from "./components/zother/SelfIntro/SelfIntro"
import "./App.css"
import React from "react";
function App() {
  const location = useLocation();
  const isSong = location.pathname.includes("/song")
  return (
    <div className="App">
      <Nav />
      <main>
        <SelfIntro />
        <article className={isSong ? 'songLocation' : ""}>
          <Outlet />
        </article>
      </main>
    </div>
  );
}

export default App;
