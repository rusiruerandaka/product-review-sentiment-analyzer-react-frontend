import React, { useState } from "react";

// Adjust the type to handle numeric values from the backend response
interface SentimentResponse {
  sentiment: number; // This will handle numeric sentiment values (0, 1, 2)
}

const SentimentForm: React.FC = () => {
  const [review, setReview] = useState<string>("");
  const [sentiment, setSentiment] = useState<SentimentResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", { //fetching the backend API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sentiment analysis");
      }

      const data = await response.json();
    console.log("Backend Response:", data); 
    setSentiment(data);
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unknown error occurred");
    }
    console.error(err); 
  } finally {
    setLoading(false);
  }
  };

  
  const sentimentMapping: { [key: string]: string } = {
   "Negative": "Negative 🤮",
    "Neutral": "Neutral 😊",
    "Positive": "Positive 👌",
  };

  const sentimentLabel = sentiment ? sentimentMapping[sentiment.sentiment] : "";

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Analyze Product Review Sentiment</h2>
      <textarea
        placeholder="Enter your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={4}
        style={{
          width: "80%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      ></textarea>
      <br />
      <button
        onClick={handleAnalyze}
        disabled={loading || review.trim() === ""}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {sentiment && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          Sentiment: {sentimentLabel}
        </p>
      )}
    </div>
  );
};

export default SentimentForm;
