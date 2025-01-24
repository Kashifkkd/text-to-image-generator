import axios from "axios"
import { useState } from "react"
import CustomInput from "./CustomInput"
import CustomButton from "./CustomButton"

const ImageGenerator = () => {
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
                quality: false,
                genius_preference: "classic"
            }, {
                headers: {
                    'Api-Key': API_KEY
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
                height: '80vh',
                width: "100%",
                gap: "4rem",
                backgroundColor: '#f0f2f5',
                borderRadius: "0.7rem"
            }}
        >
            <form
                onSubmit={onSubmit}
            >
                <div style={{ padding: "1rem", gap: "1rem", display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1rem" }}>
                    <CustomInput
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter your text here..."
                    />
                    <CustomButton type="submit">Generate Image</CustomButton>
                </div>

            </form>

            <div style={{ marginLeft: '2rem', marginTop: "2rem" }}>
                {loading ? <div style={{ padding: "1rem" }}><h3>Loading...</h3></div> : imageUrl ? <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', borderRadius: '8px' }} /> : null}
            </div>

        </div>
    );
}

export default ImageGenerator;