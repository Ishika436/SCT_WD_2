class Stopwatch {
    constructor() {
        // Time tracking variables
        this.elapsed = 0;
        this.startTime = 0;
        this.pausedTime = 0;
        this.isRunning = false;
        this.lapTimes = [];
        this.intervalId = null;

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.millisecondsDisplay = document.getElementById('milliseconds');
        this.startPauseBtn = document.getElementById('startPauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapsList = document.getElementById('lapsList');

        // Event listeners
        this.startPauseBtn.addEventListener('click', () => this.toggleStartPause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.recordLap());
    }

    /**
     * Start or pause the stopwatch
     */
    toggleStartPause() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }

    /**
     * Start the stopwatch
     */
    start() {
        if (!this.isRunning) {
            this.startTime = performance.now() - this.pausedTime;
            this.isRunning = true;
            this.startPauseBtn.textContent = 'Pause';
            this.startPauseBtn.classList.add('pause');
            this.lapBtn.disabled = false;

            this.intervalId = setInterval(() => this.updateDisplay(), 10);
        }
    }

    /**
     * Pause the stopwatch
     */
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startPauseBtn.textContent = 'Resume';
            this.startPauseBtn.classList.remove('pause');
            clearInterval(this.intervalId);
        }
    }

    /**
     * Reset the stopwatch
     */
    reset() {
        this.pause();
        this.elapsed = 0;
        this.startTime = 0;
        this.pausedTime = 0;
        this.lapTimes = [];
        this.startPauseBtn.textContent = 'Start';
        this.startPauseBtn.classList.remove('pause');
        this.lapBtn.disabled = true;
        this.updateDisplay();
        this.clearLapsList();
    }

    /**
     * Record a lap time
     */
    recordLap() {
        if (this.isRunning || this.elapsed > 0) {
            const lapTime = this.elapsed;
            this.lapTimes.push(lapTime);
            this.displayLap(this.lapTimes.length, lapTime);
        }
    }

    /**
     * Update the time display
     */
    updateDisplay() {
        if (this.isRunning) {
            this.elapsed = performance.now() - this.startTime;
        }

        const totalMilliseconds = Math.floor(this.elapsed);
        const minutes = Math.floor(totalMilliseconds / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

        this.minutesDisplay.textContent = String(minutes).padStart(2, '0');
        this.secondsDisplay.textContent = String(seconds).padStart(2, '0');
        this.millisecondsDisplay.textContent = String(milliseconds).padStart(2, '0');
    }

    /**
     * Format time to MM:SS:MS
     * @param {number} ms - Time in milliseconds
     * @returns {string} Formatted time string
     */
    formatTime(ms) {
        const totalMilliseconds = Math.floor(ms);
        const minutes = Math.floor(totalMilliseconds / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    }

    /**
     * Display a lap time in the list
     * @param {number} lapNumber - The lap number
     * @param {number} lapTime - The lap time in milliseconds
     */
    displayLap(lapNumber, lapTime) {
        // Remove "No lap times yet" message if it exists
        const noLapsMessage = this.lapsList.querySelector('.no-laps');
        if (noLapsMessage) {
            noLapsMessage.remove();
        }

        const lapElement = document.createElement('div');
        lapElement.className = 'lap-item';

        const lapNumber_el = document.createElement('span');
        lapNumber_el.className = 'lap-number';
        lapNumber_el.textContent = `Lap ${lapNumber}:`;

        const lapTime_el = document.createElement('span');
        lapTime_el.className = 'lap-time';
        lapTime_el.textContent = this.formatTime(lapTime);

        lapElement.appendChild(lapNumber_el);
        lapElement.appendChild(lapTime_el);

        // Add to the beginning of the list for better UX
        if (this.lapsList.firstChild) {
            this.lapsList.insertBefore(lapElement, this.lapsList.firstChild);
        } else {
            this.lapsList.appendChild(lapElement);
        }
    }

    /**
     * Clear the laps list
     */
    clearLapsList() {
        this.lapsList.innerHTML = '<p class="no-laps">No lap times yet</p>';
    }
}

// Initialize stopwatch when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});
