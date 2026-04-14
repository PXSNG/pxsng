# syntax=docker/dockerfile:1

FROM python:3.11-slim
WORKDIR /app

COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY src /app/src

CMD ["flask", "--app", "src/main.py", "run", "--host", "0.0.0.0", "--port", ${BACKEND_PORT:-3000}]

EXPOSE ${BACKEND_PORT:-3000}
