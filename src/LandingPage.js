import React from 'react';
import './LandingPage.css';

class LandingPage extends React.Component{
    state = {tweet: ''};

    handleInputChange = (event)=>{
        this.setState({tweet: event.target.value});
    };
    handleSubmit = (event)=>{
        event.preventDefault();
        //Placeholder for submission logic
        alert('Tweet to analyze: ${this.state.tweet}');
    };

    render(){
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
