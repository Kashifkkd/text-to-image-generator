import { useState } from 'react'
import axios from 'axios'


function App() {

  const [text, setText] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const API_KEY = import.meta.env.VITE_IMAGE_API_KEY

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loading) {
      return
    }

    try {
      setLoading(true)
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
      setText('')
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: "row",
        backgroundColor: '#f0f2f5',
        height: '100vh',
        gap: "4rem"
      }}
    >
      <form
        onSubmit={onSubmit}
      >
        <div style={{ padding: "1rem", gap: "1rem", display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1rem" }}>
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

      <div style={{ marginLeft: '2rem', marginTop: "2rem" }}>
        {loading ? <div style={{ padding: "1rem"}}><h3>Loading...</h3></div> : imageUrl ? <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', borderRadius: '8px' }} /> : null}
      </div>

    </div>
  )
}

export default App