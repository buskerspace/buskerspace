from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.template import loader
from django.utils import timezone
from django.template.defaulttags import register
from django.contrib.auth.hashers import make_password
from .models import Event, Busker
from django.core.exceptions import ObjectDoesNotExist
import datetime
import time

def search(request):
	return render(request, "search.html")
	
def viewBusker(request, user_id):
	busker = Busker.objects.get(pk=user_id)
	events = Event.objects.filter(busker=user_id)
	if not busker:
		return render(request, 'buskerviewedit.html', { 'error_message': 'Busker not found.', })
		
	if 'email' not in request.POST:
		return render(request, 'buskerviewedit.html', { 'busker': busker, 'events': events, })
	
	b = Busker.objects.filter(email=request.POST.get('email'));
	if not b:
		return render(request, 'buskerviewedit.html', { 'error_message': 'Busker does not exist!', 'busker': busker, 'events': events })
		
	password = make_password(password=request.POST.get('password'), salt=None, hasher='unsalted_md5')
	b2 = Busker.objects.filter(pw_hash=password)
	if not b2 or not (b2[0].email == b[0].email):
		return render(request, 'buskerviewedit.html', { 'error_message': 'Invalid password or email', 'busker': busker, 'events': events })
	
	b = Busker.objects.get(pk=user_id)
	name = request.POST.get('name')
	genre = request.POST.get('genre')
	desc = request.POST.get('desc')
	
	if not name == "":
		b.busker_name = name
	if not genre == "":
		b.genre = genre
	if not desc == "":
		b.busker_desc = desc
		
	b.save()
	return render(request, 'buskerviewedit.html', { 'error_message': 'Success!', 'busker': busker, 'events': events })
	
def viewEvent(request, event_id):
	try:
		event = Event.objects.get(pk=event_id)
	except (ObjectDoesNotExist):
		return render(request, 'eventviewedit.html', { 'error_message': 'Event not found.', })
	
	if 'buskeremail' not in request.POST:
		return render(request, 'eventviewedit.html', { 'event': event, })
	
	busker = Busker.objects.filter(email=request.POST.get('buskeremail'))
	if not busker:
		return render(request, 'eventviewedit.html', { 'event': event, 'error_message': 'Busker does not exist!' })
		
	password = make_password(password=request.POST.get('password'), salt=None, hasher='unsalted_md5');
	b = Busker.objects.filter(pw_hash=password)
	if not b or not (b[0].email == busker[0].email):
		return render(request, 'eventviewedit.html', { 'error_message': 'Invalid password or email' })
		
	event = Event.objects.get(pk=event_id)
	title = request.POST.get('title')
	lat = request.POST.get('lat')
	lng = request.POST.get('lng')
	desc = request.POST.get('desc')
	date = request.POST.get('date')
	time = request.POST.get('time')
	duration = request.POST.get('duration')
	
	if not title == "":
		event.event_title = title;
	if not lat == "":
		event.event_lat = float(lat)
	if not lng == "":
		event.event_lng = float(lng)
	if not desc == "":
		event.event_desc = desc
	if not date == "" and not time == "":
		event.event_datetime = date + " " + time
	if not duration == "":
		event.duration = duraton;
		
	event.save()
	return render(request, 'eventviewedit.html', { 'event': event, 'error_message': 'Success!' })

def map(request):
	# Display nearby buskers
	events = Event.objects.filter(event_datetime__lte=timezone.now());
	ids = list()
	for event in events:
		hrs = int(event.event_duration)
		min = int(event.event_duration - hrs) * 60
		if event.event_datetime + timezone.timedelta(hours=hrs, minutes=min) < timezone.now():
			ids.append(event.pk)
	events = events.exclude(id__in=ids)
	
	lat = request.GET.get('lat')
	lng = request.GET.get('lng')
	if lat and lng:
		return render(request, 'map.html', { 'lat': lat, 'lng': lng })
	
	return render(request, 'map.html', { 'events': events })

def createEvent(request):
	if 'buskeremail' not in request.POST:
		return render(request, 'newevent.html')
	else:
		busker = Busker.objects.filter(email=request.POST.get('buskeremail'))
		if not busker:
			return render(request, 'newevent.html', { 'error_message': 'Busker does not exist!' })
		try:
			password = make_password(password=request.POST.get('password'), salt=None, hasher='unsalted_md5')
			b = Busker.objects.filter(pw_hash=password)
			if not b or not (b[0].email == busker[0].email):
				return render(request, 'newevent.html', { 'error_message': 'Invalid password or email' })
				
			event = Event(event_datetime=(request.POST.get('date') + " " + request.POST.get('time')),
						  event_duration=request.POST.get('duration'),
						  event_title=request.POST.get('title'),
						  event_desc=request.POST.get('desc'),
						  event_lat=request.POST.get('lat'),
						  event_lng=request.POST.get('lng'),
						  busker=busker[0]);
		except (KeyError):
			return render(request, 'newevent.html', { 'error_message': 'One or more fields were blank!' })
		else:
			event.save()
			return render(request, 'newevent.html', { 'error_message': 'Successfully created!' })
			
def createBusker(request):
	if 'email' not in request.POST:
		return render(request, 'newbusker.html')
		
	busker = Busker.objects.filter(email=request.POST.get('email'))
	if busker:
		return render(request, 'newbusker.html', { 'error_message': 'Email address already in use!' })
		
	try:
		name = request.POST.get('name')
		genre = request.POST.get('genre')
		desc = request.POST.get('desc')
		email = request.POST.get('email')
		pw = request.POST.get('password')
		pwConf = request.POST.get('passwordConf')
	except (KeyError):
		return render(request, 'newbusker.html', { 'error_message': 'One or more fields left blank!' })
		
	if pw != pwConf:
		return render(request, 'newbusker.html', { 'error_message': 'Passwords do not match!' })
	
	busker = Busker(email=email, pw_hash=make_password(password=pw, salt=None, hasher='unsalted_md5'), busker_desc=desc, busker_name=name, genre=genre)
	busker.save()
	return render(request, 'newbusker.html', { 'error_message': 'Success!' })

def results(request):
    buskers = Busker.objects.filter(busker_name__icontains=request.POST.get('search'))
    if not buskers:
        return render(request, 'search.html', { 'error_message': 'No matches found. :(' })
    return render(request, 'searchresults.html', { 'buskers': buskers })