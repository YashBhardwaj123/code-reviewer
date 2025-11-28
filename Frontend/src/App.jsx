import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

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
    const { data } = await axios.post('http://localhost:3000/ai/get-review', { code })
    console.log("API returned:", data)

    // Most likely your server returns { response: "<markdown string>" }
    // Use that field — otherwise fall back to data itself if it's already a string.
    const text = typeof data === 'string' ? data : data?.response ?? data?.markdown ?? data?.review

    // As a last resort convert object to pretty JSON so <Markdown> receives a string (won't be markdown but avoids crash)
    setReview(typeof text === 'string' ? text : JSON.stringify(data, null, 2))
  } catch (err) {
    console.error("reviewCode error:", err)
    setReview("Error: could not fetch review — check console for details.")
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