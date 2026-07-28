// ============================================================
// FREE FIRE SENSITIVITY GENERATOR - FULL MODULE
// Phiên bản tối ưu cho mobile + giới hạn 5 lần/ngày theo IP
// ============================================================

// ============================================================
// 1. DATABASE
// ============================================================
const DEVICE_DB = [
    // Apple
    { brand: "Apple", model: "iPhone 6", operatingSystem: "iOS", cpu: "A8", ram: 1, refreshRate: 60, releaseYear: 2014, estimatedPrice: 200, tier: "low" },
    { brand: "Apple", model: "iPhone 7", operatingSystem: "iOS", cpu: "A10", ram: 2, refreshRate: 60, releaseYear: 2016, estimatedPrice: 250, tier: "low" },
    { brand: "Apple", model: "iPhone 8", operatingSystem: "iOS", cpu: "A11", ram: 2, refreshRate: 60, releaseYear: 2017, estimatedPrice: 300, tier: "low" },
    { brand: "Apple", model: "iPhone X", operatingSystem: "iOS", cpu: "A11", ram: 3, refreshRate: 60, releaseYear: 2017, estimatedPrice: 500, tier: "mid" },
    { brand: "Apple", model: "iPhone XR", operatingSystem: "iOS", cpu: "A12", ram: 3, refreshRate: 60, releaseYear: 2018, estimatedPrice: 400, tier: "mid" },
    { brand: "Apple", model: "iPhone 11", operatingSystem: "iOS", cpu: "A13", ram: 4, refreshRate: 60, releaseYear: 2019, estimatedPrice: 500, tier: "mid" },
    { brand: "Apple", model: "iPhone 12", operatingSystem: "iOS", cpu: "A14", ram: 4, refreshRate: 60, releaseYear: 2020, estimatedPrice: 700, tier: "high" },
    { brand: "Apple", model: "iPhone 13", operatingSystem: "iOS", cpu: "A15", ram: 4, refreshRate: 60, releaseYear: 2021, estimatedPrice: 800, tier: "high" },
    { brand: "Apple", model: "iPhone 14", operatingSystem: "iOS", cpu: "A16", ram: 6, refreshRate: 60, releaseYear: 2022, estimatedPrice: 900, tier: "high" },
    { brand: "Apple", model: "iPhone 15", operatingSystem: "iOS", cpu: "A17", ram: 6, refreshRate: 60, releaseYear: 2023, estimatedPrice: 1000, tier: "high" },
    { brand: "Apple", model: "iPhone 14 Pro Max", operatingSystem: "iOS", cpu: "A16", ram: 6, refreshRate: 120, releaseYear: 2022, estimatedPrice: 1200, tier: "high" },
    { brand: "Apple", model: "iPhone 15 Pro Max", operatingSystem: "iOS", cpu: "A17", ram: 8, refreshRate: 120, releaseYear: 2023, estimatedPrice: 1300, tier: "high" },
    // Samsung
    { brand: "Samsung", model: "Galaxy S21 Ultra", operatingSystem: "Android", cpu: "Exynos 2100", ram: 12, refreshRate: 120, releaseYear: 2021, estimatedPrice: 1000, tier: "high" },
    { brand: "Samsung", model: "Galaxy S22 Ultra", operatingSystem: "Android", cpu: "Snapdragon 8 Gen 1", ram: 12, refreshRate: 120, releaseYear: 2022, estimatedPrice: 1100, tier: "high" },
    { brand: "Samsung", model: "Galaxy S23 Ultra", operatingSystem: "Android", cpu: "Snapdragon 8 Gen 2", ram: 12, refreshRate: 120, releaseYear: 2023, estimatedPrice: 1200, tier: "high" },
    { brand: "Samsung", model: "Galaxy Z Fold5", operatingSystem: "Android", cpu: "Snapdragon 8 Gen 2", ram: 12, refreshRate: 120, releaseYear: 2023, estimatedPrice: 1400, tier: "high" },
    { brand: "Samsung", model: "Galaxy Z Flip5", operatingSystem: "Android", cpu: "Snapdragon 8 Gen 2", ram: 8, refreshRate: 120, releaseYear: 2023, estimatedPrice: 1000, tier: "high" },
    { brand: "Samsung", model: "Galaxy A53", operatingSystem: "Android", cpu: "Exynos 1280", ram: 6, refreshRate: 120, releaseYear: 2022, estimatedPrice: 350, tier: "mid" },
    { brand: "Samsung", model: "Galaxy A34", operatingSystem: "Android", cpu: "Dimensity 1080", ram: 6, refreshRate: 120, releaseYear: 2023, estimatedPrice: 400, tier: "mid" },
    { brand: "Samsung", model: "Galaxy A12", operatingSystem: "Android", cpu: "Helio P35", ram: 3, refreshRate: 60, releaseYear: 2021, estimatedPrice: 150, tier: "low" },
    // Xiaomi / Redmi / POCO
    { brand: "Xiaomi", model: "Redmi Note 12", operatingSystem: "Android", cpu: "Snapdragon 685", ram: 4, refreshRate: 120, releaseYear: 2023, estimatedPrice: 200, tier: "low" },
    { brand: "Xiaomi", model: "Redmi Note 12 Pro", operatingSystem: "Android", cpu: "Dimensity 1080", ram: 8, refreshRate: 120, releaseYear: 2023, estimatedPrice: 350, tier: "mid" },
    { brand: "Xiaomi", model: "POCO X5 Pro", operatingSystem: "Android", cpu: "Snapdragon 778G", ram: 6, refreshRate: 120, releaseYear: 2023, estimatedPrice: 300, tier: "mid" },
    { brand: "Xiaomi", model: "POCO F5", operatingSystem: "Android", cpu: "Snapdragon 7+ Gen 2", ram: 8, refreshRate: 120, releaseYear: 2023, estimatedPrice: 450, tier: "high" },
    { brand: "Xiaomi", model: "Xiaomi 13 Pro", operatingSystem: "Android", cpu: "Snapdragon 8 Gen 2", ram: 12, refreshRate: 120, releaseYear: 2023, estimatedPrice: 1000, tier: "high" },
    { brand: "Xiaomi", model: "Redmi A2", operatingSystem: "Android", cpu: "Helio G36", ram: 2, refreshRate: 60, releaseYear: 2023, estimatedPrice: 100, tier: "low" },
    // OPPO, vivo, realme
    { brand: "OPPO", model: "Reno10 Pro", operatingSystem: "Android", cpu: "Dimensity 8200", ram: 8, refreshRate: 120, releaseYear: 2023, estimatedPrice: 500, tier: "mid" },
    { brand: "vivo", model: "Y33s", operatingSystem: "Android", cpu: "Helio G80", ram: 4, refreshRate: 60, releaseYear: 2022, estimatedPrice: 200, tier: "low" },
    { brand: "vivo", model: "V29", operatingSystem: "Android", cpu: "Snapdragon 778G", ram: 8, refreshRate: 120, releaseYear: 2023, estimatedPrice: 450, tier: "mid" },
    { brand: "realme", model: "Narzo 60", operatingSystem: "Android", cpu: "Dimensity 6020", ram: 4, refreshRate: 90, releaseYear: 2023, estimatedPrice: 200, tier: "low" },
    { brand: "realme", model: "GT Neo5", operatingSystem: "Android", cpu: "Snapdragon 8+ Gen 1", ram: 8, refreshRate: 144, releaseYear: 2023, estimatedPrice: 600, tier: "high" },
    // Google, OnePlus, ASUS, Sony, Nokia, Motorola, Tecno, Infinix, itel
    { brand: "Google", model: "Pixel 8 Pro", operatingSystem: "Android", cpu: "Tensor G3", ram: 12, refreshRate: 120, releaseYear: 2023, estimatedPrice: 1000, tier: "high" },
    { brand: "OnePlus", model: "11 5G", operatingSystem: "Android", cpu: "Snapdragon 8 Gen 2", ram: 12, refreshRate: 120, releaseYear: 2023, estimatedPrice: 700, tier: "high" },
    { brand: "ASUS", model: "ROG Phone 7", operatingSystem: "Android", cpu: "Snapdragon 8 Gen 2", ram: 16, refreshRate: 165, releaseYear: 2023, estimatedPrice: 1000, tier: "high" },
    { brand: "Sony", model: "Xperia 1 V", operatingSystem: "Android", cpu: "Snapdragon 8 Gen 2", ram: 12, refreshRate: 120, releaseYear: 2023, estimatedPrice: 900, tier: "high" },
    { brand: "Nokia", model: "G22", operatingSystem: "Android", cpu: "Unisoc T606", ram: 4, refreshRate: 90, releaseYear: 2023, estimatedPrice: 150, tier: "low" },
    { brand: "Motorola", model: "Moto G84", operatingSystem: "Android", cpu: "Snapdragon 695", ram: 6, refreshRate: 120, releaseYear: 2023, estimatedPrice: 300, tier: "mid" },
    { brand: "Tecno", model: "Spark 20", operatingSystem: "Android", cpu: "Helio G85", ram: 4, refreshRate: 90, releaseYear: 2024, estimatedPrice: 140, tier: "low" },
    { brand: "Infinix", model: "Hot 40", operatingSystem: "Android", cpu: "Helio G88", ram: 6, refreshRate: 90, releaseYear: 2024, estimatedPrice: 160, tier: "low" },
    { brand: "itel", model: "A60", operatingSystem: "Android", cpu: "Unisoc SC9863A", ram: 2, refreshRate: 60, releaseYear: 2023, estimatedPrice: 90, tier: "low" },
];

