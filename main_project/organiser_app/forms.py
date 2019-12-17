from django import forms
from . models import Candidate,Voter,Election
from django.core import validators
import datetime


region_options = (

 ('0','AndhraPradesh') ,
 ('1','Bihar') ,
 ('2','karnataka'),
 ('3','Tamilnadu' ),
 ('4','Kerela') ,
 ('5','UttarPradesh'),
 ('6','WestBengal') ,
 ('7','MadhyaPradesh') ,
 ('8','Haryana') ,
 ('9','Assam'),
 ('10','All')

)

party_options=(

    ('BJP','Bhartiya Janta Party'),
    ('CPI','Communist Party of India'),
    ('INC','Indian National Congress'),
    ('AAP','Aam Aadmi Party') ,
    ('TDP','Telugu Desam Party'),
    ('SS','Shiv Sena') ,
    ('TRS','Telangana Rashtra Samithi'),
    ('JD','Janata Dal') ,
    ('SP','Samajwadi Party') ,
   ('RJD', 'Rashtriya Janata Dal')

)





class Candidateform(forms.ModelForm):
    candidate_dob = forms.DateField(widget=forms.SelectDateWidget(years=range(1920, 1994)))

    class Meta:
        model = Candidate
        fields = ('candidate_name','candidate_fname','candidate_party','candidate_region','candidate_gender','candidate_email','candidate_dob','candidate_aadhar','profile_pic')



class Electionform(forms.ModelForm):
    date_of_start = forms.DateField(widget=forms.SelectDateWidget(),initial=datetime.date.today)
    date_of_end = forms.DateField(widget=forms.SelectDateWidget(),initial=datetime.date.today)
    class Meta():
        model=Election
        fields=('election_type','election_year','date_of_start','date_of_end', 'candidates')



class Voterform(forms.ModelForm):
    voter_dob = forms.DateField(widget=forms.DateInput(attrs={'id':'date','type':'date',}))
    voter_age = forms.IntegerField(widget=forms.NumberInput(attrs={'id':'age'}))

    class Meta:
        model = Voter
        fields = '__all__'


class RegionForm(forms.Form):
    select_region = forms.ChoiceField(choices=region_options)

class PartyForm(forms.Form):
    select_party=forms.ChoiceField(choices=party_options)
