// fetch("/weather?search=hanoi")
//   .then(res => {
//     console.log("pending");
//     return res.json();
//     //
//   })
//   .then(data => {
//     console.log(data);
//   });

const form = document.querySelector("form");
const input = document.querySelector("#search");
const para_1 = document.querySelector("#paragraph_1");
const para_2 = document.querySelector("#paragraph_2");
const para_3 = document.querySelector("#paragraph_3");
const para_4 = document.querySelector("#paragraph_4");
const para_5 = document.querySelector("#paragraph_5");
const para_6 = document.querySelector("#paragraph_6");
const para_7 = document.querySelector("#paragraph_7");
const place_result = document.querySelector("#place_result");
const loading = document.querySelector("#loading");
para_1.textContent = "Nhập vào ô tìm kiếm đi bạn ơi :))";

// form.addEventListener("submit", function(event) {
//   event.preventDefault();
//   para_1.textContent = "";
//   para_2.textContent = "";
//   para_3.textContent = "";
//   para_4.textContent = "";
//   para_5.textContent = "";
//   para_6.textContent = "";
//   para_7.textContent = "";

//   const searchKeyword = input.value;
//   para_1.textContent = "LOADING... ";
//   loading.style.display = "block";

//   fetch("/api?search=" + searchKeyword)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       if (data.err) {
//         return (para_1.textContent = data.err);
//         loading.style.display = "none";
//       }
//       const { place, summary, temperature } = data;
//       // para_1.textContent = `Thời tiết của ${data.place} hôm nay là ${summary} với nhiệt độ là ${temperature} độ C .`;
//       para_1.textContent = "Thời tiết của";
//       para_2.textContent = data.place;
//       para_3.textContent = "hôm nay là";
//       para_4.textContent = summary;
//       para_5.textContent = "với nhiệt độ là";
//       para_6.textContent = temperature;
//       para_7.textContent = "độ C.";
//       loading.style.display = "none";
//       console.log(data);
//     })
//     .catch(err => {
//       para_1.textContent = "ERROR!";
//       loading.style.display = "none";
//     });
// });
