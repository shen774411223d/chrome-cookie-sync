const button = document.querySelector(".button");
const originUrl = document.querySelector(".origin");
const targetUrl = document.querySelector(".target");

const getActiveTabUrl = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab && tab.url) {
        resolve(tab.url);
      } else {
        reject(new Error("Failed to get active tab URL."));
      }
    });
  });
};

const getCookies = (url) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.getAll({ url }, (cookies) => {
      if (cookies && Array.isArray(cookies)) {
        resolve(cookies);
      } else {
        reject(new Error("error"));
      }
    });
  });
};

const cb = () => {};

const hasHttpPrefix = (url) => {
  return url.startsWith("http://") || url.startsWith("https://");
};

const addPrefix = (url) => {
  switch (true) {
    case hasHttpPrefix(url):
      return url;
    case url.includes("localhost"):
      return `http://${url}`;
    case !url.includes("localhost"):
      return `https://${url}`;
    default:
      return url;
  }
};

const main = async () => {
  const url = await getActiveTabUrl();
  originUrl.disabled = false;
  originUrl.value = url;
};

main();

button.addEventListener("click", async () => {
  try {
    const [originValue, targetValue] = [originUrl.value, targetUrl.value];
    if (!originValue || !targetValue) {
      return alert("no write!");
    }
    const cookies = await getCookies(originValue);
    cookies.forEach(({ name, value, expirationDate }) => {
      chrome.cookies.set(
        {
          url: addPrefix(targetValue),
          name,
          value,
          expirationDate,
        },
        cb
      );
    });
    alert("Yep!");
  } catch (e) {
    alert(e.message);
  }
});
