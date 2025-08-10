'use client';

import { useState } from 'react';
import axios from 'axios';

export default function UploadSong() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const upload = async () => {
    if (!file) return;
    setStatus('Uploading...');
    const form = new FormData();
    form.append('file', file);
    await axios.post('/api/upload', form);
    setStatus('Uploaded');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-heading">Upload Song</h1>
      <div className="glass p-4 rounded-lg">
        <input
          type="file"
          accept="audio/mpeg,audio/wav"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      <button className="btn-neon px-4 py-2" onClick={upload} disabled={!file}>
        Upload
      </button>
      {status && <div>{status}</div>}
    </div>
  );
}
