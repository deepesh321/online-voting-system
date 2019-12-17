from django.utils import timezone
from django.db import models
from organiser_app.models import *

# Create your models here.
class Gen(models.Model):
    party = models.CharField(unique=True, max_length=10)
    total = models.IntegerField(default='0')

    def __str__(self):
        return self.party + str(self.total)

class Feedback(models.Model):
    name = models.CharField(max_length=30, null=False, unique=True)
    feedback = models.CharField(max_length=300, null=False)
    rating=models.CharField(max_length=10,null=False)
    date=models.DateTimeField(default=timezone.now)

    def str(self):
        return self.name


class Report_data(models.Model):
    name1 = models.CharField(max_length=30, null=False)
    email = models.EmailField(max_length=40, null=False)
    report = models.CharField(max_length=300, null=False)
    rating=models.CharField(max_length=10,null=False)
    def str(self):
        return self.name1
