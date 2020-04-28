/* global chrome */
import React from 'react';

export default function Login() {

    const onSubmit = e => {
        e.preventDefault();
        console.log('submit');
    }

    const onClickLogin = e => {
        console.log('event', e);
        chrome.identity.getAuthToken({interactive: true}, function(token) {
          let init = {
            method: 'GET',
            async: true,
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            'contentType': 'json'
          };
          fetch(
              'https://people.googleapis.com/v1/contactGroups/all?key=AIzaSyD9VzCBawbBZR6LNJdbFWVJF_HYdiGQc_Y',
              init)
              .then((response) => response.json())
              .then(function(data) {
                console.log(data)
              });
        });
      }

    return (
        <div>
            <button onSubmit={onSubmit}>
                normal login
            </button>
            <button onClick={onClickLogin}>
                google login
            </button>
        </div>
    )
}