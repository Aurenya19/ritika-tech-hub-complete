// User Progress Management
let userProgress = {
    videosWatched: [],
    challengesSolved: [],
    projectsCompleted: [],
    certificates: [],
    bookmarks: [],
    notes: {},
    currentStreak: 0,
    totalPoints: 0
};

// Load Progress from LocalStorage
function loadProgress() {
    const saved = localStorage.getItem('userProgress');
    if (saved) {
        userProgress = JSON.parse(saved);
    }
    updateProgressDisplay();
}

// Save Progress to LocalStorage
function saveProgress() {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    updateProgressDisplay();
}

// Update Progress Display
function updateProgressDisplay() {
    document.getElementById('videosWatched').textContent = userProgress.videosWatched.length;
    document.getElementById('challengesSolved').textContent = userProgress.challengesSolved.length;
    document.getElementById('projectsCompleted').textContent = userProgress.projectsCompleted.length;
    document.getElementById('certificatesEarned').textContent = userProgress.certificates.length;
    
    // Calculate overall progress
    const totalItems = userProgress.videosWatched.length + userProgress.challengesSolved.length;
    const progressPercent = Math.min(100, Math.floor((totalItems / 50) * 100));
    document.getElementById('progressText').textContent = progressPercent + '%';
    
    // Update circular progress
    const circle = document.getElementById('overallProgress');
    const circumference = 565;
    const offset = circumference - (circumference * progressPercent / 100);
    circle.style.strokeDashoffset = offset;
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

// Render Roadmaps
function renderRoadmaps() {
    const grid = document.getElementById('roadmapGrid');
    grid.innerHTML = Object.values(COMPLETE_COURSE_DATA).map(course => `
        <div class="roadmap-card" data-course="${course.id}">
            <div class="roadmap-icon"><i class="fas ${course.icon}"></i></div>
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
            </div>
            <div class="course-meta">
                <span><i class="fas fa-video"></i> ${course.videos.length} videos</span>
                <span><i class="fas fa-code"></i> ${course.challenges.length} challenges</span>
                <span><i class="fas fa-question-circle"></i> ${course.quizzes.length} quizzes</span>
            </div>
            <button class="btn-primary">Start Learning</button>
        </div>
    `).join('');
}

// Render All Challenges
function renderAllChallenges() {
    const grid = document.getElementById('challengesGrid');
    const allChallenges = [];
    
    Object.values(COMPLETE_COURSE_DATA).forEach(course => {
        course.challenges.forEach(challenge => {
            allChallenges.push({
                ...challenge,
                courseId: course.id,
                courseTitle: course.title
            });
        });
    });
    
    grid.innerHTML = allChallenges.map(challenge => `
        <div class="challenge-card" data-difficulty="${challenge.difficulty}" data-challenge="${challenge.id}" data-course="${challenge.courseId}">
            <div class="challenge-header">
                <h4>${challenge.title}</h4>
                <span class="difficulty ${challenge.difficulty}">${challenge.difficulty}</span>
            </div>
            <p>${challenge.description}</p>
            <div class="challenge-meta">
                <span><i class="fas fa-trophy"></i> ${challenge.points} points</span>
                <span><i class="fas fa-book"></i> ${challenge.courseTitle}</span>
            </div>
            ${challenge.completed ? '<span class="completed-badge"><i class="fas fa-check-circle"></i> Completed</span>' : ''}
            <button class="btn-primary" onclick="openChallenge('${challenge.courseId}', '${challenge.id}')">Solve Challenge</button>
        </div>
    `).join('');
}

// Open Course Modal
function openCourse(courseId) {
    const course = COMPLETE_COURSE_DATA[courseId];
    if (!course) return;
    
    const content = document.getElementById('courseContent');
    content.innerHTML = `
        <div class="course-detail">
            <div class="course-header">
                <h2>${course.title}</h2>
                <p>${course.description}</p>
            </div>
            
            <div class="course-tabs">
                <button class="tab-btn active" data-tab="roadmap">Roadmap</button>
                <button class="tab-btn" data-tab="videos">Videos (${course.videos.length})</button>
                <button class="tab-btn" data-tab="challenges">Challenges (${course.challenges.length})</button>
                <button class="tab-btn" data-tab="quizzes">Quizzes (${course.quizzes.length})</button>
                <button class="tab-btn" data-tab="resources">Resources</button>
            </div>
            
            <div id="roadmap" class="tab-content active">
                <h3>Learning Path</h3>
                <div class="roadmap-steps">
                    ${course.roadmap.map(step => `
                        <div class="roadmap-step ${step.status}">
                            <div class="step-number">${step.step}</div>
                            <div class="step-content">
                                <h4>${step.title}</h4>
                                <p>Duration: ${step.duration}</p>
                                <div class="step-topics">
                                    ${step.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div id="videos" class="tab-content">
                <h3>Video Lectures</h3>
                <div class="video-grid">
                    ${course.videos.map(video => `
                        <div class="video-card" onclick="playVideo('${video.youtubeId}', '${video.title}', '${video.id}')">
                            <div class="video-thumbnail">
                                <img src="https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg" alt="${video.title}">
                                <div class="play-overlay"><i class="fas fa-play-circle"></i></div>
                                ${video.watched ? '<span class="watched-badge"><i class="fas fa-check"></i></span>' : ''}
                            </div>
                            <div class="video-info">
                                <h4>${video.title}</h4>
                                <p>${video.description}</p>
                                <div class="video-meta">
                                    <span><i class="fas fa-clock"></i> ${video.duration}</span>
                                    <span><i class="fas fa-language"></i> ${video.language}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div id="challenges" class="tab-content">
                <h3>Practice Challenges</h3>
                ${course.challenges.map(challenge => `
                    <div class="challenge-item">
                        <div class="challenge-item-header">
                            <h4>${challenge.title}</h4>
                            <span class="difficulty ${challenge.difficulty}">${challenge.difficulty}</span>
                        </div>
                        <p>${challenge.description}</p>
                        <div class="challenge-meta">
                            <span><i class="fas fa-trophy"></i> ${challenge.points} points</span>
                            ${challenge.completed ? '<span class="completed-badge"><i class="fas fa-check-circle"></i> Completed</span>' : ''}
                        </div>
                        <button class="btn-primary" onclick="openChallenge('${courseId}', '${challenge.id}')">Solve Challenge</button>
                    </div>
                `).join('')}
            </div>
            
            <div id="quizzes" class="tab-content">
                <h3>Knowledge Quizzes</h3>
                ${course.quizzes.map(quiz => `
                    <div class="quiz-item">
                        <h4>${quiz.title}</h4>
                        <div class="quiz-meta">
                            <span><i class="fas fa-question-circle"></i> ${quiz.questions} questions</span>
                            <span><i class="fas fa-clock"></i> ${quiz.duration}</span>
                            <span><i class="fas fa-check"></i> ${quiz.passingScore}% to pass</span>
                        </div>
                        <button class="btn-primary">Start Quiz</button>
                    </div>
                `).join('')}
            </div>
            
            <div id="resources" class="tab-content">
                <h3>Additional Resources</h3>
                ${course.resources.map(resource => `
                    <div class="resource-item">
                        <div class="resource-icon"><i class="fas fa-file-${resource.type.toLowerCase()}"></i></div>
                        <div class="resource-info">
                            <h4>${resource.title}</h4>
                            <p>Type: ${resource.type}${resource.size ? ' • Size: ' + resource.size : ''}</p>
                        </div>
                        <button class="btn-primary" onclick="window.open('${resource.downloadUrl}')">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Setup tab switching
    const tabBtns = content.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            content.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            content.querySelector('#' + this.dataset.tab).classList.add('active');
        });
    });
    
    document.getElementById('courseModal').style.display = 'block';
}

