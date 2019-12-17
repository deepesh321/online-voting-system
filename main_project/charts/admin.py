from django.contrib import admin
from charts.models import Gen,Feedback,Report_data

# Register your models here.

admin.site.register(Gen)
admin.site.register(Feedback)
admin.site.register(Report_data)