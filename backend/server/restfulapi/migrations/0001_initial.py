# Generated by Django 4.2.6 on 2024-10-18 05:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('userID', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=255, unique=True)),
                ('fullName', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('password_hash', models.TextField()),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('stocksID', models.AutoField(primary_key=True, serialize=False)),
                ('stockSymbol', models.CharField(max_length=10)),
                ('sharesOwned', models.DecimalField(decimal_places=2, max_digits=10)),
                ('purchasePrice', models.DecimalField(decimal_places=2, max_digits=10)),
                ('currentPrice', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restfulapi.user')),
            ],
        ),
        migrations.CreateModel(
            name='Saving',
            fields=[
                ('savingID', models.AutoField(primary_key=True, serialize=False)),
                ('goalName', models.CharField(max_length=255)),
                ('targetAmount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('currentAmount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restfulapi.user')),
            ],
        ),
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('loansID', models.AutoField(primary_key=True, serialize=False)),
                ('loanType', models.CharField(max_length=255)),
                ('principalAmount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('interestRate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('termMonths', models.IntegerField()),
                ('remainingBalance', models.DecimalField(decimal_places=2, max_digits=10)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restfulapi.user')),
            ],
        ),
        migrations.CreateModel(
            name='Budget',
            fields=[
                ('budgetID', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('totalAmount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('spentAmount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restfulapi.user')),
            ],
        ),
    ]