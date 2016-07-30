from django.conf.urls import url
from . import views

app_name = 'main'
urlpatterns = [
	# path is /
	url(r'^$', views.map, name='map'),
]
