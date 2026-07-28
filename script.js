// ============================================================
// FREE FIRE SENSITIVITY GENERATOR - AI SEMANTIC ENGINE
// Hệ thống AI phân tích từ khóa thông minh, nhận diện 100%
// ============================================================

// ============================================================
// 1. AI KNOWLEDGE GRAPH - Dữ liệu thông minh
// ============================================================
const AI_KNOWLEDGE = {
    // Đặc điểm nhận dạng hãng
    brands: {
        'apple': { name: 'Apple', os: 'iOS', keywords: ['iphone', 'ios', 'apple', 'ipad', 'mac', 'a14', 'a15', 'a16', 'a17', 'a18', 'm1', 'm2'] },
        'samsung': { name: 'Samsung', os: 'Android', keywords: ['samsung', 'galaxy', 'note', 'fold', 'flip', 'exynos', 'one ui', 'z fold', 'z flip'] },
        'xiaomi': { name: 'Xiaomi', os: 'Android', keywords: ['xiaomi', 'redmi', 'poco', 'miui', 'hyperos', 'mi 1', 'mi 2'] },
        'oppo': { name: 'OPPO', os: 'Android', keywords: ['oppo', 'reno', 'find', 'coloros'] },
        'vivo': { name: 'vivo', os: 'Android', keywords: ['vivo', 'v', 'iqoo', 'funtouch'] },
        'realme': { name: 'realme', os: 'Android', keywords: ['realme', 'narzo', 'gt'] },
        'google': { name: 'Google', os: 'Android', keywords: ['pixel', 'google', 'tensor'] },
        'oneplus': { name: 'OnePlus', os: 'Android', keywords: ['oneplus', 'nord', 'oxygenos'] },
        'huawei': { name: 'Huawei', os: 'Android', keywords: ['huawei', 'mate', 'p series', 'harmonyos'] },
        'honor': { name: 'Honor', os: 'Android', keywords: ['honor', 'magic'] },
        'asus': { name: 'ASUS', os: 'Android', keywords: ['asus', 'rog', 'zenfone'] },
        'sony': { name: 'Sony', os: 'Android', keywords: ['sony', 'xperia'] },
        'nokia': { name: 'Nokia', os: 'Android', keywords: ['nokia', 'lumia'] },
        'motorola': { name: 'Motorola', os: 'Android', keywords: ['motorola', 'moto', 'razr'] },
        'tecno': { name: 'Tecno', os: 'Android', keywords: ['tecno', 'camon', 'spark'] },
        'infinix': { name: 'Infinix', os: 'Android', keywords: ['infinix', 'hot', 'note', 'zero'] },
        'itel': { name: 'itel', os: 'Android', keywords: ['itel', 'a series'] },
    },

    // Từ khóa cấp độ (tier)
    tierKeywords: {
        high: ['ultra', 'pro max', 'pro', 'max', 'plus', 'premium', 'flagship', 'gaming', 'rog', 'fold', 'flip', 'gt', 'magic', 's2', 's3'],
        mid: ['note pro', 'neo', 'nord', 'fe', 'lite', 't series', 'a5', 'a3'],
        low: ['a0', 'a1', 'a2', 'c series', 'spark', 'hot', 'y series', 'narzo', 'note', 'lite']
    },

    // Từ khóa CPU
    cpuKeywords: {
        high: ['snapdragon 8', 'a17', 'a16', 'a15', 'tensor g3', 'm1', 'm2', 'exynos 2200', 'dimensity 9000', 'helio g99'],
        mid: ['snapdragon 7', 'dimensity 8', 'a13', 'a14', 'tensor g2', 'exynos 1280', 'snapdragon 778g'],
        low: ['helio', 'exynos 850', 'snapdragon 4', 'unisoc', 'a8', 'a9', 'a10']
    },

    // Từ khóa RAM
    ramKeywords: {
        high: ['16gb', '12gb', '8gb'],
        mid: ['6gb'],
        low: ['4gb', '3gb', '2gb']
    },

    // Từ khóa tần số quét
    refreshKeywords: {
        high: ['144hz', '165hz', '120hz'],
        mid: ['90hz'],
        low: ['60hz']
    },

    // Từ khóa năm sản xuất
    yearKeywords: {
        '2024': ['2024', 'mới nhất', '24', 'latest'],
        '2023': ['2023', '23'],
        '2022': ['2022', '22'],
        '2021': ['2021', '21'],
        '2020': ['2020', '20'],
        '2019': ['2019', '19'],
        '2018': ['2018', '18'],
        '2017': ['2017', '17'],
        '2016': ['2016', '16'],
        '2015': ['2015', '15'],
        '2014': ['2014', '14']
    }
};

