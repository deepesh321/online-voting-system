from rest_framework import serializers
from organiser_app.models import Candidate


class CandidateSerializer(serializers.ModelSerializer):

    class Meta():
        model = Candidate
        fields = ('candidate_name','candidate_fname','candidate_party','candidate_region','candidate_gender','candidate_email','candidate_dob','candidate_aadhar')
