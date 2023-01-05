import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

let state = undefined;


const root = ReactDOM.createRoot(document.getElementById('layoutSidenav_content'));

function Render (state) {
  root.render(
    <React.StrictMode>
      <App message={state}/>
    </React.StrictMode>,
  )
}



function toggleSideBar () {
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
      // Uncomment Below to persist sidebar toggle between refreshes
      if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
          document.body.classList.toggle('sb-sidenav-toggled');
      }
      sidebarToggle.addEventListener('click', event => {
          event.preventDefault();
          document.body.classList.toggle('sb-sidenav-toggled');
          localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      });
  }
}

function bindButton () {
  const doThis = () => {
    const message = prompt('Enter someting');
    Render(message);
  }
  document.querySelector('#clickme').addEventListener('click', doThis)
}


function init () {
  toggleSideBar();
  bindButton();
  Render();
}

window.addEventListener('DOMContentLoaded', init);