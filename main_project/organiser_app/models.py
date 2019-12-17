from django.db import models
from django.urls import reverse
import datetime

# Create your models here.

election_options=(
    ('A','Assembly'),
    ('P','Parliamentary')


)

statuses = (
    ('0', 'not started'),
    ('1', 'on going'),
    ('2', 'end')
)

Gender_options = (
    ('M', 'Male'),
    ('F', 'Female'),
    ('O', 'Others')
)

party_options = (
    ('BJP', 'Bhartiya Janta Party'),
    ('CPI', 'Communist Party of India'),
    ('INC', 'Indian National Congress'),
    ('AAP', 'Aam Aadmi Party'),
    ('TDP', 'Telugu Desam Party'),
    ('SS', 'Shiv Sena'),
    ('TRS', 'Telangana Rashtra Samithi'),
    ('JD', 'Janata Dal'),
    ('SP', 'Samajwadi Party'),
    ('RJD', 'Rashtriya Janata Dal')
)

region_options = (
 ('0','AndhraPradesh'),
 ('1','Bihar'),
 ('2','karnataka'),
 ('3','Tamilnadu'),
 ('4','Kerela'),
 ('5','UttarPradesh'),
 ('6','WestBengal'),
 ('7','MadhyaPradesh'),
 ('8','Haryana'),
 ('9','Assam'),
 ('10','All')
)

YEARS = (
    ("2018", "2018"),
    ("2019 ","2019"),
    ("2020", "2020"),
    ("2021", "2021"),
    ("2022", "2022"),
    ("2023", "2023"),
    ("2024", "2024"),
    ("2025", "2025"),
    ("2026", "2026"),
    ("2027", "2027"),
    ("2028", "2028"),

)


class Voter(models.Model):
    voter_id=models.CharField(max_length=10,unique=True,primary_key=True,null=False)
    voter_name=models.CharField(max_length=50,null=False)
    voter_email=models.EmailField(unique=True,null=False)
    voter_dob=models.DateField(null=False)
    voter_age=models.IntegerField(null=False)
    voter_aadhar=models.BigIntegerField(unique=True,null=False)
    voter_phone=models.BigIntegerField(unique=True,null=False)
    isalive=models.BooleanField(default=True,null=False)
    voter_gender=models.CharField(choices=Gender_options,null=False,max_length=10)
    voter_region=models.CharField(choices=region_options,null=False,max_length=10)

    def __str__(self):
        return str(self.voter_id) +"."+" "+ self.voter_name


class Candidate(models.Model):
    candidate_id=models.AutoField(primary_key=True)
    candidate_name=models.CharField(max_length=50,null=False)
    candidate_fname=models.CharField(max_length=50,null=False)
    candidate_party=models.CharField(choices=party_options,null=False,max_length=10,default="Bhartiya Janta Party")
    candidate_region=models.CharField(choices=region_options,null=False,max_length=10,default="AndhraPradesh")
    candidate_gender=models.CharField(choices=Gender_options,null=False,max_length=1,default="Male")
    candidate_email=models.EmailField(unique=True,null=False)
    candidate_dob=models.DateField(null=False)
    candidate_aadhar=models.BigIntegerField(unique=True,null=False)
    profile_pic=models.ImageField(upload_to='profile_pics',blank=True)

    def __str__(self):
        return str(self.candidate_id) +"."+" "+ self.candidate_name

    def get_absolute_url(self):
        return reverse('organiser_app:view',kwargs={'pk':self.pk})


class Election(models.Model):
    election_type=models.CharField(choices=election_options,null=False,max_length=1,default="Parliamentary")
    election_id=models.AutoField(primary_key=True)
    election_year=models.CharField(null=False,choices=YEARS,default=2018,max_length=6)
    date_of_start=models.DateField(null=False)
    date_of_end=models.DateField(null=False)
    status=models.CharField(choices=statuses,max_length=2,default='0')
    candidates = models.ManyToManyField(to=Candidate)

    def __str__(self):
        return str(self.election_id)


class Candidate_election(models.Model):
    candidate=models.ForeignKey(Candidate,on_delete=models.CASCADE)
    election=models.ForeignKey(Election,on_delete=models.CASCADE)


class Election_region(models.Model):
    election=models.ForeignKey(Election,on_delete=models.CASCADE)
    region=models.CharField(choices=region_options,null=False,max_length=10)

    def __str__(self):
        return str(self.region)


class Vote_count(models.Model):
    voter=models.ForeignKey(Voter,on_delete=models.CASCADE)
    candidate=models.ForeignKey(Candidate,on_delete=models.CASCADE)
    election=models.ForeignKey(Election,on_delete=models.CASCADE)
