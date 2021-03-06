import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import './App.css';

function App() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [key, setKey] = useState();
  const [id, setId] = useState();
  const [all, setAll] = useState(false);

  useEffect(() => {
    const params = queryString.parse(window.location.search);

    setKey(params.key);
    setId(params.id);
  }, []);

  async function unsubscribe() {
    try {
      await axios.post('https://api.brokalys.com/', {
        query: `
          mutation {
            unsubscribePinger(
              id: "${id}",
              unsubscribe_key: "${key}",
              all: ${Boolean(all)},
            )
          }
        `
      });

      setSuccess(true);
    } catch (e) {
      setError(true);
    }
  }

  function toggleAllState() {
    setAll(!all);
  }

  if (!key || !id) {
    return (
      <p className="feedback-error">Invalid unsubscribe link.</p>
    );
  }

  if (success) {
    return (
      <p className="feedback-success">Unsubscribed succesfully.</p>
    );
  }

  if (error) {
    return (
      <p className="feedback-error">Failed unsubscribing. Please try again later.</p>
    );
  }

  return (
    <div>
      <p>Are You sure You want to unsubscribe?</p>
      <button onClick={unsubscribe}>Yes, don't send me PINGER emails anymore</button>
      <label><input type="checkbox" onChange={toggleAllState} />Unsubscribe from ALL pingers fro this email address</label>
    </div>
  );
}

export default App;