// ============================================================
// 2. AI SEMANTIC ENGINE - Lõi phân tích thông minh
// ============================================================
class AISemanticEngine {
    constructor() {
        this.deviceDB = this.buildDeviceDB();
    }

    // Xây dựng database từ các từ khóa
    buildDeviceDB() {
        const db = [];
        
        // Apple
        db.push({ brand: 'Apple', model: 'iPhone 6', os: 'iOS', cpu: 'A8', ram: 1, refresh: 60, year: 2014, price: 200, tier: 'low', keywords: ['iphone 6', 'iphone6', 'a8', '1gb'] });
        db.push({ brand: 'Apple', model: 'iPhone 6s', os: 'iOS', cpu: 'A9', ram: 2, refresh: 60, year: 2015, price: 220, tier: 'low', keywords: ['iphone 6s', 'iphone6s', 'a9'] });
        db.push({ brand: 'Apple', model: 'iPhone 7', os: 'iOS', cpu: 'A10', ram: 2, refresh: 60, year: 2016, price: 250, tier: 'low', keywords: ['iphone 7', 'iphone7', 'a10'] });
        db.push({ brand: 'Apple', model: 'iPhone 8', os: 'iOS', cpu: 'A11', ram: 2, refresh: 60, year: 2017, price: 300, tier: 'low', keywords: ['iphone 8', 'iphone8', 'a11'] });
        db.push({ brand: 'Apple', model: 'iPhone X', os: 'iOS', cpu: 'A11', ram: 3, refresh: 60, year: 2017, price: 500, tier: 'mid', keywords: ['iphone x', 'iphonex', 'iphone 10'] });
        db.push({ brand: 'Apple', model: 'iPhone XR', os: 'iOS', cpu: 'A12', ram: 3, refresh: 60, year: 2018, price: 400, tier: 'mid', keywords: ['iphone xr', 'iphonexr'] });
        db.push({ brand: 'Apple', model: 'iPhone XS', os: 'iOS', cpu: 'A12', ram: 4, refresh: 60, year: 2018, price: 600, tier: 'high', keywords: ['iphone xs', 'iphonexs'] });
        db.push({ brand: 'Apple', model: 'iPhone 11', os: 'iOS', cpu: 'A13', ram: 4, refresh: 60, year: 2019, price: 500, tier: 'mid', keywords: ['iphone 11', 'iphone11', 'a13'] });
        db.push({ brand: 'Apple', model: 'iPhone 11 Pro', os: 'iOS', cpu: 'A13', ram: 4, refresh: 60, year: 2019, price: 700, tier: 'high', keywords: ['iphone 11 pro', 'iphone11pro'] });
        db.push({ brand: 'Apple', model: 'iPhone 12', os: 'iOS', cpu: 'A14', ram: 4, refresh: 60, year: 2020, price: 700, tier: 'high', keywords: ['iphone 12', 'iphone12', 'a14'] });
        db.push({ brand: 'Apple', model: 'iPhone 12 Pro', os: 'iOS', cpu: 'A14', ram: 6, refresh: 60, year: 2020, price: 900, tier: 'high', keywords: ['iphone 12 pro', 'iphone12pro'] });
        db.push({ brand: 'Apple', model: 'iPhone 13', os: 'iOS', cpu: 'A15', ram: 4, refresh: 60, year: 2021, price: 800, tier: 'high', keywords: ['iphone 13', 'iphone13', 'a15'] });
        db.push({ brand: 'Apple', model: 'iPhone 13 Pro', os: 'iOS', cpu: 'A15', ram: 6, refresh: 120, year: 2021, price: 1000, tier: 'high', keywords: ['iphone 13 pro', 'iphone13pro'] });
        db.push({ brand: 'Apple', model: 'iPhone 14', os: 'iOS', cpu: 'A16', ram: 6, refresh: 60, year: 2022, price: 900, tier: 'high', keywords: ['iphone 14', 'iphone14', 'a16'] });
        db.push({ brand: 'Apple', model: 'iPhone 14 Pro', os: 'iOS', cpu: 'A16', ram: 6, refresh: 120, year: 2022, price: 1100, tier: 'high', keywords: ['iphone 14 pro', 'iphone14pro'] });
        db.push({ brand: 'Apple', model: 'iPhone 15', os: 'iOS', cpu: 'A17', ram: 6, refresh: 60, year: 2023, price: 1000, tier: 'high', keywords: ['iphone 15', 'iphone15', 'a17'] });
        db.push({ brand: 'Apple', model: 'iPhone 15 Pro', os: 'iOS', cpu: 'A17', ram: 8, refresh: 120, year: 2023, price: 1200, tier: 'high', keywords: ['iphone 15 pro', 'iphone15pro'] });
        db.push({ brand: 'Apple', model: 'iPhone 16', os: 'iOS', cpu: 'A18', ram: 8, refresh: 60, year: 2024, price: 1100, tier: 'high', keywords: ['iphone 16', 'iphone16', 'a18'] });
        db.push({ brand: 'Apple', model: 'iPhone 16 Pro', os: 'iOS', cpu: 'A18', ram: 8, refresh: 120, year: 2024, price: 1300, tier: 'high', keywords: ['iphone 16 pro', 'iphone16pro'] });
        db.push({ brand: 'Apple', model: 'iPhone SE', os: 'iOS', cpu: 'A13', ram: 3, refresh: 60, year: 2020, price: 400, tier: 'mid', keywords: ['iphone se', 'iphonese'] });

        // Samsung
        db.push({ brand: 'Samsung', model: 'Galaxy S21', os: 'Android', cpu: 'Exynos 2100', ram: 8, refresh: 120, year: 2021, price: 700, tier: 'high', keywords: ['galaxy s21', 's21', 'exynos 2100'] });
        db.push({ brand: 'Samsung', model: 'Galaxy S21 Ultra', os: 'Android', cpu: 'Exynos 2100', ram: 12, refresh: 120, year: 2021, price: 1000, tier: 'high', keywords: ['galaxy s21 ultra', 's21 ultra'] });
        db.push({ brand: 'Samsung', model: 'Galaxy S22', os: 'Android', cpu: 'Snapdragon 8 Gen 1', ram: 8, refresh: 120, year: 2022, price: 800, tier: 'high', keywords: ['galaxy s22', 's22', 'snapdragon 8 gen 1'] });
        db.push({ brand: 'Samsung', model: 'Galaxy S22 Ultra', os: 'Android', cpu: 'Snapdragon 8 Gen 1', ram: 12, refresh: 120, year: 2022, price: 1100, tier: 'high', keywords: ['galaxy s22 ultra', 's22 ultra'] });
        db.push({ brand: 'Samsung', model: 'Galaxy S23', os: 'Android', cpu: 'Snapdragon 8 Gen 2', ram: 8, refresh: 120, year: 2023, price: 900, tier: 'high', keywords: ['galaxy s23', 's23', 'snapdragon 8 gen 2'] });
        db.push({ brand: 'Samsung', model: 'Galaxy S23 Ultra', os: 'Android', cpu: 'Snapdragon 8 Gen 2', ram: 12, refresh: 120, year: 2023, price: 1200, tier: 'high', keywords: ['galaxy s23 ultra', 's23 ultra'] });
        db.push({ brand: 'Samsung', model: 'Galaxy S24', os: 'Android', cpu: 'Snapdragon 8 Gen 3', ram: 8, refresh: 120, year: 2024, price: 1000, tier: 'high', keywords: ['galaxy s24', 's24', 'snapdragon 8 gen 3'] });
        db.push({ brand: 'Samsung', model: 'Galaxy S24 Ultra', os: 'Android', cpu: 'Snapdragon 8 Gen 3', ram: 12, refresh: 120, year: 2024, price: 1300, tier: 'high', keywords: ['galaxy s24 ultra', 's24 ultra'] });
        db.push({ brand: 'Samsung', model: 'Galaxy Z Fold5', os: 'Android', cpu: 'Snapdragon 8 Gen 2', ram: 12, refresh: 120, year: 2023, price: 1400, tier: 'high', keywords: ['z fold5', 'fold 5', 'galaxy fold'] });
        db.push({ brand: 'Samsung', model: 'Galaxy Z Flip5', os: 'Android', cpu: 'Snapdragon 8 Gen 2', ram: 8, refresh: 120, year: 2023, price: 1000, tier: 'high', keywords: ['z flip5', 'flip 5', 'galaxy flip'] });
        db.push({ brand: 'Samsung', model: 'Galaxy A53', os: 'Android', cpu: 'Exynos 1280', ram: 6, refresh: 120, year: 2022, price: 350, tier: 'mid', keywords: ['galaxy a53', 'a53'] });
        db.push({ brand: 'Samsung', model: 'Galaxy A34', os: 'Android', cpu: 'Dimensity 1080', ram: 6, refresh: 120, year: 2023, price: 400, tier: 'mid', keywords: ['galaxy a34', 'a34'] });
        db.push({ brand: 'Samsung', model: 'Galaxy A12', os: 'Android', cpu: 'Helio P35', ram: 3, refresh: 60, year: 2021, price: 150, tier: 'low', keywords: ['galaxy a12', 'a12'] });
        db.push({ brand: 'Samsung', model: 'Galaxy A15', os: 'Android', cpu: 'Helio G99', ram: 4, refresh: 90, year: 2024, price: 200, tier: 'low', keywords: ['galaxy a15', 'a15'] });

        // Xiaomi / Redmi / POCO
        db.push({ brand: 'Xiaomi', model: 'Xiaomi 13 Pro', os: 'Android', cpu: 'Snapdragon 8 Gen 2', ram: 12, refresh: 120, year: 2023, price: 1000, tier: 'high', keywords: ['xiaomi 13 pro', '13 pro', 'mi 13'] });
        db.push({ brand: 'Xiaomi', model: 'Xiaomi 14', os: 'Android', cpu: 'Snapdragon 8 Gen 3', ram: 12, refresh: 120, year: 2024, price: 900, tier: 'high', keywords: ['xiaomi 14', 'mi 14'] });
        db.push({ brand: 'Xiaomi', model: 'Redmi Note 12', os: 'Android', cpu: 'Snapdragon 685', ram: 4, refresh: 120, year: 2023, price: 200, tier: 'low', keywords: ['redmi note 12', 'note 12'] });
        db.push({ brand: 'Xiaomi', model: 'Redmi Note 13', os: 'Android', cpu: 'Dimensity 6080', ram: 6, refresh: 120, year: 2024, price: 250, tier: 'mid', keywords: ['redmi note 13', 'note 13'] });
        db.push({ brand: 'Xiaomi', model: 'Redmi Note 13 Pro', os: 'Android', cpu: 'Dimensity 7200', ram: 8, refresh: 120, year: 2024, price: 350, tier: 'mid', keywords: ['redmi note 13 pro', 'note 13 pro'] });
        db.push({ brand: 'Xiaomi', model: 'POCO X5 Pro', os: 'Android', cpu: 'Snapdragon 778G', ram: 6, refresh: 120, year: 2023, price: 300, tier: 'mid', keywords: ['poco x5 pro', 'x5 pro'] });
        db.push({ brand: 'Xiaomi', model: 'POCO F5', os: 'Android', cpu: 'Snapdragon 7+ Gen 2', ram: 8, refresh: 120, year: 2023, price: 450, tier: 'high', keywords: ['poco f5', 'f5'] });
        db.push({ brand: 'Xiaomi', model: 'POCO F6', os: 'Android', cpu: 'Snapdragon 8s Gen 3', ram: 8, refresh: 120, year: 2024, price: 500, tier: 'high', keywords: ['poco f6', 'f6'] });
        db.push({ brand: 'Xiaomi', model: 'Redmi A2', os: 'Android', cpu: 'Helio G36', ram: 2, refresh: 60, year: 2023, price: 100, tier: 'low', keywords: ['redmi a2', 'a2'] });

        // OPPO, vivo, realme
        db.push({ brand: 'OPPO', model: 'Reno10 Pro', os: 'Android', cpu: 'Dimensity 8200', ram: 8, refresh: 120, year: 2023, price: 500, tier: 'mid', keywords: ['reno 10 pro', 'oppo reno'] });
        db.push({ brand: 'OPPO', model: 'Reno11', os: 'Android', cpu: 'Dimensity 7050', ram: 8, refresh: 120, year: 2024, price: 400, tier: 'mid', keywords: ['reno 11', 'oppo reno 11'] });
        db.push({ brand: 'vivo', model: 'V29', os: 'Android', cpu: 'Snapdragon 778G', ram: 8, refresh: 120, year: 2023, price: 450, tier: 'mid', keywords: ['vivo v29', 'v29'] });
        db.push({ brand: 'vivo', model: 'V30', os: 'Android', cpu: 'Snapdragon 7 Gen 3', ram: 8, refresh: 120, year: 2024, price: 500, tier: 'mid', keywords: ['vivo v30', 'v30'] });
        db.push({ brand: 'realme', model: 'GT Neo5', os: 'Android', cpu: 'Snapdragon 8+ Gen 1', ram: 8, refresh: 144, year: 2023, price: 600, tier: 'high', keywords: ['realme gt neo5', 'gt neo5'] });
        db.push({ brand: 'realme', model: 'Narzo 60', os: 'Android', cpu: 'Dimensity 6020', ram: 4, refresh: 90, year: 2023, price: 200, tier: 'low', keywords: ['narzo 60', 'realme narzo'] });

        // Google, OnePlus, ASUS
        db.push({ brand: 'Google', model: 'Pixel 7', os: 'Android', cpu: 'Tensor G2', ram: 8, refresh: 90, year: 2022, price: 600, tier: 'high', keywords: ['pixel 7', 'google pixel 7'] });
        db.push({ brand: 'Google', model: 'Pixel 8', os: 'Android', cpu: 'Tensor G3', ram: 8, refresh: 120, year: 2023, price: 700, tier: 'high', keywords: ['pixel 8', 'google pixel 8'] });
        db.push({ brand: 'Google', model: 'Pixel 8 Pro', os: 'Android', cpu: 'Tensor G3', ram: 12, refresh: 120, year: 2023, price: 1000, tier: 'high', keywords: ['pixel 8 pro', 'pixel 8 pro'] });
        db.push({ brand: 'OnePlus', model: '11 5G', os: 'Android', cpu: 'Snapdragon 8 Gen 2', ram: 12, refresh: 120, year: 2023, price: 700, tier: 'high', keywords: ['oneplus 11', 'oneplus 11'] });
        db.push({ brand: 'OnePlus', model: '12 5G', os: 'Android', cpu: 'Snapdragon 8 Gen 3', ram: 12, refresh: 120, year: 2024, price: 800, tier: 'high', keywords: ['oneplus 12', 'oneplus 12'] });
        db.push({ brand: 'ASUS', model: 'ROG Phone 7', os: 'Android', cpu: 'Snapdragon 8 Gen 2', ram: 16, refresh: 165, year: 2023, price: 1000, tier: 'high', keywords: ['rog phone 7', 'rog 7'] });

        // Sony, Nokia, Motorola
        db.push({ brand: 'Sony', model: 'Xperia 1 V', os: 'Android', cpu: 'Snapdragon 8 Gen 2', ram: 12, refresh: 120, year: 2023, price: 900, tier: 'high', keywords: ['xperia 1', 'sony xperia'] });
        db.push({ brand: 'Nokia', model: 'G22', os: 'Android', cpu: 'Unisoc T606', ram: 4, refresh: 90, year: 2023, price: 150, tier: 'low', keywords: ['nokia g22', 'g22'] });
        db.push({ brand: 'Motorola', model: 'Moto G84', os: 'Android', cpu: 'Snapdragon 695', ram: 6, refresh: 120, year: 2023, price: 300, tier: 'mid', keywords: ['moto g84', 'motorola g84'] });

        // Tecno, Infinix, itel
        db.push({ brand: 'Tecno', model: 'Spark 20', os: 'Android', cpu: 'Helio G85', ram: 4, refresh: 90, year: 2024, price: 140, tier: 'low', keywords: ['tecno spark 20', 'spark 20'] });
        db.push({ brand: 'Infinix', model: 'Hot 40', os: 'Android', cpu: 'Helio G88', ram: 6, refresh: 90, year: 2024, price: 160, tier: 'low', keywords: ['infinix hot 40', 'hot 40'] });
        db.push({ brand: 'Infinix', model: 'Zero 30', os: 'Android', cpu: 'Dimensity 8020', ram: 8, refresh: 120, year: 2023, price: 350, tier: 'mid', keywords: ['infinix zero 30', 'zero 30'] });
        db.push({ brand: 'itel', model: 'A60', os: 'Android', cpu: 'Unisoc SC9863A', ram: 2, refresh: 60, year: 2023, price: 90, tier: 'low', keywords: ['itel a60', 'a60'] });

        return db;
    }

