// Biến để kiểm soát trạng thái
let timer;
let startTime;
let elapsedTime = 0;
let questionNumber = 1;
const maxQuestions = 15;
const maxTime = 15000; // 9 giây tính theo mili giây
const delayTime = 1725; // Thời gian delay 1 giây 73 mili giây

// Video thay thế khi dừng dưới 7 giây và trên 7 giây
const videoSuccess = "defuse-success.mp4"; // Đường dẫn đến video A
const videoFail = "defuse-late.mp4"; // Đường dẫn đến video B

// Bắt đầu ứng dụng
document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("question-screen").style.display = "block";
  startQuestion();
});

function startQuestion() {
  if (questionNumber > maxQuestions) {
    endQuiz();
    return;
  }

  document.getElementById("question-text").innerText = `Câu hỏi số ${questionNumber}`;
  elapsedTime = 0;
  document.getElementById("timer").innerText = `Thời gian: 0.000 giây`;
  
  const video = document.getElementById("video");
  video.src = "plant-spike.mp4"; // Đường dẫn đến video 9 giây
  video.play();

  // Delay trước khi bắt đầu đếm thời gian
  setTimeout(() => {
    startTime = Date.now();
    timer = setInterval(updateTimer, 1); // Cập nhật mỗi 1ms
  }, delayTime);
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  let seconds = (elapsedTime / 1000).toFixed(3);
  document.getElementById("timer").innerText = `Thời gian: ${seconds} giây`;

  if (elapsedTime >= 13730) {
    clearInterval(timer);
    displayVideoFail(); // Tự động dừng và hiển thị video B nếu quá 9 giây
  }
}

document.getElementById("stop-timer-button").addEventListener("click", () => {
  clearInterval(timer);
  if (elapsedTime < 7000) {
    displayVideoSuccess();
  } else {
    displayVideoFail();
  }
});

document.getElementById("next-question-button").addEventListener("click", () => {
  // Kết thúc thời gian và video trước đó
  clearInterval(timer);
  document.getElementById("video").pause(); // Dừng video hiện tại
  document.getElementById("video").currentTime = 0; // Reset lại video

  questionNumber += 1;
  startQuestion();
});

function displayVideoSuccess() {
  const video = document.getElementById("video");
  video.src = videoSuccess;
  video.play();
}

function displayVideoFail() {
  const video = document.getElementById("video");
  video.src = videoFail;
  video.play();
}

function endQuiz() {
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "block";
}
