from django.test import TestCase, Client
from django.contrib.auth.models import User
from evoting.models import *
import datetime


class HomeUrlTesting(TestCase):
    def setUp(self):
        # Creating a dummy database...
        self.dummyUser = User.objects.create_user(username="anonymous", email="strange@st.com", password="sutorenja321")
        Voters_Profile.objects.create(voterId='NOYB', voter_dob=datetime.date(2000, 12, 12),
                                                     region='0', user=self.dummyUser)
        # Setting up a client...
        self.client = None
        self.request_url = '/evoting/home/'

    def test_AnonymousPing(self):
        self.client = Client()
        response = self.client.get(self.request_url)

        # Testing the Url...
        self.assertEqual(response.status_code, 200)

    def test_AuthenticatedPing(self):
        self.client = Client()
        self.client.force_login(self.dummyUser)
        response = self.client.get(self.request_url)

        if hasattr(self.dummyUser, 'voters_profile'):
            self.assertEqual(response.status_code, 200)
        else:
            self.assertRedirects(response, expected_url='/organiser_app/index1/')

    def test_AuthenticatedRandomIdPing(self):
        self.client = Client()
        self.client.force_login(self.dummyUser)
        response = self.client.get('/evoting/home/blank')

        self.assertEqual(response.status_code, 404)


class RegistrationUrlTest(TestCase):

    def setUp(self):
        # Creating a dummy database...
        self.dummyUser = User.objects.create_user(username="anonymous", email="strange@st.com", password="sutorenja321")
        Voters_Profile.objects.create(voterId='NOYB', voter_dob=datetime.date(2000, 12, 12),
                                      region='0', user=self.dummyUser)
        self.client = None
        # Registration page url...
        self.request_url = '/evoting/register/'

    def test_AnonymousPing(self):
        self.client = Client()
        response = self.client.get(self.request_url)

        self.assertEqual(response.status_code, 200)

    def test_AuthenticatedPing(self):
        self.client = Client()
        self.client.force_login(self.dummyUser)
        response = self.client.get(self.request_url)

        self.assertEqual(response.status_code, 302)

    def test_AuthenticatedRandomIdPing(self):
        self.client = Client()
        self.client.force_login(self.dummyUser)
        response = self.client.get('evoting/register/blank')

        self.assertEqual(response.status_code, 404)


class VoterLoginTesting(TestCase):

    def setUp(self):
        self.dummyUser = User.objects.create_user(username="anonymous", email="none@ne.com", password="sutorenja321")
        Voters_Profile.objects.create(voterId='NOYB', voter_dob=datetime.date(2000, 12, 12),
                                      region='0', user=self.dummyUser)
        self.client = None
        self.request_url = '/evoting/voter_login/'

    def test_AnonymousPing(self):
        self.client = Client()
        response = self.client.get(self.request_url)

        self.assertEqual(response.status_code, 200)

    def test_AuthenticatedPing(self):
        self.client = Client()
        self.client.force_login(self.dummyUser)
        response = self.client.get(self.request_url)

        self.assertEqual(response.status_code, 302)

    def test_AuthenticatedRandomIdPing(self):
        self.client = Client()
        self.client.force_login(self.dummyUser)
        response = self.client.get('evoting/voter_login/blank')

        self.assertEqual(response.status_code, 404)


class OrganiserLoginTesting(TestCase):

    def setUp(self):
        self.dummyUser = User.objects.create_user(username="anonymous", email="none@ne.com", password="sutorenja321")
        Voters_Profile.objects.create(voterId='NOYB', voter_dob=datetime.date(2000, 12, 12),
                                      region='0', user=self.dummyUser)
        self.client = None
        self.request_url = '/evoting/organiser_login/'

    def test_AnonymousPing(self):
        self.client = Client()
        response = self.client.get(self.request_url)

        self.assertEqual(response.status_code, 200)

    def test_AuthenticatedPing(self):
        self.client = Client()
        self.client.force_login(self.dummyUser)
        response = self.client.get(self.request_url)

        self.assertEqual(response.status_code, 302)

    def test_AuthenticatedRandomIdPing(self):
        self.client = Client()
        self.client.force_login(self.dummyUser)
        response = self.client.get('evoting/organiser_login/blank')

        self.assertEqual(response.status_code, 404)


class ProfileUrlTesting(TestCase):

    def setUp(self):
        self.dummyUser = User.objects.create_user(username="anonymous", email="none@ne.com", password="sutorenja321")
        self.client = None
        self.request_url = '/evoting/profile/'

    def test_AnonymousPing(self):
        self.client = Client()
        response = self.client.get(self.request_url)

        self.assertRedirects(response, expected_url='/evoting/home/')

    def test_AuthenticatedPing(self):
        self.client = Client()
        self.client.force_login(self.dummyUser)
        response = self.client.get(self.request_url)

        if hasattr(self.dummyUser, 'voters_profile'):
            self.assertEqual(response.status_code, 200)
        else:
            self.assertRedirects(response, expected_url='/organiser_app/index1/')

    def test_AuthenticatedRandomIdPing(self):
        self.client = Client()
        self.client.force_login(self.dummyUser)
        response = self.client.get('evoting/profile/blank')

        self.assertEqual(response.status_code, 404)


class LogoutUrlTesting(TestCase):

    def setUp(self):
        self.dummyUser = User.objects.create_user(username="anonymous", email="none@ne.com", password="sutorenja321")
        Voters_Profile.objects.create(voterId='NOYB', voter_dob=datetime.date(2000, 12, 12),
                                      region='0', user=self.dummyUser)
        self.client = None
        self.request_url = '/evoting/logout/'

    def test_AnonymousPing(self):
        self.client = Client()
        response = self.client.get(self.request_url)

        self.assertRedirects(response, expected_url='/evoting/home/')

    def test_AuthenticatedPing(self):
        self.client = Client()
        self.client.force_login(self.dummyUser)
        response = self.client.get(self.request_url)

        self.assertRedirects(response, expected_url='/evoting/home/')

    def test_AuthenticatedRandomIdPing(self):
        self.client = Client()
        self.client.force_login(self.dummyUser)
        response = self.client.get('evoting/profile/blank')

        self.assertEqual(response.status_code, 404)
