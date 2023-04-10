// // 获取当前域名
// const currentDomain = window.location.hostname.split(".").slice(-2).join(".");

// // 获取需要同步的域名
// const syncDomains = ["example.com", "test.com"];
const main = async () => {
  chrome.cookies.getAll(
    { url: "https://tportal.imagiclamp.cn" },
    function (cookies) {
      console.log(cookies);
    }
  );
  // chrome.cookies.set(
  //   {
  //     url: "http://localhost:8082",
  //     name: "my_cookie",
  //     value: "123456",
  //     expirationDate: new Date().getTime() / 1000 + 3600, // cookie过期时间
  //   },
  //   function (cookie) {
  //     console.log("New cookie created:", cookie);
  //   }
  // );
};
main();
// // 遍历需要同步的域名，获取其 cookie 信息
// syncDomains.forEach(async (domain) => {
//   const cookieStores = await chrome.cookies.getAll({
//     domain,
//     storeId: undefined,
//   });

//   // 同步到当前域名下
//   cookieStores.forEach((cookie) => {
//     // 必须在具有域名的情况下设置cookie
//     if (cookie.domain) {
//       cookie.url = `http${cookie.secure ? "s" : ""}://${cookie.domain}${
//         cookie.path
//       }`;
//       chrome.cookies.set(cookie);
//     }
//   });
// });
