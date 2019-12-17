from django.db import models
from django.contrib.auth.models import User
from organiser_app.models import Election


region_options = (
 ('0', 'AndhraPradesh'),
 ('1', 'Bihar'),
 ('2', 'karnataka'),
 ('3', 'Tamilnadu'),
 ('4', 'Kerela'),
 ('5', 'UttarPradesh'),
 ('6', 'WestBengal'),
 ('7', 'MadhyaPradesh'),
 ('8', 'Haryana'),
 ('9', 'Assam')

)


class Voters_Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=20, blank=True)
    voterId = models.CharField(blank=True, primary_key=True, max_length=10)
    voter_dob = models.DateField(null=False)
    region = models.CharField(choices=region_options, null=False, max_length=10)

    def __str__(self):
        return self.user.username


class organiser_profile(models.Model):
    organiser = models.OneToOneField(User, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=50, blank=False)
    organiserId = models.CharField(max_length=10, blank=False)

    def __str__(self):
        return self.organiser.username
