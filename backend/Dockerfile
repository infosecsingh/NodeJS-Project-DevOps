FROM python:3.15.0a7-alpine3.22

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

COPY . . 

EXPOSE 5000

ENTRYPOINT ["python", "app.py"]

