from __future__ import unicode_literals
from django.db import models

class Busker(models.Model):
    email = models.CharField(default="johnsmith@hyperglobomega.net", max_length=100)
    pw_hash = models.CharField(default='', max_length=32)
    busker_desc = models.CharField(max_length=3000)
    busker_name = models.CharField(max_length=100)
    genre = models.CharField(max_length=200)
    def __str__(self):
        return "%s: %s" % (self.busker_name, self.busker_desc)

class Event(models.Model):
    event_datetime = models.DateTimeField()
    event_duration = models.DecimalField(default=1.0, max_digits=3, decimal_places=1)
    event_title = models.CharField(max_length=200)
    event_desc = models.CharField(max_length=1000)
    busker = models.ForeignKey(Busker, on_delete=models.CASCADE)
    event_lat = models.DecimalField(max_digits=8, decimal_places=5)
    event_lng = models.DecimalField(max_digits=8, decimal_places=5)
    def __str__(self):
        return self.event_title + " at " + str(self.event_datetime) + ": %s" % self.event_desc
