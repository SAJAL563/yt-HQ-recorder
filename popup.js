let isRecording = false;
let timerInterval;
let startTime;

const toggleBtn = document.getElementById('toggleBtn');
const timerEl = document.getElementById('timer');

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');
  timerEl.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer(); // show 00:00 immediately
}

function stopTimer() {
  clearInterval(timerInterval);
  timerEl.textContent = '00:00';
}

toggleBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!isRecording) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => window.startRecording()
      });
      toggleBtn.textContent = 'Stop Recording';
      toggleBtn.classList.add('recording');
      startTimer();
    } else {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => window.stopRecording()
      });
      toggleBtn.textContent = 'Start Recording';
      toggleBtn.classList.remove('recording');
      stopTimer();
    }
    isRecording = !isRecording;
  });
});
