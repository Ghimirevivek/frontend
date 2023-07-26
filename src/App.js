import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [transcript, setTranscript] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://youtube-transcrip.onrender.com/api/getTranscript',
        { youtubeUrl }
      );
      setTranscript(response.data.transcript);
    } catch (error) {
      console.error('Error fetching transcript:', error);
    }
  };
  console.log(transcript);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder='Enter YouTube URL'
          style={{
            padding: '10px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '300px',
          }}
        />
        <button
          type='submit'
          style={{
            padding: '10px 15px',
            borderRadius: '5px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Get Transcript
        </button>
      </form>
      {transcript && (
        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          {transcript}
        </div>
      )}
    </div>
  );
};

export default App;
