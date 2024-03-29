//AXIOS-GLOBAL-FOR-AUTH-Token
axios.defaults.headers.common["x-auth-token"] = "some-token";

// GET REQUEST
function getTodos() {
  // for debugging
  // console.log('GET Request');
  // old method to do requests
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params:{
  //     "_limit" : 5
  //   }
  // })
  // .then(res => showOutput(res))
  // .catch(err => console.log(err))
  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// POST REQUEST
function addTodo() {
  // for debugging
  // console.log('POST Request');
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "New York", // Enter A JSON
      work: "Programmer",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // for debugging
  // console.log('PUT/PATCH Request');
  // url ::https://jsonplaceholder.typicode.com/todos/id <--important
  axios
    .put("https://jsonplaceholder.typicode.com/todos/1", {
      title: "New York", // Enter A JSON
      work: "Programmer",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));

  // PATCH
  // axios
  // .patch('https://jsonplaceholder.typicode.com/todos/1',{
  //   title : "New York", //Enter A JSON
  //   work : "Programmer",
  //   completed: true
  // })
  // .then(res => showOutput(res))
  // .catch(err => console.log(err))

  /* There is a difference between PUT & PATCH
   *  put actually changed the entire json relate to the particuler id
   *  but in case of patch request it's just chaged according to user
   */
}

// DELETE REQUEST
function removeTodo() {
  // debugging
  // console.log('DELETE Request');
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  // debugging
  // console.log('Simultaneous Request');

  // axios.all([
  //   axios.get('https://jsonplaceholder.typicode.com/todos'),
  //   axios.get('https://jsonplaceholder.typicode.com/posts'),
  // ])
  // .then(res=>{
  //   console.log(res[0]);
  //   console.log(res[1]);
  //   showOutput(res[0])
  //   showOutput(res[1])
  // })
  // .catch(err => console.log(err))

  // smater way
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch((err) => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  // console.log("Custom Headers");
  const config = {
    headers: {
      "Content-Type": "applocation/json",
      authorization: "sometoken",
    },
  };

  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New York", // Enter A JSON
        work: "Programmer",
        completed: false,
      },
      config
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  // console.log("Transform Response");
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "hi my name is Partha Sigha Roy",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options)
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// ERROR HANDLING
function errorHandling() {
  // console.log("Error Handling");
  axios
    .get("https://jsonplaceholder.typicode.com/todoss") //error in url response.status = 404
    .then((res) => showOutput(res))
    .catch((err) => {
      if (err.response) {
        //server response with status with 200 range
        console.log(err.response.data);
        console.log(err.response.status);

        if (err.response.status === 404) {
          alert("404! page not found.");
        }
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  // console.log("Cancel Token");
  const source = axios.CancelToken.source();
  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        alert("Request Cancel", thrown.message);
      }
    });
  if (true) {
    source.cancel();
    alert("Request Canceled Sucessfully !!");
  }
}
// AXIOS INSTANCES
function instanceToken() {
  const axiosIntance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });
  axiosIntance.get("/comments?_limit=5").then((res) => showOutput(res));
}
// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
document.getElementById("instance").addEventListener("click", instanceToken);
