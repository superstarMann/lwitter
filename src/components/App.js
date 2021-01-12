import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>Hunwitter/edc94503@gmail.com</footer>
    </>
  );
}

export default App;