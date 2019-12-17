from django.contrib import admin
from . models import *
# Register your models here.
admin.site.register(Voter)
admin.site.register(Election)
admin.site.register(Candidate)
admin.site.register(Election_region)
admin.site.register(Vote_count)
admin.site.register(Candidate_election)