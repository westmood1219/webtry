document.addEventListener('DOMContentLoaded', function() {
    // 获取按钮元素
    const changeColorBtn = document.getElementById('changeColorBtn');
    
    // 定义一些随机颜色
    const colors = ['#4CAF50', '#2196F3', '#f44336', '#9C27B0', '#FF9800'];
    let currentColorIndex = 0;

    // 为按钮添加点击事件
    changeColorBtn.addEventListener('click', function() {
        // 更改页眉背景颜色
        const header = document.querySelector('header');
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        header.style.backgroundColor = colors[currentColorIndex];
        
        // 同时更新按钮颜色
        this.style.backgroundColor = colors[currentColorIndex];
    });

    // 添加简单的页面加载动画
    const main = document.querySelector('main');
    main.style.opacity = 0;
    setTimeout(() => {
        main.style.transition = 'opacity 1s ease-in';
        main.style.opacity = 1;
    }, 100);
});