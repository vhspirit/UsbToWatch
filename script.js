// Sample movie data
const sampleMovies = [
    {
        id: 1,
        title: "فيلم الأكشن المثير",
        year: "2023",
        rating: 4.5,
        genre: "أكشن",
        poster: "../website_assets/images/movies/movie_poster_1.jpg",
        description: "فيلم أكشن مثير مليء بالمغامرات والإثارة"
    },
    {
        id: 2,
        title: "الدراما العاطفية",
        year: "2022",
        rating: 4.2,
        genre: "دراما",
        poster: "../website_assets/images/movies/movie_poster_2.jpg",
        description: "قصة عاطفية مؤثرة تحكي عن الحب والفراق"
    },
    {
        id: 3,
        title: "الكوميديا المرحة",
        year: "2023",
        rating: 4.0,
        genre: "كوميديا",
        poster: "../website_assets/images/movies/movie_poster_3.jpg",
        description: "فيلم كوميدي مرح يضمن لك الضحك والمتعة"
    },
    {
        id: 4,
        title: "فيلم الرعب المخيف",
        year: "2023",
        rating: 3.8,
        genre: "رعب",
        poster: "../website_assets/images/movies/movie_poster_4.jpg",
        description: "فيلم رعب مخيف سيجعلك تقفز من مقعدك"
    },
    {
        id: 5,
        title: "المغامرة الملحمية",
        year: "2022",
        rating: 4.7,
        genre: "أكشن",
        poster: "../website_assets/images/movies/movie_poster_1.jpg",
        description: "مغامرة ملحمية في عالم خيالي مذهل"
    },
    {
        id: 6,
        title: "الرومانسية الحالمة",
        year: "2023",
        rating: 4.3,
        genre: "دراما",
        poster: "../website_assets/images/movies/movie_poster_2.jpg",
        description: "قصة حب رومانسية تأخذك إلى عالم الأحلام"
    }
];

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const connectUSBBtn = document.getElementById('connectUSB');
const moviesGrid = document.getElementById('moviesGrid');
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');
const closeModal = document.querySelector('.close');
const searchInput = document.querySelector('.search-box input');
const filterButtons = document.querySelectorAll('.filter-btn');
const usbStatus = document.getElementById('usbStatus');
const statusText = document.getElementById('statusText');
const heroScroll = document.querySelector('.hero-scroll');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadMovies();
    updateUSBStatus(false);
}

function setupEventListeners() {
    // Navigation toggle
    navToggle.addEventListener('click', toggleNavigation);
    
    // USB connection
    connectUSBBtn.addEventListener('click', connectUSB);
    
    // Modal controls
    closeModal.addEventListener('click', closeVideoModal);
    window.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            handleFilter(this);
        });
    });
    
    // Smooth scrolling
    heroScroll.addEventListener('click', function() {
        document.getElementById('features').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}

function toggleNavigation() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transform = navMenu.classList.contains('active') 
            ? `rotate(${index === 1 ? 0 : index === 0 ? 45 : -45}deg) translate(${index === 1 ? '0' : index === 0 ? '5px, 5px' : '-5px, -5px'})`
            : 'none';
    });
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 46, 0.95)';
    }
}

function connectUSB() {
    // Simulate USB connection
    showLoadingState();
    
    setTimeout(() => {
        const isConnected = Math.random() > 0.3; // 70% chance of success
        
        if (isConnected) {
            updateUSBStatus(true);
            loadUSBMovies();
            showNotification('تم الاتصال بجهاز USB بنجاح!', 'success');
        } else {
            updateUSBStatus(false);
            showNotification('فشل في الاتصال بجهاز USB. تأكد من توصيل الجهاز.', 'error');
        }
        
        hideLoadingState();
    }, 2000);
}

function showLoadingState() {
    connectUSBBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الاتصال...';
    connectUSBBtn.disabled = true;
}

function hideLoadingState() {
    connectUSBBtn.innerHTML = '<i class="fas fa-usb"></i> اتصل بـ USB';
    connectUSBBtn.disabled = false;
}

function updateUSBStatus(connected) {
    if (connected) {
        usbStatus.classList.add('connected');
        statusText.textContent = 'جهاز USB متصل';
    } else {
        usbStatus.classList.remove('connected');
        statusText.textContent = 'لا يوجد جهاز USB متصل';
    }
}

function loadUSBMovies() {
    // Simulate loading movies from USB
    const usbMovies = [...sampleMovies, ...generateRandomMovies(4)];
    displayMovies(usbMovies);
}

function generateRandomMovies(count) {
    const titles = [
        "الفيلم الجديد",
        "المغامرة الكبرى",
        "القصة المثيرة",
        "الحلم المفقود"
    ];
    
    const genres = ["أكشن", "دراما", "كوميديا", "رعب"];
    const years = ["2021", "2022", "2023"];
    
    return Array.from({length: count}, (_, i) => ({
        id: sampleMovies.length + i + 1,
        title: titles[i] || `فيلم ${i + 1}`,
        year: years[Math.floor(Math.random() * years.length)],
        rating: (Math.random() * 2 + 3).toFixed(1),
        genre: genres[Math.floor(Math.random() * genres.length)],
        poster: `../website_assets/images/movies/movie_poster_${(i % 4) + 1}.jpg`,
        description: "وصف الفيلم المثير والممتع"
    }));
}

function loadMovies() {
    displayMovies(sampleMovies);
}

function displayMovies(movies) {
    moviesGrid.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
    
    // Add animation
    const cards = moviesGrid.querySelectorAll('.movie-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <div class="movie-poster" style="background-image: url('${movie.poster}')">
            <div class="play-button">
                <i class="fas fa-play"></i>
            </div>
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-year">${movie.year}</div>
            <div class="movie-rating">
                <i class="fas fa-star"></i>
                <span>${movie.rating}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openVideoModal(movie));
    
    return card;
}

function openVideoModal(movie) {
    videoTitle.textContent = movie.title;
    videoDescription.textContent = movie.description;
    
    // In a real application, you would set the video source here
    // videoPlayer.src = movie.videoUrl;
    
    videoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(-50px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s ease';
        modalContent.style.transform = 'translateY(0)';
        modalContent.style.opacity = '1';
    }, 10);
}

function closeVideoModal() {
    videoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    videoPlayer.pause();
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMovies = sampleMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.genre.toLowerCase().includes(searchTerm)
    );
    
    displayMovies(filteredMovies);
}

function handleFilter(button) {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    const filterValue = button.textContent;
    
    if (filterValue === 'الكل') {
        displayMovies(sampleMovies);
    } else {
        const filteredMovies = sampleMovies.filter(movie => 
            movie.genre === filterValue
        );
        displayMovies(filteredMovies);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 2000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape' && videoModal.style.display === 'block') {
        closeVideoModal();
    }
    
    // Space to play/pause video
    if (e.key === ' ' && videoModal.style.display === 'block') {
        e.preventDefault();
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

