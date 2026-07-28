// ============================================================
// IP MANAGER - Quản lý IP, role, giới hạn
// Lưu trữ trong localStorage (có thể chuyển sang server sau)
// ============================================================

const IPManager = (function() {
    // ============================================================
    // PRIVATE
    // ============================================================
    let _data = null;
    let _currentIP = null;
    const STORAGE_KEY = 'ff_ip_manager';

    // Dữ liệu mặc định
    function _getDefaultData() {
        return {
            ips: {},
            settings: {
                defaultLimit: 5,
                adminIPs: []
            },
            history: []
        };
    }

    // Load từ localStorage
    function _loadData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const data = JSON.parse(raw);
                if (data && typeof data === 'object' && data.ips) {
                    return data;
                }
            }
        } catch (e) {}
        return _getDefaultData();
    }

    // Lưu vào localStorage
    function _saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(_data));
        } catch (e) {}
    }

    // Ngày hôm nay
    function _getToday() {
        return new Date().toLocaleDateString('vi-VN');
    }

    // Tạo IP giả
    function _generateFakeIP() {
        let fakeIP = localStorage.getItem('ff_fake_ip');
        if (!fakeIP) {
            fakeIP = 'ip_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
            localStorage.setItem('ff_fake_ip', fakeIP);
        }
        return fakeIP;
    }

    // ============================================================
    // PUBLIC API
    // ============================================================
    const publicAPI = {

        // Khởi tạo
        init() {
            _data = _loadData();
            return this;
        },

        // Lấy IP thật
        async getIP() {
            if (_currentIP) return _currentIP;
            try {
                const res = await fetch('https://api.ipify.org?format=json');
                const data = await res.json();
                _currentIP = data.ip || 'unknown';
            } catch (e) {
                _currentIP = _generateFakeIP();
            }
            return _currentIP;
        },

        getCurrentIP() {
            return _currentIP || 'unknown';
        },

        // Lấy thông tin IP
        getIPInfo(ip) {
            if (!ip) return null;
            return _data.ips[ip] || null;
        },

        getOrCreateIP(ip) {
            if (!ip) return null;
            if (!_data.ips[ip]) {
                const isAdmin = _data.settings.adminIPs.includes(ip);
                _data.ips[ip] = {
                    role: isAdmin ? 'admin' : 'user',
                    limit: isAdmin ? 999 : _data.settings.defaultLimit,
                    used: 0,
                    date: _getToday(),
                    createdAt: new Date().toISOString()
                };
                _saveData();
            }
            return _data.ips[ip];
        },

        // Kiểm tra giới hạn
        checkLimit(ip) {
            if (!ip) return { allowed: false, remaining: 0, role: 'unknown', limit: 0 };
            const info = this.getOrCreateIP(ip);
            const today = _getToday();
            if (info.date !== today) {
                info.date = today;
                info.used = 0;
                _saveData();
            }
            if (info.role === 'admin') {
                return { allowed: true, remaining: '∞', role: 'admin', limit: 999, used: info.used };
            }
            const remaining = Math.max(0, info.limit - info.used);
            return { allowed: remaining > 0, remaining, role: 'user', limit: info.limit, used: info.used };
        },

        // Tăng số lượt dùng
        incrementUsed(ip) {
            if (!ip) return { success: false };
            const info = this.getOrCreateIP(ip);
            const today = _getToday();
            if (info.date !== today) {
                info.date = today;
                info.used = 0;
            }
            if (info.role === 'admin') {
                info.used += 1;
                _saveData();
                return { success: true, remaining: '∞', role: 'admin' };
            }
            if (info.used < info.limit) {
                info.used += 1;
                _saveData();
                this.addHistory(ip, 'generate');
                return { success: true, remaining: info.limit - info.used, role: 'user' };
            }
            return { success: false, remaining: 0, role: 'user' };
        },

        getRemainingDisplay(ip) {
            const result = this.checkLimit(ip);
            if (result.role === 'admin') return '∞';
            return result.remaining;
        },

        getRole(ip) {
            const info = this.getIPInfo(ip);
            return info ? info.role : 'user';
        },

        isAdmin(ip) {
            const info = this.getIPInfo(ip);
            return info ? info.role === 'admin' : false;
        },

        // Lịch sử
        addHistory(ip, action, data = null) {
            if (!_data.history) _data.history = [];
            _data.history.push({ ip, action, data, timestamp: new Date().toISOString() });
            if (_data.history.length > 1000) _data.history = _data.history.slice(-1000);
            _saveData();
        },

        getHistory(ip = null, limit = 50) {
            if (!_data.history) return [];
            let history = _data.history;
            if (ip) history = history.filter(h => h.ip === ip);
            return history.slice(-limit).reverse();
        },

        // ===== ADMIN =====
        getAllIPs() {
            const ips = [];
            for (const [ip, info] of Object.entries(_data.ips)) {
                const remaining = info.role === 'admin' ? '∞' : Math.max(0, info.limit - info.used);
                ips.push({ ip, ...info, remaining, isCurrent: ip === _currentIP });
            }
            ips.sort((a, b) => {
                if (a.isCurrent) return -1;
                if (b.isCurrent) return 1;
                return (a.createdAt || '').localeCompare(b.createdAt || '');
            });
            return ips;
        },

        addIP(ip, role = 'user', limit = 5) {
            if (!ip) return { success: false, message: 'IP không hợp lệ' };
            if (_data.ips[ip]) return { success: false, message: 'IP đã tồn tại' };
            const finalLimit = role === 'admin' ? 999 : Math.min(999, Math.max(0, parseInt(limit) || 5));
            _data.ips[ip] = {
                role: role,
                limit: finalLimit,
                used: 0,
                date: _getToday(),
                createdAt: new Date().toISOString()
            };
            if (role === 'admin' && !_data.settings.adminIPs.includes(ip)) {
                _data.settings.adminIPs.push(ip);
            }
            _saveData();
            this.addHistory(ip, 'add_ip', { role, limit: finalLimit });
            return { success: true, message: 'Đã thêm IP' };
        },

        removeIP(ip) {
            if (!ip) return { success: false, message: 'IP không hợp lệ' };
            if (!_data.ips[ip]) return { success: false, message: 'IP không tồn tại' };
            delete _data.ips[ip];
            _data.settings.adminIPs = _data.settings.adminIPs.filter(a => a !== ip);
            _saveData();
            this.addHistory(ip, 'remove_ip');
            return { success: true, message: 'Đã xóa IP' };
        },

        updateRole(ip, role) {
            if (!ip || !_data.ips[ip]) return { success: false, message: 'IP không tồn tại' };
            const info = _data.ips[ip];
            info.role = role;
            info.limit = role === 'admin' ? 999 : _data.settings.defaultLimit;
            if (role === 'admin' && !_data.settings.adminIPs.includes(ip)) {
                _data.settings.adminIPs.push(ip);
            } else if (role !== 'admin') {
                _data.settings.adminIPs = _data.settings.adminIPs.filter(a => a !== ip);
            }
            _saveData();
            this.addHistory(ip, 'update_role', { newRole: role });
            return { success: true, message: `Đã chuyển ${ip} sang ${role}` };
        },

        resetUsed(ip) {
            if (!ip || !_data.ips[ip]) return { success: false, message: 'IP không tồn tại' };
            const info = _data.ips[ip];
            info.used = 0;
            info.date = _getToday();
            _saveData();
            this.addHistory(ip, 'reset_used');
            return { success: true, message: 'Đã reset lượt dùng' };
        },

        exportData() {
            return JSON.stringify(_data, null, 2);
        },

        importData(jsonData) {
            try {
                const data = JSON.parse(jsonData);
                if (data && data.ips && data.settings) {
                    _data = data;
                    _saveData();
                    return { success: true, message: 'Import thành công' };
                }
                return { success: false, message: 'Dữ liệu không hợp lệ' };
            } catch (e) {
                return { success: false, message: 'Lỗi import: ' + e.message };
            }
        },

        resetAll() {
            if (!confirm('Reset tất cả dữ liệu IP?')) {
                return { success: false, message: 'Đã hủy' };
            }
            _data = _getDefaultData();
            _saveData();
            return { success: true, message: 'Đã reset tất cả' };
        },

        getStats() {
            const totalIPs = Object.keys(_data.ips).length;
            const adminCount = Object.values(_data.ips).filter(i => i.role === 'admin').length;
            const today = _getToday();
            const todayUsed = Object.values(_data.ips)
                .filter(i => i.date === today)
                .reduce((sum, i) => sum + i.used, 0);
            return { totalIPs, adminCount, userCount: totalIPs - adminCount, todayUsed };
        }
    };

    return publicAPI;
})();

// Khởi tạo
IPManager.init();
