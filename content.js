let mediaRecorder = null;
let recordedChunks = [];

window.startRecording = async function () {
  const player = document.querySelector('.html5-video-player video');

  if (!player) {
    alert('YouTube video element not found!');
    return;
  }

  if (mediaRecorder && mediaRecorder.state === "recording") {
    console.warn("Already recording...");
    return;
  }

  const stream = player.captureStream();

  recordedChunks = []; // reset before each new recording
  mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9',
    videoBitsPerSecond: 8000000,
    audioBitsPerSecond: 256000
  });
  
  

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = function () {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'youtube_clip.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);
  };

  mediaRecorder.start();
  console.log("Recording started...");
};

window.stopRecording = function () {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    console.log("Recording stopped.");
  }
};
