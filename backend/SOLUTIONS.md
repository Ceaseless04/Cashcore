--Downgrading Djongo---

pip install djongo==1.3.6
pip install "django>=3.2,<4.0"

----------------------------------------------------------------
---Check for pending migrations and apply them---

python manage.py makemigrations
python manage.py migrate
----------------------------------------------------------------
