// ===== HELPER FUNCTIONS =====
// Che tên: "Nguyễn Văn An" -> "Nguyễn V** A*"
function maskName(fullName) {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) {
        return parts[0].charAt(0) + '*'.repeat(parts[0].length - 1);
    }
    
    const firstName = parts[0]; // Họ giữ nguyên
    const lastName = parts[parts.length - 1]; // Tên chính
    const middleNames = parts.slice(1, -1); // Tên đệm
    
    // Che tên đệm
    const maskedMiddle = middleNames.map(name => name.charAt(0) + '*'.repeat(name.length - 1));
    
    // Che một phần tên chính
    const maskedLast = lastName.charAt(0) + '*'.repeat(lastName.length - 1);
    
    return [firstName, ...maskedMiddle, maskedLast].join(' ');
}

// Che email: "example@gmail.com" -> "ex***@g***.com"
function maskEmail(email) {
    const [localPart, domain] = email.split('@');
    const [domainName, extension] = domain.split('.');
    
    const maskedLocal = localPart.charAt(0) + localPart.charAt(1) + '*'.repeat(Math.max(localPart.length - 2, 1));
    const maskedDomain = domainName.charAt(0) + '*'.repeat(Math.max(domainName.length - 1, 1));
    
    return `${maskedLocal}@${maskedDomain}.${extension}`;
}

// Lấy chữ cái đầu cho avatar
function getInitials(name) {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
}

// Format thời gian
function getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000); // seconds
    
    if (diff < 60) return 'Vừa xong';
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
}

// Hiển thị danh sách cam kết
function displayCommitments() {
    const commitmentsList = document.getElementById('commitmentsList');
    let commitments = JSON.parse(localStorage.getItem('commitments')) || [];
    
    // Thêm dữ liệu mẫu nếu chưa có
    if (commitments.length === 0) {
        commitments = [
            {
                name: "Nguyễn Văn An",
                email: "nguyenvanan@gmail.com",
                actions: ["Giảm sử dụng nhựa", "Trồng cây xanh", "Tiết kiệm điện"],
                timestamp: new Date(Date.now() - 3600000).toISOString() // 1 giờ trước
            },
            {
                name: "Trần Thị Bình",
                email: "tranthib@yahoo.com",
                actions: ["Phân loại rác", "Tiết kiệm nước"],
                timestamp: new Date(Date.now() - 7200000).toISOString() // 2 giờ trước
            },
            {
                name: "Lê Minh Châu",
                email: "leminhchau@outlook.com",
                actions: ["Đi xe đạp", "Giảm sử dụng nhựa", "Tiết kiệm điện", "Trồng cây xanh"],
                timestamp: new Date(Date.now() - 10800000).toISOString() // 3 giờ trước
            },
            {
                name: "Phạm Hoàng Dũng",
                email: "phamhoangdung@gmail.com",
                actions: ["Tiết kiệm điện", "Phân loại rác"],
                timestamp: new Date(Date.now() - 14400000).toISOString() // 4 giờ trước
            },
            {
                name: "Hoàng Thị Em",
                email: "hoangthiem@gmail.com",
                actions: ["Trồng cây xanh", "Giảm sử dụng nhựa", "Tiết kiệm nước"],
                timestamp: new Date(Date.now() - 18000000).toISOString() // 5 giờ trước
            }
        ];
        localStorage.setItem('commitments', JSON.stringify(commitments));
    }
    
    if (commitments.length === 0) {
        commitmentsList.innerHTML = '<div class="no-commitments">Chưa có ai cam kết. Hãy là người đầu tiên! 🌱</div>';
        return;
    }
    
    // Lấy 10 cam kết gần nhất
    const recentCommitments = commitments.slice(-10).reverse();
    
    commitmentsList.innerHTML = recentCommitments.map(commitment => {
        const maskedName = maskName(commitment.name);
        const maskedEmail = maskEmail(commitment.email);
        const initials = getInitials(commitment.name);
        const timeAgo = getTimeAgo(commitment.timestamp);
        
        const actionBadges = commitment.actions.slice(0, 3).map(action => 
            `<span class="commitment-badge">${action}</span>`
        ).join('');
        
        const moreActions = commitment.actions.length > 3 
            ? `<span class="commitment-badge">+${commitment.actions.length - 3}</span>` 
            : '';
        
        return `
            <div class="commitment-item">
                <div class="commitment-avatar">${initials}</div>
                <div class="commitment-info">
                    <div class="commitment-name">${maskedName}</div>
                    <div class="commitment-email">${maskedEmail}</div>
                    <div class="commitment-actions">
                        ${actionBadges}${moreActions}
                    </div>
                </div>
                <div class="commitment-time">${timeAgo}</div>
            </div>
        `;
    }).join('');
}

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Đóng menu khi click vào link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
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