// ============================================================
// 2. UTILITY
// ============================================================
function normalizeStr(s) { return s.toLowerCase().trim(); }

function extractModelFromUA(ua) {
    if (!ua) return null;
    const patterns = [
        /iPhone(\s*\d+)\s*(Pro\s*Max|Pro|Plus)?/i,
        /Galaxy\s*([A-Za-z0-9\s]+?)(?=\s+Build|;|\)|$)/i,
        /SM-([A-Za-z0-9]+)/i,
        /Redmi\s*([A-Za-z0-9\s]+?)(?=\s+Build|;|\)|$)/i,
        /POCO\s*([A-Za-z0-9\s]+?)(?=\s+Build|;|\)|$)/i,
        /(Pixel\s*\d+[a-zA-Z]*)/i,
        /(Reno\s*\d+[a-zA-Z]*)/i,
        /(V\d+)/i,
        /(GT\s*[A-Za-z0-9]+)/i,
        /(ROG\s*Phone\s*\d+)/i,
    ];
    for (let p of patterns) {
        const m = ua.match(p);
        if (m) return m[0].trim();
    }
    const parts = ua.split(/[;]/);
    for (let part of parts) {
        if (part.includes('Build') || part.includes('Android')) continue;
        const trimmed = part.trim();
        if (trimmed.length > 3 && trimmed.length < 40) return trimmed;
    }
    return null;
}

