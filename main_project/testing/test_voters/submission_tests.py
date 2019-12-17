from django.test import TestCase, Client
from django.contrib.auth.models import User
from evoting.models import *
from evoting.forms import *
import datetime


class RegisterSubmitTest(TestCase):

    def setUp(self):
        self.request_url = '/evoting/register/'

    def test_Register(self):
        self.client = Client()
        response = self.client.post(self.request_url,
                                        {
                                            'username': 'Dummy',
                                            'fullname': 'dull',
                                            'password': 'hello1234567',
                                            'email': 'hello@cool.com',
                                            'voterId': 'Ts1241',
                                            'voter_dob': datetime.date(1954, 2, 4),
                                        }
                                    )

        self.assertEqual(response.status_code, 200)


class VoterLoginTest(TestCase):

    def setUp(self):
        self.dummyUser = User.objects.create(username='Anonymous', email='blank@bl.com', password='nopass')
        Voters_Profile.objects.create(user=self.dummyUser, voterId='NOYB', voter_dob=datetime.date(2000, 12, 12),
                                      region='1', fullname='Donno')
        self.client = None
        self.request_url = '/evoting/voter_login/'

    def test_Login(self):
        self.client = Client()
        response = self.client.post(self.request_url,
                                    {
                                        'username': 'Anonymous',
                                        'password': 'nopass'
                                    }
                                    )

        self.assertRedirects(response, expected_url='/evoting/voter_login/')
