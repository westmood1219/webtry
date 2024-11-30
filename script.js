document.addEventListener('DOMContentLoaded', function() {
    // 获取按钮元素
    const changeColorBtn = document.getElementById('changeColorBtn');
    
    // 定义一些随机颜色
    const colors = ['#4CAF50', '#2196F3', '#f44336', '#9C27B0', '#FF9800'];
    let currentColorIndex = 0;

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

        // 获取深圳坪山的天气
        async getWeather() {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=Pingshan,Shenzhen,CN&appid=${this.apiKey}&units=metric&lang=zh_cn`,
                    {
                        mode: 'cors',
                        headers: {
                            'Accept': 'application/json'
                        }
                    }
                );
                
                if (!response.ok) {
                    throw new Error('Weather data fetch failed');
                }
                
                const data = await response.json();
                
                this.temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                this.descriptionElement.textContent = data.weather[0].description;
                this.locationElement.textContent = '深圳市坪山区';
                
                // 每30分钟更新一次天气
                setTimeout(() => this.getWeather(), 30 * 60 * 1000);
            } catch (error) {
                console.error('Error fetching weather:', error);
                this.temperatureElement.textContent = '--°C';
                this.descriptionElement.textContent = '获取天气失败';
                this.locationElement.textContent = '深圳市坪山区';
                
                // 如果失败，1分钟后重试
                setTimeout(() => this.getWeather(), 60 * 1000);
            }
        }
    };

    // 初始化天气小部件
    weatherWidget.getWeather();
});