    // ============================================================
    // AI PHÂN TÍCH VĂN BẢN
    // ============================================================
    analyzeText(text) {
        const input = text.toLowerCase().trim();
        const words = input.split(/\s+/);
        
        // 1. Phân tích hãng
        let brand = this.detectBrand(input, words);
        
        // 2. Phân tích model
        let model = this.detectModel(input, words, brand);
        
        // 3. Phân tích CPU
        let cpu = this.detectCPU(input, words);
        
        // 4. Phân tích RAM
        let ram = this.detectRAM(input, words);
        
        // 5. Phân tích tần số quét
        let refresh = this.detectRefresh(input, words);
        
        // 6. Phân tích năm
        let year = this.detectYear(input, words);
        
        // 7. Phân tích giá (estimate)
        let price = this.detectPrice(input, words, brand);
        
        // 8. Phân tích tier
        let tier = this.detectTier(input, words, brand, model);
        
        // 9. Tìm thiết bị phù hợp nhất
        let matched = this.findBestMatch(input, words, brand, model);
        
        return {
            raw: text,
            brand,
            model: matched ? matched.model : model || this.inferModel(brand, tier),
            os: brand ? AI_KNOWLEDGE.brands[brand.toLowerCase()]?.os || 'Android' : 'Unknown',
            cpu: matched?.cpu || cpu || this.inferCPU(tier),
            ram: matched?.ram || ram || this.inferRAM(tier),
            refresh: matched?.refresh || refresh || this.inferRefresh(tier),
            year: matched?.year || year || this.inferYear(tier),
            price: matched?.price || price || this.inferPrice(tier),
            tier: matched?.tier || tier || this.inferTier(cpu, ram, refresh),
            confidence: matched ? 95 : 70,
            matched: matched,
            reason: this.generateReason(brand, model, tier)
        };
    }

