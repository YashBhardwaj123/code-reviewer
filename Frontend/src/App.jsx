import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

// Use environment variable in production; fall back to localhost for dev.
const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      const { data } = await axios.post(`${BASE_URL}/ai/get-review`, { code }, {
        headers: { "Content-Type": "application/json" },
        timeout: 20000
      })
      console.log("API returned:", data)

      const text = typeof data === 'string'
        ? data
        : data?.response ?? data?.markdown ?? data?.review ?? data?.message ?? JSON.stringify(data, null, 2)

      setReview(typeof text === 'string' ? text : JSON.stringify(data, null, 2))
    } catch (err) {
      console.error("reviewCode error:", err)
      if (err?.response) {
        console.error("Server status:", err.response.status)
        console.error("Server response:", err.response.data)
        const serverMsg =
          (typeof err.response.data === "string" && err.response.data) ||
          err.response.data?.error ||
          err.response.data?.message ||
          JSON.stringify(err.response.data, null, 2)
        setReview(`Server responded ${err.response.status}: ${serverMsg}`)
        return
      }
      if (err?.request) {
        console.error("No response received. Request object:", err.request)
        setReview("Network error: no response received from backend. Check console for more details.")
        return
      }
      setReview(`Error: ${err?.message ?? "Unknown error"}`)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <Markdown
            rehypePlugins={[ rehypeHighlight ]}
          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}

export default App
