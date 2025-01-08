import React from "react";
import "./App.css";
import SentimentForm from "./components/SentimentForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Product Review Sentiment Analyzer</h1>
      <SentimentForm />
    </div>
  );
};

export default App;
