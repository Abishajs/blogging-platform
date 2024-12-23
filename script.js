// Authentication simulation
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const blogSection = document.getElementById('blog-section');
const blogsDiv = document.getElementById('blogs');

// Switch between Sign In and Sign Up forms
document.getElementById('signup-link').addEventListener('click', () => {
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
});

document.getElementById('signin-link').addEventListener('click', () => {
  signupForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Sign Up
document.getElementById('signup-btn').addEventListener('click', () => {
  const username = document.getElementById('signup-username').value.trim();
  if (username && !users.includes(username)) {
    users.push(username);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign up successful! Please sign in.');
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  } else {
    alert('Username already exists or invalid.');
  }
});

// Sign In
document.getElementById('login-btn').addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  if (users.includes(username)) {
    currentUser = username;
    document.getElementById('current-user').textContent = currentUser;
    loginForm.classList.add('hidden');
    blogSection.classList.remove('hidden');
    loadBlogs();
  } else {
    alert('Invalid username.');
  }
});

// Log Out
document.getElementById('logout-btn').addEventListener('click', () => {
  currentUser = null;
  blogSection.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Blog Management
let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

document.getElementById('post-btn').addEventListener('click', () => {
  const title = document.getElementById('blog-title').value.trim();
  const content = document.getElementById('blog-content').value.trim();

  if (title && content) {
    blogs.push({ title, content, author: currentUser, comments: [] });
    localStorage.setItem('blogs', JSON.stringify(blogs));
    loadBlogs();
  } else {
    alert('Please fill in all fields.');
  }
});

function loadBlogs() {
  blogsDiv.innerHTML = '';
  blogs.forEach((blog, index) => {
    if (blog.author === currentUser) {
      const blogDiv = document.createElement('div');
      blogDiv.className = 'blog';
      blogDiv.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <button onclick="deleteBlog(${index})">Delete</button>
      `;
      blogsDiv.appendChild(blogDiv);
    }
  });
}

function deleteBlog(index) {
  blogs.splice(index, 1);
  localStorage.setItem('blogs', JSON.stringify(blogs));
  loadBlogs();
}
