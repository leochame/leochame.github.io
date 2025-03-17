// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查本地存储中是否有主题偏好
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // 应用保存的主题
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (document.querySelector('#theme-switch')) {
            document.querySelector('#theme-switch').checked = true;
        }
    }
    
    // 监听主题切换
    const themeSwitch = document.querySelector('#theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});