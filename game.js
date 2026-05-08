class IdleGame {
    constructor() {
        this.crystals = 0;
        this.perSecond = 0;
        this.clickPower = 1;
        this.playTime = 0;
        this.totalClicks = 0;
        this.totalCrystalsEarned = 0;
        this.totalPurchases = 0;
        
        this.lastSaveTime = Date.now();
        this.performanceMode = false;
        this.todayBonusClaimed = false;
        this.dailyBonusAmount = 0;
        
        this.shopItems = [
            { id: 'basic_miner', name: '基础矿工', icon: '⛏️', desc: '每秒+1水晶', basePrice: 10, perSecond: 1, count: 0 },
            { id: 'crystal_drill', name: '水晶钻机', icon: '🔧', desc: '每秒+5水晶', basePrice: 50, perSecond: 5, count: 0 },
            { id: 'laser_cutter', name: '激光切割机', icon: '🔦', desc: '每秒+20水晶', basePrice: 200, perSecond: 20, count: 0 },
            { id: 'robot_miner', name: '机器人矿工', icon: '🤖', desc: '每秒+100水晶', basePrice: 1000, perSecond: 100, count: 0 },
            { id: 'alien_tech', name: '外星科技', icon: '👽', desc: '每秒+500水晶', basePrice: 5000, perSecond: 500, count: 0 },
            { id: 'quantum_core', name: '量子核心', icon: '⚛️', desc: '每秒+2500水晶', basePrice: 25000, perSecond: 2500, count: 0 },
            { id: 'click_boost', name: '点击强化', icon: '💥', desc: '点击+5水晶', basePrice: 25, clickPower: 5, count: 0 },
            { id: 'super_click', name: '超级点击', icon: '🌟', desc: '点击+25水晶', basePrice: 150, clickPower: 25, count: 0 },
        ];

        this.achievements = [
            { id: 'first_click', name: '初次尝试', icon: '👆', desc: '完成第一次点击', condition: 'clicks', target: 1, unlocked: false, reward: 10 },
            { id: 'click_master', name: '点击大师', icon: '🎯', desc: '累计点击100次', condition: 'clicks', target: 100, unlocked: false, reward: 100 },
            { id: 'click_king', name: '点击之王', icon: '👑', desc: '累计点击1000次', condition: 'clicks', target: 1000, unlocked: false, reward: 500 },
            { id: 'first_crystal', name: '第一颗水晶', icon: '💎', desc: '获得第一颗水晶', condition: 'crystals', target: 1, unlocked: false, reward: 5 },
            { id: 'crystal_collector', name: '水晶收藏家', icon: '🏆', desc: '累计获得1000水晶', condition: 'totalEarned', target: 1000, unlocked: false, reward: 200 },
            { id: 'crystal_millionaire', name: '水晶百万富翁', icon: '💰', desc: '累计获得100万水晶', condition: 'totalEarned', target: 1000000, unlocked: false, reward: 10000 },
            { id: 'per_second_10', name: '小有成就', icon: '⚡', desc: '达到每秒10水晶', condition: 'perSecond', target: 10, unlocked: false, reward: 50 },
            { id: 'per_second_100', name: '高效生产', icon: '🔥', desc: '达到每秒100水晶', condition: 'perSecond', target: 100, unlocked: false, reward: 500 },
            { id: 'per_second_1000', name: '超级工厂', icon: '🚀', desc: '达到每秒1000水晶', condition: 'perSecond', target: 1000, unlocked: false, reward: 5000 },
            { id: 'play_time_1', name: '新手矿工', icon: '⏰', desc: '累计游戏1小时', condition: 'playTime', target: 3600, unlocked: false, reward: 100 },
            { id: 'play_time_10', name: '资深矿工', icon: '🕐', desc: '累计游戏10小时', condition: 'playTime', target: 36000, unlocked: false, reward: 1000 },
            { id: 'play_time_100', name: '传奇矿工', icon: '⭐', desc: '累计游戏100小时', condition: 'playTime', target: 360000, unlocked: false, reward: 10000 },
            { id: 'purchase_10', name: '购物达人', icon: '🛒', desc: '累计购买10次升级', condition: 'purchases', target: 10, unlocked: false, reward: 150 },
            { id: 'purchase_100', name: '疯狂购物', icon: '🎉', desc: '累计购买100次升级', condition: 'purchases', target: 100, unlocked: false, reward: 1500 },
            { id: 'tech_master', name: '科技大师', icon: '🔬', desc: '解锁所有科技', condition: 'techUnlocked', target: 8, unlocked: false, reward: 5000 },
            { id: 'skin_collector', name: '皮肤收藏家', icon: '🎨', desc: '解锁所有皮肤', condition: 'skinsUnlocked', target: 6, unlocked: false, reward: 3000 },
            { id: 'daily_champ', name: '每日冠军', icon: '🏅', desc: '连续7天领取每日奖励', condition: 'dailyStreak', target: 7, unlocked: false, reward: 2000 },
        ];

        this.techTree = [
            { id: 'crystal_vision', name: '水晶透视', icon: '👁️', desc: '点击获得+20%水晶', price: 100, unlocked: false, purchased: false, requirements: [], bonus: { clickMultiplier: 1.2 } },
            { id: 'mining_efficiency', name: '采矿效率', icon: '⚡', desc: '自动收益+20%', price: 200, unlocked: false, purchased: false, requirements: ['crystal_vision'], bonus: { perSecondMultiplier: 1.2 } },
            { id: 'deep_drilling', name: '深度钻探', icon: '⛏️', desc: '解锁高级矿工', price: 500, unlocked: false, purchased: false, requirements: ['mining_efficiency'], bonus: { unlockShopItem: 'deep_miner' } },
            { id: 'energy_core', name: '能量核心', icon: '🔋', desc: '自动收益+50%', price: 1000, unlocked: false, purchased: false, requirements: ['deep_drilling'], bonus: { perSecondMultiplier: 1.5 } },
            { id: 'quantum_tap', name: '量子挖掘', icon: '⚛️', desc: '点击获得+50%水晶', price: 2000, unlocked: false, purchased: false, requirements: ['energy_core'], bonus: { clickMultiplier: 1.5 } },
            { id: 'time_acceleration', name: '时间加速', icon: '⏰', desc: '离线收益+50%', price: 5000, unlocked: false, purchased: false, requirements: ['quantum_tap'], bonus: { offlineMultiplier: 1.5 } },
            { id: 'galaxy_network', name: '银河网络', icon: '🌌', desc: '自动收益+100%', price: 10000, unlocked: false, purchased: false, requirements: ['time_acceleration'], bonus: { perSecondMultiplier: 2 } },
            { id: 'universe_mine', name: '宇宙采矿', icon: '🌠', desc: '所有收益+100%', price: 25000, unlocked: false, purchased: false, requirements: ['galaxy_network'], bonus: { allMultiplier: 2 } },
        ];

        this.skins = [
            { id: 'default', name: '默认星球', icon: '🪐', price: 0, unlocked: true, selected: true, gradient: '#4a3f6b, #2d2544, #1a152e', coreColor: '#ffd700, #ff8c00' },
            { id: 'fire', name: '火焰星球', icon: '🌋', price: 500, unlocked: false, selected: false, gradient: '#ff6b35, #f7c59f, #1a1a2e', coreColor: '#ff4500, #ff0000' },
            { id: 'ice', name: '寒冰星球', icon: '❄️', price: 1000, unlocked: false, selected: false, gradient: '#74b9ff, #0984e3, #0652DD', coreColor: '#81ecec, #00cec9' },
            { id: 'lava', name: '熔岩星球', icon: '🔥', price: 2500, unlocked: false, selected: false, gradient: '#fdcb6e, #e17055, #d63031', coreColor: '#ffeaa7, #fdcb6e' },
            { id: 'neon', name: '霓虹星球', icon: '💜', price: 5000, unlocked: false, selected: false, gradient: '#a29bfe, #6c5ce7, #2d3436', coreColor: '#fd79a8, #e84393' },
            { id: 'golden', name: '黄金星球', icon: '🌟', price: 10000, unlocked: false, selected: false, gradient: '#f1c40f, #e67e22, #d35400', coreColor: '#f1c40f, #ffd700' },
        ];

        this.events = [
            { id: 'meteor_shower', name: '流星雨', icon: '🌠', desc: '点击获得双倍水晶！', duration: 30, multiplier: 2, active: false, endTime: 0 },
            { id: 'solar_flare', name: '太阳耀斑', icon: '☀️', desc: '自动收益双倍！', duration: 20, multiplier: 2, active: false, endTime: 0 },
            { id: 'crystal_rush', name: '水晶狂潮', icon: '💎', desc: '所有收益三倍！', duration: 15, multiplier: 3, active: false, endTime: 0 },
        ];

        this.tasks = {
            daily: [
                { id: 'daily_click', name: '勤奋矿工', desc: '点击星球100次', progress: 0, target: 100, reward: 100, completed: false, claimed: false, type: 'click' },
                { id: 'daily_buy', name: '精明买家', desc: '在商店购买5次升级', progress: 0, target: 5, reward: 150, completed: false, claimed: false, type: 'purchase' },
                { id: 'daily_achieve', name: '成就猎人', desc: '解锁1个成就', progress: 0, target: 1, reward: 200, completed: false, claimed: false, type: 'achievement' },
                { id: 'daily_crystal', name: '水晶收集者', desc: '累计获得1000水晶', progress: 0, target: 1000, reward: 250, completed: false, claimed: false, type: 'crystal' },
            ],
            weekly: [
                { id: 'weekly_click', name: '坚持不懈', desc: '点击星球1000次', progress: 0, target: 1000, reward: 1000, completed: false, claimed: false, type: 'click' },
                { id: 'weekly_play', name: '忠实玩家', desc: '累计游戏5小时', progress: 0, target: 18000, reward: 1500, completed: false, claimed: false, type: 'time' },
                { id: 'weekly_purchase', name: '购物狂人', desc: '购买30次升级', progress: 0, target: 30, reward: 2000, completed: false, claimed: false, type: 'purchase' },
                { id: 'weekly_tech', name: '科技爱好者', desc: '解锁3项科技', progress: 0, target: 3, reward: 2500, completed: false, claimed: false, type: 'tech' },
            ],
            milestone: [
                { id: 'milestone_10k', name: '起步阶段', desc: '累计获得10000水晶', progress: 0, target: 10000, reward: 500, completed: false, claimed: false, type: 'totalCrystal' },
                { id: 'milestone_100k', name: '小有成就', desc: '累计获得100000水晶', progress: 0, target: 100000, reward: 2000, completed: false, claimed: false, type: 'totalCrystal' },
                { id: 'milestone_1m', name: '水晶大师', desc: '累计获得100万水晶', progress: 0, target: 1000000, reward: 10000, completed: false, claimed: false, type: 'totalCrystal' },
                { id: 'milestone_tech', name: '科技先驱', desc: '解锁所有科技', progress: 0, target: 8, reward: 5000, completed: false, claimed: false, type: 'tech' },
                { id: 'milestone_skin', name: '时尚达人', desc: '解锁所有皮肤', progress: 0, target: 6, reward: 5000, completed: false, claimed: false, type: 'skin' },
            ]
        };

        this.currentEvent = null;
        this.dailyStreak = 0;
        this.lastDailyRewardDate = '';
        this.currentSale = null;
        
        window.gameInstance = this;
        this.init();
    }

    init() {
        this.loadGame();
        this.setupEventListeners();
        this.updateShop();
        this.updateAchievements();
        this.updateTechTree();
        this.updateSkins();
        this.updateStatsPanel();
        this.updateLeaderboard();
        this.updateTasks();
        this.updateDailyRewardPanel();
        this.checkSale();
        this.startGameLoop();
        this.startTimer();
        this.checkOfflineReward();
        this.startEventTimer();
    }

    setupEventListeners() {
        document.getElementById('clickArea').addEventListener('click', (e) => {
            this.handleClick(e);
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            if (confirm('确定要重置游戏吗？所有进度将丢失！')) {
                this.resetGame();
            }
        });

        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveGame();
            document.getElementById('saveStatus').textContent = '💾 已保存！';
            document.getElementById('saveStatus').classList.add('saved');
            setTimeout(() => {
                document.getElementById('saveStatus').textContent = '💾 自动保存中...';
                document.getElementById('saveStatus').classList.remove('saved');
            }, 2000);
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportSave();
        });

        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importModal').classList.add('active');
        });

        document.getElementById('performanceBtn').addEventListener('click', () => {
            this.togglePerformanceMode();
        });

        document.getElementById('copyExport').addEventListener('click', () => {
            this.copyExportData();
        });

        document.getElementById('closeExport').addEventListener('click', () => {
            document.getElementById('exportModal').classList.remove('active');
        });

        document.getElementById('doImport').addEventListener('click', () => {
            this.importSave();
        });

        document.getElementById('closeImport').addEventListener('click', () => {
            document.getElementById('importModal').classList.remove('active');
        });

        document.getElementById('shareBtn').addEventListener('click', () => {
            this.shareScore();
        });

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchPanel(btn.dataset.panel);
            });
        });

        document.querySelectorAll('.task-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTaskTab(tab.dataset.tab);
            });
        });

        document.getElementById('claimOffline').addEventListener('click', () => {
            this.claimOfflineReward();
        });

        document.getElementById('closeAchievement').addEventListener('click', () => {
            document.getElementById('achievementModal').classList.remove('active');
        });

        document.getElementById('claimTaskReward').addEventListener('click', () => {
            this.claimTaskReward();
        });
    }

    switchPanel(panelId) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
        
        document.querySelector(`[data-panel="${panelId}"]`).classList.add('active');
        document.getElementById(`${panelId}-panel`).classList.add('active');

        if (panelId === 'stats') {
            this.updateStatsPanel();
        } else if (panelId === 'leaderboard') {
            this.updateLeaderboard();
        } else if (panelId === 'tasks') {
            this.updateTasks();
        }
    }

    switchTaskTab(tabId) {
        document.querySelectorAll('.task-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        this.updateTasks(tabId);
    }

    handleClick(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        let amount = this.clickPower;
        
        if (this.currentEvent && this.currentEvent.multiplier && this.currentEvent.id === 'meteor_shower') {
            amount *= this.currentEvent.multiplier;
        }
        
        this.crystals += amount;
        this.totalClicks++;
        this.totalCrystalsEarned += amount;
        
        this.updateTasksProgress('click', 1);
        this.updateTasksProgress('crystal', amount);
        this.updateTasksProgress('totalCrystal', amount);
        
        this.updateStats();
        this.checkAchievements();
        
        if (!this.performanceMode) {
            this.showClickEffect(x, y, amount);
        }
    }

    showClickEffect(x, y, amount) {
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.textContent = `+${Math.floor(amount)}`;
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        
        document.getElementById('clickArea').appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 800);
    }

    updateStats() {
        document.getElementById('crystals').textContent = this.formatNumber(this.crystals);
        document.getElementById('perSecond').textContent = this.formatNumber(this.perSecond);
        document.getElementById('clickPower').textContent = this.formatNumber(this.clickPower);
        document.getElementById('dailyBonus').textContent = this.formatNumber(this.dailyBonusAmount);
    }

    formatNumber(num) {
        if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
        if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
        return Math.floor(num).toString();
    }

    updateShop() {
        const shopItems = document.getElementById('shopItems');
        shopItems.innerHTML = '';

        this.shopItems.forEach(item => {
            let price = this.getPrice(item);
            const discount = this.currentSale ? 0.8 : 1;
            price = Math.floor(price * discount);
            const canAfford = this.crystals >= price;
            
            const itemElement = document.createElement('div');
            itemElement.className = `shop-item ${!canAfford ? 'disabled' : ''}`;
            itemElement.dataset.itemId = item.id;
            
            itemElement.innerHTML = `
                <div class="item-icon">${item.icon}</div>
                <div class="item-info">
                    <div class="item-name">${item.name} ${item.count > 0 ? `(${item.count})` : ''}</div>
                    <div class="item-desc">${item.desc}</div>
                </div>
                <div class="item-price">
                    💎 ${this.formatNumber(price)}
                    ${this.currentSale ? '<span style="color: #ff4444; font-size: 0.8rem;">-20%</span>' : ''}
                </div>
            `;
            
            itemElement.addEventListener('click', () => {
                if (canAfford) {
                    this.buyItem(item);
                }
            });
            
            shopItems.appendChild(itemElement);
        });
    }

    checkSale() {
        const now = new Date();
        const hour = now.getHours();
        
        if (hour >= 12 && hour < 14) {
            this.currentSale = { type: 'lunch', discount: 0.8 };
            this.updateSaleBanner();
        } else if (hour >= 20 && hour < 22) {
            this.currentSale = { type: 'evening', discount: 0.8 };
            this.updateSaleBanner();
        } else {
            this.currentSale = null;
            document.getElementById('saleBanner').innerHTML = '';
        }
    }

    updateSaleBanner() {
        const banner = document.getElementById('saleBanner');
        banner.innerHTML = `<span>🔥 限时特惠！所有商品8折！🔥</span>`;
    }

    getPrice(item) {
        return Math.floor(item.basePrice * Math.pow(1.15, item.count));
    }

    buyItem(item) {
        let price = this.getPrice(item);
        const discount = this.currentSale ? 0.8 : 1;
        price = Math.floor(price * discount);
        
        if (this.crystals >= price) {
            this.crystals -= price;
            item.count++;
            this.totalPurchases++;
            
            if (item.perSecond) {
                this.perSecond += item.perSecond;
            }
            if (item.clickPower) {
                this.clickPower += item.clickPower;
            }
            
            this.updateTasksProgress('purchase', 1);
            
            this.updateStats();
            this.updateShop();
            this.checkAchievements();
            this.saveGame();
        }
    }

    updateAchievements() {
        const grid = document.getElementById('achievementsGrid');
        grid.innerHTML = '';

        const unlockedCount = this.achievements.filter(a => a.unlocked).length;
        document.getElementById('achievementsProgress').textContent = `${unlockedCount}/${this.achievements.length}`;
        document.getElementById('achievementsProgressBar').style.width = `${(unlockedCount / this.achievements.length) * 100}%`;

        this.achievements.forEach(achievement => {
            const card = document.createElement('div');
            card.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            
            card.innerHTML = `
                <div class="achievement-icon">${achievement.unlocked ? achievement.icon : '❓'}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
                ${achievement.unlocked ? `<div style="color: #ffd700; margin-top: 8px;">奖励: ${achievement.reward} 💎</div>` : ''}
            `;
            
            grid.appendChild(card);
        });
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!achievement.unlocked) {
                let conditionMet = false;
                
                switch(achievement.condition) {
                    case 'clicks':
                        conditionMet = this.totalClicks >= achievement.target;
                        break;
                    case 'crystals':
                        conditionMet = this.crystals >= achievement.target;
                        break;
                    case 'totalEarned':
                        conditionMet = this.totalCrystalsEarned >= achievement.target;
                        break;
                    case 'perSecond':
                        conditionMet = this.perSecond >= achievement.target;
                        break;
                    case 'playTime':
                        conditionMet = this.playTime >= achievement.target;
                        break;
                    case 'purchases':
                        conditionMet = this.totalPurchases >= achievement.target;
                        break;
                    case 'techUnlocked':
                        conditionMet = this.techTree.filter(t => t.purchased).length >= achievement.target;
                        break;
                    case 'skinsUnlocked':
                        conditionMet = this.skins.filter(s => s.unlocked).length >= achievement.target;
                        break;
                    case 'dailyStreak':
                        conditionMet = this.dailyStreak >= achievement.target;
                        break;
                }
                
                if (conditionMet) {
                    achievement.unlocked = true;
                    this.crystals += achievement.reward;
                    this.updateTasksProgress('achievement', 1);
                    this.showAchievementModal(achievement);
                    this.updateAchievements();
                    this.updateStats();
                    this.saveGame();
                }
            }
        });
    }

    showAchievementModal(achievement) {
        document.getElementById('modalAchievementIcon').textContent = achievement.icon;
        document.getElementById('modalAchievementName').textContent = `🎉 ${achievement.name}`;
        document.getElementById('modalAchievementDesc').textContent = `${achievement.desc}\n奖励: ${achievement.reward} 💎`;
        document.getElementById('achievementModal').classList.add('active');
    }

    updateTechTree() {
        const tree = document.getElementById('techTree');
        tree.innerHTML = '';

        this.techTree.forEach(tech => {
            const canUnlock = tech.requirements.every(reqId => 
                this.techTree.find(t => t.id === reqId)?.purchased
            );
            const canAfford = this.crystals >= tech.price;
            const isUnlocked = canUnlock || tech.purchased;
            
            const node = document.createElement('div');
            node.className = `tech-node ${tech.purchased ? 'purchased' : ''} ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            node.innerHTML = `
                <div class="tech-icon">${tech.purchased ? tech.icon : '🔒'}</div>
                <div class="tech-info">
                    <div class="tech-name">${tech.name}</div>
                    <div class="tech-desc">${tech.desc}</div>
                    ${tech.requirements.length > 0 ? `<div class="tech-requirements">需要: ${tech.requirements.map(r => this.techTree.find(t => t.id === r)?.name).join(', ')}</div>` : ''}
                </div>
                <div class="tech-price">
                    ${tech.purchased ? '✓' : `💎 ${this.formatNumber(tech.price)}`}
                </div>
            `;
            
            if (!tech.purchased && isUnlocked && canAfford) {
                node.addEventListener('click', () => {
                    this.buyTech(tech);
                });
            }
            
            tree.appendChild(node);
        });
    }

    buyTech(tech) {
        if (this.crystals >= tech.price) {
            this.crystals -= tech.price;
            tech.purchased = true;
            
            if (tech.bonus) {
                if (tech.bonus.clickMultiplier) {
                    this.clickPower *= tech.bonus.clickMultiplier;
                }
                if (tech.bonus.perSecondMultiplier) {
                    this.perSecond *= tech.bonus.perSecondMultiplier;
                }
                if (tech.bonus.allMultiplier) {
                    this.clickPower *= tech.bonus.allMultiplier;
                    this.perSecond *= tech.bonus.allMultiplier;
                }
            }
            
            this.updateTasksProgress('tech', 1);
            
            this.updateTechTree();
            this.updateStats();
            this.checkAchievements();
            this.saveGame();
        }
    }

    updateSkins() {
        const grid = document.getElementById('skinsGrid');
        grid.innerHTML = '';

        this.skins.forEach(skin => {
            const canAfford = this.crystals >= skin.price;
            
            const card = document.createElement('div');
            card.className = `skin-card ${skin.unlocked ? 'unlocked' : 'locked'} ${skin.selected ? 'selected' : ''}`;
            
            card.innerHTML = `
                <div class="skin-preview" style="background: radial-gradient(circle, ${skin.gradient});">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: radial-gradient(circle, ${skin.coreColor});"></div>
                </div>
                <div class="skin-name">${skin.name}</div>
                <div class="skin-price">
                    ${skin.unlocked ? skin.selected ? '✓ 已装备' : '点击装备' : `💎 ${this.formatNumber(skin.price)}`}
                </div>
            `;
            
            card.addEventListener('click', () => {
                if (skin.unlocked) {
                    this.selectSkin(skin);
                } else if (canAfford) {
                    this.buySkin(skin);
                }
            });
            
            grid.appendChild(card);
        });
    }

    buySkin(skin) {
        if (this.crystals >= skin.price) {
            this.crystals -= skin.price;
            skin.unlocked = true;
            this.updateTasksProgress('skin', 1);
            this.selectSkin(skin);
            this.updateSkins();
            this.updateStats();
            this.checkAchievements();
            this.saveGame();
        }
    }

    selectSkin(skin) {
        this.skins.forEach(s => s.selected = false);
        skin.selected = true;
        
        const planet = document.getElementById('planet');
        const core = planet.querySelector('.planet-core');
        
        planet.style.background = `radial-gradient(circle, ${skin.gradient})`;
        core.style.background = `radial-gradient(circle, ${skin.coreColor})`;
        
        this.updateSkins();
        this.saveGame();
    }

    updateStatsPanel() {
        const grid = document.getElementById('statsGrid');
        grid.innerHTML = '';
        
        const stats = [
            { label: '当前水晶', value: this.formatNumber(this.crystals) },
            { label: '总获得水晶', value: this.formatNumber(this.totalCrystalsEarned) },
            { label: '每秒收益', value: this.formatNumber(this.perSecond) },
            { label: '点击威力', value: this.formatNumber(this.clickPower) },
            { label: '总点击次数', value: this.formatNumber(this.totalClicks) },
            { label: '购买次数', value: this.formatNumber(this.totalPurchases) },
            { label: '连续登录', value: `${this.dailyStreak} 天` },
            { label: '解锁成就', value: `${this.achievements.filter(a => a.unlocked).length}/${this.achievements.length}` },
            { label: '解锁科技', value: `${this.techTree.filter(t => t.purchased).length}/${this.techTree.length}` },
            { label: '解锁皮肤', value: `${this.skins.filter(s => s.unlocked).length}/${this.skins.length}` },
        ];
        
        stats.forEach(stat => {
            const row = document.createElement('div');
            row.className = 'stat-row';
            row.innerHTML = `
                <span class="stat-label">${stat.label}</span>
                <span class="stat-num">${stat.value}</span>
            `;
            grid.appendChild(row);
        });
    }

    updateLeaderboard() {
        const list = document.getElementById('leaderboardList');
        list.innerHTML = '';
        
        const leaderboard = this.getLeaderboard();
        
        leaderboard.forEach((entry, index) => {
            const item = document.createElement('div');
            item.className = `leaderboard-item ${index < 3 ? 'top3' : ''}`;
            
            item.innerHTML = `
                <div class="leaderboard-rank">${index + 1}</div>
                <div class="leaderboard-name">${entry.name}</div>
                <div class="leaderboard-score">${this.formatNumber(entry.score)} 💎</div>
            `;
            
            list.appendChild(item);
        });
    }

    getLeaderboard() {
        const saved = localStorage.getItem('idleGameLeaderboard');
        let leaderboard = saved ? JSON.parse(saved) : [
            { name: '星际王者', score: 1000000 },
            { name: '水晶大师', score: 500000 },
            { name: '挖矿专家', score: 250000 },
            { name: '宇宙矿工', score: 100000 },
            { name: '新手小白', score: 50000 },
        ];
        
        const playerScore = { name: '你', score: Math.floor(this.totalCrystalsEarned) };
        leaderboard.push(playerScore);
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10);
        
        return leaderboard;
    }

    saveLeaderboard() {
        const leaderboard = this.getLeaderboard();
        localStorage.setItem('idleGameLeaderboard', JSON.stringify(leaderboard));
    }

    updateTasks(tab = 'daily') {
        const list = document.getElementById('tasksList');
        list.innerHTML = '';
        
        const tasks = this.tasks[tab] || [];
        
        tasks.forEach(task => {
            const progress = Math.min(task.progress, task.target);
            const progressPercent = (progress / task.target) * 100;
            const isCompleted = task.progress >= task.target;
            
            const card = document.createElement('div');
            card.className = `task-card ${isCompleted && !task.claimed ? 'completed' : ''}`;
            card.dataset.taskId = task.id;
            
            card.innerHTML = `
                <div class="task-info">
                    <div class="task-name">${task.name}</div>
                    <div class="task-desc">${task.desc}</div>
                    ${!isCompleted ? `
                        <div class="task-progress">
                            <div class="task-progress-bar">
                                <div class="task-progress-fill" style="width: ${progressPercent}%"></div>
                            </div>
                            <span>${Math.floor(progress)}/${task.target}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="task-reward">💎 ${task.reward}</div>
                <button class="task-btn ${isCompleted && !task.claimed ? 'claim' : 'in-progress'}" ${isCompleted && !task.claimed ? '' : 'disabled'}>
                    ${task.claimed ? '已领取' : (isCompleted ? '领取' : '进行中')}
                </button>
            `;
            
            if (isCompleted && !task.claimed) {
                card.querySelector('.task-btn').addEventListener('click', () => {
                    this.showTaskRewardModal(task);
                });
            }
            
            list.appendChild(card);
        });
    }

    updateTasksProgress(type, amount) {
        Object.keys(this.tasks).forEach(tab => {
            this.tasks[tab].forEach(task => {
                if (!task.completed && !task.claimed) {
                    if (task.type === type) {
                        task.progress += amount;
                        if (task.progress >= task.target) {
                            task.completed = true;
                        }
                    }
                }
            });
        });
        
        const activeTab = document.querySelector('.task-tab.active')?.dataset.tab || 'daily';
        this.updateTasks(activeTab);
    }

    showTaskRewardModal(task) {
        document.getElementById('taskRewardText').textContent = `恭喜完成「${task.name}」！获得 ${task.reward} 💎`;
        document.getElementById('taskRewardModal').classList.add('active');
        this.currentTaskReward = task;
    }

    claimTaskReward() {
        if (this.currentTaskReward) {
            this.crystals += this.currentTaskReward.reward;
            this.currentTaskReward.claimed = true;
            this.updateStats();
            this.updateTasks();
            this.saveGame();
        }
        document.getElementById('taskRewardModal').classList.remove('active');
    }

    updateDailyRewardPanel() {
        const panel = document.getElementById('dailyRewardPanel');
        const today = new Date().toDateString();
        
        if (this.todayBonusClaimed) {
            panel.innerHTML = `
                <div class="daily-reward-title">🎁 每日奖励</div>
                <p style="color: #888;">今日奖励已领取</p>
                <button class="daily-reward-btn" disabled>已领取</button>
            `;
        } else {
            this.dailyBonusAmount = Math.floor(100 + this.dailyStreak * 50);
            panel.innerHTML = `
                <div class="daily-reward-title">🎁 每日奖励</div>
                <p style="color: #fff; margin-bottom: 15px;">连续登录: <span style="color: #ffd700;">${this.dailyStreak} 天</span></p>
                <p style="color: #ffd700; font-weight: bold; margin-bottom: 15px;">今日奖励: ${this.dailyBonusAmount} 💎</p>
                <button class="daily-reward-btn" id="claimDaily">领取奖励</button>
            `;
            
            document.getElementById('claimDaily').addEventListener('click', () => {
                this.claimDailyReward();
            });
        }
    }

    claimDailyReward() {
        if (!this.todayBonusClaimed) {
            const today = new Date().toDateString();
            if (this.lastDailyRewardDate !== today) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toDateString();
                
                if (this.lastDailyRewardDate === yesterdayStr) {
                    this.dailyStreak++;
                } else if (this.lastDailyRewardDate !== today) {
                    this.dailyStreak = 1;
                }
                
                this.lastDailyRewardDate = today;
                this.todayBonusClaimed = true;
                this.crystals += this.dailyBonusAmount;
                this.updateStats();
                this.updateDailyRewardPanel();
                this.checkAchievements();
                this.saveGame();
            }
        }
    }

    togglePerformanceMode() {
        this.performanceMode = !this.performanceMode;
        const btn = document.getElementById('performanceBtn');
        
        if (this.performanceMode) {
            btn.textContent = '⚙️ 正常模式';
            document.body.classList.add('performance-mode');
        } else {
            btn.textContent = '⚙️ 性能模式';
            document.body.classList.remove('performance-mode');
        }
        
        this.saveGame();
    }

    exportSave() {
        const saveData = {
            version: '1.0',
            timestamp: Date.now(),
            data: {
                crystals: this.crystals,
                perSecond: this.perSecond,
                clickPower: this.clickPower,
                playTime: this.playTime,
                totalClicks: this.totalClicks,
                totalCrystalsEarned: this.totalCrystalsEarned,
                totalPurchases: this.totalPurchases,
                dailyStreak: this.dailyStreak,
                todayBonusClaimed: this.todayBonusClaimed,
                lastDailyRewardDate: this.lastDailyRewardDate,
                shopItems: this.shopItems.map(item => ({ id: item.id, count: item.count })),
                achievements: this.achievements.map(a => ({ id: a.id, unlocked: a.unlocked })),
                techTree: this.techTree.map(t => ({ id: t.id, purchased: t.purchased })),
                skins: this.skins.map(s => ({ id: s.id, unlocked: s.unlocked, selected: s.selected })),
                tasks: this.tasks,
            }
        };
        
        const exportData = btoa(JSON.stringify(saveData));
        document.getElementById('exportData').value = exportData;
        document.getElementById('exportModal').classList.add('active');
    }

    copyExportData() {
        const textarea = document.getElementById('exportData');
        textarea.select();
        document.execCommand('copy');
        alert('存档已复制到剪贴板！');
    }

    importSave() {
        const importData = document.getElementById('importData').value;
        
        if (!importData) {
            alert('请粘贴存档数据');
            return;
        }
        
        try {
            const decoded = atob(importData);
            const saveData = JSON.parse(decoded);
            
            if (!saveData.version || !saveData.data) {
                throw new Error('无效的存档格式');
            }
            
            if (confirm('确定要导入存档吗？当前进度将被覆盖！')) {
                this.loadFromImport(saveData.data);
                document.getElementById('importModal').classList.remove('active');
                document.getElementById('importData').value = '';
                alert('存档导入成功！');
            }
        } catch (e) {
            alert('存档格式错误或已损坏');
            console.error('Import error:', e);
        }
    }

    loadFromImport(data) {
        this.crystals = data.crystals || 0;
        this.perSecond = data.perSecond || 0;
        this.clickPower = data.clickPower || 1;
        this.playTime = data.playTime || 0;
        this.totalClicks = data.totalClicks || 0;
        this.totalCrystalsEarned = data.totalCrystalsEarned || 0;
        this.totalPurchases = data.totalPurchases || 0;
        this.dailyStreak = data.dailyStreak || 0;
        this.todayBonusClaimed = data.todayBonusClaimed || false;
        this.lastDailyRewardDate = data.lastDailyRewardDate || '';
        
        if (data.shopItems) {
            data.shopItems.forEach(savedItem => {
                const item = this.shopItems.find(i => i.id === savedItem.id);
                if (item) {
                    item.count = savedItem.count;
                }
            });
        }
        
        if (data.achievements) {
            data.achievements.forEach(saved => {
                const achievement = this.achievements.find(a => a.id === saved.id);
                if (achievement) {
                    achievement.unlocked = saved.unlocked;
                }
            });
        }
        
        if (data.techTree) {
            data.techTree.forEach(saved => {
                const tech = this.techTree.find(t => t.id === saved.id);
                if (tech) {
                    tech.purchased = saved.purchased;
                }
            });
        }
        
        if (data.skins) {
            data.skins.forEach(saved => {
                const skin = this.skins.find(s => s.id === saved.id);
                if (skin) {
                    skin.unlocked = saved.unlocked;
                    skin.selected = saved.selected;
                }
            });
        }
        
        if (data.tasks) {
            Object.keys(data.tasks).forEach(tab => {
                if (this.tasks[tab]) {
                    data.tasks[tab].forEach(savedTask => {
                        const task = this.tasks[tab].find(t => t.id === savedTask.id);
                        if (task) {
                            task.progress = savedTask.progress;
                            task.completed = savedTask.completed;
                            task.claimed = savedTask.claimed;
                        }
                    });
                }
            });
        }
        
        this.perSecond = this.shopItems.reduce((total, item) => {
            return total + (item.perSecond || 0) * item.count;
        }, 0);
        
        this.clickPower = 1 + this.shopItems.reduce((total, item) => {
            return total + (item.clickPower || 0) * item.count;
        }, 0);
        
        this.techTree.forEach(tech => {
            if (tech.purchased && tech.bonus) {
                if (tech.bonus.clickMultiplier) {
                    this.clickPower *= tech.bonus.clickMultiplier;
                }
                if (tech.bonus.perSecondMultiplier) {
                    this.perSecond *= tech.bonus.perSecondMultiplier;
                }
                if (tech.bonus.allMultiplier) {
                    this.clickPower *= tech.bonus.allMultiplier;
                    this.perSecond *= tech.bonus.allMultiplier;
                }
            }
        });
        
        const selectedSkin = this.skins.find(s => s.selected);
        if (selectedSkin) {
            const planet = document.getElementById('planet');
            const core = planet.querySelector('.planet-core');
            planet.style.background = `radial-gradient(circle, ${selectedSkin.gradient})`;
            core.style.background = `radial-gradient(circle, ${selectedSkin.coreColor})`;
        }
        
        this.updateStats();
        this.updatePlayTime();
        this.updateShop();
        this.updateAchievements();
        this.updateTechTree();
        this.updateSkins();
        this.updateTasks();
        this.updateDailyRewardPanel();
        this.saveGame();
    }

    shareScore() {
        const score = Math.floor(this.totalCrystalsEarned);
        const message = `我在「星际矿工」中累计获得了 ${this.formatNumber(score)} 水晶！快来挑战我吧！🚀`;
        
        if (navigator.share) {
            navigator.share({
                title: '星际矿工',
                text: message,
                url: window.location.href
            });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = message;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('成绩已复制到剪贴板！');
        }
    }

    startGameLoop() {
        setInterval(() => {
            let gain = this.perSecond;
            
            if (this.currentEvent && this.currentEvent.multiplier && this.currentEvent.id !== 'meteor_shower') {
                gain *= this.currentEvent.multiplier;
            }
            
            this.crystals += gain;
            this.totalCrystalsEarned += gain;
            
            this.updateTasksProgress('crystal', gain);
            this.updateTasksProgress('totalCrystal', gain);
            
            this.updateStats();
            this.updateShop();
            this.checkAchievements();
            this.checkEventEnd();
            this.checkSale();
            
            if (document.getElementById('stats-panel').classList.contains('active')) {
                this.updateStatsPanel();
            }
            
            if (document.getElementById('leaderboard-panel').classList.contains('active')) {
                this.updateLeaderboard();
            }
        }, 1000);
    }

    startTimer() {
        setInterval(() => {
            this.playTime++;
            this.updatePlayTime();
            this.updateTasksProgress('time', 1);
            this.checkAchievements();
        }, 1000);
    }

    updatePlayTime() {
        const hours = Math.floor(this.playTime / 3600);
        const minutes = Math.floor((this.playTime % 3600) / 60);
        const seconds = this.playTime % 60;
        
        const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('playTime').textContent = formatted;
    }

    startEventTimer() {
        setInterval(() => {
            if (!this.currentEvent && Math.random() < 0.005) {
                this.startRandomEvent();
            }
        }, 1000);
    }

    startRandomEvent() {
        const event = this.events[Math.floor(Math.random() * this.events.length)];
        this.currentEvent = { ...event };
        this.currentEvent.active = true;
        this.currentEvent.endTime = Date.now() + event.duration * 1000;
        
        this.showEventPanel();
    }

    showEventPanel() {
        const panel = document.getElementById('eventPanel');
        panel.innerHTML = `
            <div class="event-header">
                <div class="event-icon">${this.currentEvent.icon}</div>
                <div class="event-title">${this.currentEvent.name}</div>
            </div>
            <div class="event-desc">${this.currentEvent.desc}</div>
            <div class="event-progress">
                <div class="event-bar" id="eventBar" style="width: 100%"></div>
            </div>
            <div class="event-reward">剩余时间: <span id="eventTimer">${this.currentEvent.duration}</span>秒</div>
        `;
        
        const updateEvent = () => {
            if (!this.currentEvent) return;
            
            const remaining = Math.ceil((this.currentEvent.endTime - Date.now()) / 1000);
            document.getElementById('eventTimer').textContent = remaining;
            document.getElementById('eventBar').style.width = `${(remaining / this.currentEvent.duration) * 100}%`;
            
            if (remaining > 0) {
                setTimeout(updateEvent, 1000);
            }
        };
        
        updateEvent();
    }

    checkEventEnd() {
        if (this.currentEvent && Date.now() >= this.currentEvent.endTime) {
            this.currentEvent = null;
            document.getElementById('eventPanel').innerHTML = '';
        }
    }

    checkOfflineReward() {
        const saved = localStorage.getItem('idleGameSave');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.lastSaveTime) {
                const offlineSeconds = Math.floor((Date.now() - data.lastSaveTime) / 1000);
                const maxOfflineSeconds = 8 * 60 * 60;
                const effectiveSeconds = Math.min(offlineSeconds, maxOfflineSeconds);
                
                if (effectiveSeconds > 60) {
                    const offlineMultiplier = this.techTree.find(t => t.id === 'time_acceleration' && t.purchased) ? 1.5 : 1;
                    const reward = Math.floor(data.perSecond * effectiveSeconds * offlineMultiplier);
                    
                    document.getElementById('offlineTime').textContent = this.formatTime(effectiveSeconds);
                    document.getElementById('offlineReward').textContent = this.formatNumber(reward);
                    document.getElementById('offlineModal').classList.add('active');
                    
                    this.offlineReward = reward;
                }
            }
        }
    }

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}小时${minutes}分钟`;
        }
        return `${minutes}分钟`;
    }

    claimOfflineReward() {
        if (this.offlineReward) {
            this.crystals += this.offlineReward;
            this.totalCrystalsEarned += this.offlineReward;
            this.updateTasksProgress('crystal', this.offlineReward);
            this.updateTasksProgress('totalCrystal', this.offlineReward);
            this.updateStats();
            this.saveGame();
        }
        document.getElementById('offlineModal').classList.remove('active');
    }

    saveGame() {
        const saveData = {
            crystals: this.crystals,
            perSecond: this.perSecond,
            clickPower: this.clickPower,
            playTime: this.playTime,
            totalClicks: this.totalClicks,
            totalCrystalsEarned: this.totalCrystalsEarned,
            totalPurchases: this.totalPurchases,
            lastSaveTime: Date.now(),
            dailyStreak: this.dailyStreak,
            todayBonusClaimed: this.todayBonusClaimed,
            lastDailyRewardDate: this.lastDailyRewardDate,
            performanceMode: this.performanceMode,
            shopItems: this.shopItems.map(item => ({ id: item.id, count: item.count })),
            achievements: this.achievements.map(a => ({ id: a.id, unlocked: a.unlocked })),
            techTree: this.techTree.map(t => ({ id: t.id, purchased: t.purchased })),
            skins: this.skins.map(s => ({ id: s.id, unlocked: s.unlocked, selected: s.selected })),
            tasks: this.tasks,
        };
        
        localStorage.setItem('idleGameSave', JSON.stringify(saveData));
        this.saveLeaderboard();
    }

    loadGame() {
        const savedData = localStorage.getItem('idleGameSave');
        
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                
                this.crystals = data.crystals || 0;
                this.perSecond = data.perSecond || 0;
                this.clickPower = data.clickPower || 1;
                this.playTime = data.playTime || 0;
                this.totalClicks = data.totalClicks || 0;
                this.totalCrystalsEarned = data.totalCrystalsEarned || 0;
                this.totalPurchases = data.totalPurchases || 0;
                this.dailyStreak = data.dailyStreak || 0;
                this.todayBonusClaimed = data.todayBonusClaimed || false;
                this.lastDailyRewardDate = data.lastDailyRewardDate || '';
                this.performanceMode = data.performanceMode || false;
                
                const today = new Date().toDateString();
                if (this.lastDailyRewardDate !== today) {
                    this.todayBonusClaimed = false;
                }
                
                if (data.shopItems) {
                    data.shopItems.forEach(savedItem => {
                        const item = this.shopItems.find(i => i.id === savedItem.id);
                        if (item) {
                            item.count = savedItem.count;
                        }
                    });
                }
                
                if (data.achievements) {
                    data.achievements.forEach(saved => {
                        const achievement = this.achievements.find(a => a.id === saved.id);
                        if (achievement) {
                            achievement.unlocked = saved.unlocked;
                        }
                    });
                }
                
                if (data.techTree) {
                    data.techTree.forEach(saved => {
                        const tech = this.techTree.find(t => t.id === saved.id);
                        if (tech) {
                            tech.purchased = saved.purchased;
                        }
                    });
                }
                
                if (data.skins) {
                    data.skins.forEach(saved => {
                        const skin = this.skins.find(s => s.id === saved.id);
                        if (skin) {
                            skin.unlocked = saved.unlocked;
                            skin.selected = saved.selected;
                        }
                    });
                }
                
                if (data.tasks) {
                    Object.keys(data.tasks).forEach(tab => {
                        if (this.tasks[tab]) {
                            data.tasks[tab].forEach(savedTask => {
                                const task = this.tasks[tab].find(t => t.id === savedTask.id);
                                if (task) {
                                    task.progress = savedTask.progress;
                                    task.completed = savedTask.completed;
                                    task.claimed = savedTask.claimed;
                                }
                            });
                        }
                    });
                }
                
                this.perSecond = this.shopItems.reduce((total, item) => {
                    return total + (item.perSecond || 0) * item.count;
                }, 0);
                
                this.clickPower = 1 + this.shopItems.reduce((total, item) => {
                    return total + (item.clickPower || 0) * item.count;
                }, 0);
                
                this.techTree.forEach(tech => {
                    if (tech.purchased && tech.bonus) {
                        if (tech.bonus.clickMultiplier) {
                            this.clickPower *= tech.bonus.clickMultiplier;
                        }
                        if (tech.bonus.perSecondMultiplier) {
                            this.perSecond *= tech.bonus.perSecondMultiplier;
                        }
                        if (tech.bonus.allMultiplier) {
                            this.clickPower *= tech.bonus.allMultiplier;
                            this.perSecond *= tech.bonus.allMultiplier;
                        }
                    }
                });
                
                const selectedSkin = this.skins.find(s => s.selected);
                if (selectedSkin) {
                    const planet = document.getElementById('planet');
                    const core = planet.querySelector('.planet-core');
                    planet.style.background = `radial-gradient(circle, ${selectedSkin.gradient})`;
                    core.style.background = `radial-gradient(circle, ${selectedSkin.coreColor})`;
                }
                
                this.updateStats();
                this.updatePlayTime();
                
                if (this.performanceMode) {
                    document.getElementById('performanceBtn').textContent = '⚙️ 正常模式';
                    document.body.classList.add('performance-mode');
                }
            } catch (e) {
                console.error('Failed to load save:', e);
            }
        }
    }

    resetGame() {
        this.crystals = 0;
        this.perSecond = 0;
        this.clickPower = 1;
        this.playTime = 0;
        this.totalClicks = 0;
        this.totalCrystalsEarned = 0;
        this.totalPurchases = 0;
        this.dailyStreak = 0;
        this.todayBonusClaimed = false;
        this.lastDailyRewardDate = '';
        this.performanceMode = false;
        
        this.shopItems.forEach(item => item.count = 0);
        this.achievements.forEach(a => a.unlocked = false);
        this.techTree.forEach(t => t.purchased = false);
        this.skins.forEach(s => {
            s.unlocked = s.id === 'default';
            s.selected = s.id === 'default';
        });
        
        Object.keys(this.tasks).forEach(tab => {
            this.tasks[tab].forEach(task => {
                task.progress = 0;
                task.completed = false;
                task.claimed = false;
            });
        });
        
        localStorage.removeItem('idleGameSave');
        
        const planet = document.getElementById('planet');
        const core = planet.querySelector('.planet-core');
        planet.style.background = 'radial-gradient(circle, #4a3f6b 0%, #2d2544 50%, #1a152e 100%)';
        core.style.background = 'radial-gradient(circle, #ffd700 0%, #ff8c00 100%)';
        
        this.updateStats();
        this.updateShop();
        this.updateAchievements();
        this.updateTechTree();
        this.updateSkins();
        this.updateTasks();
        this.updateDailyRewardPanel();
        this.updatePlayTime();
        document.getElementById('eventPanel').innerHTML = '';
        document.getElementById('saleBanner').innerHTML = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new IdleGame();
});

setInterval(() => {
    const game = window.gameInstance;
    if (game) {
        game.saveGame();
    }
}, 10000);