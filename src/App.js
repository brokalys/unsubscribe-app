import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    const params = queryString.parse(window.location.search);

    this.state = {
      success: false,
      error: false,
      key: params.key,
      id: params.id,
      all: false,
    };

    this.unsubscribe = this.unsubscribe.bind(this);
    this.toggleAllState = this.toggleAllState.bind(this);
  }

  async unsubscribe() {
    try {
      await axios.post('https://api.brokalys.com/', {
        query: `
          mutation {
            unsubscribePinger(
              id: ${this.state.id},
              unsubscribe_key: "${this.state.key}",
              all: ${Boolean(this.state.all)},
            )
          }
        `
      });

      this.setState({ success: true });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  toggleAllState() {
    this.setState({ all: !this.state.all });
  }

  render() {
    if (!this.state.key || !this.state.id) {
      return (
        <p className="feedback-error">Invalid unsubscribe link.</p>
      );
    }

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
        <label><input type="checkbox" onChange={this.toggleAllState} />Unsubscribe from ALL pingers fro this email address</label>
      </div>
    );
  }
}

export default App;
