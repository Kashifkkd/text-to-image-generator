import DynamicTabs from './components/DynamicTabs'
import ImageGenerator from './components/ImageGenerator'
import VideoGenerator from './components/VideoGenerator'
import './App.css'

function App() {
  const tabs = [
    { label: 'Image', content: <ImageGenerator /> },
    { label: 'Video', content: <VideoGenerator /> },
  ]

  return (
    <div className="app-container">
      <DynamicTabs tabs={tabs} />
    </div>
  )
}

export default App