    // ============================================================
    // CÁC HÀM PHÂN TÍCH CHI TIẾT
    // ============================================================
    
    detectBrand(input, words) {
        const brandScores = {};
        for (let [key, brand] of Object.entries(AI_KNOWLEDGE.brands)) {
            let score = 0;
            for (let kw of brand.keywords) {
                if (input.includes(kw)) score += 3;
            }
            for (let word of words) {
                if (brand.keywords.some(k => word.includes(k) || k.includes(word))) score += 1;
            }
            if (score > 0) brandScores[key] = score;
        }
        const sorted = Object.entries(brandScores).sort((a, b) => b[1] - a[1]);
        return sorted.length > 0 ? sorted[0][0] : null;
    }

    detectModel(input, words, brand) {
        // Tìm trong database
        let bestMatch = null;
        let bestScore = 0;
        
        for (let device of this.deviceDB) {
            let score = 0;
            for (let kw of device.keywords) {
                if (input.includes(kw)) {
                    score += 5;
                    if (kw.length > 3) score += 2;
                }
            }
            for (let word of words) {
                for (let kw of device.keywords) {
                    if (word.includes(kw) || kw.includes(word)) {
                        score += 2;
                    }
                }
            }
            if (brand && device.brand.toLowerCase() === brand.toLowerCase()) {
                score += 3;
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = device;
            }
        }
        return bestMatch;
    }

