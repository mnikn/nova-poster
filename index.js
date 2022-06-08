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

async function init() {
  const imgd = await toDataURL("./imgs/u-36138040088622WG.jpg");

  const banner1 = document.querySelector("#banner1");
  banner1.setAttribute("href", imgd);

  const banner2 = document.querySelector("#banner2");
  banner2.setAttribute("href", imgd);

  const banner3 = document.querySelector("#banner3");
  banner3.setAttribute("href", imgd);
}


const form = {
    title: '炮打 indienova-我的一张大字报',
    subtitle: ''
};

const titleDom = document.querySelector('#title');
titleDom.innerHTML = form.title;

init();
