/**
 * 粽子跳一跳游戏 - 苹果风格
 * 一个模仿微信跳一跳的粽子主题小游戏
 */

class ZongziJumpGame {
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
        this.timeInterval = null;
        this.jumpPower = 0;
        this.isCharging = false;
        this.chargeStartTime = 0;
        this.maxJumpPower = 100;
        this.jumpDirection = 0; // 0: 不跳, 1: 向右跳, -1: 向左跳
        
        // 游戏配置
        this.platformWidth = 80;
        this.platformHeight = 20;
        this.characterWidth = 40;
        this.characterHeight = 40;
        this.gravity = 0.5;
        this.jumpVelocity = 0;
        this.horizontalVelocity = 0;
        this.minPlatformDistance = 100;
        this.maxPlatformDistance = 200;
        this.platformSpeed = 1; // 平台移动速度
        
        // 游戏对象
        this.character = {
            x: 0,
            y: 0,
            width: this.characterWidth,
            height: this.characterHeight,
            isJumping: false,
            isFalling: false,
            rotation: 0
        };
        
        this.platforms = [];
        this.currentPlatformIndex = 0;
        
        // 加载图像
        this.characterImage = new Image();
        this.characterImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGVhZkdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzM4OEUzQyIgLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMkU3RDMyIiAvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJyaWNlR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjQTE4ODdGIiAvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM4RDZFNjMiIC8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIAogICAgPCEtLSDnspLlj7bog4zmnKwgLS0+CiAgICA8cGF0aCBkPSJNMjAsNCBMOCwyNCBMMjAsMzYgTDMyLDI0IFoiIGZpbGw9InVybCgjbGVhZkdyYWRpZW50KSIgLz4KICAgIDxwYXRoIGQ9Ik0yMSw1IEwxMCwyMyBMMjEsMzQgTDMxLDIzIFoiIGZpbGw9IiM0M0EwNDciIG9wYWNpdHk9IjAuNyIgLz4KICAgIAogICAgPCEtLSDnspLlrZDkuLvkvZMgLS0+CiAgICA8cGF0aCBkPSJNMTgsOCBMMTIsMjIgTDIwLDMyIEwyOCwyMiBaIiBmaWxsPSJ1cmwoI3JpY2VHcmFkaWVudCkiIC8+CiAgICAKICAgIDwhLS0g57KS57KSIC0tPgogICAgPHBhdGggZD0iTTIwLDQgQzE2LDEyIDEyLDE2IDgsMjQiIHN0cm9rZT0iI0Q3Q0NDOCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICAgIDxwYXRoIGQ9Ik0yMCw0IEMyNCwxMiAyOCwxNiAzMiwyNCIgc3Ryb2tlPSIjRDdDQ0M4IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogICAgCiAgICA8IS0tIOe7k+e7kyAtLT4KICAgIDxjaXJjbGUgY3g9IjIwIiBjeT0iNCIgcj0iMiIgZmlsbD0iI0ExODg3RiIgLz4KPC9zdmc+Cg==';
        
        this.platformImage = new Image();
        this.platformImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA4MCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icGxhdGZvcm1HcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzODhFM0MiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzJFN0QzMiIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgCiAgICA8IS0tIOW5s+WPsCAtLT4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIyMCIgcng9IjUiIHJ5PSI1IiBmaWxsPSJ1cmwoI3BsYXRmb3JtR3JhZGllbnQpIiAvPgogICAgCiAgICA8IS0tIOW5s+WPsOe6uOiJsiAtLT4KICAgIDxyZWN0IHg9IjUiIHk9IjUiIHdpZHRoPSI3MCIgaGVpZ2h0PSI1IiByeD0iMiIgcnk9IjIiIGZpbGw9IiM0M0EwNDciIG9wYWNpdHk9IjAuNyIgLz4KPC9zdmc+Cg==';
        
