from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def map(request):
	return render(request, 'map.html')
