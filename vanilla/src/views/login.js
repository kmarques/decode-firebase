import { navigateTo } from "../components/link.js";
import { auth } from "../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const path = "/login";

export function loadEventListeners() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log('User is signed in with UID:', uid);
            navigateTo('/');
        } else {
            console.log('No user is signed in.');
        }
    });

    function handleGoogleAuth() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log('Google sign-in successful:', user);
            })
            .catch((error) => {
                console.error('Error during Google sign-in:', error);
            });
    }

    function handleRegister(event) {
        debugger;
        event.preventDefault();
        console.log('Registering...');
        createUserWithEmailAndPassword(auth, event.target.email.value, event.target.password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User registered:', user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error registering:', errorCode, errorMessage);
            });
    }
    function handleLogin(event) {
        debugger;
        event.preventDefault();
        console.log('Logging in...');
        signInWithEmailAndPassword(auth, event.target.email.value, event.target.password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User logged in:', user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error logging in:', errorCode, errorMessage);
            });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const googleButton = document.getElementById('connect-google');
    if (googleButton) {
        googleButton.addEventListener('click', handleGoogleAuth);
    }
}

export function generatePage() {
  return `
    <div>
      <h2>Login Page</h2>
      <form id="register-form">
        <h3>Register</h3>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <form id="login-form">
        <h3>Login</h3>
        <button id="connect-google" type="button">Connect with google</button>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  `;
}