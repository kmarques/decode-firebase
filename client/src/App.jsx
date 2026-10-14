import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { auth, providers } from "./lib/firebase";
import { createUserWithEmailAndPassword, getIdToken, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect } from 'react';
import { useCallback } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    setTimeout(() =>
      onAuthStateChanged(auth, async function (user) {
        console.log("onMount", user);
        setAuthUser(user);
        const authToken = await getIdToken(user);
        console.log(authToken);
      })
      , 5000);
  }, []);

  const handleCreateUser = useCallback(async function (formEvent) {
    formEvent.preventDefault();
    const data = new FormData(formEvent.currentTarget);

    try {
      const credentials = await createUserWithEmailAndPassword(auth, data.get('email'), data.get('password'));
      setAuthUser(credentials.user);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleLogin = useCallback(async function (formEvent) {
    formEvent.preventDefault();
    const data = new FormData(formEvent.currentTarget);

    try {
      const credentials = await signInWithEmailAndPassword(auth, data.get('email'), data.get('password'));
      setAuthUser(credentials.user);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleGoogleSignin = useCallback(async function () {
    const signinResult = await signInWithPopup(auth, providers.google);
    setAuthUser(signinResult.user);
  }, []);

  const handleLogout = useCallback(async function () {
    await signOut(auth);
    setAuthUser(null);
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        {authUser === undefined && <p>Chargement du user...</p>}
        {authUser === null && <>
          <form onSubmit={handleCreateUser}>
            <h2>Création de compte</h2>
            <input placeholder='email' name="email" />
            <input placeholder='password' name="password" />
            <input type='submit' value="S'inscrire" />
          </form>
          -- Ou --
          <button onClick={handleGoogleSignin}>Se connecter via Google</button>
          <form onSubmit={handleLogin}>
            <h2>Connexion</h2>
            <input placeholder='email' name="email" />
            <input placeholder='password' name="password" />
            <input type='submit' value="S'inscrire" />
          </form>
        </>}
        {authUser && <p>{JSON.stringify(authUser)}<button onClick={handleLogout}>Log out</button></p>}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
