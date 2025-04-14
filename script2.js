
const goTopBtn = document.getElementById('goTopBtn');

document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

document.getElementById('footerToggleTheme').addEventListener('click', (e) => {
  e.preventDefault();
  document.body.classList.toggle('dark-mode');
});

window.addEventListener('scroll', () => {
  goTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});

goTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Dark Mode Toggle Function
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Mix Songs Function
function mixSongs() {
  let song1 = document.getElementById("song1").value;
  let song2 = document.getElementById("song2").value;
  let audio = document.getElementById("djAudio");
  // Simulate mixing by playing the first selected song
  audio.src = song1;
  audio.play();
  alert("Mixing " + song1 + " and " + song2 + "! This is a simulated mix.");
}

// Search Music Function
function searchMusic() {
  let query = document.getElementById("search-input").value;
  alert("Searching for: " + query);
  // Implement actual search functionality here
}

// Play Song Function
function playSong(songId) {
  // Get all audio elements
  let audios = document.querySelectorAll('audio');

  // Iterate over all audio elements
  audios.forEach(audio => {
      let btn = audio.parentElement.querySelector('button');

      if (audio.id === songId) {
          // If this is the selected song
          if (audio.paused) {
              audio.play();
              btn.textContent = 'Pause';
          } else {
              audio.pause();
              btn.textContent = 'Play';
          }
      } else {
          // Pause any other playing songs
          if (!audio.paused) {
              audio.pause();
              audio.currentTime = 0;
              btn.textContent = 'Play';
          }
      }
  });
}

// Sort Songs Function
function sortSongs() {
  let criteria = document.getElementById("sort-criteria").value;
  alert("Sorting songs by: " + criteria);
  // Implement actual sort functionality here
}

// Sign Up Function
async function signUp(event) {
  event.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const response = await fetch('http://localhost:8081/api/users/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  });

  if (response.ok) {
      alert('User signed up successfully');
  } else {
      alert('Error signing up');
  }
}

// Sign In Function
async function signIn(event) {
  event.preventDefault();
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;

  const response = await fetch('http://localhost:8081/api/users/signin', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  });

  if (response.ok) {
      alert('User signed in successfully');
  } else {
      alert('Invalid email or password');
  }
}


