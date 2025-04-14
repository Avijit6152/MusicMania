

const goTopBtn = document.getElementById('goTopBtn');

    document.getElementById('toggleTheme').addEventListener('click', toggleDarkMode);
    document.getElementById('footerToggleTheme').addEventListener('click', (e) => {
      e.preventDefault();
      toggleDarkMode();
    });

    window.addEventListener('scroll', () => {
      goTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });

    goTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    }

    // Persist Theme
    window.onload = () => {
      if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
      }
    };

    function playSong(songId, btn) {
      let audios = document.querySelectorAll('audio');
      audios.forEach(audio => {
        let button = audio.parentElement.querySelector('button');
        if (audio.id === songId) {
          if (audio.paused) {
            audio.play();
            button.textContent = 'Pause';
          } else {
            audio.pause();
            button.textContent = 'Play';
          }
        } else {
          audio.pause();
          audio.currentTime = 0;
          button.textContent = 'Play';
        }
      });
    }

    function mixSongs() {
      const audio = document.getElementById("djAudio");
      let song1 = document.getElementById("song1").value;
      let song2 = document.getElementById("song2").value;
      audio.src = song1;
      audio.play();
      alert("Simulating mix of: " + song1 + " and " + song2);
    }

    function searchMusic() {
      let query = document.getElementById("search-input").value.toLowerCase();
      let cards = document.querySelectorAll(".song-card");
      cards.forEach(card => {
        let title = card.querySelector(".song-title").textContent.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
      });
    }

    function sortSongs() {
      let criteria = document.getElementById("sort-criteria").value;
      alert("Sorting by: " + criteria);
    }

    async function signUp(event) {
      event.preventDefault();
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      const response = await fetch('http://localhost:8081/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        alert('User signed up successfully');
      } else {
        alert('Sign up failed');
      }
    }

    async function signIn(event) {
      event.preventDefault();
      const email = document.getElementById('signin-email').value;
      const password = document.getElementById('signin-password').value;

      const response = await fetch('http://localhost:8081/api/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        alert('User signed in successfully');
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store token
      } else {
        alert('Login failed');
      }
    }
 