// ===== FORM SUBMISSION =====
const commitmentForm = document.getElementById('commitmentForm');
const thankYouMessage = document.getElementById('thankYouMessage');
const totalCommitmentsElement = document.getElementById('totalCommitments');

// Lấy số lượng cam kết từ localStorage hoặc khởi tạo
let totalCommitments = parseInt(localStorage.getItem('totalCommitments')) || 1247;
totalCommitmentsElement.textContent = totalCommitments.toLocaleString();

commitmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Lấy dữ liệu từ form
    const formData = new FormData(commitmentForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const actions = formData.getAll('action');
    
    // Kiểm tra ít nhất một hành động được chọn
    if (actions.length === 0) {
        alert('Vui lòng chọn ít nhất một hành động cam kết!');
        return;
    }
    
    // Lưu dữ liệu (trong thực tế sẽ gửi lên server)
    const commitment = {
        name: name,
        email: email,
        actions: actions,
        timestamp: new Date().toISOString()
    };
    
    // Lưu vào localStorage
    let commitments = JSON.parse(localStorage.getItem('commitments')) || [];
    commitments.push(commitment);
    localStorage.setItem('commitments', JSON.stringify(commitments));
    
    // Tăng số lượng cam kết
    totalCommitments++;
    localStorage.setItem('totalCommitments', totalCommitments);
    totalCommitmentsElement.textContent = totalCommitments.toLocaleString();
    
    // Cập nhật danh sách cam kết
    displayCommitments();
    
    // Hiển thị thông báo cảm ơn
    showThankYouMessage();
    
    // Reset form
    commitmentForm.reset();
    
    // Log để kiểm tra (có thể xóa trong production)
    console.log('Cam kết mới:', commitment);
});

// ===== SHOW THANK YOU MESSAGE =====
function showThankYouMessage() {
    thankYouMessage.classList.add('show');
    document.body.style.overflow = 'hidden'; // Ngăn scroll khi popup hiển thị
}

// ===== CLOSE THANK YOU MESSAGE =====
function closeThankYou() {
    thankYouMessage.classList.remove('show');
    document.body.style.overflow = 'auto'; // Cho phép scroll lại
}

// Đóng popup khi click bên ngoài
thankYouMessage.addEventListener('click', (e) => {
    if (e.target === thankYouMessage) {
        closeThankYou();
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Áp dụng animation cho các card
document.querySelectorAll('.content-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Thêm shadow khi scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Animate counters khi scroll đến section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/,/g, ''));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-grid').forEach(grid => {
    statsObserver.observe(grid);
});

// ===== FORM VALIDATION =====
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

// Validation cho tên
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim().length < 2) {
        nameInput.style.borderColor = '#e74c3c';
    } else {
        nameInput.style.borderColor = '#2ecc71';
    }
});

// Validation cho email
emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#e74c3c';
    } else {
        emailInput.style.borderColor = '#2ecc71';
    }
});

// Reset border khi focus
[nameInput, emailInput].forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = '#2ecc71';
    });
});

// ===== CHECKBOX ANIMATION =====
document.querySelectorAll('.checkbox-label input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const label = this.closest('.checkbox-label');
        if (this.checked) {
            label.style.background = 'linear-gradient(135deg, #a8e6cf, #2ecc71)';
            label.style.color = 'white';
            label.style.fontWeight = '600';
        } else {
            label.style.background = '#f0f9f4';
            label.style.color = '#2c3e50';
            label.style.fontWeight = 'normal';
        }
    });
});

// ===== EASTER EGG: CLICK LOGO =====
let clickCount = 0;
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        alert('🌍 Cảm ơn bạn đã quan tâm đến môi trường! Mỗi hành động nhỏ đều tạo nên sự khác biệt lớn! 💚');
        clickCount = 0;
    }
});

// ===== CONSOLE MESSAGE =====
console.log('%c🌍 Hành Động Xanh', 'color: #2ecc71; font-size: 24px; font-weight: bold;');
console.log('%cCảm ơn bạn đã quan tâm đến môi trường!', 'color: #27ae60; font-size: 16px;');
console.log('%cWebsite được phát triển với mục đích giáo dục và tuyên truyền bảo vệ môi trường.', 'color: #7f8c8d; font-size: 12px;');

// ===== LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Hiển thị danh sách cam kết khi trang load
    displayCommitments();
});

// ===== PREVENT FORM RESUBMISSION =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