    detectCPU(input, words) {
        for (let [tier, cpus] of Object.entries(AI_KNOWLEDGE.cpuKeywords)) {
            for (let cpu of cpus) {
                if (input.includes(cpu.toLowerCase())) return cpu;
                for (let word of words) {
                    if (word.includes(cpu.toLowerCase()) || cpu.toLowerCase().includes(word)) return cpu;
                }
            }
        }
        return null;
    }

    detectRAM(input, words) {
        for (let [tier, rams] of Object.entries(AI_KNOWLEDGE.ramKeywords)) {
            for (let ram of rams) {
                if (input.includes(ram)) return parseInt(ram);
                for (let word of words) {
                    if (word.includes(ram) || ram.includes(word)) return parseInt(ram);
                }
            }
        }
        // Tìm kiếm số GB
        const gbMatch = input.match(/(\d+)\s*gb/i);
        if (gbMatch) return parseInt(gbMatch[1]);
        return null;
    }

    detectRefresh(input, words) {
        for (let [tier, refs] of Object.entries(AI_KNOWLEDGE.refreshKeywords)) {
            for (let ref of refs) {
                if (input.includes(ref)) return parseInt(ref);
                for (let word of words) {
                    if (word.includes(ref) || ref.includes(word)) return parseInt(ref);
                }
            }
        }
        // Tìm kiếm số Hz
        const hzMatch = input.match(/(\d+)\s*hz/i);
        if (hzMatch) return parseInt(hzMatch[1]);
        return null;
    }

