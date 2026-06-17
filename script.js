// Получаем элементы
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('nameInput');
const messageDiv = document.getElementById('message');

// Настройки Supabase (замените на свои)
const SUPABASE_URL = 'ВАШ_SUPABASE_URL';      // например, https://xxxxxx.supabase.co
const SUPABASE_KEY = 'ВАШ_SUPABASE_ANON_KEY'; // публичный ключ

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // не перезагружаем страницу

  const name = nameInput.value.trim();
  if (!name) {
    messageDiv.innerHTML = '<span style="color:#d32f2f;">Пожалуйста, введите имя.</span>';
    return;
  }

  // Отправляем данные в Supabase
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/participants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({ name: name })
    });

    if (response.ok) {
      messageDiv.innerHTML = '<span style="color:#2e7d32;">✅ Вы успешно зарегистрированы! Ждём вас в Кондуках.</span>';
      nameInput.value = '';
    } else {
      const error = await response.text();
      messageDiv.innerHTML = `<span style="color:#d32f2f;">❌ Ошибка при регистрации: ${error}</span>`;
    }
  } catch (err) {
    messageDiv.innerHTML = `<span style="color:#d32f2f;">❌ Ошибка соединения: ${err.message}</span>`;
  }
});
