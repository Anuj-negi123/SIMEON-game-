🕹️ Simon Says Game
A fun and interactive Simon Says game built with HTML, CSS, JavaScript, PHP, and MySQL. This game challenges players to remember and repeat an increasing sequence of colors.

🎯 Game Overview
🟢 Follow the Pattern: The game will flash a sequence of colors.
🔴 Repeat the Sequence: Click the colors in the same order.
🟡 Increase Difficulty: The sequence gets longer with each level.
🟣 Compete for the High Score! Save your score and enter the leaderboard!

✨ Interactive UI + Smooth Animations + Real-Time Leaderboard!


📌 Features
✅ Interactive Gameplay – Players repeat the pattern of colors in the correct order.
✅ Dynamic Difficulty – The sequence gets longer as the player progresses.
✅ Leaderboard System – Stores high scores in a MySQL database.
✅ User Name Input – Players can enter their name before playing.
✅ Game Over Screen – Displays the score when the player makes a mistake.

🛠️ Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: PHP
Database: MySQL
Version Control: Git & GitHub


🎮 How to Play
1️⃣ Press any key to start the game.
2️⃣ Watch the sequence of flashing colors.
3️⃣ Repeat the exact sequence by clicking the buttons.
4️⃣ The sequence gets longer each round!
5️⃣ If you click the wrong button, Game Over! Your score is saved.


📊 Leaderboard Integration
The leaderboard fetches top scores from the scores table and displays them dynamically.

📝 Code Structure
📂 Project Files & Folders
/simon-says-game
│── index.html        # Game homepage (Name entry)
│── game.html         # Main Simon Says game UI
│── style.css         # Styling for game elements
│── app.js            # Core game logic (Simon Says mechanics)
│── save_score.php    # Handles saving scores to the database
│── get_leaderboard.php # Fetches scores from database
│── db.php     # Database connection settings
│── leaderboard  # Displays top scores
└── README.md         # Project documentation

