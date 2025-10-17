import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { path as loginPath, generatePage as generateLoginPage, loadEventListeners as loadLoginEventListeners } from './views/login.js'
import Link from './components/link.js';
import { auth } from './config/firebase.js';
import { onAuthStateChanged, signOut } from '@firebase/auth';

const appElement = document.querySelector('#app');

function generate() {
  switch(window.location.pathname) {
    case loginPath:
      appElement.innerHTML = generateLoginPage();
      loadLoginEventListeners();
      break;
    default:
      appElement.innerHTML = renderDefaultPage();
      document.querySelector('#logout').addEventListener('click', (event) => {
        event.preventDefault();
        signOut(auth).then(() => {
          console.log('User signed out.');
          window.location.reload();
        });
      });
      break;
  }
}

window.addEventListener('popstate', generate);
window.addEventListener('load', generate);
window.addEventListener('pushstate', generate);

onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log('User is signed in with UID:', uid);
        } else {
            console.log('No user is signed in.');
        }
    });

function renderDefaultPage() {
  return `
    <div>
      <a id="logout">Logout</a>
      <a href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
      </a>
      <h1>Hello Vite!</h1>
      ${Link({ to: loginPath, title: 'Go to Login' })}
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
      <p class="read-the-docs">
        Click on the Vite logo to learn more
      </p>
    </div>
  `;
}