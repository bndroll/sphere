# Используем официальный образ TensorFlow, который включает поддержку различных архитектур
FROM tensorflow/tensorflow:2.16.1

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Устанавливаем pip и необходимые зависимости
RUN pip install --upgrade pip
RUN pip install virtualenv

# Создаем виртуальное окружение
RUN virtualenv venv
ENV VIRTUAL_ENV=/app/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ENV PYTHONUNBUFFERED=1

# Устанавливаем зависимости в виртуальном окружении
RUN pip install --ignore-installed blinker flask tensorflow_hub tensorflow_text

# Копируем все файлы приложения в рабочую директорию контейнера
COPY . .

# Указываем команду, которая будет выполняться при запуске контейнера
ENTRYPOINT ["python"]

CMD ["main.py"]