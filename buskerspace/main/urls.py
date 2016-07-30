from django.conf.urls import url
from . import views

app_name = 'main'
urlpatterns = [
	# e.g.: /main/
	url(r'^$', views.index, name='index'),
]
