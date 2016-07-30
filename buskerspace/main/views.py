from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def search(request):
	# Display results here.
	return render(request, 'search.html')

def myaccount(request):
	# Stub to display a user's own account page.
	return render(request, 'account.html', { 'my_page': True })
	
def account(request):
	return render(request, 'account.html')

def map(request):
	# Display nearby buskers
	return render(request, 'map.html')
