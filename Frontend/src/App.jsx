import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'
import { API_BASE } from './config'

function App() {
  const [ code, setCode ] = useState(` /* please write your function(code) here */
`)

  const [ review, setReview ] = useState(``)
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      setIsLoading(true)
      const apiBase = API_BASE
      const response = await axios.post(`${apiBase}/ai/get-review`, { code })
      const data = response.data
      setReview(data.review ?? data)
    } catch (err) {
      console.error(err)
      if (err.response && err.response.status === 429) {
        setReview('Too many requests. Please wait a few minutes and try again.')
      } else {
        setReview('Error fetching review. See console for details.')
      }
    } finally {
      setIsLoading(false)
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
          {isLoading ? (
            <span className='ldr'>Loading...</span>
          ) : (
            <Markdown rehypePlugins={[ rehypeHighlight ]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  )
}



export default App