// ============================================================
// 3. IP & LIMIT MANAGEMENT (localStorage)
// ============================================================
function getIP() {
    return new Promise((resolve) => {
        // Lấy IP từ các service miễn phí
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => resolve(data.ip || 'unknown'))
            .catch(() => {
                // Fallback: tạo IP giả từ localStorage nếu không fetch được
                let fakeIP = localStorage.getItem('ff_fake_ip');
                if (!fakeIP) {
                    fakeIP = 'ip_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
                    localStorage.setItem('ff_fake_ip', fakeIP);
                }
                resolve(fakeIP);
            });
    });
}

function getToday() {
    return new Date().toLocaleDateString('vi-VN');
}

function getLimitData() {
    try {
        const data = JSON.parse(localStorage.getItem('ff_limit_data') || '{}');
        return data;
    } catch { return {}; }
}

function saveLimitData(data) {
    localStorage.setItem('ff_limit_data', JSON.stringify(data));
}

function checkAndGetLimit(ip) {
    const data = getLimitData();
    const today = getToday();
    const key = `${ip}_${today}`;
    
    if (!data[key]) {
        data[key] = { count: 0, date: today };
        saveLimitData(data);
        return { allowed: true, remaining: 5 };
    }
    
    const entry = data[key];
    if (entry.date !== today) {
        // Reset cho ngày mới
        entry.count = 0;
        entry.date = today;
        saveLimitData(data);
        return { allowed: true, remaining: 5 };
    }
    
    const remaining = Math.max(0, 5 - entry.count);
    return { allowed: remaining > 0, remaining, count: entry.count };
}

