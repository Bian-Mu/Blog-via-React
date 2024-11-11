import { Outlet } from "react-router";
import Nav from "./components/zother/Nav/Nav"
import SelfIntro from "./components/zother/SelfIntro/SelfIntro"
import "./App.css"
import React from "react";
function App() {
  return (
    <div className="App">
      <Nav />
      <main>
        <SelfIntro />
        <article>
          <Outlet />
        </article>
      </main>
    </div>
  );
}

export default App;
