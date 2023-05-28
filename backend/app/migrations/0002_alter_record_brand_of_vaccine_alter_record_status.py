# Generated by Django 4.1.5 on 2023-05-28 07:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='record',
            name='brand_of_vaccine',
            field=models.SmallIntegerField(choices=[(0, 'Comirnaty'), (1, 'CoronaVac')], default=0, null=True),
        ),
        migrations.AlterField(
            model_name='record',
            name='status',
            field=models.SmallIntegerField(choices=[(1, 'ACTIVE'), (0, 'INITIAL'), (3, 'DELETED'), (2, 'INACTIVE')], default=1, null=True),
        ),
    ]
