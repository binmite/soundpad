// Существующий функционал для звуковых кнопок
document.querySelectorAll('.pad-button').forEach(button => {
  button.addEventListener('click', () => {
    const soundPath = button.dataset.sound;
    const audio = new Audio(soundPath);
    audio.play().catch(err => console.error("Ошибка воспроизведения:", err));
  });
});

// Новый функционал для секретного окна
document.addEventListener('DOMContentLoaded', function() {
  const mysteryTrigger = document.getElementById('mysteryTrigger');
  const modal = document.getElementById('mysteryModal');
  const closeBtn = document.getElementById('closeModal');
  const submitBtn = document.getElementById('submitPassword');
  const passwordInput = document.getElementById('passwordInput');
  const errorMessage = document.getElementById('errorMessage');
  const videoContainer = document.getElementById('videoContainer');
  const congratsVideo = document.getElementById('congratsVideo');
  const encryptedTextElement = document.getElementById('encryptedText');
  
  // ========== НАСТРОЙКИ ШИФРА ==========
  // Зашифрованное сообщение (то, что видит пользователь)
  const encryptedMessage = "ОЧ ЮНВ МЬЮЙК ЙБ ДЬЛКИЙЕФШ ИКЪ РЬИЕЗЕЪ";
  
  // Правильный ответ (то, что должен ввести пользователь)
  const CORRECT_PASSWORD = "ты всё равно не запомнишь мою фамилию";
  // ======================================
  
  // Устанавливаем зашифрованный текст в элемент
  encryptedTextElement.textContent = encryptedMessage;
  
  // Сохраняем зашифрованный текст для сброса
  const originalEncryptedText = encryptedMessage;
  
  // Открытие модального окна при клике на ???
  mysteryTrigger.addEventListener('click', () => {
    modal.style.display = 'block';
    // Сбрасываем поля при открытии
    passwordInput.value = '';
    errorMessage.textContent = '';
    videoContainer.classList.add('hidden');
    encryptedTextElement.textContent = originalEncryptedText;
    // Останавливаем видео, если оно было открыто
    if (congratsVideo) {
      congratsVideo.pause();
      congratsVideo.currentTime = 0;
    }
  });
  
  // Закрытие модального окна
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Закрытие по клику вне модального окна
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Обработка ввода пароля
  submitBtn.addEventListener('click', checkPassword);
  
  // Обработка нажатия Enter в поле ввода
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkPassword();
    }
  });
  
  function checkPassword() {
    const enteredPassword = passwordInput.value.trim().toLowerCase();
    
    // Для отладки - посмотрим в консоль
    console.log('Введено:', enteredPassword);
    console.log('Длина введенного:', enteredPassword.length);
    console.log('Ожидается:', CORRECT_PASSWORD);
    console.log('Длина ожидаемого:', CORRECT_PASSWORD.length);
    console.log('Совпадение:', enteredPassword === CORRECT_PASSWORD);
    
    if (enteredPassword === CORRECT_PASSWORD) {
      // Правильный пароль
      errorMessage.style.color = '#00ff00';
      errorMessage.textContent = '✓ Поздравляю! Ты расшифровал сообщение! 🎉';
      
      // Показываем расшифрованное сообщение (оригинал)
      encryptedTextElement.textContent = CORRECT_PASSWORD;
      
      // Показываем видео
      videoContainer.classList.remove('hidden');
      
      // Пытаемся воспроизвести видео
      congratsVideo.play().catch(err => {
        console.error("Ошибка воспроизведения видео:", err);
        errorMessage.textContent = 'Нажми на видео для воспроизведения';
      });
      
      // Очищаем поле ввода
      passwordInput.value = '';
    } else {
      // Неправильный пароль
      errorMessage.style.color = '#ff4444';
      errorMessage.textContent = '✗ Неверно! Попробуй расшифровать текст еще раз.';
      passwordInput.value = '';
      passwordInput.focus();
      
      // Эффект тряски для неверного пароля
      passwordInput.style.animation = 'shake 0.5s ease';
      setTimeout(() => {
        passwordInput.style.animation = '';
      }, 500);
    }
  }
});

// Добавляем анимацию тряски для неверного пароля
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);