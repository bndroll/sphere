FROM tensorflow/tensorflow:2.16.1

WORKDIR /app

RUN pip install --upgrade pip
RUN pip install virtualenv

RUN virtualenv venv
ENV VIRTUAL_ENV=/app/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ENV PYTHONUNBUFFERED=1

RUN pip install --ignore-installed blinker flask tensorflow_hub tensorflow_text

COPY . .

ENTRYPOINT ["python"]

CMD ["main.py"]