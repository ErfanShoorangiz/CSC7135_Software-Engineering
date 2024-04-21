import React from 'react';
import './LandingPage.css'; //This is our custom CSS file

class LandingPage extends React.Component {
    state = { tweet: '' };

    handleInputChange = (event) => {
        this.setState({ tweet: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        //we are checking the fetch request as a test function from the post request in python
        fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({tweet: this.state.tweet})
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

    };

    render() {
        return (
            <div className="container">
                <h1>Welcome to Tweet Sentiment Analyzer</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.tweet}
                        onChange={this.handleInputChange}
                        placeholder="Enter your tweet here..."
                        className="tweet-input"
                    />
                    <button type="submit" className="submit-button">Analyze Sentiment</button>
                </form>
            </div>
        );
    }
}

export default LandingPage;
