import { useState } from 'react'
import axios from 'axios'
import dotenv from 'dotenv'


dotenv.config()

function App() {

  const [text, setText] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const API_KEY = process.env.IMAGE_API_KEY


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://api.deepai.org/api/text2img', {
        text: text,
        image_generator_version: "standard",
        use_old_model: false,
        quality: true,
        genius_preference: "classic"
      }, {
        headers: {
          'api-key': API_KEY
        }
      })
      setImageUrl(response.data.output_url)
    } catch (error) {
      console.error('Error generating image:', error)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: "row",
        backgroundColor: '#f0f2f5',
        height: '100vh',
      }}
    >
      <form
        onSubmit={onSubmit}
      >
        <div style={{ padding: "1rem", gap: "1rem", display: "flex", flexDirection: "row", alignItems: "center" }}>
          <textarea
            style={{
              width: '20rem',
              height: '70px',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '1rem',
              fontSize: '1rem'
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
          />
          <button
            style={{
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '1rem',
              backgroundColor: '#007bff',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              height: "fit-content"
            }}
            type="submit"
          >
            Generate
          </button>
        </div>

      </form>

      {imageUrl && (
        <div style={{ marginLeft: '2rem' }}>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', borderRadius: '8px' }} />
        </div>
      )}
    </div>
  )
}

export default App