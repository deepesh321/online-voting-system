from django.test import TestCase as django_test_case
from unittest import TestCase as unit_test_case
from django.test import Client,TestCase
from django.contrib.auth.models import User

class EvotingUrl(TestCase):

    def setUp(self):
        self.createadmin = User.objects.create_user(username = "test user", email = "test@gmail.com", password = "test password")
        self.client = None
        self.request_url = '/evoting/election/2'


    def test_anonymous_ping(self):
        self.client = Client()
        response = self.client.get(self.request_url)

        self.assertEqual(response.status_code,200)

    def test_authenticated_ping(self):
        self.client = Client()
        self.client.force_login(self.createadmin)
        response = self.client.get(self.request_url)
        self.assertEqual(response.status_code, 200)

    def test_anonymous_random_id_ping(self):
        self.client = Client()
        response = self.client.get('/evoting/election/2')
        self.assertEqual(response.status_code, 404)



    def test_authenticated_random_id_ping(self):
        self.client = Client()
        self.client.force_login(self.createadmin)
        response = self.client.get('/evoting/election/2')
        self.assertEqual(response.status_code, 404)
