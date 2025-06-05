/**
 * 粽子游戏 - 苹果风格
 * 一个简单的接粽子小游戏
 */

class ZongziGame {
    constructor() {
        // 游戏元素
        this.canvas = document.getElementById('zongzi-game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score-value');
        this.levelElement = document.getElementById('level-value');
        this.timeElement = document.getElementById('time-value');
        this.modalElement = document.getElementById('game-modal');
        this.modalScoreElement = document.getElementById('modal-score');
        this.modalMessageElement = document.getElementById('modal-message');
        
        // 游戏状态
        this.score = 0;
        this.level = 1;
        this.gameTime = 60; // 游戏时间（秒）
        this.timeLeft = this.gameTime;
        this.gameActive = false;
        this.gamePaused = false;
        this.gameInterval = null;
        this.zongziInterval = null;
        this.timeInterval = null;
        
        // 游戏配置
        this.basketWidth = 100;
        this.basketHeight = 60;
        this.basketX = 0;
        this.basketImage = new Image();
        this.basketImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTAwIDYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJiYXNrZXRHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkM3QjciIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGOTgwMCIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgCiAgICA8IS0tIEJhc2tldCBib2R5IC0tPgogICAgPHBhdGggZD0iTTEwLDIwIEMxMCw1MCw5MCw1MCw5MCwyMCBMOTAsNDAgQzkwLDUwLDEwLDUwLDEwLDQwIFoiIGZpbGw9InVybCgjYmFza2V0R3JhZGllbnQpIiBzdHJva2U9IiNFNjVDMDAiIHN0cm9rZS13aWR0aD0iMiIgLz4KICAgIAogICAgPCEtLSBCYXNrZXQgdG9wIGVkZ2UgLS0+CiAgICA8cGF0aCBkPSJNMTAsMjAgQzEwLDIwLDkwLDIwLDkwLDIwIiBzdHJva2U9IiNFNjVDMDAiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgCiAgICA8IS0tIEJhc2tldCBoYW5kbGUgLS0+CiAgICA8cGF0aCBkPSJNMzAsMjAgQzMwLDEwLDcwLDEwLDcwLDIwIiBzdHJva2U9IiNFNjVDMDAiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiAvPgogICAgCiAgICA8IS0tIEJhc2tldCBkZXRhaWxzIC0tPgogICAgPHBhdGggZD0iTTIwLDI1IEMyMCw0MCw4MCw0MCw4MCwyNSIgc3Ryb2tlPSIjRTY1QzAwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjUiIC8+CiAgICA8cGF0aCBkPSJNMjUsNDUgQzI1LDQ1LDc1LDQ1LDc1LDQ1IiBzdHJva2U9IiNFNjVDMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuNSIgLz4KPC9zdmc+Cg==';
        
        this.zongziWidth = 40;
        this.zongziHeight = 40;
        this.zongziSpeed = 3;
        this.zongziInterval = 1000; // 生成粽子的间隔（毫秒）
        this.zongziImage = new Image();
        this.zongziImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGVhZkdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzM4OEUzQyIgLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMkU3RDMyIiAvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJyaWNlR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjQTE4ODdGIiAvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM4RDZFNjMiIC8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIAogICAgPCEtLSDnspLlj7bog4zmnKwgLS0+CiAgICA8cGF0aCBkPSJNMjAsNCBMOCwyNCBMMjAsMzYgTDMyLDI0IFoiIGZpbGw9InVybCgjbGVhZkdyYWRpZW50KSIgLz4KICAgIDxwYXRoIGQ9Ik0yMSw1IEwxMCwyMyBMMjEsMzQgTDMxLDIzIFoiIGZpbGw9IiM0M0EwNDciIG9wYWNpdHk9IjAuNyIgLz4KICAgIAogICAgPCEtLSDnspLlrZDkuLvkvZMgLS0+CiAgICA8cGF0aCBkPSJNMTgsOCBMMTIsMjIgTDIwLDMyIEwyOCwyMiBaIiBmaWxsPSJ1cmwoI3JpY2VHcmFkaWVudCkiIC8+CiAgICAKICAgIDwhLS0g57KS57KSIC0tPgogICAgPHBhdGggZD0iTTIwLDQgQzE2LDEyIDEyLDE2IDgsMjQiIHN0cm9rZT0iI0Q3Q0NDOCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgIDxwYXRoIGQ9Ik0yMCw0IEMyNCwxMiAyOCwxNiAzMiwyNCIgc3Ryb2tlPSIjRDdDQ0M4IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgCiAgICA8IS0tIOe7k+e7kyAtLT4KICAgIDxjaXJjbGUgY3g9IjIwIiBjeT0iNCIgcj0iMiIgZmlsbD0iI0ExODg3RiIgLz4KPC9zdmc+Cg==';
        
        this.goldenZongziImage = new Image();
        this.goldenZongziImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGVhZkdvbGRHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzODhFM0MiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzJFN0QzMiIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icmljZUdvbGRHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkQzNEUiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGQzEwNyIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgCiAgICA8IS0tIOeykuWPtuiDjOacrCAtLT4KICAgIDxwYXRoIGQ9Ik0yMCw0IEw4LDI0IEwyMCwzNiBMMzIsMjQgWiIgZmlsbD0idXJsKCNsZWFmR29sZEdyYWRpZW50KSIgLz4KICAgIDxwYXRoIGQ9Ik0yMSw1IEwxMCwyMyBMMjEsMzQgTDMxLDIzIFoiIGZpbGw9IiM0M0EwNDciIG9wYWNpdHk9IjAuNyIgLz4KICAgIAogICAgPCEtLSDnspLlrZDkuLvkvZMgLS0+CiAgICA8cGF0aCBkPSJNMTgsOCBMMTIsMjIgTDIwLDMyIEwyOCwyMiBaIiBmaWxsPSJ1cmwoI3JpY2VHb2xkR3JhZGllbnQpIiAvPgogICAgCiAgICA8IS0tIOeykueykiAtLT4KICAgIDxwYXRoIGQ9Ik0yMCw0IEMxNiwxMiAxMiwxNiA4LDI0IiBzdHJva2U9IiNGRkQzNEUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgICA8cGF0aCBkPSJNMjAsNCBDMjQsMTIgMjgsMTYgMzIsMjQiIHN0cm9rZT0iI0ZGRDc0RSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgIAogICAgPCEtLSDnu5Pnu5MgLS0+CiAgICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjQiIHI9IjIiIGZpbGw9IiNGRkMxMDciIC8+CiAgICAKICAgIDwhLS0g6YeR5YWJ5pWI5p6cIC0tPgogICAgPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTAiIGZpbGw9IiNGRkMxMDciIGZpbGwtb3BhY2l0eT0iMC4yIiAvPgogICAgPHBhdGggZD0iTTE2LDE2IEwyNCwyNCBNMTYsMjQgTDI0LDE2IiBzdHJva2U9IiNGRkMxMDciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgo8L3N2Zz4K';
        
        this.fallingZongzis = [];
        
        // 绑定事件处理器
        this.bindEvents();
    }
    
