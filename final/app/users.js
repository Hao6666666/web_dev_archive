const currentuUsers = {};
const posts = {
  "dcefd4b4-fa97-4dd6-85a1-d841f83847d3": {
    postid: "dcefd4b4-fa97-4dd6-85a1-d841f83847d3",
    username: "Henry",
    text: "What a Nice Day!!!+https://images.unsplash.com/photo-1423347673683-ccdb7f6a948f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    comments: [
      {
        username: "Lee",
        content: "Greetings! Henry!",
      },
      {
        username: "John",
        content: "👍",
      },
    ],
    likes: 2,
    wholiked: { Anlen: "Anlen", Tim: "Tim", John: "John" },
  },
  "a7309965-3fd0-4aa1-8624-f8c15910fbdf": {
    postid: "a7309965-3fd0-4aa1-8624-f8c15910fbdf",
    username: "Lee",
    text: "Look at my 🤳 + https://images.unsplash.com/photo-1603112579965-e24332cc453a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    comments: [
      {
        username: "Lee",
        content: "I love it!",
      },
      {
        username: "John",
        content: "My man! You are sooo cool!",
      },
      {
        username: "John",
        content: "👍",
      },
    ],
    likes: 3,
    wholiked: { Joseph: "Joseph", Trump: "Trump", Barack: "Barack" },
  },
  "380b161e-8331-4b7f-84b7-ffa42486b8a2": {
    postid: "380b161e-8331-4b7f-84b7-ffa42486b8a2",
    username: "Susie",
    text: "Today we are at Grand Canyon National Park🏞 , it is sooo beautiful!!🤩 +https://images.unsplash.com/photo-1531375784476-c1d52a3c4ea3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    comments: [
      {
        username: "Henry",
        content: "This looks so beautiful! Hope you have a nice trip!",
      },
      {
        username: "Henry",
        content: "🤩 🤩 🤩 ",
      },
      {
        username: "John",
        content: "I'm still working on my info6250 final project....😞 ",
      },
    ],
    likes: 8,
    wholiked: { George: "George", James: "James", Jay: "James" },
  },
  "8cafbb33-f45e-43e2-8d5a-485f6a2f8039": {
    postid: "8cafbb33-f45e-43e2-8d5a-485f6a2f8039",
    username: "JJLin",
    text: "Hello, Summer! + https://images.unsplash.com/photo-1586902197503-e71026292412?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    comments: [],
    likes: 18,
    wholiked: {
      JayChou: "Jay Chou",
      JokerXue: "Joker Xue",
      AndyLau: "Andy Lau",
    },
  },
};
const comments = [];

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

module.exports = {
  isValidUsername,
  currentuUsers,
  posts,
  comments,
};
