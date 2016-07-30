from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.utils import timezone

from .models import Event

def search(request):
	# Display results here.
	return render(request, 'search.html')

def profile(request, user_id):
	# Stub to display an account page
	# if ACCOUNT PAGE IS LOGGED IN USER:
	# 	return render(request, 'myprofile.html')
	# else
	return render(request, 'userprofile.html', { 'user_id': user_id, })

def map(request):
	# Display nearby buskers
	events = Event.objects.filter(event_datetime__lte=timezone.now())
	return render(request, 'map.html')