    // 初始化游戏
    init() {
        // 设置画布尺寸
        this.resizeCanvas();
        
        // 重置游戏状态
        this.score = 0;
        this.level = 1;
        this.timeLeft = this.gameTime;
        this.fallingZongzis = [];
        this.zongziSpeed = 3;
        this.zongziInterval = 1000;
        
        // 更新UI
        this.updateUI();
        
        // 初始化篮子位置
        this.basketX = (this.canvas.width - this.basketWidth) / 2;
    }
    
    // 开始游戏
    start() {
        if (this.gameActive) return;
        
        this.init();
        this.gameActive = true;
        this.gamePaused = false;
        
        // 开始游戏循环
        this.gameInterval = setInterval(() => this.gameLoop(), 20);
        
        // 开始生成粽子
        this.startGeneratingZongzis();
        
        // 开始计时
        this.timeInterval = setInterval(() => this.updateTime(), 1000);
    }
    
    // 暂停游戏
    pause() {
        if (!this.gameActive || this.gamePaused) return;
        
        this.gamePaused = true;
        clearInterval(this.gameInterval);
        clearInterval(this.zongziInterval);
        clearInterval(this.timeInterval);
    }
    
    // 继续游戏
    resume() {
        if (!this.gameActive || !this.gamePaused) return;
        
        this.gamePaused = false;
        this.gameInterval = setInterval(() => this.gameLoop(), 20);
        this.startGeneratingZongzis();
        this.timeInterval = setInterval(() => this.updateTime(), 1000);
    }
    
    // 结束游戏
    end() {
        this.gameActive = false;
        clearInterval(this.gameInterval);
        clearInterval(this.zongziInterval);
        clearInterval(this.timeInterval);
        
        // 显示结束模态框
        this.showGameOverModal();
    }
    
    // 游戏主循环
    gameLoop() {
        this.update();
        this.render();
    }
    
    // 更新游戏状态
    update() {
        // 更新所有粽子位置
        for (let i = 0; i < this.fallingZongzis.length; i++) {
            const zongzi = this.fallingZongzis[i];
            zongzi.y += zongzi.speed;
            
            // 检查是否接住粽子
            if (this.checkCollision(zongzi)) {
                // 根据粽子类型增加分数
                if (zongzi.type === 'golden') {
                    this.score += 5;
                    this.playSound('golden');
                } else {
                    this.score += 1;
                    this.playSound('catch');
                }
                
                // 移除被接住的粽子
                this.fallingZongzis.splice(i, 1);
                i--;
                
                // 更新UI
                this.updateUI();
                
                // 检查是否升级
                this.checkLevelUp();
                continue;
            }
            
            // 检查是否落到地面
            if (zongzi.y > this.canvas.height) {
                // 移除落到地面的粽子
                this.fallingZongzis.splice(i, 1);
                i--;
                
                // 播放掉落音效
                this.playSound('miss');
            }
        }
    }
    
    // 渲染游戏画面
    render() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制背景
        this.drawBackground();
        
