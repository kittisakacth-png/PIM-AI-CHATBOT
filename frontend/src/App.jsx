import { useState } from "react";
import axios from "axios";

function App() {
const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [loading, setLoading] = useState(false);

const askAI = async () => {
if (!question.trim()) return;

try {
  setLoading(true);

  const response = await axios.post(
    "https://pim-ai-chatbot.onrender.com/ask",
    {
      question,
    }
  );

  setAnswer(response.data.answer);
} catch (error) {
  console.error(error);
  setAnswer("Error connecting to AI");
} finally {
  setLoading(false);
}

};

return (
<div
style={{
maxWidth: "800px",
margin: "50px auto",
padding: "20px",
fontFamily: "Arial",
}}
> <h1>PIM AI Assistant</h1>

```
  <input
    type="text"
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    placeholder="Ask something..."
    style={{
      width: "100%",
      padding: "12px",
      fontSize: "16px",
    }}
  />

  <button
    onClick={askAI}
    disabled={loading}
    style={{
      marginTop: "10px",
      padding: "12px 20px",
      cursor: "pointer",
    }}
  >
    {loading ? "Loading..." : "Send"}
  </button>

  <div
    style={{
      marginTop: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      minHeight: "100px",
    }}
  >
    {answer}
  </div>
</div>

);
}

export default App;
