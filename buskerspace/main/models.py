from __future__ import unicode_literals
<<<<<<< HEAD
from django.db import models


class User(models.Model):
    email = models.CharField(max_length=100)


class Event(models.Model):
    event_datetime = models.DateTimeField()
    event_title = models.CharField(max_length=200)
    event_desc = models.CharField(max_length=1000)
    busker = models.ForeignKey(Busker, on_delete=models.CASCADE)
    event_lat = models.DecimalField(max_digits=8, decimal_places=5)
    event_lng = models.DecimalField(max_digits=8, decimal_places=5)


class Busker(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    busker_desc = models.CharField(max_length=3000)
    genre = models.CharField(max_length=200)



class Following(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    busker = models.ForeignKey(Busker, on_delete=models.CASCADE)
    email = models.CharField(max_length=100)
    following =


=======

from django.db import models
>>>>>>> origin/master