        // 绘制所有粽子
        for (const zongzi of this.fallingZongzis) {
            this.drawZongzi(zongzi);
        }
        
        // 绘制篮子
        this.drawBasket();
    }
    
    // 绘制背景
    drawBackground() {
        // 可以在这里添加背景绘制代码
    }
    
    // 绘制粽子
    drawZongzi(zongzi) {
        const image = zongzi.type === 'golden' ? this.goldenZongziImage : this.zongziImage;
        this.ctx.drawImage(image, zongzi.x, zongzi.y, this.zongziWidth, this.zongziHeight);
    }
    
    // 绘制篮子
    drawBasket() {
        this.ctx.drawImage(this.basketImage, this.basketX, this.canvas.height - this.basketHeight - 10, this.basketWidth, this.basketHeight);
    }
    
    // 生成粽子
    generateZongzi() {
        if (!this.gameActive || this.gamePaused) return;
        
        const x = Math.random() * (this.canvas.width - this.zongziWidth);
        const y = -this.zongziHeight;
        const type = Math.random() < 0.2 ? 'golden' : 'normal'; // 20%概率生成金色粽子
        const speed = this.zongziSpeed * (0.8 + Math.random() * 0.4); // 速度有一定随机性
        
        this.fallingZongzis.push({ x, y, type, speed });
    }
    
    // 开始生成粽子
    startGeneratingZongzis() {
        this.zongziInterval = setInterval(() => this.generateZongzi(), this.zongziInterval / this.level);
    }
    
    // 检查碰撞
    checkCollision(zongzi) {
        const basketTop = this.canvas.height - this.basketHeight - 10;
        const basketBottom = this.canvas.height - 10;
        
        return (
            zongzi.y + this.zongziHeight > basketTop &&
            zongzi.y < basketBottom &&
            zongzi.x + this.zongziWidth > this.basketX &&
            zongzi.x < this.basketX + this.basketWidth
        );
    }
    
    // 更新时间
    updateTime() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.updateUI();
        } else {
            this.end();
        }
    }
    
    // 检查是否升级
    checkLevelUp() {
        const newLevel = Math.floor(this.score / 10) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.zongziSpeed += 0.5;
            clearInterval(this.zongziInterval);
            this.startGeneratingZongzis();
            this.updateUI();
            this.playSound('levelup');
        }
    }
    
    // 更新UI
    updateUI() {
        this.scoreElement.textContent = this.score;
        this.levelElement.textContent = this.level;
        this.timeElement.textContent = this.timeLeft;
    }
    
    // 显示游戏结束模态框
    showGameOverModal() {
        this.modalScoreElement.textContent = this.score;
        
        // 根据分数设置不同的消息
        if (this.score >= 30) {
            this.modalMessageElement.textContent = '太厉害了！你是接粽子高手！';
        } else if (this.score >= 15) {
            this.modalMessageElement.textContent = '不错的表现！再接再厉！';
        } else {
            this.modalMessageElement.textContent = '继续努力，相信你可以做得更好！';
        }
        
        this.modalElement.classList.add('active');
    }
    
    // 隐藏游戏结束模态框
    hideGameOverModal() {
        this.modalElement.classList.remove('active');
    }
    
    // 播放音效
    playSound(type) {
        // 可以在这里添加音效播放代码
    }
    
    // 调整画布大小
    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }
    
    // 绑定事件
    bindEvents() {
        // 鼠标移动控制篮子
        this.canvas.addEventListener('mousemove', (e) => {
            if (!this.gameActive || this.gamePaused) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            
            // 限制篮子在画布范围内
            this.basketX = Math.max(0, Math.min(mouseX - this.basketWidth / 2, this.canvas.width - this.basketWidth));
        });
        
        // 触摸移动控制篮子（移动设备）
        this.canvas.addEventListener('touchmove', (e) => {
            if (!this.gameActive || this.gamePaused) return;
            e.preventDefault();
            
            const rect = this.canvas.getBoundingClientRect();
            const touchX = e.touches[0].clientX - rect.left;
            
            // 限制篮子在画布范围内
            this.basketX = Math.max(0, Math.min(touchX - this.basketWidth / 2, this.canvas.width - this.basketWidth));
        }, { passive: false });
        
        // 窗口大小改变时调整画布大小
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
        
        // 开始游戏按钮
        document.getElementById('start-button').addEventListener('click', () => {
            this.hideGameOverModal();
            this.start();
        });
        
        // 暂停/继续游戏按钮
        document.getElementById('pause-button').addEventListener('click', () => {
            if (this.gamePaused) {
                this.resume();
                document.getElementById('pause-button').textContent = '暂停游戏';
            } else {
                this.pause();
                document.getElementById('pause-button').textContent = '继续游戏';
            }
        });
        
        // 重新开始按钮（模态框中）
        document.getElementById('restart-button').addEventListener('click', () => {
            this.hideGameOverModal();
            this.start();
        });
    }
}

// 当页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    const game = new ZongziGame();
    
    // 初始化游戏但不自动开始
    game.init();
});