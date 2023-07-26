import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleError(youtubeUrl);
    console.log(error);
    if (!error) {
      setLoading(true);
      try {
        const response = await axios.post(
          'https://youtube-transcrip.onrender.com/api/getTranscript',
          { youtubeUrl }
        );
        setTranscript(response.data.transcript);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error('Error fetching transcript:', error);
      }
    }
    setLoading(false);
  };

  const handleError = (url) => {
    console.log(url);
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/;
    if (url.slice(0, 32) === 'https://www.youtube.com/watch?v=') {
      setError(false);
    } else {
      setError(true);
    }
    if (!regExp.test(url)) {
      setError(true);
    } else {
      setError(false);
    }
  };

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
      {loading ? (
        <>Loading...</>
      ) : !error ? (
        transcript && (
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
        )
      ) : (
        <div>Invalid Url</div>
      )}
    </div>
  );
};

export default App;