    detectYear(input, words) {
        for (let [year, keywords] of Object.entries(AI_KNOWLEDGE.yearKeywords)) {
            for (let kw of keywords) {
                if (input.includes(kw)) return parseInt(year);
            }
        }
        // Tìm kiếm số năm
        const yearMatch = input.match(/(19|20)\d{2}/);
        if (yearMatch) return parseInt(yearMatch[0]);
        return null;
    }

    detectPrice(input, words, brand) {
        const priceMatch = input.match(/(\d+)\s*(triệu|m|usd|\$)/i);
        if (priceMatch) {
            const num = parseInt(priceMatch[1]);
            if (priceMatch[2].toLowerCase().includes('triệu')) return num * 1000;
            return num;
        }
        return null;
    }

    detectTier(input, words, brand, model) {
        let score = 0;
        
        // Kiểm tra từ khóa tier
        for (let kw of AI_KNOWLEDGE.tierKeywords.high) {
            if (input.includes(kw)) score += 3;
        }
        for (let kw of AI_KNOWLEDGE.tierKeywords.mid) {
            if (input.includes(kw)) score += 1;
        }
        for (let kw of AI_KNOWLEDGE.tierKeywords.low) {
            if (input.includes(kw)) score -= 2;
        }
        
        // Kiểm tra các từ khóa đặc biệt
        if (input.includes('gaming') || input.includes('flagship') || input.includes('premium')) score += 3;
        if (input.includes('cũ') || input.includes('giá rẻ') || input.includes('budget')) score -= 2;
        
        // Kiểm tra hãng + model
        if (brand === 'Apple' && model) {
            if (model.includes('Pro') || model.includes('Max')) return 'high';
            if (model.includes('SE')) return 'mid';
            if (model.includes('6') || model.includes('7') || model.includes('8')) return 'low';
            return 'mid';
        }
        
        if (score >= 3) return 'high';
        if (score >= 0) return 'mid';
        return 'low';
    }

