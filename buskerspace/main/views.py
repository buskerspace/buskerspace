from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.utils import timezone
from django.template.defaulttags import register
from .models import Event, Busker, User

def search(request):
	# Display results here.
	try:
		matches = Busker.objects.filter(busker_name__icontains=request.POST['query'])
	except (KeyError):
		return render(request, "search.html")
	else:
		return render(request, 'results.html', { "matches": matches })

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

def login(request):
	# hacky log in
	user = User.objects.filter(email__iexact=request.GET.get('email'))
	if not user:
		user = User(email=request.GET.get('email'))
		user.save()
	else:
		user = user[0]
	request.session['id'] = user.pk;
	return HttpResponseRedirect('/')

def results(request):
