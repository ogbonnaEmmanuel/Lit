from django.urls import path

from ProfilePage import views

urlpatterns = [
    path('', views.profile, name='profile'),
    path('user_links_info/', views.get_all_user_data, name='link_info'),
    path('settings/', views.settings, name='settings'),
    path('create_link/', views.create_link, name='create_link'),
    path('edit_alias/', views.edit_alias, name='edit_alias'),
    path('delete_alias/', views.delete_alias, name='delete_alias')
]
