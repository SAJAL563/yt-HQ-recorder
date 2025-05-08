# 🎥 YouTube Player Recorder (Chrome Extension)

A minimal, elegant Chrome Extension that lets you record **only the YouTube video player area** — not the full screen — with high-quality output.

Features:

- ✅ Records **only** the YouTube player (not the full tab)
- ✅ Simple toggle button (Start/Stop)
- ✅ Live recording **timer**
- ✅ High-bitrate video capture (up to 15 Mbps)
- ✅ Sleek dark purple **translucent UI**
- ✅ Download in **.webm format** (playable in most browsers & editors)
- ✅ Optional online conversion to `.mp4`

---

## 📦 Files Structure

youtube-recorder/

│

├── manifest.json # Chrome Extension manifest (v3)

├── popup.html # Extension popup UI

├── popup.css # Dark translucent styles

├── popup.js # Toggle button logic and timer

├── content.js # Stream recorder logic (injects into YouTube)

└── icon.png # Your extension icon (48x48 or 128x128)


---

## 🚀 How to Install

1. **Download or Clone this Repo**


2. **Go to Chrome** → `chrome://extensions`

3. Enable **Developer Mode** (top right)

4. Click **"Load unpacked"** → select the `youtube-recorder/` folder

---

## 🧠 How It Works

- Injects a content script into YouTube pages
- Uses `HTMLVideoElement.captureStream()` to get clean video
- Records using `MediaRecorder` with high bitrate
- Auto-downloads the result as `youtube_clip.webm`

---

## 🔄 Optional: Convert WebM to MP4

Chrome cannot record directly to `.mp4`, but you can convert:

- Use [Convertio](https://convertio.co/webm-mp4/)
- Or local tool like `ffmpeg`:
ffmpeg -i youtube_clip.webm -c:v libx264 output.mp4

---

## 🛠️ Configuration

You can tweak quality in `content.js`:

```js
const mediaRecorder = new MediaRecorder(stream, {
mimeType: 'video/webm;codecs=vp9',
videoBitsPerSecond: 15000000, // 15 Mbps
audioBitsPerSecond: 128000
});
```

## 📝 License
MIT License — free to use, modify, and distribute.

# 👨‍💻 Author
Made by Sajal — powered by open web APIs.