function incrementLimit(ip) {
    const data = getLimitData();
    const today = getToday();
    const key = `${ip}_${today}`;
    
    if (!data[key]) {
        data[key] = { count: 1, date: today };
    } else {
        data[key].count = Math.min(5, data[key].count + 1);
        data[key].date = today;
    }
    saveLimitData(data);
    return data[key].count;
}

function getRemainingForDisplay(ip) {
    const result = checkAndGetLimit(ip);
    return result.remaining;
}

// ============================================================
// 4. CORE FUNCTIONS
// ============================================================
function detectDevice() {
    const input = document.getElementById('phoneInput').value.trim();
    let userAgent = navigator.userAgent || '';
    let modelFromUA = null;

    if (navigator.userAgentData && navigator.userAgentData.platform) {
        const platform = navigator.userAgentData.platform || '';
        if (platform.includes('iPhone') || platform.includes('iPad')) {
            const match = userAgent.match(/iPhone(\s*\d+[a-zA-Z]*)/i);
            if (match) modelFromUA = match[0];
        }
    }
    if (!modelFromUA) {
        modelFromUA = extractModelFromUA(userAgent);
    }

    let rawName = input || modelFromUA || '';
    if (!rawName) return null;

    let found = null;
    const normalizedInput = normalizeStr(rawName);
    for (let device of DEVICE_DB) {
        const normalizedModel = normalizeStr(device.model);
        if (normalizedModel.includes(normalizedInput) || normalizedInput.includes(normalizedModel)) {
            found = { ...device };
            break;
        }
    }

    if (!found) {
        found = analyzePhone(rawName);
    }

    found.confidence = found.confidence || (found.brand ? 85 : 60);
    return found;
}

function analyzePhone(name) {
    const lower = normalizeStr(name);
    let brand = 'Unknown', tier = 'mid', cpu = 'Unknown', ram = 4, refreshRate = 60, releaseYear = 2022, estimatedPrice = 300;

    if (lower.includes('iphone')) brand = 'Apple';
    else if (lower.includes('samsung') || lower.includes('galaxy')) brand = 'Samsung';
    else if (lower.includes('xiaomi') || lower.includes('redmi')) brand = 'Xiaomi';
    else if (lower.includes('poco')) brand = 'POCO';
    else if (lower.includes('oppo') || lower.includes('reno')) brand = 'OPPO';
    else if (lower.includes('vivo')) brand = 'vivo';
    else if (lower.includes('realme')) brand = 'realme';
    else if (lower.includes('pixel')) brand = 'Google';
    else if (lower.includes('oneplus')) brand = 'OnePlus';
    else if (lower.includes('rog')) brand = 'ASUS';
    else if (lower.includes('sony') || lower.includes('xperia')) brand = 'Sony';
    else if (lower.includes('nokia')) brand = 'Nokia';
    else if (lower.includes('moto')) brand = 'Motorola';
    else if (lower.includes('tecno')) brand = 'Tecno';
    else if (lower.includes('infinix')) brand = 'Infinix';
    else if (lower.includes('itel')) brand = 'itel';

    if (/(ultra|pro\s*max|fold|flip|rog|gaming|magic|gt)/i.test(lower)) {
        tier = 'high'; ram = 8; refreshRate = 120; estimatedPrice = 800; cpu = 'High-end';
    } else if (/(fe|reno|nord|note\s*pro|neo|t[0-9])/i.test(lower)) {
        tier = 'mid'; ram = 6; refreshRate = 90; estimatedPrice = 400; cpu = 'Mid-range';
    } else if (/(a0|a1|a2|c\s|spark|hot|y|narzo|note|lite)/i.test(lower)) {
        tier = 'low'; ram = 3; refreshRate = 60; estimatedPrice = 150; cpu = 'Entry';
    }

    const perf = calculatePerformanceScore({ ram, refreshRate, estimatedPrice, tier, cpu });
    const tierClass = classifyTier(perf);

    return {
        brand,
        model: name,
        operatingSystem: brand === 'Apple' ? 'iOS' : 'Android',
        cpu,
        ram,
        refreshRate,
        releaseYear,
        estimatedPrice,
        tier: tierClass,
        confidence: 55,
        performanceScore: perf,
    };
}

