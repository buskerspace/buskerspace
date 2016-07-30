from django.conf.urls import url
from . import views

app_name = 'main'
urlpatterns = [
	# path is /
	url(r'^$', views.map, name='map'),
	# path is /search/
	url(r'^search/', views.search, name='search'),
	# path is /profile/USER_ID/
	url(r'^profile/(?P<user_id>[0-9]+)/$', views.profile, name='profile'),
	# path is /new/event/
	url(r'^new/event/', views.createEvent, name="event"),
	# path is /new/busker/
	url(r'^new/busker/', views.createBusker, name="busker"),
	# path is /searchresults/
	url(r'^searchresults/', views.results, name="results")
]