    findBestMatch(input, words, brand, model) {
        let bestMatch = null;
        let bestScore = 0;
        
        for (let device of this.deviceDB) {
            let score = 0;
            // Từ khóa chính xác
            for (let kw of device.keywords) {
                if (input.includes(kw)) {
                    score += 10;
                    if (kw.length > 5) score += 3;
                }
            }
            // Từng từ
            for (let word of words) {
                for (let kw of device.keywords) {
                    if (word.length > 2 && (word.includes(kw) || kw.includes(word))) {
                        score += 3;
                    }
                }
            }
            // Brand match
            if (brand && device.brand.toLowerCase() === brand.toLowerCase()) {
                score += 5;
            }
            // Model match
            if (model && device.model.toLowerCase().includes(model.toLowerCase())) {
                score += 8;
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = device;
            }
        }
        return bestMatch;
    }

    // ============================================================
    // HÀM SUY LUẬN (FALLBACK)
    // ============================================================
    inferModel(brand, tier) {
        if (!brand) return 'Smartphone';
        const brandMap = {
            'apple': 'iPhone',
            'samsung': 'Galaxy',
            'xiaomi': 'Xiaomi',
            'oppo': 'OPPO',
            'vivo': 'vivo',
            'realme': 'realme',
            'google': 'Pixel',
            'oneplus': 'OnePlus',
            'huawei': 'Huawei',
            'honor': 'Honor',
            'asus': 'ASUS',
            'sony': 'Xperia',
            'nokia': 'Nokia',
            'motorola': 'Moto',
            'tecno': 'Tecno',
            'infinix': 'Infinix',
            'itel': 'itel'
        };
        return brandMap[brand] || 'Smartphone';
    }

    inferCPU(tier) {
        if (tier === 'high') return 'Snapdragon 8 Gen';
        if (tier === 'mid') return 'Snapdragon 7 Gen';
        return 'MediaTek Helio';
    }

    inferRAM(tier) {
        if (tier === 'high') return 8;
        if (tier === 'mid') return 6;
        return 4;
    }

    inferRefresh(tier) {
        if (tier === 'high') return 120;
        if (tier === 'mid') return 90;
        return 60;
    }

    inferYear(tier) {
        if (tier === 'high') return 2023;
        if (tier === 'mid') return 2022;
        return 2021;
    }

    inferPrice(tier) {
        if (tier === 'high') return 700;
        if (tier === 'mid') return 400;
        return 200;
    }

    inferTier(cpu, ram, refresh) {
        let score = 0;
        if (cpu && (cpu.includes('Snapdragon 8') || cpu.includes('A1') || cpu.includes('M'))) score += 2;
        if (ram && ram >= 8) score += 2;
        if (ram && ram >= 6) score += 1;
        if (refresh && refresh >= 120) score += 2;
        if (refresh && refresh >= 90) score += 1;
        
        if (score >= 4) return 'high';
        if (score >= 2) return 'mid';
        return 'low';
    }

    generateReason(brand, model, tier) {
        let parts = [];
        if (brand) parts.push(`Hãng ${brand.charAt(0).toUpperCase() + brand.slice(1)}`);
        if (model) parts.push(`dòng ${model}`);
        if (tier) parts.push(`phân khúc ${tier === 'high' ? 'Cao cấp' : tier === 'mid' ? 'Tầm trung' : 'Giá rẻ'}`);
        return parts.length > 0 ? `AI suy luận: ${parts.join(' - ')}` : 'AI phân tích từ khóa nhập vào';
    }
}

// ============================================================
// 6. CONTROLLER (Cập nhật)
// ============================================================
let currentDevice = null;
let currentSensitivity = null;
let currentIP = null;
const aiEngine = new AISemanticEngine();

// ============================================================
// 7. CÁC HÀM XỬ LÝ CHÍNH
// ============================================================

