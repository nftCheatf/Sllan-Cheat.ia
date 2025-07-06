document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // FAQ аккордеон
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            answer.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });

    // Переключение валют
    const currencyButtons = {
        'currencyUah': { 
            button: document.getElementById('currencyUah'), 
            prices: document.querySelectorAll('.uah-price'), 
            others: ['.usd-price', '.rub-price'] 
        },
        'currencyUsd': { 
            button: document.getElementById('currencyUsd'), 
            prices: document.querySelectorAll('.usd-price'), 
            others: ['.uah-price', '.rub-price'] 
        },
        'currencyRub': { 
            button: document.getElementById('currencyRub'), 
            prices: document.querySelectorAll('.rub-price'), 
            others: ['.uah-price', '.usd-price'] 
        }
    };

    function switchCurrency(activeId) {
        // Обновляем кнопки
        for (const [id, data] of Object.entries(currencyButtons)) {
            if (data.button) {
                if (id === activeId) {
                    data.button.classList.remove('bg-gray-700');
                    data.button.classList.add('bg-blue-600');
                } else {
                    data.button.classList.remove('bg-blue-600');
                    data.button.classList.add('bg-gray-700');
                }
            }
        }

        // Обновляем цены
        for (const [id, data] of Object.entries(currencyButtons)) {
            if (id === activeId) {
                data.prices.forEach(price => price.classList.remove('hidden'));
                
                // Скрываем другие валюты
                data.others.forEach(otherClass => {
                    document.querySelectorAll(otherClass).forEach(el => el.classList.add('hidden'));
                });
            }
        }
    }

    // Инициализация валют
    if (currencyButtons.currencyUah.button) {
        switchCurrency('currencyUah');

        // Обработчики кликов
        document.getElementById('currencyUah').addEventListener('click', () => switchCurrency('currencyUah'));
        document.getElementById('currencyUsd').addEventListener('click', () => switchCurrency('currencyUsd'));
        document.getElementById('currencyRub').addEventListener('click', () => switchCurrency('currencyRub'));
    }

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню если открыто
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Анимация при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .price-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});