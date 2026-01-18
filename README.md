# SCT_WD_2


Stopwatch Web Application Overview
This is an interactive, browser-based stopwatch application with a modern, user-friendly interface. Here's what it includes:

Core Functionality:

⏱️ Start/Pause/Resume - Control the timer
🔄 Reset - Clear timer and all lap times
📍 Lap Recording - Capture lap times while running
📊 Lap Display - Shows all recorded laps in a scrollable list
Technical Details:

HTML/CSS/JavaScript - Vanilla JS (no frameworks)
Time Precision - Displays MM:SS:Centiseconds
Responsive Design - Works on desktop, tablet, and mobile
Modern UI - Gradient background, smooth animations, custom scrollbar
File Structure:

index.html - Page structure with display and buttons
styles.css - Professional styling with animations
script.js - Stopwatch logic via a Stopwatch class
How It Works:
The app uses the Stopwatch class to manage timing using performance.now() for accurate measurements. The display updates every 10ms when running, and lap times are stored and displayed in real-time as users click the Lap button.

Perfect for timing activities, workouts, or recording multiple intervals! 🚀