// Play Video
function playVideo(youtubeId, title, videoId) {
    const player = document.getElementById('videoPlayer');
    player.innerHTML = `
        <h3>${title}</h3>
        <div class="video-player-container">
            <iframe width="100%" height="500" 
                src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
        <button class="btn-primary" onclick="markVideoWatched('${videoId}')">
            <i class="fas fa-check"></i> Mark as Watched
        </button>
    `;
    document.getElementById('videoModal').style.display = 'block';
}

// Mark Video as Watched
function markVideoWatched(videoId) {
    if (!userProgress.videosWatched.includes(videoId)) {
        userProgress.videosWatched.push(videoId);
        saveProgress();
        alert('Video marked as watched! Keep learning! 🎉');
    }
}

// Open Challenge
function openChallenge(courseId, challengeId) {
    const challenge = COMPLETE_COURSE_DATA[courseId].challenges.find(c => c.id === challengeId);
    if (!challenge) return;
    
    const content = document.getElementById('challengeContent');
    content.innerHTML = `
        <div class="challenge-detail">
            <h2>${challenge.title}</h2>
            <span class="difficulty ${challenge.difficulty}">${challenge.difficulty}</span>
            <p>${challenge.description}</p>
            <div class="challenge-points"><i class="fas fa-trophy"></i> ${challenge.points} points</div>
            
            ${challenge.testCases ? `
                <div class="test-cases">
                    <h4>Test Cases:</h4>
                    <ul>
                        ${challenge.testCases.map(tc => `<li>${tc}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div class="code-editor-container">
                <h4>Your Solution:</h4>
                <textarea class="code-editor" id="challengeCode" placeholder="Write your code here...">${challenge.solution || ''}</textarea>
            </div>
            
            <div class="challenge-actions">
                <button class="btn-primary" onclick="runChallengeCode()">
                    <i class="fas fa-play"></i> Run Code
                </button>
                <button class="btn-primary" onclick="submitChallenge('${courseId}', '${challengeId}')">
                    <i class="fas fa-check"></i> Submit Solution
                </button>
            </div>
            
            <div class="challenge-output">
                <h4>Output:</h4>
                <pre id="challengeOutput">Run your code to see output...</pre>
            </div>
        </div>
    `;
    document.getElementById('challengeModal').style.display = 'block';
}

// Run Challenge Code
function runChallengeCode() {
    const code = document.getElementById('challengeCode').value;
    const output = document.getElementById('challengeOutput');
    
    try {
        const logs = [];
        console.log = function(...args) {
            logs.push(args.join(' '));
        };
        
        eval(code);
        output.textContent = logs.length > 0 ? logs.join('\n') : 'Code executed successfully!';
        output.style.color = 'var(--success)';
    } catch (error) {
        output.textContent = 'Error: ' + error.message;
        output.style.color = 'var(--danger)';
    }
}

// Submit Challenge
function submitChallenge(courseId, challengeId) {
    const challengeKey = courseId + '-' + challengeId;
    if (!userProgress.challengesSolved.includes(challengeKey)) {
        userProgress.challengesSolved.push(challengeKey);
        const challenge = COMPLETE_COURSE_DATA[courseId].challenges.find(c => c.id === challengeId);
        userProgress.totalPoints += challenge.points;
        saveProgress();
        alert('Challenge completed! 🎉 Points earned!');
        document.getElementById('challengeModal').style.display = 'none';
        renderAllChallenges();
    }
}

// Modal Close Handlers
document.getElementById('closeModal').onclick = () => {
    document.getElementById('courseModal').style.display = 'none';
};

document.getElementById('closeVideoModal').onclick = () => {
    document.getElementById('videoModal').style.display = 'none';
};

document.getElementById('closeChallengeModal').onclick = () => {
    document.getElementById('challengeModal').style.display = 'none';
};

window.onclick = (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Roadmap Card Click Handler
document.addEventListener('click', (e) => {
    if (e.target.closest('.roadmap-card')) {
        const courseId = e.target.closest('.roadmap-card').dataset.course;
        openCourse(courseId);
    }
});

// Challenge Filters
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const level = this.dataset.level;
        document.querySelectorAll('.challenge-card').forEach(card => {
            if (level === 'all' || card.dataset.difficulty === level) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Code Playground
document.getElementById('runCode').addEventListener('click', () => {
    const code = document.getElementById('codeEditor').value;
    const output = document.getElementById('codeOutput');
    
    try {
        const logs = [];
        console.log = function(...args) {
            logs.push(args.join(' '));
        };
        
        eval(code);
        output.textContent = logs.length > 0 ? logs.join('\n') : 'Code executed successfully!';
    } catch (error) {
        output.textContent = 'Error: ' + error.message;
    }
});

document.getElementById('clearCode').addEventListener('click', () => {
    document.getElementById('codeEditor').value = '';
    document.getElementById('codeOutput').textContent = 'Run your code to see output...';
});

document.getElementById('saveCode').addEventListener('click', () => {
    const code = document.getElementById('codeEditor').value;
    localStorage.setItem('savedCode', code);
    alert('Code saved successfully!');
});

// Certificate Download
document.getElementById('downloadCertificate').addEventListener('click', () => {
    alert('Certificate download feature coming soon! Complete courses to unlock.');
});

// Search Functionality
document.getElementById('searchBox').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.roadmap-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});

// Initialize
loadProgress();
renderRoadmaps();
renderAllChallenges();

console.log('🚀 Ritika Tech Hub - Full Platform Loaded!');
console.log('✅ All Features Active: Videos, Challenges, Playground, Progress Tracking');