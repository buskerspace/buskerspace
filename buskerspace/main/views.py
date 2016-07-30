from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.utils import timezone
from django.template.defaulttags import register
from .models import Event, Busker

def search(request):
	return render(request, "search.html")
	
def profile(request, user_id):
	# Stub to display an account page
	# if ACCOUNT PAGE IS LOGGED IN USER:
	# 	return render(request, 'myprofile.html')
	# else
	return render(request, 'userprofile.html', { 'user_id': user_id, })

def map(request):
	# Display nearby buskers
	events = Event.objects.filter(event_datetime__lte=timezone.now())
	return render(request, 'map.html', { 'events': events })

def createEvent(request):
	if 'buskeremail' not in request.POST:
		return render(request, 'newevent.html')
	else:
		buskeremail
		titledesc
		buskeremail
		lat
		lng

def results(request):
    buskers = Busker.objects.filter(busker_name__icontains=request.POST.get('search'))
    return render(request, 'searchresults.html', { 'buskers': buskers })