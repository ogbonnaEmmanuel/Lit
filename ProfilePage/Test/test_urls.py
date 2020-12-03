from django.test import SimpleTestCase
from django.urls import reverse, resolve

from ProfilePage.views import profile, get_all_user_data, settings, create_link


class TestUrls(SimpleTestCase):
    def test_profile_url(self):
        url = reverse('profile')
        self.assertEquals(resolve(url).func, profile)

    def test_user_links_info_url(self):
        url = reverse('link_info')
        self.assertEquals(resolve(url).func, get_all_user_data)

    def test_settings_url(self):
        url = reverse('settings')
        self.assertEquals(resolve(url).func, settings)

    def test_create_link_url(self):
        url = reverse('create_link')
        self.assertEquals(resolve(url).func, create_link)
