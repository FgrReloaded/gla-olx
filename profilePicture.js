const uploadImg = document.getElementById("uploadImg");
const fileInput = document.getElementById("fileInput");
const myImg = document.getElementById("myImg");

uploadImg.addEventListener("click", function () {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0];
  let url = URL.createObjectURL(file);
  myImg.src = url;
});
