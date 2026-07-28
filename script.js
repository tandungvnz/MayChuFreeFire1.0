// ============================================================
// FREE FIRE SENSITIVITY GENERATOR - AUTO DETECT + MANUAL INPUT
// Tự động lấy thông tin máy đang dùng, hỗ trợ nhập tay
// ============================================================

// ============================================================
// 1. DEVICE DATABASE
// ============================================================
const DEVICE_DB = [
    // Apple
    { brand: "Apple", model: "iPhone 6", os: "iOS", cpu: "A8", ram: 1, refresh: 60, year: 2014, price: 200, tier: "low" },
    { brand: "Apple", model: "iPhone 6s", os: "iOS", cpu: "A9", ram: 2, refresh: 60, year: 2015, price: 220, tier: "low" },
    { brand: "Apple", model: "iPhone 7", os: "iOS", cpu: "A10", ram: 2, refresh: 60, year: 2016, price: 250, tier: "low" },
    { brand: "Apple", model: "iPhone 8", os: "iOS", cpu: "A11", ram: 2, refresh: 60, year: 2017, price: 300, tier: "low" },
    { brand: "Apple", model: "iPhone X", os: "iOS", cpu: "A11", ram: 3, refresh: 60, year: 2017, price: 500, tier: "mid" },
    { brand: "Apple", model: "iPhone XR", os: "iOS", cpu: "A12", ram: 3, refresh: 60, year: 2018, price: 400, tier: "mid" },
    { brand: "Apple", model: "iPhone XS", os: "iOS", cpu: "A12", ram: 4, refresh: 60, year: 2018, price: 600, tier: "high" },
    { brand: "Apple", model: "iPhone 11", os: "iOS", cpu: "A13", ram: 4, refresh: 60, year: 2019, price: 500, tier: "mid" },
    { brand: "Apple", model: "iPhone 11 Pro", os: "iOS", cpu: "A13", ram: 4, refresh: 60, year: 2019, price: 700, tier: "high" },
    { brand: "Apple", model: "iPhone 12", os: "iOS", cpu: "A14", ram: 4, refresh: 60, year: 2020, price: 700, tier: "high" },
    { brand: "Apple", model: "iPhone 12 Pro", os: "iOS", cpu: "A14", ram: 6, refresh: 60, year: 2020, price: 900, tier: "high" },
    { brand: "Apple", model: "iPhone 13", os: "iOS", cpu: "A15", ram: 4, refresh: 60, year: 2021, price: 800, tier: "high" },
    { brand: "Apple", model: "iPhone 13 Pro", os: "iOS", cpu: "A15", ram: 6, refresh: 120, year: 2021, price: 1000, tier: "high" },
    { brand: "Apple", model: "iPhone 14", os: "iOS", cpu: "A16", ram: 6, refresh: 60, year: 2022, price: 900, tier: "high" },
    { brand: "Apple", model: "iPhone 14 Pro", os: "iOS", cpu: "A16", ram: 6, refresh: 120, year: 2022, price: 1100, tier: "high" },
    { brand: "Apple", model: "iPhone 14 Pro Max", os: "iOS", cpu: "A16", ram: 6, refresh: 120, year: 2022, price: 1200, tier: "high" },
    { brand: "Apple", model: "iPhone 15", os: "iOS", cpu: "A17", ram: 6, refresh: 60, year: 2023, price: 1000, tier: "high" },
    { brand: "Apple", model: "iPhone 15 Pro", os: "iOS", cpu: "A17", ram: 8, refresh: 120, year: 2023, price: 1200, tier: "high" },
    { brand: "Apple", model: "iPhone 15 Pro Max", os: "iOS", cpu: "A17", ram: 8, refresh: 120, year: 2023, price: 1300, tier: "high" },
    { brand: "Apple", model: "iPhone 16", os: "iOS", cpu: "A18", ram: 8, refresh: 60, year: 2024, price: 1100, tier: "high" },
    { brand: "Apple", model: "iPhone 16 Pro", os: "iOS", cpu: "A18", ram: 8, refresh: 120, year: 2024, price: 1300, tier: "high" },
    { brand: "Apple", model: "iPhone SE", os: "iOS", cpu: "A13", ram: 3, refresh: 60, year: 2020, price: 400, tier: "mid" },
    { brand: "Apple", model: "iPhone SE 3", os: "iOS", cpu: "A15", ram: 4, refresh: 60, year: 2022, price: 500, tier: "mid" },
    
    // Samsung
    { brand: "Samsung", model: "Galaxy S21", os: "Android", cpu: "Exynos 2100", ram: 8, refresh: 120, year: 2021, price: 700, tier: "high" },
    { brand: "Samsung", model: "Galaxy S21 Ultra", os: "Android", cpu: "Exynos 2100", ram: 12, refresh: 120, year: 2021, price: 1000, tier: "high" },
    { brand: "Samsung", model: "Galaxy S22", os: "Android", cpu: "Snapdragon 8 Gen 1", ram: 8, refresh: 120, year: 2022, price: 800, tier: "high" },
    { brand: "Samsung", model: "Galaxy S22 Ultra", os: "Android", cpu: "Snapdragon 8 Gen 1", ram: 12, refresh: 120, year: 2022, price: 1100, tier: "high" },
    { brand: "Samsung", model: "Galaxy S23", os: "Android", cpu: "Snapdragon 8 Gen 2", ram: 8, refresh: 120, year: 2023, price: 900, tier: "high" },
    { brand: "Samsung", model: "Galaxy S23 Ultra", os: "Android", cpu: "Snapdragon 8 Gen 2", ram: 12, refresh: 120, year: 2023, price: 1200, tier: "high" },
    { brand: "Samsung", model: "Galaxy S24", os: "Android", cpu: "Snapdragon 8 Gen 3", ram: 8, refresh: 120, year: 2024, price: 1000, tier: "high" },
    { brand: "Samsung", model: "Galaxy S24 Ultra", os: "Android", cpu: "Snapdragon 8 Gen 3", ram: 12, refresh: 120, year: 2024, price: 1300, tier: "high" },
    { brand: "Samsung", model: "Galaxy Z Fold5", os: "Android", cpu: "Snapdragon 8 Gen 2", ram: 12, refresh: 120, year: 2023, price: 1400, tier: "high" },
    { brand: "Samsung", model: "Galaxy Z Flip5", os: "Android", cpu: "Snapdragon 8 Gen 2", ram: 8, refresh: 120, year: 2023, price: 1000, tier: "high" },
    { brand: "Samsung", model: "Galaxy A53", os: "Android", cpu: "Exynos 1280", ram: 6, refresh: 120, year: 2022, price: 350, tier: "mid" },
    { brand: "Samsung", model: "Galaxy A34", os: "Android", cpu: "Dimensity 1080", ram: 6, refresh: 120, year: 2023, price: 400, tier: "mid" },
    { brand: "Samsung", model: "Galaxy A55", os: "Android", cpu: "Exynos 1480", ram: 8, refresh: 120, year: 2024, price: 450, tier: "mid" },
    { brand: "Samsung", model: "Galaxy A12", os: "Android", cpu: "Helio P35", ram: 3, refresh: 60, year: 2021, price: 150, tier: "low" },
    { brand: "Samsung", model: "Galaxy A15", os: "Android", cpu: "Helio G99", ram: 4, refresh: 90, year: 2024, price: 200, tier: "low" },
    
    // Xiaomi / Redmi / POCO
    { brand: "Xiaomi", model: "Xiaomi 13 Pro", os: "Android", cpu: "Snapdragon 8 Gen 2", ram: 12, refresh: 120, year: 2023, price: 1000, tier: "high" },
    { brand: "Xiaomi", model: "Xiaomi 14", os: "Android", cpu: "Snapdragon 8 Gen 3", ram: 12, refresh: 120, year: 2024, price: 900, tier: "high" },
    { brand: "Xiaomi", model: "Redmi Note 12", os: "Android", cpu: "Snapdragon 685", ram: 4, refresh: 120, year: 2023, price: 200, tier: "low" },
    { brand: "Xiaomi", model: "Redmi Note 13", os: "Android", cpu: "Dimensity 6080", ram: 6, refresh: 120, year: 2024, price: 250, tier: "mid" },
    { brand: "Xiaomi", model: "Redmi Note 13 Pro", os: "Android", cpu: "Dimensity 7200", ram: 8, refresh: 120, year: 2024, price: 350, tier: "mid" },
    { brand: "Xiaomi", model: "POCO X5 Pro", os: "Android", cpu: "Snapdragon 778G", ram: 6, refresh: 120, year: 2023, price: 300, tier: "mid" },
    { brand: "Xiaomi", model: "POCO F5", os: "Android", cpu: "Snapdragon 7+ Gen 2", ram: 8, refresh: 120, year: 2023, price: 450, tier: "high" },
    { brand: "Xiaomi", model: "POCO F6", os: "Android", cpu: "Snapdragon 8s Gen 3", ram: 8, refresh: 120, year: 2024, price: 500, tier: "high" },
    { brand: "Xiaomi", model: "Redmi A2", os: "Android", cpu: "Helio G36", ram: 2, refresh: 60, year: 2023, price: 100, tier: "low" },
    
    // OPPO, vivo, realme
    { brand: "OPPO", model: "Reno10 Pro", os: "Android", cpu: "Dimensity 8200", ram: 8, refresh: 120, year: 2023, price: 500, tier: "mid" },
    { brand: "OPPO", model: "Reno11", os: "Android", cpu: "Dimensity 7050", ram: 8, refresh: 120, year: 2024, price: 400, tier: "mid" },
    { brand: "vivo", model: "V29", os: "Android", cpu: "Snapdragon 778G", ram: 8, refresh: 120, year: 2023, price: 450, tier: "mid" },
    { brand: "vivo", model: "V30", os: "Android", cpu: "Snapdragon 7 Gen 3", ram: 8, refresh: 120, year: 2024, price: 500, tier: "mid" },
    { brand: "realme", model: "GT Neo5", os: "Android", cpu: "Snapdragon 8+ Gen 1", ram: 8, refresh: 144, year: 2023, price: 600, tier: "high" },
    { brand: "realme", model: "Narzo 60", os: "Android", cpu: "Dimensity 6020", ram: 4, refresh: 90, year: 2023, price: 200, tier: "low" },
    
    // Google, OnePlus, ASUS
    { brand: "Google", model: "Pixel 7", os: "Android", cpu: "Tensor G2", ram: 8, refresh: 90, year: 2022, price: 600, tier: "high" },
    { brand: "Google", model: "Pixel 8", os: "Android", cpu: "Tensor G3", ram: 8, refresh: 120, year: 2023, price: 700, tier: "high" },
    { brand: "Google", model: "Pixel 8 Pro", os: "Android", cpu: "Tensor G3", ram: 12, refresh: 120, year: 2023, price: 1000, tier: "high" },
    { brand: "Google", model: "Pixel 9", os: "Android", cpu: "Tensor G4", ram: 12, refresh: 120, year: 2024, price: 800, tier: "high" },
    { brand: "OnePlus", model: "11 5G", os: "Android", cpu: "Snapdragon 8 Gen 2", ram: 12, refresh: 120, year: 2023, price: 700, tier: "high" },
    { brand: "OnePlus", model: "12 5G", os: "Android", cpu: "Snapdragon 8 Gen 3", ram: 12, refresh: 120, year: 2024, price: 800, tier: "high" },
    { brand: "ASUS", model: "ROG Phone 7", os: "Android", cpu: "Snapdragon 8 Gen 2", ram: 16, refresh: 165, year: 2023, price: 1000, tier: "high" },
    { brand: "ASUS", model: "ROG Phone 8", os: "Android", cpu: "Snapdragon 8 Gen 3", ram: 16, refresh: 165, year: 2024, price: 1100, tier: "high" },
    
    // Sony, Nokia, Motorola
    { brand: "Sony", model: "Xperia 1 V", os: "Android", cpu: "Snapdragon 8 Gen 2", ram: 12, refresh: 120, year: 2023, price: 900, tier: "high" },
    { brand: "Nokia", model: "G22", os: "Android", cpu: "Unisoc T606", ram: 4, refresh: 90, year: 2023, price: 150, tier: "low" },
    { brand: "Motorola", model: "Moto G84", os: "Android", cpu: "Snapdragon 695", ram: 6, refresh: 120, year: 2023, price: 300, tier: "mid" },
    { brand: "Motorola", model: "Moto G24", os: "Android", cpu: "Helio G85", ram: 4, refresh: 90, year: 2024, price: 150, tier: "low" },
    
    // Tecno, Infinix, itel
    { brand: "Tecno", model: "Spark 20", os: "Android", cpu: "Helio G85", ram: 4, refresh: 90, year: 2024, price: 140, tier: "low" },
    { brand: "Infinix", model: "Hot 40", os: "Android", cpu: "Helio G88", ram: 6, refresh: 90, year: 2024, price: 160, tier: "low" },
    { brand: "Infinix", model: "Zero 30", os: "Android", cpu: "Dimensity 8020", ram: 8, refresh: 120, year: 2023, price: 350, tier: "mid" },
    { brand: "itel", model: "A60", os: "Android", cpu: "Unisoc SC9863A", ram: 2, refresh: 60, year: 2023, price: 90, tier: "low" },
];

