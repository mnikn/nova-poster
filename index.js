import domtoimage from "dom-to-image";

const numTable = [
  "零",
  "壹",
  "贰",
  "叁",
  "肆",
  "伍",
  "陆",
  "柒",
  "捌",
  "玖",
  "拾",
];

const form = {
  title: "炮打 indienova-我的一张大字报",
  subtitle: "Mnikn post",
  year: 2022,
  count: 23,
  author: "mnikn",
};

const titleDom = document.querySelector("#title");
const subtitleDom = document.querySelector("#subtitle");
const countDom = document.querySelector("#count");
const dateDom = document.querySelector("#date");
const yearDom = document.querySelector("#year");
const copyrightDom = document.querySelector("#copyright");

const titleInputDom = document.querySelector("#title-input");
const subtitleInputDom = document.querySelector("#subtitle-input");
const yearInputDom = document.querySelector("#year-input");
const countInputDom = document.querySelector("#count-input");
const authorInputDom = document.querySelector("#author-input");
const banner1InputDom = document.querySelector("#banner1-input");
const banner2InputDom = document.querySelector("#banner2-input");
const banner3InputDom = document.querySelector("#banner3-input");
const generateBtnDom = document.querySelector("#generate-btn");
const downloadBtnDom = document.querySelector("#download-btn");

async function toDataURL(url) {
  return new Promise((resolve) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
}

function formatNumToString(num) {
  return num
    .toString()
    .split("")
    .map((c) => {
      return numTable[Number(c)];
    })
    .join("");
}

function processImgUpload(dom, e) {
  const files = e.target.files;
  if (files && files.length) {
    const fr = new FileReader();
    fr.onload = function () {
      dom.setAttribute("href", fr.result);
    };
    fr.readAsDataURL(files[0]);
  }
}

async function init() {
  const imgd = await toDataURL("./imgs/demo-pic.jpg");

  const banner1 = document.querySelector("#banner1");
  banner1.setAttribute("href", imgd);

  const banner2 = document.querySelector("#banner2");
  banner2.setAttribute("href", imgd);

  const banner3 = document.querySelector("#banner3");
  banner3.setAttribute("href", imgd);

  titleInputDom.value = form.title;
  titleInputDom.addEventListener("change", (e) => {
    form.title = e.target.value;
  });
  subtitleInputDom.value = form.subtitle;
  subtitleInputDom.addEventListener("change", (e) => {
    form.subtitle = e.target.value;
  });
  yearInputDom.value = form.year;
  yearInputDom.addEventListener("change", (e) => {
    form.year = e.target.value;
  });
  countInputDom.value = form.count;
  countInputDom.addEventListener("change", (e) => {
    form.count = e.target.value;
  });
  authorInputDom.value = form.author;
  authorInputDom.addEventListener("change", (e) => {
    form.author = e.target.value;
  });
  banner1InputDom.addEventListener(
    "change",
    processImgUpload.bind(banner1InputDom, banner1)
  );
  banner2InputDom.addEventListener(
    "change",
    processImgUpload.bind(banner2InputDom, banner2)
  );
  banner3InputDom.addEventListener(
    "change",
    processImgUpload.bind(banner3InputDom, banner3)
  );
  generateBtnDom.addEventListener("click", () => {
    refreshView();
  });
  downloadBtnDom.addEventListener("click", () => {
    document.querySelector("#input-group").style.display = "none";
    document.querySelector("svg").style.marginLeft = "auto";
    document.body.style.background = "#fff";
    domtoimage
      .toPng(document.body)
      .then(function (dataUrl) {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "output.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      })
      .finally(() => {
        document.querySelector("#input-group").style.display = "inherit";
        document.querySelector("svg").style.marginLeft = "calc(30%)";
        document.body.style.background = "#2c2c2c";
      });
  });
}

function refreshView() {
  titleDom.innerHTML = form.title;
  subtitleDom.innerHTML = form.subtitle;
  countDom.innerHTML = `${
    (form.count < 10 ? numTable[0] : "") + formatNumToString(form.count)
  }号`;
  dateDom.innerHTML = `Issue ${form.count}, ${form.year}`;
  yearDom.innerHTML = `${formatNumToString(form.year)}年`;
  copyrightDom.innerHTML = `Copyright by ${form.author}`;
}

init();
refreshView();
