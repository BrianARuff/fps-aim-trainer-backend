// const HEROKU_BE_URL_GET_SCORES =
//   "https://boiling-citadel-90849.herokuapp.com/score";
// const HEROKU_BE_URL_SET_SCORE = "https://boiling-citadel-90849.herokuapp.com/";

const LOCAL_BE_URL_GET_ALL_SCORES =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_LOCAL_BE_URL_GET_ALL_SCORES_HTTP
    : import.meta.env.VITE_LOCAL_BE_URL_GET_ALL_SCORES_HTTPS;

const LOCAL_BE_URL_SET_SCORE =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_LOCAL_BE_URL_SET_SCORE_HTTP
    : import.meta.env.VITE_LOCAL_BE_URL_SET_SCORE_HTTPS;

const LOCAL_BE_URL_GET_HIGH_SCORE =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_LOCAL_BE_URL_GET_HIGH_SCORE_HTTP
    : import.meta.env.VITE_LOCAL_BE_URL_GET_HIGH_SCORE_HTTPS;

document.addEventListener("DOMContentLoaded", () => {
  fetch(LOCAL_BE_URL_GET_ALL_SCORES)
    .then((res) => res.json())
    .then((data) => {
      console.log("all scores", data);
    })
    .catch((err) => console.log("err", err));

  fetch(LOCAL_BE_URL_GET_HIGH_SCORE)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#highScore > h2").innerHTML +=
        " " +
        (data[0].score || 0) +
        "<br> Set by: " +
        (data[0].username || "brian");
    });

  let countClick = 0;
  let dotTime;
  let dotSpawner;
  let countDownTimer;
  let clearDotSpawner;
  let username = document.querySelector("#username");

  function clearDots(ele) {
    const deleteDotsInterval = setInterval(() => {
      if (ele.parentNode) {
        ele.parentNode.removeChild(ele);
      }
      clearInterval(deleteDotsInterval);
    }, dotTime);
  }

  function moreDots() {
    for (let i = 0; i < 5; i++) {
      let dot = document.createElement("div");
      dot.style.position = "absolute";
      dot.classList.add("dot");
      let bottomPositon = Math.floor(
        Math.min(
          Math.random() *
            document.querySelector("#background").getBoundingClientRect()
              .bottom,
          document.querySelector("#background").getBoundingClientRect().bottom -
            175
        )
      );
      let rightPosition = Math.min(
        Math.random() *
          document.querySelector("#background").getBoundingClientRect().right,
        document.querySelector("#background").getBoundingClientRect().right - 50
      );
      dot.style.bottom = bottomPositon + "px";
      dot.style.left = rightPosition + "px";
      document
        .querySelector("#background")
        .insertAdjacentElement("afterbegin", dot);
    }
    document.querySelectorAll(".dot").forEach((ele) => {
      ele.addEventListener("click", (e) => {
        e.target.parentNode.removeChild(e.target);
      });
      clearDots(ele);
    });
  }

  function handleDotsOnInteraction(e) {
    if (e.target.className === "dot") {
      document.querySelector("#countClick").innerText = countClick += 1;
    }
  }

  document.addEventListener("click", (e) => handleDotsOnInteraction(e));

  function playGame() {
    let mode = document.querySelectorAll("input[name=mode]:checked")[0];
    document.querySelector("#countDown").innerText = mode.value;
    console.log(mode.id);
    dotTime = 3000;

    countDownTimer = setInterval(() => {
      document.querySelector("#countDown").innerText =
        Number(document.querySelector("#countDown").innerText) - 1;

      setTimeout(() => {
        document.querySelector("#gameTimer").innerText =
          Number(document.querySelector("#gameTimer").innerText) - 1;
      }, dotTime);
    }, 1000);

    dotSpawner = setInterval(() => {
      const dotCount = Number(document.querySelector("#dotCount").innerText);
      document.querySelector("#countDown").innerText = mode.value;
      moreDots();
      document.querySelector("#dotCount").innerText = dotCount + 5;
      if (dotCount === 100) {
        fetch(LOCAL_BE_URL_SET_SCORE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value || "brian",
            score: Number(document.querySelector("#countClick").innerText) || 0,
          }),
        })
          .then((r) => {
            r.json();
            clearInterval(clearDotSpawner);
            clearInterval(countDownTimer);
            clearInterval(dotSpawner);
            window.location.reload();
            window.scrollTo(0, 0);
          })
          .then((data) => console.log("Success " + data))
          .catch((error) => console.log("Error " + error));
      }
    }, dotTime);
  }

  document.querySelector("#startGame").addEventListener("click", (e) => {
    e.target.style.visibility = "hidden";
    username.style.visibility = "hidden";
    window.scrollTo(0, document.body.scrollHeight);
    document.querySelector("#countDown").style.display = "block";
    playGame();
  });
});
