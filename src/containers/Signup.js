/* global chrome */
export const onClickSignup = e => {
  e.preventDefault();
  console.log('submit');
}

export const onClickGoogleSignup = e => {
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
