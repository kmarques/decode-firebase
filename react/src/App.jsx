import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./config/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {user && <Home user={user} />}
      {!user && <Login />}
    </>
  );
}

export default App;
