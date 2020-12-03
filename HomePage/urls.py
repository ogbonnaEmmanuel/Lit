import django.contrib.auth.views as auth_views
from django.urls import path

from HomePage import views

urlpatterns = [
    path('', views.home, name='home'),
    path('sign_up/', views.sign_up, name='sign_up'),
    path('sign_in/', auth_views.LoginView.as_view(template_name='sign_in.html'), name='sign_in'),
    path('sign_out/', views.sign_out, name='sign_out'),
    path('me/<str:alias_url>/', views.unique_url_reversal, name='reverse_url')
]
