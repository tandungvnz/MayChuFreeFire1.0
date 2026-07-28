// ============================================================
// ============================================================
// MODULE 1: IP MANAGER - Quản lý IP, role, giới hạn
// ============================================================
// ============================================================

const IPManager = {
    // Dữ liệu lưu trữ
    _data: null,
    _currentIP: null,
    _defaultLimit: 5,

    // Khởi tạo
    init() {
        this._data = this._loadData();
        return this;
    },

    // Load dữ liệu từ localStorage
    _loadData() {
        try {
            const raw = localStorage.getItem('ff_ip_manager');
            if (raw) {
                const data = JSON.parse(raw);
                // Đảm bảo có cấu trúc đúng
                if (data && typeof data === 'object') {
                    return data;
                }
            }
        } catch (e) {
            console.warn('IP Manager: Load data error', e);
        }
        return this._getDefaultData();
    },

    // Dữ liệu mặc định
    _getDefaultData() {
        return {
            ips: {}, // { '192.168.1.1': { role: 'user', limit: 5, used: 0, date: '2024-01-01' } }
            settings: {
                defaultLimit: 5,
                adminIPs: [] // Danh sách IP admin
            }
        };
    },

    // Lưu dữ liệu
    _saveData() {
        try {
            localStorage.setItem('ff_ip_manager', JSON.stringify(this._data));
        } catch (e) {
            console.warn('IP Manager: Save data error', e);
        }
    },

    // Lấy IP hiện tại
    async getIP() {
        if (this._currentIP) return this._currentIP;
        
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            this._currentIP = data.ip || 'unknown';
        } catch (e) {
            // Fallback: tạo IP giả
            let fakeIP = localStorage.getItem('ff_fake_ip');
            if (!fakeIP) {
                fakeIP = 'ip_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
                localStorage.setItem('ff_fake_ip', fakeIP);
            }
            this._currentIP = fakeIP;
        }
        return this._currentIP;
    },

    // Lấy thông tin IP
    getIPInfo(ip) {
        if (!ip) return null;
        return this._data.ips[ip] || null;
    },

    // Lấy hoặc tạo IP info
    getOrCreateIP(ip) {
        if (!ip) return null;
        
        if (!this._data.ips[ip]) {
            // Kiểm tra xem có trong danh sách admin không
            const isAdmin = this._data.settings.adminIPs.includes(ip);
            this._data.ips[ip] = {
                role: isAdmin ? 'admin' : 'user',
                limit: isAdmin ? 999 : this._data.settings.defaultLimit,
                used: 0,
                date: this._getToday()
            };
            this._saveData();
        }
        return this._data.ips[ip];
    },

    // Lấy ngày hôm nay
    _getToday() {
        return new Date().toLocaleDateString('vi-VN');
    },

    // Kiểm tra và lấy số lượt còn lại
    checkLimit(ip) {
        if (!ip) return { allowed: false, remaining: 0, role: 'unknown' };
        
        const info = this.getOrCreateIP(ip);
        const today = this._getToday();
        
        // Reset nếu ngày khác
        if (info.date !== today) {
            info.date = today;
            info.used = 0;
            this._saveData();
        }
        
        // Admin có vô hạn
        if (info.role === 'admin') {
            return { allowed: true, remaining: '∞', role: 'admin', limit: 999 };
        }
        
        const remaining = Math.max(0, info.limit - info.used);
        return { 
            allowed: remaining > 0, 
            remaining, 
            role: 'user',
            limit: info.limit
        };
    },

    // Tăng số lượt đã dùng
    incrementUsed(ip) {
        if (!ip) return false;
        
        const info = this.getOrCreateIP(ip);
        const today = this._getToday();
        
        if (info.date !== today) {
            info.date = today;
            info.used = 0;
        }
        
        // Admin không giới hạn
        if (info.role === 'admin') {
            return true;
        }
        
        if (info.used < info.limit) {
            info.used += 1;
            this._saveData();
            return true;
        }
        return false;
    },

    // Lấy số lượt còn lại để hiển thị
    getRemainingDisplay(ip) {
        const result = this.checkLimit(ip);
        if (result.role === 'admin') return '∞';
        return result.remaining;
    },

    // Lấy role của IP
    getRole(ip) {
        const info = this.getIPInfo(ip);
        return info ? info.role : 'user';
    },

    // === ADMIN FUNCTIONS ===

    // Lấy danh sách tất cả IP
    getAllIPs() {
        const ips = [];
        for (const [ip, info] of Object.entries(this._data.ips)) {
            ips.push({
                ip,
                ...info,
                remaining: info.role === 'admin' ? '∞' : Math.max(0, info.limit - info.used)
            });
        }
        return ips;
    },

    // Thêm IP mới (admin)
    addIP(ip, role = 'user', limit = 5) {
        if (!ip) return false;
        
        // Chuẩn hóa limit
        const finalLimit = role === 'admin' ? 999 : Math.min(999, Math.max(0, parseInt(limit) || 5));
        
        this._data.ips[ip] = {
            role: role,
            limit: finalLimit,
            used: 0,
            date: this._getToday()
        };
        
        // Nếu là admin, thêm vào danh sách admin
        if (role === 'admin' && !this._data.settings.adminIPs.includes(ip)) {
            this._data.settings.adminIPs.push(ip);
        }
        
        this._saveData();
        return true;
    },

    // Xóa IP
    removeIP(ip) {
        if (!ip) return false;
        
        delete this._data.ips[ip];
        this._data.settings.adminIPs = this._data.settings.adminIPs.filter(a => a !== ip);
        this._saveData();
        return true;
    },

    // Cập nhật role cho IP
    updateRole(ip, role) {
        if (!ip || !this._data.ips[ip]) return false;
        
        const info = this._data.ips[ip];
        info.role = role;
        info.limit = role === 'admin' ? 999 : this._data.settings.defaultLimit;
        
        if (role === 'admin' && !this._data.settings.adminIPs.includes(ip)) {
            this._data.settings.adminIPs.push(ip);
        } else if (role !== 'admin') {
            this._data.settings.adminIPs = this._data.settings.adminIPs.filter(a => a !== ip);
        }
        
        this._saveData();
        return true;
    },

    // Cập nhật limit cho IP (chỉ user)
    updateLimit(ip, limit) {
        if (!ip || !this._data.ips[ip]) return false;
        
        const info = this._data.ips[ip];
        if (info.role === 'admin') return false;
        
        info.limit = Math.min(999, Math.max(0, parseInt(limit) || 5));
        this._saveData();
        return true;
    },

    // Kiểm tra xem IP có phải admin không
    isAdmin(ip) {
        const info = this.getIPInfo(ip);
        return info ? info.role === 'admin' : false;
    },

    // Reset tất cả dữ liệu (chỉ dùng cho debug)
    resetAll() {
        this._data = this._getDefaultData();
        this._saveData();
    }
};

