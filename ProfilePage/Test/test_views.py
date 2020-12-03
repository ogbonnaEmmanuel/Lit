from django.contrib.auth.models import User
from django.test import Client, TestCase
from django.urls import reverse

from HomePage.models import Link


class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.profile_url = reverse('profile')
        self.user_link_info_url = reverse('link_info')
        self.create_link_url = reverse('create_link')
        self.creator = User.objects.create(
            username='jason',
            password='the_mug',
            email='mug@gmail.com'
        )
        self.link = Link.objects.create(
            url='http://127.0.0.1:8000/add/',
            creator=self.creator,
            alias='add_web'
        )

    def test_profile_view(self):
        response = self.client.get(self.profile_url)
        self.assertEquals(response.status_code, 302)

    def test_total_links_created_by_a_user(self):
        user = User.objects.filter(username='jason').first()
        total_links = Link.objects.filter(creator=user).count()
        self.assertEquals(total_links, 1)

    def test_active_links_for_a_user(self):
        user = User.objects.filter(username='jason').first()
        active_links = Link.objects.filter(creator=user).filter(is_active=True).count()
        self.assertEquals(active_links, 0)

    def test_user_links_info(self):
        response = self.client.get(self.user_link_info_url)
        self.assertEquals(response.status_code, 302)

    def test_create_link_view(self):
        response = self.client.post(self.create_link_url, {
            'url': 'http://127.0.0.1:8000/add/',
            'alias': 'test_web'
        })
        print(response)
