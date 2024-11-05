FROM python:3.9-slim

WORKDIR /Cashcore/backend

RUN pip install --no-cache-dir -r /backend/requirements.txt

COPY backend/requirements.txt /Cashcore/backend/requiremetns.txt

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]