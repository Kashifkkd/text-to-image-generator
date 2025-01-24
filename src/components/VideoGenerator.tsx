import axios from "axios"
import { useState } from "react"
import CustomInput from "./CustomInput"
import CustomButton from "./CustomButton"

const VideoGenerator = () => {
    const [text, setText] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const API_KEY = import.meta.env.VITE_IMAGE_API_KEY

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (loading) {
            return
        }

        try {
            setLoading(true)
            const response = await axios.post('https://api.deepai.org/generate_video', {
                text: text,
            }, {
                headers: {
                    'Api-Key': API_KEY
                }
            })
            setVideoUrl(response.data.output_url)
            setText('')
        } catch (error) {
            console.error('Error generating video:', error)
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
                    <CustomButton type="submit">Generate Video</CustomButton>
                </div>

            </form>

            <div style={{ marginLeft: '2rem', marginTop: "2rem" }}>
                {loading ? <div style={{ padding: "1rem" }}><h3>Loading...</h3></div> : videoUrl ? (
                    <video controls style={{ maxWidth: '100%', borderRadius: '8px' }}>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : null}
            </div>

        </div>
    );
}

export default VideoGenerator;