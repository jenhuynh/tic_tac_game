// export const getTasks = () => _get("/api/tasks");

// export const getUsers = () => _get("/api/users");

export const getUsers = async () => {
  const response = await fetch("/api/users");
  return response.json();
};

export const addUser = (user) => _post("/api/users", user);

//how we pass info with string interpolation and in backend we receive it in a colon format endput
export const updateScore = (player_name) => _put(`/api/users/${player_name}`);

// export const addTask = (name) => _post("/api/tasks", { name });

// const _get = async (url) => (await fetch(url)).json();

//definition of post
const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};

//definition of put
const _put = async (url, body) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};
