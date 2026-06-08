import { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/ask",
        {
          question,
        }
      );

      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      setAnswer("Error connecting to AI");
    }
  };

  return (
    <div style={{
      maxWidth: "800px",
      margin: "50px auto",
      padding: "20px"
    }}>
      <h1>PIM AI Assistant</h1>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <button
        onClick={askAI}
        style={{
          marginTop: "10px",
          padding: "10px"
        }}
      >
        Send
      </button>

      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ddd",
          padding: "20px"
        }}
      >
        {answer}
      </div>
    </div>
  );
}

export default App;