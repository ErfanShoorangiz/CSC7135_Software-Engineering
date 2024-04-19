import React from 'react';
import './LandingPage.css'; //This is our custom CSS file

class LandingPage extends React.Component{
    state = {tweet: ''};
}
handleInputChange = (event)=>{
    this.setState({tweet: event.target.value});
};
handleSubmit = (event)=>{
    event.preventDefault();
    fetch('http://localhost:5000/analyze', { // we are currently assuming that the python backend is running on localhost: 5000
    method: 'POST',
    headers:{
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({tweet: this.state.tweet})
    })
    .then(response=>response.JSON())
    .then(data=> alert('Sentiment: $(data.sentiment)')) //displaying sentiment in an alert for simplicity
    .catch(error=> console.error('Error:', error));
};

    return(
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


export default LandingPage;