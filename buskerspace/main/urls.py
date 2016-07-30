from django.conf.urls import url
from . import views

app_name = 'main'
urlpatterns = [
	# path is /
	url(r'^$', views.map, name='map'),
	# path is /search/
	url(r'^search/', views.search, name='search'),
	# path is /view/busker/USER_ID/
	url(r'^view/busker/(?P<user_id>[0-9]+)/$', views.viewBusker, name='viewBusker'),
	# path is /new/event/
	url(r'^new/event/', views.createEvent, name="createEvent"),
	# path is /new/busker/
	url(r'^new/busker/', views.createBusker, name="createBusker"),
	# path is /searchresults/
	url(r'^searchresults/', views.results, name="results")
]