        this.goldenPlatformImage = new Image();
        this.goldenPlatformImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA4MCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ29sZFBsYXRmb3JtR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRkZEMzRFIiAvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkMxMDciIC8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIAogICAgPCEtLSDlubPlj7AgLS0+CiAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iODAiIGhlaWdodD0iMjAiIHJ4PSI1IiByeT0iNSIgZmlsbD0idXJsKCNnb2xkUGxhdGZvcm1HcmFkaWVudCkiIC8+CiAgICAKICAgIDwhLS0g5bmz5Y+w57q46ImyIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjUiIHJ4PSIyIiByeT0iMiIgZmlsbD0iI0ZGRTg4MiIgb3BhY2l0eT0iMC43IiAvPgogICAgCiAgICA8IS0tIOmHkeWFieaViOaenCAtLT4KICAgIDxjaXJjbGUgY3g9IjIwIiBjeT0iMTAiIHI9IjMiIGZpbGw9IiNGRkYiIG9wYWNpdHk9IjAuOCIgLz4KICAgIDxjaXJjbGUgY3g9IjQwIiBjeT0iMTAiIHI9IjMiIGZpbGw9IiNGRkYiIG9wYWNpdHk9IjAuOCIgLz4KICAgIDxjaXJjbGUgY3g9IjYwIiBjeT0iMTAiIHI9IjMiIGZpbGw9IiNGRkYiIG9wYWNpdHk9IjAuOCIgLz4KPC9zdmc+Cg==';
        
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
        this.platforms = [];
        this.currentPlatformIndex = 0;
        this.jumpPower = 0;
        this.isCharging = false;
        
        // 创建初始平台
        this.createInitialPlatforms();
        
        // 放置角色在第一个平台上
        this.character.x = this.platforms[0].x + (this.platformWidth - this.characterWidth) / 2;
        this.character.y = this.platforms[0].y - this.characterHeight;
        this.character.isJumping = false;
        this.character.isFalling = false;
        this.character.rotation = 0;
        