// Khởi tạo IP Manager
IPManager.init();

// ============================================================
// ============================================================
// MODULE 2: DEVICE DATABASE
// ============================================================
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
// ============================================================
// MODULE 3: DEVICE DETECTION ENGINE
// ============================================================
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

function detectDeviceFromUA() {
    const ua = navigator.userAgent || '';
    let detectedName = null;
    
    detectedName = extractModelFromUA(ua);
    
    if (!detectedName && navigator.userAgentData) {
        const platform = navigator.userAgentData.platform || '';
        if (platform.includes('iPhone')) {
            const match = ua.match(/iPhone(\s*\d+[a-zA-Z]*)/i);
            if (match) detectedName = match[0];
        }
    }
    
    if (!detectedName) return null;
    
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
// ============================================================
// MODULE 4: SENSITIVITY GENERATOR
// ============================================================
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
// ============================================================
// MODULE 5: UI CONTROLLER
// ============================================================
// ============================================================

let currentDevice = null;
let currentSensitivity = null;
let currentIP = null;
let deviceSource = 'auto';

// UI Helpers
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

// Render danh sách IP trong admin panel
function renderAdminIPList() {
    const container = document.getElementById('adminIpList');
    const ips = IPManager.getAllIPs();
    
    // Giữ header
    let html = `
        <div class="admin-ip-item header">
            <span>IP</span>
            <span>Lượt còn lại</span>
            <span>Role</span>
            <span>Hành động</span>
        </div>
    `;
    
    if (ips.length === 0) {
        html += `<div class="admin-ip-item" style="text-align:center;color:var(--text-secondary);padding:1rem;">Chưa có IP nào</div>`;
    } else {
        for (const ip of ips) {
            const isCurrent = ip.ip === currentIP;
            html += `
                <div class="admin-ip-item" style="${isCurrent ? 'border:1px solid var(--primary);' : ''}">
                    <span>${ip.ip} ${isCurrent ? '👈' : ''}</span>
                    <span>${ip.remaining}</span>
                    <span><span class="role-badge ${ip.role}">${ip.role.toUpperCase()}</span></span>
                    <span>
                        <button class="btn-del" onclick="window._adminRemoveIP('${ip.ip}')" title="Xóa IP">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn-del" onclick="window._adminToggleRole('${ip.ip}')" title="Chuyển role" style="color:#fbbf24;">
                            <i class="fas fa-${ip.role === 'admin' ? 'user' : 'crown'}"></i>
                        </button>
                    </span>
                </div>
            `;
        }
    }
    
    container.innerHTML = html;
}

// ============================================================
// ============================================================
// MODULE 6: MAIN CONTROLLER
// ============================================================
// ============================================================

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
    
    const limitResult = IPManager.checkLimit(currentIP);
    if (!limitResult.allowed) {
        if (limitResult.role === 'admin') {
            // Admin không bao giờ bị chặn
        } else {
            showToast('Bạn đã quá giới hạn lần thử cho phép! Vui lòng chờ ngày hôm sau', true);
            updateStatus('Đã hết lượt hôm nay', 'red');
            return;
        }
    }
    
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
        // Tăng số lượt dùng (admin không bị giới hạn)
        if (limitResult.role !== 'admin') {
            IPManager.incrementUsed(currentIP);
        }
        
        const remaining = IPManager.getRemainingDisplay(currentIP);
        updateLimitDisplay(remaining);
        
        const sens = generateSensitivity(currentDevice);
        if (!sens) {
            showToast('Không thể tạo độ nhạy!', true);
            return;
        }
        currentSensitivity = sens;
        renderSensitivity(sens);
        const role = IPManager.getRole(currentIP);
        updateStatus(`Đã tạo độ nhạy ${role === 'admin' ? '(Admin ∞)' : `(còn ${remaining} lượt)`}`, 'green');
        showToast(`✅ Đã tạo độ nhạy! ${role === 'admin' ? 'Admin không giới hạn' : `Còn ${remaining} lượt`}`);
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
    text += `👤 Role: ${IPManager.getRole(currentIP)}\n`;
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
// ============================================================
// MODULE 7: ADMIN PANEL
// ============================================================
// ============================================================

// Admin functions (exposed globally)
window._adminRemoveIP = function(ip) {
    if (!confirm(`Xóa IP ${ip}?`)) return;
    IPManager.removeIP(ip);
    renderAdminIPList();
    showToast(`✅ Đã xóa IP ${ip}`);
};

window._adminToggleRole = function(ip) {
    const info = IPManager.getIPInfo(ip);
    if (!info) return;
    const newRole = info.role === 'admin' ? 'user' : 'admin';
    IPManager.updateRole(ip, newRole);
    renderAdminIPList();
    showToast(`✅ Đã chuyển ${ip} sang ${newRole}`);
};

function openAdminPanel() {
    const modal = document.getElementById('adminModal');
    modal.style.display = 'flex';
    renderAdminIPList();
}

function closeAdminPanel() {
    document.getElementById('adminModal').style.display = 'none';
}

function handleAddIP() {
    const ip = document.getElementById('adminAddIp').value.trim();
    const limit = parseInt(document.getElementById('adminAddLimit').value) || 5;
    const role = document.getElementById('adminAddRole').value;
    
    if (!ip) {
        showToast('Vui lòng nhập IP!', true);
        return;
    }
    
    // Kiểm tra IP đã tồn tại
    if (IPManager.getIPInfo(ip)) {
        showToast('IP đã tồn tại!', true);
        return;
    }
    
    IPManager.addIP(ip, role, limit);
    renderAdminIPList();
    document.getElementById('adminAddIp').value = '';
    showToast(`✅ Đã thêm IP ${ip} (${role})`);
}

// ============================================================
// ============================================================
// MODULE 8: INITIALIZATION
// ============================================================
// ============================================================

async function init() {
    // Lấy IP
    currentIP = await IPManager.getIP();
    document.getElementById('ipDisplay').textContent = currentIP;
    
    // Lấy role và limit
    const role = IPManager.getRole(currentIP);
    const remaining = IPManager.getRemainingDisplay(currentIP);
    const limitInfo = IPManager.checkLimit(currentIP);
    
    document.getElementById('userRoleDisplay').textContent = role === 'admin' ? '👑 Admin' : '👤 User';
    document.getElementById('maxLimitDisplay').textContent = role === 'admin' ? '∞' : '5';
    updateLimitDisplay(remaining);
    
    // Hiện menu admin nếu là admin
    if (role === 'admin') {
        document.getElementById('menuAdmin').style.display = 'flex';
        document.getElementById('menuAdmin').addEventListener('click', function() {
            openAdminPanel();
            toggleSidebar();
        });
    }
    
    // Tự động phát hiện máy
    const autoDevice = detectDeviceFromUA();
    if (autoDevice) {
        autoDevice.performanceScore = calculatePerformanceScore(autoDevice);
        currentDevice = autoDevice;
        deviceSource = 'auto';
        document.getElementById('detectedDeviceName').textContent = `${autoDevice.brand} ${autoDevice.model}`;
        renderDevice(autoDevice, 'auto');
        updateStatus(`Đã phát hiện: ${autoDevice.brand} ${autoDevice.model} (${role === 'admin' ? '∞' : 'còn ' + remaining + ' lượt'})`, 'green');
        
        // Tự động tạo độ nhạy nếu còn lượt hoặc admin
        if (role === 'admin' || remaining > 0) {
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

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// ============================================================
// ============================================================
// MODULE 9: EVENT BINDING
// ============================================================
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar
    document.getElementById('menuToggle').addEventListener('click', toggleSidebar);
    document.getElementById('sidebarClose').addEventListener('click', toggleSidebar);
    document.getElementById('sidebarOverlay').addEventListener('click', toggleSidebar);
    
    // Menu items
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
        const role = IPManager.getRole(currentIP);
        showToast(`📖 ${role === 'admin' ? 'Admin: Không giới hạn' : 'Mỗi IP 5 lượt/ngày'}`);
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
    
    // Admin panel
    document.getElementById('adminModalClose').addEventListener('click', closeAdminPanel);
    document.getElementById('adminModal').addEventListener('click', function(e) {
        if (e.target === this) closeAdminPanel();
    });
    document.getElementById('adminAddBtn').addEventListener('click', handleAddIP);
    document.getElementById('adminAddIp').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') handleAddIP();
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