// ============================================================
// 2. UTILITY FUNCTIONS
// ============================================================
function normalizeStr(s) { return s.toLowerCase().trim(); }

function extractModelFromUA(ua) {
    if (!ua) return null;
    const patterns = [
        /iPhone(\s*\d+\s*(Pro\s*Max|Pro|Plus)?)/i,
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
    return null;
}

// ============================================================
// 3. DEVICE DETECTION ENGINE
// ============================================================
function detectDeviceFromUA() {
    const ua = navigator.userAgent || '';
    let detectedName = null;
    
    // Thử lấy từ User-Agent
    detectedName = extractModelFromUA(ua);
    
    // Nếu không có, thử từ platform
    if (!detectedName && navigator.userAgentData) {
        const platform = navigator.userAgentData.platform || '';
        if (platform.includes('iPhone')) {
            const match = ua.match(/iPhone(\s*\d+[a-zA-Z]*)/i);
            if (match) detectedName = match[0];
        }
    }
    
    if (!detectedName) return null;
    
    // Tìm trong database
    const normalized = normalizeStr(detectedName);
    let bestMatch = null;
    let bestScore = 0;
    
    for (let device of DEVICE_DB) {
        const deviceName = normalizeStr(device.model);
        let score = 0;
        if (deviceName.includes(normalized) || normalized.includes(deviceName)) {
            score = Math.max(deviceName.length, normalized.length);
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = device;
        }
    }
    
    if (bestMatch) {
        return {
            ...bestMatch,
            model: detectedName,
            confidence: 90,
            source: 'auto'
        };
    }
    
    // Nếu không tìm thấy, tạo device ảo từ thông tin có được
    return {
        brand: detectedName.includes('iPhone') ? 'Apple' : 'Unknown',
        model: detectedName,
        os: detectedName.includes('iPhone') ? 'iOS' : 'Android',
        cpu: 'Unknown',
        ram: 4,
        refresh: 60,
        year: 2023,
        price: 500,
        tier: 'mid',
        confidence: 60,
        source: 'auto'
    };
}

function detectDeviceFromInput(input) {
    if (!input || input.trim() === '') return null;
    
    const normalized = normalizeStr(input);
    let bestMatch = null;
    let bestScore = 0;
    
    for (let device of DEVICE_DB) {
        const deviceName = normalizeStr(device.model);
        let score = 0;
        if (deviceName.includes(normalized) || normalized.includes(deviceName)) {
            score = Math.max(deviceName.length, normalized.length);
        }
        // Tìm kiếm từng từ
        const words = normalized.split(/\s+/);
        for (let word of words) {
            if (word.length > 2 && deviceName.includes(word)) {
                score += word.length * 2;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = device;
        }
    }
    
    if (bestMatch && bestScore > 3) {
        return {
            ...bestMatch,
            confidence: 85,
            source: 'manual'
        };
    }
    
    return null;
}

// ============================================================
// 4. PERFORMANCE & SENSITIVITY
// ============================================================
function calculatePerformanceScore(device) {
    let score = 30;
    const ram = device.ram || 4;
    const refresh = device.refresh || 60;
    const price = device.price || 300;
    const tier = device.tier || 'mid';

    if (ram >= 12) score += 25;
    else if (ram >= 8) score += 18;
    else if (ram >= 6) score += 10;
    else if (ram >= 4) score += 5;

    if (refresh >= 144) score += 22;
    else if (refresh >= 120) score += 14;
    else if (refresh >= 90) score += 6;

    if (price >= 1000) score += 18;
    else if (price >= 700) score += 12;
    else if (price >= 500) score += 6;

    if (tier === 'high') score += 15;
    else if (tier === 'mid') score += 5;

    const cpu = (device.cpu || '').toLowerCase();
    if (cpu.includes('snapdragon 8') || cpu.includes('a17') || cpu.includes('a16') || 
        cpu.includes('m1') || cpu.includes('m2') || cpu.includes('tensor g3')) score += 18;
    else if (cpu.includes('snapdragon 7') || cpu.includes('dimensity 8') || 
             cpu.includes('a15') || cpu.includes('a14')) score += 10;
    else if (cpu.includes('helio') || cpu.includes('exynos')) score += 3;

    return Math.min(100, Math.max(0, score));
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
// 5. IP & LIMIT MANAGEMENT
// ============================================================
function getIP() {
    return new Promise((resolve) => {
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => resolve(data.ip || 'unknown'))
            .catch(() => {
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
        return JSON.parse(localStorage.getItem('ff_limit_data') || '{}');
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
// 6. UI HELPERS
// ============================================================
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

function renderDevice(device, source = 'auto') {
    const card = document.getElementById('deviceCard');
    const grid = document.getElementById('deviceGrid');
    const badge = document.getElementById('sourceBadge');

    if (!device) {
        card.style.display = 'none';
        return;
    }

    badge.textContent = source === 'auto' ? '📱 Tự động' : '✏️ Nhập tay';
    badge.style.color = source === 'auto' ? '#4ade80' : '#fb923c';

    const fields = [
        { label: 'Thiết bị', value: device.model || 'Không xác định' },
        { label: 'Hãng', value: device.brand || 'Unknown' },
        { label: 'HĐH', value: device.os || 'N/A' },
        { label: 'CPU', value: device.cpu || 'N/A' },
        { label: 'RAM', value: device.ram ? device.ram + ' GB' : 'N/A' },
        { label: 'Tần số', value: device.refresh ? device.refresh + ' Hz' : 'N/A' },
        { label: 'Năm', value: device.year || 'N/A' },
        { label: 'Giá', value: device.price ? '$' + device.price : 'N/A' },
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

// ============================================================
// 7. MAIN CONTROLLER
// ============================================================
let currentDevice = null;
let currentSensitivity = null;
let currentIP = null;
let deviceSource = 'auto';

function withLoading(callback, message = 'Đang xử lý...') {
    const overlay = document.getElementById('loadingOverlay');
    const text = document.getElementById('loadingText');
    text.textContent = message;
    overlay.classList.add('active');
    
    setTimeout(() => {
        overlay.classList.remove('active');
        callback();
    }, 1500);
}

function useAutoDetectedDevice() {
    const device = detectDeviceFromUA();
    if (device) {
        device.performanceScore = calculatePerformanceScore(device);
        currentDevice = device;
        deviceSource = 'auto';
        renderDevice(device, 'auto');
        document.getElementById('detectedDeviceName').textContent = `${device.brand} ${device.model}`;
        updateStatus(`Đã dùng máy: ${device.brand} ${device.model}`, 'green');
        showToast(`✅ Đã chọn ${device.brand} ${device.model}`);
        return true;
    }
    return false;
}

function handleGenerate() {
    if (!currentIP) {
        showToast('Đang lấy IP...', true);
        return;
    }
    
    const limit = checkAndGetLimit(currentIP);
    if (!limit.allowed) {
        showToast('Bạn đã quá giới hạn lần thử cho phép! Vui lòng chờ ngày hôm sau', true);
        updateStatus('Đã hết lượt hôm nay', 'red');
        return;
    }
    
    // Nếu chưa có device, thử lấy auto
    if (!currentDevice) {
        const auto = detectDeviceFromUA();
        if (auto) {
            auto.performanceScore = calculatePerformanceScore(auto);
            currentDevice = auto;
            deviceSource = 'auto';
            renderDevice(auto, 'auto');
            document.getElementById('detectedDeviceName').textContent = `${auto.brand} ${auto.model}`;
        } else {
            showToast('Vui lòng nhập tên điện thoại!', true);
            return;
        }
    }
    
    withLoading(() => {
        const count = incrementLimit(currentIP);
        const remaining = getRemainingForDisplay(currentIP);
        updateLimitDisplay(remaining);
        
        const sens = generateSensitivity(currentDevice);
        if (!sens) {
            showToast('Không thể tạo độ nhạy!', true);
            return;
        }
        currentSensitivity = sens;
        renderSensitivity(sens);
        updateStatus(`Đã tạo độ nhạy (còn ${remaining} lượt)`, 'green');
        showToast(`✅ Đã tạo độ nhạy! Còn ${remaining} lượt`);
    }, 'Đang tạo độ nhạy...');
}

function handleDetectManual() {
    const input = document.getElementById('phoneInput').value.trim();
    if (!input) {
        showToast('Vui lòng nhập tên điện thoại!', true);
        return;
    }
    
    const device = detectDeviceFromInput(input);
    if (device) {
        device.performanceScore = calculatePerformanceScore(device);
        currentDevice = device;
        deviceSource = 'manual';
        renderDevice(device, 'manual');
        document.getElementById('detectedDeviceName').textContent = `${device.brand} ${device.model}`;
        updateStatus(`Đã nhận diện: ${device.brand} ${device.model}`, 'green');
        showToast(`✅ Đã nhận diện ${device.brand} ${device.model}`);
        // Tự động tạo độ nhạy
        handleGenerate();
    } else {
        showToast('Không tìm thấy thiết bị! Hãy thử tên khác', true);
        updateStatus('Không tìm thấy', 'red');
    }
}

function copyResult() {
    const sensItems = document.querySelectorAll('#sensGrid .sens-item');
    if (!sensItems.length) {
        showToast('Chưa có độ nhạy để sao chép!', true);
        return;
    }
    
    let text = '🎯 FREE FIRE SENSITIVITY\n';
    text += `📱 ${currentDevice?.brand || ''} ${currentDevice?.model || 'Unknown'}\n`;
    text += `📅 ${new Date().toLocaleDateString('vi-VN')}\n`;
    text += `🔍 Nguồn: ${deviceSource === 'auto' ? 'Tự động' : 'Nhập tay'}\n`;
    text += '═'.repeat(30) + '\n';
    
    sensItems.forEach(item => {
        const label = item.querySelector('.label')?.textContent || '';
        const value = item.querySelector('.value')?.textContent || '';
        text += `${label}: ${value}\n`;
    });
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ Đã sao chép độ nhạy!');
    }).catch(() => {
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
// 8. INITIALIZATION
// ============================================================
async function init() {
    currentIP = await getIP();
    document.getElementById('ipDisplay').textContent = currentIP;
    
    const remaining = getRemainingForDisplay(currentIP);
    updateLimitDisplay(remaining);
    
    // Tự động phát hiện máy
    const autoDevice = detectDeviceFromUA();
    if (autoDevice) {
        autoDevice.performanceScore = calculatePerformanceScore(autoDevice);
        currentDevice = autoDevice;
        deviceSource = 'auto';
        document.getElementById('detectedDeviceName').textContent = `${autoDevice.brand} ${autoDevice.model}`;
        renderDevice(autoDevice, 'auto');
        updateStatus(`Đã phát hiện: ${autoDevice.brand} ${autoDevice.model} (còn ${remaining} lượt)`, 'green');
        
        // Tự động tạo độ nhạy nếu còn lượt
        if (remaining > 0) {
            setTimeout(() => {
                const sens = generateSensitivity(autoDevice);
                if (sens) {
                    currentSensitivity = sens;
                    renderSensitivity(sens);
                }
            }, 600);
        }
    } else {
        updateStatus('Không phát hiện được máy - Hãy nhập tay', 'orange');
    }
}

// ============================================================
// 9. EVENT BINDING
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
    
    document.getElementById('menuHome').addEventListener('click', toggleSidebar);
    document.getElementById('menuDeviceInfo').addEventListener('click', function() {
        if (currentDevice) {
            showToast(`📱 ${currentDevice.brand} ${currentDevice.model} - ${currentDevice.tier.toUpperCase()}`);
        } else {
            showToast('📱 Chưa có thông tin thiết bị');
        }
        toggleSidebar();
    });
    document.getElementById('menuHistory').addEventListener('click', function() {
        showToast('📋 Tính năng đang phát triển');
        toggleSidebar();
    });
    document.getElementById('menuInfo').addEventListener('click', function() {
        showToast('📖 Tự động nhận diện máy - Mỗi IP 5 lượt/ngày');
        toggleSidebar();
    });
    
    // Buttons
    document.getElementById('generateBtn').addEventListener('click', handleGenerate);
    document.getElementById('detectBtn').addEventListener('click', handleDetectManual);
    document.getElementById('useDeviceBtn').addEventListener('click', function() {
        useAutoDetectedDevice();
        handleGenerate();
    });
    document.getElementById('copyBtn').addEventListener('click', copyResult);
    document.getElementById('copyMiniBtn').addEventListener('click', copyResult);
    document.getElementById('navDeviceBtn').addEventListener('click', function() {
        if (currentDevice) {
            showToast(`📱 ${currentDevice.brand} ${currentDevice.model}`);
        } else {
            showToast('📱 Chưa có thông tin');
        }
    });
    
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
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleDetectManual();
        }
    });
    
    init();
});
