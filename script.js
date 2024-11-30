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

    // 天气功能
    const weatherWidget = {
        apiKey: '4d8fb5b93d4af21d66a2948710284366', // OpenWeatherMap API 密钥
        temperatureElement: document.getElementById('temperature'),
        descriptionElement: document.getElementById('weather-description'),
        locationElement: document.getElementById('location'),

        // 获取位置
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => this.getWeather(position.coords.latitude, position.coords.longitude),
                    error => {
                        console.error('Error getting location:', error);
                        this.locationElement.textContent = '无法获取位置';
                    }
                );
            } else {
                this.locationElement.textContent = '浏览器不支持地理定位';
            }
        },

        // 获取天气数据
        async getWeather(lat, lon) {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=zh_cn`
                );
                const data = await response.json();
                
                this.temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                this.descriptionElement.textContent = data.weather[0].description;
                this.locationElement.textContent = data.name;
            } catch (error) {
                console.error('Error fetching weather:', error);
                this.temperatureElement.textContent = '--°C';
                this.descriptionElement.textContent = '获取天气失败';
            }
        }
    };

    // 初始化天气小部件
    weatherWidget.getLocation();
});