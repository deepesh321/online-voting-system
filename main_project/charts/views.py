from django.shortcuts import render
from django.http import HttpResponse
from .models import Gen,Feedback, Report_data
from organiser_app.models import *
from django.core.mail import send_mail
from django.conf import settings
# Create your views here.
from django.template import RequestContext
# from django.shortcuts import render_to_response

from django.http import JsonResponse
from django.views.generic import View

from rest_framework.views import APIView
from rest_framework.response import Response


def Report(request):
    return render(request, "graphs/report.html")


def feedback(request):
    return render(request, "graphs/feedback.html")


def form(request):
    return render(request, "graphs/index3.html")


def get_feedback(request):
    print("Request Object: {}".format(request.POST))
    name = request.user.username
    feedback = request.POST['feedback']
    rating = request.POST['rating']
    FeedbackData = Feedback.objects.create(name=name, feedback=feedback,rating=rating)
    FeedbackData.save()
    return HttpResponse("Thanks for your feedback")


def index1(request):
    print("Request Object: {}".format(request.POST))
    party = request.POST['party']
    total = request.POST['total']
    Userlog = Gen.objects.create(party=party, total=total)
    Userlog.save()
    return HttpResponse("Your data is stored")


def index(request):
    return render(request, 'graphs/charts.html')


def send_email(request):
    name1 = request.user.username
    email = request.user.email
    report = request.POST['report']
    rating = request.POST['rating']
    Report_data1 = Report_data.objects.create(name1=name1, email=email, report=report,rating='rating')
    Report_data1.save()
    subject = 'Custromers report'
    message = (
        'Please check the customer s feedback sent to you \n Name : {} ;\n Email : {} ;\n Feedback : {} ;\n Star Ratings(Out of 5): {} '.format(name1,
                                                                                                                email,
                                                                                                                report,rating))
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['nehul.r17@iiits.in']
    send_mail(subject, message, email_from, recipient_list)
    return HttpResponse("Thanks , your report has been sent")

def feedback_response(request):
    fresponse=Feedback.objects.all()
    data={'fresponse':fresponse}
    return render(request,'graphs/feedback_responses.html',data)