function calculatePerformanceScore(device) {
    let score = 30;
    if (device.ram >= 8) score += 20;
    else if (device.ram >= 6) score += 12;
    else if (device.ram >= 4) score += 6;
    if (device.refreshRate >= 144) score += 20;
    else if (device.refreshRate >= 120) score += 12;
    else if (device.refreshRate >= 90) score += 5;
    if (device.estimatedPrice >= 800) score += 15;
    else if (device.estimatedPrice >= 500) score += 8;
    if (device.tier === 'high') score += 12;
    else if (device.tier === 'mid') score += 4;
    const cpu = (device.cpu || '').toLowerCase();
    if (cpu.includes('snapdragon 8') || cpu.includes('a17') || cpu.includes('a16') || cpu.includes('tensor g3')) score += 15;
    else if (cpu.includes('snapdragon 7') || cpu.includes('dimensity 8') || cpu.includes('a15')) score += 8;
    else if (cpu.includes('helio') || cpu.includes('exynos')) score += 2;
    return Math.min(100, Math.max(0, score));
}

function classifyTier(score) {
    if (score >= 70) return 'high';
    if (score >= 40) return 'mid';
    return 'low';
}

function generateSensitivity(device) {
    if (!device) return null;
    const perf = device.performanceScore || calculatePerformanceScore(device);

    let generalMin = 90, generalMax = 160;
    const brand = (device.brand || '').toLowerCase();
    const model = (device.model || '').toLowerCase();

    if (brand === 'apple') {
        if (/iphone\s*([6-9]|10|11)/i.test(model)) {
            generalMin = 160; generalMax = 190;
        } else {
            generalMin = 90; generalMax = 140;
        }
    } else {
        if (device.tier === 'low') { generalMin = 180; generalMax = 200; }
        else if (device.tier === 'mid') { generalMin = 150; generalMax = 180; }
        else { generalMin = 100; generalMax = 160; }
    }

    function randomInRange(min, max, influence = 0.5) {
        const mid = (min + max) / 2;
        const range = (max - min) / 2;
        const noise = (Math.random() * 2 - 1) * range * (1 - influence * 0.3);
        const bias = (perf - 50) * 0.15;
        return Math.round(Math.min(max, Math.max(min, mid + noise + bias)));
    }

    const general = randomInRange(generalMin, generalMax, 0.4);

    function randomSens() {
        const baseVal = 80 + perf * 0.6 + (Math.random() * 60 - 30);
        return Math.min(200, Math.max(1, Math.round(baseVal + (Math.random() * 20 - 10))));
    }

    return {
        general,
        redDot: randomSens(),
        scope2x: randomSens(),
        scope4x: randomSens(),
        awm: randomSens(),
        freeLook: randomSens(),
    };
}

