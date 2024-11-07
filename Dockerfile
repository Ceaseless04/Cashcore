FROM python:3.9-slim

# Set the work directory to the root of your project
WORKDIR /app

# Install dependencies for psycopg2 and PostgreSQL
RUN apt-get update && \
    apt-get install -y libpq-dev gcc && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy all files to the container
COPY . /app

EXPOSE 8000

CMD ["python", "backend/server/manage.py", "runserver", "0.0.0.0:8000"]
