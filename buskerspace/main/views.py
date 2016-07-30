from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def search(request):
	# Display results here.
	return render(request, 'search.html')

def account(request):
	# Stub to display an account page
	# if ACCOUNT PAGE IS LOGGED IN USER:
	# 	return render(request, 'myprofile.html')
	# else
	return render(request, 'userprofile.html')

def map(request):
	# Display nearby buskers
	return render(request, 'map.html')