// ============================================================
// 5. RENDER FUNCTIONS
// ============================================================
function renderDevice(device) {
    const card = document.getElementById('deviceCard');
    const grid = document.getElementById('deviceGrid');

    if (!device) {
        card.style.display = 'none';
        return;
    }

    const fields = [
        { label: 'Thiết bị', value: device.model || 'Không xác định' },
        { label: 'Hãng', value: device.brand || 'Unknown' },
        { label: 'HĐH', value: device.operatingSystem || 'N/A' },
        { label: 'CPU', value: device.cpu || 'N/A' },
        { label: 'RAM', value: device.ram ? device.ram + ' GB' : 'N/A' },
        { label: 'Tần số', value: device.refreshRate ? device.refreshRate + ' Hz' : 'N/A' },
        { label: 'Năm', value: device.releaseYear || 'N/A' },
        { label: 'Giá', value: device.estimatedPrice ? '$' + device.estimatedPrice : 'N/A' },
        { label: 'Phân khúc', value: device.tier ? device.tier.toUpperCase() : 'N/A' },
        { label: 'Hiệu năng', value: device.performanceScore || 'N/A' },
        { label: 'Độ tin cậy', value: device.confidence ? device.confidence + '%' : 'N/A' },
    ];

    grid.innerHTML = fields.map(f =>
        `<div class="device-item"><span>${f.label}</span><span>${f.value}</span></div>`
    ).join('');

    card.style.display = 'block';
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = 'slideUp 0.4s ease forwards';
}

function renderSensitivity(sens) {
    const card = document.getElementById('sensCard');
    const grid = document.getElementById('sensGrid');

    if (!sens) {
        card.style.display = 'none';
        return;
    }

    const items = [
        { label: 'Tổng quát', value: sens.general },
        { label: 'Red Dot', value: sens.redDot },
        { label: '2x Scope', value: sens.scope2x },
        { label: '4x Scope', value: sens.scope4x },
        { label: 'AWM Scope', value: sens.awm },
        { label: 'Free Look', value: sens.freeLook },
    ];

    grid.innerHTML = items.map(item =>
        `<div class="sens-item"><span class="label">${item.label}</span><span class="value">${item.value}</span></div>`
    ).join('');

    card.style.display = 'block';
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = 'slideUp 0.4s ease forwards';
}

function updateLimitDisplay(remaining) {
    document.getElementById('limitDisplay').textContent = remaining;
    document.getElementById('navLimitBadge').textContent = remaining;
}

function updateStatus(text, type = 'green') {
    document.getElementById('statusText').textContent = text;
    const dot = document.getElementById('statusIcon');
    dot.className = 'status-dot ' + type;
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toastMessage');
    const icon = toast.querySelector('.toast-icon');
    
    msg.textContent = message;
    icon.className = isError ? 'fas fa-exclamation-circle toast-icon' : 'fas fa-check-circle toast-icon';
    toast.className = 'toast' + (isError ? ' error' : '');
    
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================================
// 6. CONTROLLER
// ============================================================
let currentDevice = null;
let currentSensitivity = null;
let currentIP = null;

function withLoading(callback) {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.add('active');
    
    setTimeout(() => {
        overlay.classList.remove('active');
        callback();
    }, 1500);
}

function handleDetect() {
    const input = document.getElementById('phoneInput').value.trim();
    
    withLoading(() => {
        const device = detectDevice();
        if (!device) {
            showToast('Không thể nhận diện thiết bị!', true);
            updateStatus('Không tìm thấy thiết bị', 'red');
            return;
        }
        currentDevice = device;
        renderDevice(currentDevice);
        updateStatus(`Đã nhận diện: ${device.model}`, 'green');
        showToast(`✅ Đã nhận diện ${device.model}`);
        // Tự động tạo độ nhạy
        handleGenerate();
    });
}

function handleGenerate() {
    if (!currentIP) {
        showToast('Đang lấy IP...', true);
        return;
    }
    
    // Kiểm tra giới hạn
    const limit = checkAndGetLimit(currentIP);
    if (!limit.allowed) {
        showToast('Bạn đã quá giới hạn lần thử cho phép! Vui lòng chờ ngày hôm sau', true);
        updateStatus('Đã hết lượt hôm nay', 'red');
        return;
    }
    
    if (!currentDevice) {
        const detected = detectDevice();
        if (detected) {
            currentDevice = detected;
            renderDevice(currentDevice);
        } else {
            showToast('Vui lòng nhập tên điện thoại trước!', true);
            return;
        }
    }
    
    withLoading(() => {
        // Tăng số lần đã dùng
        const count = incrementLimit(currentIP);
        const remaining = getRemainingForDisplay(currentIP);
        updateLimitDisplay(remaining);
        
        const sens = generateSensitivity(currentDevice);
        if (!sens) {
            showToast('Không thể tạo độ nhạy!', true);
            return;
        }
        currentSensitivity = sens;
        renderSensitivity(currentSensitivity);
        updateStatus(`Đã tạo độ nhạy (còn ${remaining} lượt)`, 'green');
        showToast(`✅ Đã tạo độ nhạy! Còn ${remaining} lượt`);
    });
}

function copyResult() {
    const sensItems = document.querySelectorAll('#sensGrid .sens-item');
    if (!sensItems.length) {
        showToast('Chưa có độ nhạy để sao chép!', true);
        return;
    }
    
    let text = '🎯 FREE FIRE SENSITIVITY\n';
    text += `📱 ${currentDevice?.model || 'Unknown'}\n`;
    text += `📅 ${new Date().toLocaleDateString('vi-VN')}\n`;
    text += '═'.repeat(25) + '\n';
    
    sensItems.forEach(item => {
        const label = item.querySelector('.label')?.textContent || '';
        const value = item.querySelector('.value')?.textContent || '';
        text += `${label}: ${value}\n`;
    });
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ Đã sao chép độ nhạy!');
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('✅ Đã sao chép độ nhạy!');
    });
}