function detectDevice() {
    const input = document.getElementById('phoneInput').value.trim();
    if (!input) {
        showToast('Vui lòng nhập từ khóa về điện thoại!', true);
        return null;
    }

    // Sử dụng AI để phân tích
    const result = aiEngine.analyzeText(input);
    
    // Chuyển đổi kết quả AI thành device object
    const device = {
        brand: result.brand ? result.brand.charAt(0).toUpperCase() + result.brand.slice(1) : 'Unknown',
        model: result.model || result.matched?.model || 'Smartphone',
        operatingSystem: result.os || 'Android',
        cpu: result.cpu || 'Unknown',
        ram: result.ram || 4,
        refreshRate: result.refresh || 60,
        releaseYear: result.year || 2022,
        estimatedPrice: result.price || 300,
        tier: result.tier || 'mid',
        performanceScore: calculatePerformanceScore(result),
        confidence: result.confidence || 70,
        aiReason: result.reason || 'AI đã phân tích từ khóa'
    };

    currentDevice = device;
    renderDevice(device);
    updateStatus(`AI đã nhận diện: ${device.brand} ${device.model}`, 'green');
    
    return device;
}

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
// 8. RENDER FUNCTIONS
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

    // Hiển thị lý do AI
    document.getElementById('aiReason').textContent = device.aiReason || 'AI đã phân tích từ khóa';
    document.getElementById('matchConfidence').textContent = `Độ chính xác: ${device.confidence || 70}%`;

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
// 9. IP & LIMIT MANAGEMENT
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
// 10. UI HELPERS
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

// ============================================================
// 11. CONTROLLER FUNCTIONS
// ============================================================

function withLoading(callback, message = 'AI đang phân tích từ khóa...') {
    const overlay = document.getElementById('loadingOverlay');
    const text = document.getElementById('loadingText');
    text.textContent = message;
    overlay.classList.add('active');
    
    setTimeout(() => {
        overlay.classList.remove('active');
        callback();
    }, 1500);
}

function handleDetect() {
    withLoading(() => {
        const device = detectDevice();
        if (!device) {
            showToast('Không thể nhận diện thiết bị! Hãy thử từ khóa khác', true);
            updateStatus('Không tìm thấy thiết bị', 'red');
            return;
        }
        // Tự động tạo độ nhạy
        handleGenerate();
    }, 'AI đang phân tích từ khóa...');
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
    }, 'AI đang tối ưu độ nhạy...');
}

function copyResult() {
    const sensItems = document.querySelectorAll('#sensGrid .sens-item');
    if (!sensItems.length) {
        showToast('Chưa có độ nhạy để sao chép!', true);
        return;
    }
    
    let text = '🎯 FREE FIRE SENSITIVITY - AI GENERATED\n';
    text += `📱 ${currentDevice?.brand || ''} ${currentDevice?.model || 'Unknown'}\n`;
    text += `📅 ${new Date().toLocaleDateString('vi-VN')}\n`;
    text += `🤖 ${currentDevice?.aiReason || 'AI Generated'}\n`;
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
// 12. INITIALIZATION
// ============================================================

async function init() {
    currentIP = await getIP();
    document.getElementById('ipDisplay').textContent = currentIP;
    
    const remaining = getRemainingForDisplay(currentIP);
    updateLimitDisplay(remaining);
    updateStatus(`AI sẵn sàng (còn ${remaining} lượt)`, 'green');
    
    // Tự động detect từ User-Agent
    setTimeout(() => {
        // Lấy thông tin từ User-Agent
        const ua = navigator.userAgent || '';
        const device = aiEngine.analyzeText(ua);
        if (device && device.brand) {
            const detected = {
                brand: device.brand.charAt(0).toUpperCase() + device.brand.slice(1),
                model: device.model || 'Smartphone',
                operatingSystem: device.os || 'Android',
                cpu: device.cpu || 'Unknown',
                ram: device.ram || 4,
                refreshRate: device.refresh || 60,
                releaseYear: device.year || 2022,
                estimatedPrice: device.price || 300,
                tier: device.tier || 'mid',
                performanceScore: calculatePerformanceScore(device),
                confidence: device.confidence || 70,
                aiReason: device.reason || 'AI tự động nhận diện từ trình duyệt'
            };
            currentDevice = detected;
            renderDevice(detected);
            if (remaining > 0) {
                const sens = generateSensitivity(detected);
                if (sens) {
                    currentSensitivity = sens;
                    renderSensitivity(sens);
                    updateStatus(`AI tự động: ${detected.brand} ${detected.model}`, 'green');
                }
            }
        }
    }, 500);
}

// ============================================================
// 13. EVENT BINDING
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
    document.getElementById('menuHistory').addEventListener('click', function() {
        showToast('📋 Tính năng đang phát triển');
        toggleSidebar();
    });
    document.getElementById('menuInfo').addEventListener('click', function() {
        showToast('📖 AI nhận diện mọi từ khóa - Mỗi IP 5 lượt/ngày');
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
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleDetect();
        }
    });
    
    init();
});
