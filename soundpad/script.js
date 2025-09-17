document.querySelectorAll('.pad-button').forEach(button => {
  button.addEventListener('click', () => {
    const soundPath = button.dataset.sound;
    const audio = new Audio(soundPath);
    audio.play().catch(err => console.error("Ошибка воспроизведения:", err));
  });
});