// ============================================================
// 7. INITIALIZATION
// ============================================================
async function init() {
    // Lấy IP
    currentIP = await getIP();
    document.getElementById('ipDisplay').textContent = currentIP;
    
    // Cập nhật limit
    const remaining = getRemainingForDisplay(currentIP);
    updateLimitDisplay(remaining);
    updateStatus(`Sẵn sàng (còn ${remaining} lượt)`, 'green');
    
    // Tự động detect
    setTimeout(() => {
        const detected = detectDevice();
        if (detected) {
            currentDevice = detected;
            renderDevice(currentDevice);
            // Tự động tạo độ nhạy nếu còn lượt
            if (remaining > 0) {
                const sens = generateSensitivity(currentDevice);
                if (sens) {
                    currentSensitivity = sens;
                    renderSensitivity(currentSensitivity);
                    updateStatus(`Tự động tạo (còn ${remaining} lượt)`, 'green');
                }
            }
        }
    }, 500);
}

// ============================================================
// 8. EVENT BINDING
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const menuToggle = document.getElementById('menuToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    
    function toggleSidebar() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }
    
    menuToggle.addEventListener('click', toggleSidebar);
    sidebarClose.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
    
    // Menu items
    document.getElementById('menuHome').addEventListener('click', toggleSidebar);
    document.getElementById('menuHistory').addEventListener('click', function() {
        showToast('📋 Tính năng đang phát triển');
        toggleSidebar();
    });
    document.getElementById('menuInfo').addEventListener('click', function() {
        showToast('📖 Mỗi IP được tạo tối đa 5 độ nhạy/ngày');
        toggleSidebar();
    });
    
    // Buttons
    document.getElementById('detectBtn').addEventListener('click', handleDetect);
    document.getElementById('generateBtn').addEventListener('click', handleGenerate);
    document.getElementById('copyBtn').addEventListener('click', copyResult);
    document.getElementById('copyMiniBtn').addEventListener('click', copyResult);
    
    // Clear input
    const input = document.getElementById('phoneInput');
    const clearBtn = document.getElementById('clearInput');
    
    input.addEventListener('input', function() {
        clearBtn.style.display = this.value.length > 0 ? 'block' : 'none';
    });
    clearBtn.addEventListener('click', function() {
        input.value = '';
        input.focus();
        this.style.display = 'none';
    });
    
    // Enter key
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleDetect();
        }
    });
    
    // Khởi tạo
    init();
});
