# -*- coding: utf-8 -*-
# Generated by Django 1.11.28 on 2020-04-07 21:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kanban', '0006_auto_20191117_1615'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='tag',
            field=models.CharField(choices=[('#BEE3F8', 'دانیال خسروی'), ('#FED7D7', 'علی گرم\u200cرودی'), ('#EDF2F7', 'مهدی فیروزیان'), ('#FEEBC8', 'عباس قادری'), ('#C6F6D5', 'علی محسنی'), ('#FED7E2', 'ابوذر غفاری')], default='#BEE3F8', max_length=7),
        ),
    ]
