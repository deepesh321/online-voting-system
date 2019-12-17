from django.urls import path,include,re_path
from charts import views
from django.conf.urls import url

app_name='charts'

urlpatterns=[
    url(r'^index1/',views.index1,name='index1'),
    url(r'^get_feedback/',views.get_feedback,name='get_feedback'),
    url(r'^send_email/', views.send_email, name='send_email'),
    #url(r'^$', views.index, name='index'),
    url(r'^form/', views.form, name='form'),
    url(r'^feedback/', views.feedback, name='feedback'),
    url(r'^report/', views.Report, name='report'),
    #url(r'^api/chart/data/$', views.ChartData.as_view(),name='api_data'),
    url(r'^feedback_response/', views.feedback_response, name='feedback_responses'),
]
