const video = document.getElementById("video");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const timerElement = document.getElementById("timer");

let recorder, stream;

startBtn.addEventListener("click", async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  video.srcObject = stream;
  recorder = new MediaRecorder(stream);
  recorder.start();


  let count = 0;

  setInterval(() => {
    count++;

    const hours = Math.floor(count / 3600);
    const minutes = Math.floor((count - hours * 3600) / 60);
    const seconds = count - hours * 3600 - minutes * 60;

    const timeString = `Recording Time: ${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    timerElement.textContent = timeString;
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  recorder.stop();
  stream.getTracks().forEach((track) => track.stop());
});

recorder.addEventListener("dataavailable", (e) => {
  const a = document.createElement("a");
  const videoBlob = new Blob([e.data], { type: "video/webm" });
  a.href = URL.createObjectURL(videoBlob);
  a.download = "video.webm";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
