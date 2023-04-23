function boostSound(value) {
  var videoElement = document.querySelector("video");
  var audioCtx = new AudioContext();
  var source = audioCtx.createMediaElementSource(videoElement);
  var gainNode = audioCtx.createGain();
  gainNode.gain.value = value;
  source.connect(gainNode);
  gainNode.connect(audioCtx.destination);
}

function initializeRequestListeners() {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.message === "adjust_volume") {
      currentVolumePercentage = Number(request.value);
      boostSound(currentVolumePercentage);
    }
  });
}

initializeRequestListeners();
