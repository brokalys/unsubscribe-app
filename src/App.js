import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      success: false,
      error: false,
    };

    this.unsubscribe = this.unsubscribe.bind(this);
  }

  async unsubscribe() {
    const [,, key, id] = window.location.pathname.split('/');

    try {
      await axios.post('https://api.brokalys.com/', {
        query: `mutation {
          unsubscribePinger(id: ${id}, unsubscribe_key: "${key}")
        }`
      });

      this.setState({ success: true });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  render() {
    if (this.state.success) {
      return (
        <p className="feedback-success">Unsubscribed succesfully.</p>
      );
    }

    if (this.state.error) {
      return (
        <p className="feedback-error">Failed unsubscribing. Please try again later.</p>
      );
    }

    return (
      <div>
        <p>Are You sure You want to unsubscribe?</p>
        <button onClick={this.unsubscribe}>Yes, don't send me PINGER emails anymore</button>
      </div>
    );
  }
}

export default App;
