from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.template import loader
from django.utils import timezone
from django.template.defaulttags import register
from .models import Event, Busker

def search(request):
	return render(request, "search.html")
	
def viewBusker(request, user_id):
	# Stub to display an account page
	# if ACCOUNT PAGE IS LOGGED IN USER:
	# 	return render(request, 'myprofile.html')
	# else
	busker = Busker.objects.get(pk=user_id)
	if not busker:
		return render(request, 'buskerviewedit.html', { 'error_message': 'Busker not found.' })
	return render(request, 'buskerviewedit.html', { 'busker': busker, })

def map(request):
	# Display nearby buskers
	events = Event.objects.filter(event_datetime__lte=timezone.now())
	return render(request, 'map.html', { 'events': events })

def createEvent(request):
	if 'buskeremail' not in request.POST:
		return render(request, 'newevent.html')
	else:
		#buskeremail
		#title
		#desc
		#buskeremail
		#lat
		#lng
		#date
		#time
		busker = Busker.objects.get(email=request.post.get['buskeremail'])
		if not busker:
			return render(request, 'newevent.html', { 'error_message': 'Busker does not exist!' })
		try:
			event = Event(event_datetime=request.post.get['date'],
						  event_duration=request.post.get['time'],
						  event_title=request.post.get['title'],
						  event_desc=request.post.get['desc'],
						  event_lat=request.post.get['lat'],
						  event_lng=request.post.get['lng'],
						  busker=busker.pkl);
		except (KeyError):
			return render(request, 'newevent.html', { 'error_message': 'One or more fields were blank!' })
		else:
			event.save()
			return render(request, 'newevent.html', { 'error_message': 'Successfully created!' })
			
def createBusker(request):
	return render(request, 'newbusker.html')

def results(request):
    buskers = Busker.objects.filter(busker_name__icontains=request.POST.get('search'))
    if not buskers:
        return render(request, 'search.html', { 'error_message': 'No matches found. :(' })
    return render(request, 'searchresults.html', { 'buskers': buskers })