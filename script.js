function updateJoke(joke) {
  console.log(joke);
  document.getElementById("jokesList").innerText = joke;
}

function appendJoke(joke) {
  jokeNode = document.createElement("li");
  jokeNode.className = "p-3 m-3 shadow-lg rounded-md";
  jokeNode.innerText = joke;
  document.getElementById("jokesList").appendChild(jokeNode);
}

function getJoke() {
  try {
    category = document.getElementById("jokesCategory").value;
  } catch (e) {
    category = "Programming";
  }
  fetch(
    `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    10000
  )
    .then((res) => {
      console.log(res);
      console.log("Response received.");
      return res;
    })
    .then((res) => res.json())
    .then((res) => appendJoke(res.joke))
    .catch((err) => console.log(err));
}

function execute() {
  // setInterval(getJoke, 5000);
  document.getElementById("jokeAlert").innerText = "Jokes incoming...";
  var i = 1;
  var limit = 10;

  try {
    i = Math.max(1, document.getElementById("jokesList").children.length);
    limit = document.getElementById("jokesLimit").value;
    console.log("Limit = " + limit);
  } catch (e) {
    console.log("Execution error")
    i = 1;
    limit = 10;
  } finally {
    if (i == "") {
      i = 1;
    }

    // console.log(`Number of requests to send: ${limit - i}`);

    for (; i <= limit; i++) {
      console.log("Executing getJoke()");
      setTimeout(getJoke, 5000);
    }

  // document.getElementById("jokeAlert").innerText = "Jokes displayed!";
  }
}

function clearAndExecute() {
  document.getElementById("jokesList").innerHTML = "";
  execute();
}
// execute();
