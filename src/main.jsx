import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import indexedDBController from './indexedDB/indexedDB';

const DB_NAME = 'ORDER_MANAGEMENT';

const root = ReactDOM.createRoot(document.getElementById('layoutSidenav_content'));

function Render (db, state = 1) {
  root.render(
    <React.StrictMode>
      <App db={db} state={state}/>
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

async function registerIndexedDB () {
  if (!('indexedDB' in window)) {
    alert('You browser does not support indexedDB, cannot store data in offline mode')
  } else {
    console.log('initialize indexedDB...')
    try {
      return await indexedDBController.createDB(DB_NAME, 1)
    } catch (error) {
      alert('Error has occured: \n' + error)
    }
    
  }
}


async function init () {
  const DB = await registerIndexedDB();
  toggleSideBar();
  Render(DB);
  document.querySelector('#Menu').addEventListener('click', () => {Render(DB, 0)})
  document.querySelector('#Orders').addEventListener('click', () => {Render(DB, 1)})
}

window.addEventListener('DOMContentLoaded', init);