        // 更新UI
        this.updateUI();
    }
    
    // 创建初始平台
    createInitialPlatforms() {
        // 清空现有平台
        this.platforms = [];
        
        // 创建第一个平台在画布中央偏左
        const firstPlatformX = this.canvas.width / 3 - this.platformWidth / 2;
        const firstPlatformY = this.canvas.height - 100;
        this.platforms.push({
            x: firstPlatformX,
            y: firstPlatformY,
            width: this.platformWidth,
            height: this.platformHeight,
            type: 'normal'
        });
        
        // 创建第二个平台在右侧
        const distance = this.minPlatformDistance + Math.random() * (this.maxPlatformDistance - this.minPlatformDistance);
        const secondPlatformX = firstPlatformX + distance;
        const secondPlatformY = firstPlatformY + (Math.random() * 40 - 20); // 高度有轻微变化
        this.platforms.push({
            x: secondPlatformX,
            y: secondPlatformY,
            width: this.platformWidth,
            height: this.platformHeight,
            type: Math.random() < 0.3 ? 'golden' : 'normal' // 30%概率生成金色平台
        });
    }
    
    // 创建新平台
    createNewPlatform() {
        const lastPlatform = this.platforms[this.platforms.length - 1];
        const distance = this.minPlatformDistance + Math.random() * (this.maxPlatformDistance - this.minPlatformDistance);
        const newPlatformX = lastPlatform.x + distance;
        const newPlatformY = lastPlatform.y + (Math.random() * 40 - 20); // 高度有轻微变化
        
        // 确保平台不会太高或太低
        const adjustedY = Math.max(
            Math.min(newPlatformY, this.canvas.height - 50),
            this.canvas.height - 150
        );
        
        this.platforms.push({
            x: newPlatformX,
            y: adjustedY,
            width: this.platformWidth,
            height: this.platformHeight,
            type: Math.random() < 0.3 ? 'golden' : 'normal' // 30%概率生成金色平台
        });
    }
    
    // 开始游戏
    start() {
        if (this.gameActive) return;
        
        this.init();
        this.gameActive = true;
        this.gamePaused = false;
        
        // 开始游戏循环
        this.gameInterval = setInterval(() => this.gameLoop(), 20);
        
        // 开始计时
        this.timeInterval = setInterval(() => this.updateTime(), 1000);
    }
    
    // 暂停游戏
    pause() {
        if (!this.gameActive || this.gamePaused) return;
        
        this.gamePaused = true;
        clearInterval(this.gameInterval);
        clearInterval(this.timeInterval);
    }
    
    // 继续游戏
    resume() {
        if (!this.gameActive || !this.gamePaused) return;
        
        this.gamePaused = false;
        this.gameInterval = setInterval(() => this.gameLoop(), 20);
        this.timeInterval = setInterval(() => this.updateTime(), 1000);
    }
    
    // 结束游戏
    end() {
        this.gameActive = false;
        clearInterval(this.gameInterval);
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
        // 如果正在蓄力跳跃
        if (this.isCharging) {
            const chargeDuration = Date.now() - this.chargeStartTime;
            this.jumpPower = Math.min(chargeDuration / 20, this.maxJumpPower);
            return;
        }
        
        // 如果角色正在跳跃或下落
        if (this.character.isJumping || this.character.isFalling) {
            // 应用重力
            this.jumpVelocity += this.gravity;
            
            // 更新角色位置
            this.character.y += this.jumpVelocity;
            this.character.x += this.horizontalVelocity;
            
            // 更新角色旋转
            this.character.rotation += this.horizontalVelocity * 0.05;
            
            // 检查是否落在平台上
            for (let i = 0; i < this.platforms.length; i++) {
                const platform = this.platforms[i];
                
                if (this.checkLanding(platform)) {
                    // 角色落在平台上
                    this.character.isJumping = false;
                    this.character.isFalling = false;
                    this.character.y = platform.y - this.characterHeight;
                    this.character.rotation = 0;
                    this.jumpVelocity = 0;
                    this.horizontalVelocity = 0;
                    
                    // 如果落在新平台上，增加分数
                    if (i > this.currentPlatformIndex) {
                        this.currentPlatformIndex = i;
                        
                        // 根据平台类型增加分数
                        if (platform.type === 'golden') {
                            this.score += 5;
                            this.playSound('golden');
                        } else {
                            this.score += 1;
                            this.playSound('jump');
                        }
                        
                        // 更新UI
                        this.updateUI();
                        
                        // 检查是否升级
                        this.checkLevelUp();
                        
                        // 创建新平台
                        this.createNewPlatform();
                        
                        // 移动视图
                        this.moveView();
                    }
                    
                    break;
                }
            }
            
            // 检查是否掉出画布
            if (this.character.y > this.canvas.height) {
                this.playSound('fall');
                this.end();
            }
        }
    }
    
    // 移动视图（平台向左移动）
    moveView() {
        // 计算需要移动的距离
        const currentPlatform = this.platforms[this.currentPlatformIndex];
        const targetX = currentPlatform.x - this.canvas.width / 3;
        
        // 移动所有平台和角色
        for (const platform of this.platforms) {
            platform.x -= targetX;
        }
        this.character.x -= targetX;
        
        // 移除已经移出画布的平台
        this.platforms = this.platforms.filter(platform => platform.x + this.platformWidth > -100);
    }
    
    // 检查角色是否落在平台上
    checkLanding(platform) {
        return (
            this.character.isFalling &&
            this.jumpVelocity > 0 &&
            this.character.y + this.characterHeight >= platform.y &&
            this.character.y + this.characterHeight <= platform.y + platform.height + 10 &&
            this.character.x + this.characterWidth / 2 >= platform.x &&
            this.character.x + this.characterWidth / 2 <= platform.x + platform.width
        );
    }
    
    // 开始蓄力跳跃
    startCharging() {
        if (!this.gameActive || this.gamePaused || this.character.isJumping || this.character.isFalling) return;
        
        this.isCharging = true;
        this.chargeStartTime = Date.now();
        this.jumpPower = 0;
    }
    
    // 释放跳跃
    releaseJump() {
        if (!this.isCharging) return;
        
        this.isCharging = false;
        
        // 计算跳跃力度和方向
        const jumpStrength = this.jumpPower / 100 * 15; // 最大跳跃力度
        
        // 设置跳跃速度
        this.jumpVelocity = -jumpStrength;
        this.horizontalVelocity = jumpStrength * this.jumpDirection;
        
        // 开始跳跃
        this.character.isJumping = true;
        this.character.isFalling = true;
        
        // 播放跳跃音效
        this.playSound('charge');
    }
    
    // 设置跳跃方向
    setJumpDirection(direction) {
        this.jumpDirection = direction;
    }
    
    // 渲染游戏画面
    render() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制背景
        this.drawBackground();
        
        // 绘制所有平台
        for (const platform of this.platforms) {
            this.drawPlatform(platform);
        }
        
        // 绘制角色
        this.drawCharacter();
        
        // 如果正在蓄力，绘制力度条
        if (this.isCharging) {
            this.drawPowerBar();
        }
    }
    
    // 绘制背景
    drawBackground() {
        // 绘制渐变背景
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, 'rgba(52, 199, 89, 0.2)');
        gradient.addColorStop(1, 'rgba(52, 199, 89, 0.05)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // 绘制平台
    drawPlatform(platform) {
        const image = platform.type === 'golden' ? this.goldenPlatformImage : this.platformImage;
        this.ctx.drawImage(image, platform.x, platform.y, platform.width, platform.height);
    }
    
    // 绘制角色
    drawCharacter() {
        this.ctx.save();
        
        // 设置旋转中心点为角色中心
        const centerX = this.character.x + this.characterWidth / 2;
        const centerY = this.character.y + this.characterHeight / 2;
        
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(this.character.rotation);
        this.ctx.translate(-centerX, -centerY);
        
        // 绘制角色
        this.ctx.drawImage(
            this.characterImage,
            this.character.x,
            this.character.y,
            this.characterWidth,
            this.characterHeight
        );
        
        this.ctx.restore();
    }
    
    // 绘制力度条
    drawPowerBar() {
        const barWidth = 200;
        const barHeight = 20;
        const barX = (this.canvas.width - barWidth) / 2;
        const barY = this.canvas.height - 50;
        
        // 绘制背景
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // 绘制力度
        const powerWidth = (this.jumpPower / this.maxJumpPower) * barWidth;
        
        // 根据力度变化颜色
        const powerRatio = this.jumpPower / this.maxJumpPower;
        let barColor;
        
        if (powerRatio < 0.3) {
            barColor = '#4CAF50'; // 绿色
        } else if (powerRatio < 0.7) {
            barColor = '#FFC107'; // 黄色
        } else {
            barColor = '#F44336'; // 红色
        }
        
        this.ctx.fillStyle = barColor;
        this.ctx.fillRect(barX, barY, powerWidth, barHeight);
        
        // 绘制边框
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(barX, barY, barWidth, barHeight);
        
        // 绘制方向指示器
        const arrowSize = 15;
        const arrowY = barY - arrowSize - 5;
        
        this.ctx.fillStyle = this.jumpDirection > 0 ? '#4CAF50' : '#F44336';
        this.ctx.beginPath();
        
        if (this.jumpDirection > 0) {
            // 向右箭头
            this.ctx.moveTo(barX + barWidth / 2 + 20, arrowY);
            this.ctx.lineTo(barX + barWidth / 2 + 20 + arrowSize, arrowY + arrowSize / 2);
            this.ctx.lineTo(barX + barWidth / 2 + 20, arrowY + arrowSize);
        } else {
            // 向左箭头
            this.ctx.moveTo(barX + barWidth / 2 - 20, arrowY);
            this.ctx.lineTo(barX + barWidth / 2 - 20 - arrowSize, arrowY + arrowSize / 2);
            this.ctx.lineTo(barX + barWidth / 2 - 20, arrowY + arrowSize);
        }
        
        this.ctx.closePath();
        this.ctx.fill();
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
            this.minPlatformDistance += 10;
            this.maxPlatformDistance += 10;
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
            this.modalMessageElement.textContent = '太厉害了！你是粽子跳跃高手！';
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
        // 鼠标按下开始蓄力
        this.canvas.addEventListener('mousedown', (e) => {
            if (!this.gameActive || this.gamePaused) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            
            // 根据点击位置决定跳跃方向
            if (mouseX < this.canvas.width / 2) {
                this.setJumpDirection(-1); // 向左跳
            } else {
                this.setJumpDirection(1); // 向右跳
            }
            
            this.startCharging();
        });
        
        // 鼠标释放跳跃
        this.canvas.addEventListener('mouseup', () => {
            if (!this.gameActive || this.gamePaused) return;
            this.releaseJump();
        });
        
        // 触摸开始蓄力（移动设备）
        this.canvas.addEventListener('touchstart', (e) => {
            if (!this.gameActive || this.gamePaused) return;
            e.preventDefault();
            
            const rect = this.canvas.getBoundingClientRect();
            const touchX = e.touches[0].clientX - rect.left;
            
            // 根据触摸位置决定跳跃方向
            if (touchX < this.canvas.width / 2) {
                this.setJumpDirection(-1); // 向左跳
            } else {
                this.setJumpDirection(1); // 向右跳
            }
            
            this.startCharging();
        }, { passive: false });
        
        // 触摸结束跳跃（移动设备）
        this.canvas.addEventListener('touchend', (e) => {
            if (!this.gameActive || this.gamePaused) return;
            e.preventDefault();
            this.releaseJump();
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
                document.getElementById('pause-button').innerHTML = '<i class="bi bi-pause-fill"></i> 暂停游戏';
            } else {
                this.pause();
                document.getElementById('pause-button').innerHTML = '<i class="bi bi-play-fill"></i> 继续游戏';
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
    const game = new ZongziJumpGame();
    
    // 初始化游戏但不自动开始
    game.init();
});