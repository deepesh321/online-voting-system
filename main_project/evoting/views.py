from django.shortcuts import render, redirect
from evoting.forms import *
from evoting.models import *
from organiser_app.models import *
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.template.loader import render_to_string
from evoting.tokens import account_activation_token
from django.core.mail import EmailMessage, send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.shortcuts import get_object_or_404,Http404
from . import decoraters


@decoraters.voter_home
def home(request):
    elections = Election.objects.all()
    changer={'P':'Parliamentary','A':'Assembly'}
    for election in elections:
        election.election_type = changer[election.election_type]
    context = {'elections': elections, 'username': request.user}
    return render(request, 'voters/home.html', context = context)


@decoraters.voter_login_required
def profile(request):
    region_options = {
        '0': 'AndhraPradesh',
        '1': 'Bihar',
        '2': 'karnataka',
        '3': 'Tamilnadu',
        '4': 'Kerela',
        '5': 'UttarPradesh',
        '6': 'WestBengal',
        '7': 'MadhyaPradesh',
        '8': 'Haryana',
        '9': 'Assam',
    }
    user_details = Voters_Profile.objects.get(user=request.user.id)
    user_details_1 = Voter.objects.get(voter_name=user_details.fullname)
    details = {
        'user_region': region_options[user_details.region],
        'Voters_Profile': user_details,
        'Voter': user_details_1,
    }
    print(user_details_1.voter_gender)
    return render(request, 'voters/profile.html', details)


@decoraters.user_not_logged_in
def register(request):

    if request.method == "POST":
        registration_form1 = Registration_form1(request.POST)
        registration_form2 = Registration_form2(request.POST)

        if registration_form1.is_valid() and registration_form2.is_valid():
            voter_id = request.POST['voterId']
            voter_id_list = Voter.objects.values_list('voter_id', flat=True)

            if voter_id in voter_id_list:
                voter = Voter.objects.get(voter_id=voter_id)
                if request.POST['email'] == voter.voter_email and request.POST['fullname'] == voter.voter_name:

                    reg_form1 = registration_form1.save()
                    reg_form1.is_active = False
                    reg_form1.set_password(reg_form1.password)
                    reg_form1.save()

                    reg_form2 = registration_form2.save(commit=False)
                    reg_form2.region = voter.voter_region
                    reg_form2.user = reg_form1
                    reg_form2.user.is_active = False

                    reg_form2.save()

                    current_site = get_current_site(request)
                    mail_subject = 'Verify your email.'
                    message = render_to_string('voters/acc_active_email.html', {
                        'user': reg_form2.user,
                        'domain': current_site.domain,
                        'uid': urlsafe_base64_encode(force_bytes(reg_form2.user.pk)).decode(),
                        'token': account_activation_token.make_token(reg_form2.user),
                    })
                    print(message)
                    to_email = reg_form1.email
                    email = EmailMessage(
                        mail_subject, message, to=[to_email]
                    )
                    email.send()

                    messages.success(request, f'We have sent a mail to the registered mail.'
                                              f' Please click that link to activate your account and then login')
                    logout(request)
                    return redirect('evoting-voter-login')

                else:
                    messages.error(request, f'(Email Id) or (fullname) or (Date of Birth) does\'nt'
                                            f' matches with the given Voter Id')
            else:
                messages.error(request, f'Voter with the given Voter Id does not exist!!')

        else:
            messages.error(request, (registration_form1.errors, registration_form2.errors))
            print(registration_form1.errors, registration_form2.errors)
    else:
        registration_form1 = Registration_form1()
        registration_form2 = Registration_form2()

    return render(request, 'voters/register.html', {'reg_form1': registration_form1, 'reg_form2': registration_form2})


def user_acc_activation(request):
    return render(request, 'voters/acc_activate.html')


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        messages.success(request, f'Thanks for activating your account. Now you can login to your account.')

    else:
        messages.error(request, f'Activation link is invalid!')

    return render(request, 'voters/home.html')


# ======================================================================================================================
@decoraters.user_not_logged_in
def voter_login(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user:
            user_objs = User.objects.filter(username=username)
            if hasattr(user_objs.first(), 'voters_profile'):

                if user.is_active:
                    login(request, user)
                    return redirect('evoting-home')
                else:
                    return HttpResponse('account not active')
    
            else:
                messages.error(request, f'Invalid Login details')

        else:
            messages.error(request, f'Invalid Login details')

        return redirect(reverse('evoting-voter-login'))
            
    else:
        return render(request, 'voters/login.html', {'USER': 'voter'})


@decoraters.user_not_logged_in
def orgainser_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user:
            if not hasattr(username, 'voters_profile'):

                login(request, user)
                return redirect('organiser_app:mainpage')

            else:
                messages.error(request, f'Invalid Login details')

        else:
            messages.error(request, f'Invalid Login details')

        return redirect(reverse('evoting-organiser-login'))

    else:
        return render(request, 'voters/login.html', {'USER': 'organiser'})


@decoraters.user_login_required
def user_logout(request):
    logout(request)
    return redirect('evoting-home')


@decoraters.user_login_required
def edit_username(request):
    username = request.POST['new-username']
    usernames = User.objects.values_list('username')
    if username == request.user.username:
        messages.success(request, f'Given username is already your username')
        return redirect('evoting-user-profile')
    else:
        if (username,) in usernames:
            messages.error(request, f'Username already exists!!')
            print(usernames)
            return redirect('evoting-user-profile')
        else:
            user = User.objects.get(username=request.user)
            user.username = username
            user.save()
            messages.success(request, f'Successfully Updated Username')
            return redirect('evoting-user-profile')


def election(request,pk):
    print(Voters_Profile.objects.values_list('user'))
    user = Voters_Profile.objects.get(user = request.user)
    region = user.region


    candidates = Candidate_election.objects.filter(election = pk)
    candidates = {candidate.candidate for candidate in candidates}
    candidates = {candidate for candidate in candidates if candidate.candidate_region in region}
    print(candidates)

    candidates_new = []
    region_options = {
        '0': 'AndhraPradesh',
        '1': 'Bihar',
        '2': 'karnataka',
        '3': 'Tamilnadu',
        '4': 'Kerela',
        '5': 'UttarPradesh',
        '6': 'WestBengal',
        '7': 'MadhyaPradesh',
        '8': 'Haryana',
        '9': 'Assam'
    }
    elec = Election.objects.get(pk = pk)
    status = elec.status
    print(status)
    region = region_options[region]
    doe= elec.date_of_end
    print(doe)
    print('Hello')
    for candidate in candidates:
        candidates_new.append([candidate.candidate_name, candidate.candidate_id, candidate.profile_pic])
    context = {'region': region, 'candidates_new': candidates_new,'user':user, 'status':status,'eid':pk,'doe':doe}
    return render(request, "trail/index6.html", context=context)

def candidate_details(request,pk):
    template_name='trail/candidate_detail.html'
    candidate=get_object_or_404(Candidate,candidate_id=pk)
    region_options = {
        '0': 'AndhraPradesh',
        '1': 'Bihar',
        '2': 'karnataka',
        '3': 'Tamilnadu',
        '4': 'Kerela',
        '5': 'UttarPradesh',
        '6': 'WestBengal',
        '7': 'MadhyaPradesh',
        '8': 'Haryana',
        '9': 'Assam'
    }
    print(str(candidate.candidate_dob))
    candidate.candidate_region = region_options[candidate.candidate_region]
    dob = str(candidate.candidate_dob)
    return render(request,template_name,{'object':candidate,'dob':dob})

def vote(request,eid,cid):
    user = Voters_Profile.objects.get(user=request.user)
    region = user.region
    if Election.objects.filter(election_id= eid).exists():
        if Candidate.objects.filter(candidate_id=cid).exists():
            if Candidate_election.objects.filter(election = Election.objects.get(election_id= eid), candidate=Candidate.objects.get(candidate_id=cid)).exists():
                if Candidate.objects.get(candidate_id=cid).candidate_region == region:

                    user = Voters_Profile.objects.get(user=request.user)
                    user = Voter.objects.get(voter_id = user.voterId)
                    cand = Candidate.objects.get(candidate_id = cid)
                    elec = Election.objects.get(election_id = eid)
                    if Vote_count.objects.filter(voter=user,election=elec).exists() :

                        messages.error(request, "You have already voted in this Election", extra_tags='vote')
                        print('not voted')
                    else:
                        print('voted')
                        voteCount = Vote_count()
                        voteCount.voter = user
                        voteCount.candidate = cand
                        voteCount.election = elec
                        voteCount.save()

                        messages.success(request, "Your Vote has Successfully been registered", extra_tags='vote')
                    return render(request, "trail/vote_count.html" )
                else:
                    raise Http404("Candidate does not exist in your Region")
            else:
                raise Http404("Candidate does not exist in election")
        else:
            raise Http404("Candidate does not exist in election")
    else:
        raise Http404("Election does not exist")

def resultpage(request,eid):
    party_options = (
        'BJP',
        'CPI',
        'INC',
        'AAP',
        'TDP',
        'SS',
        'TRS',
        'JD',
        'SP',
        'RJD'
    )
    region_options = (
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',

    )

    elec = Election.objects.get(election_id=eid)
    if elec.status == '2':
        votercount = Vote_count.objects.filter(election = elec)
        print(votercount)
        count=[]
        data={}
        # for i in 0,10:
        #     count[i]={}
        i=0
        count1={}
        data=[]
        for region in region_options:
            for item in party_options:
                count1[item] = 0
            for entry in votercount:
                if entry.candidate.candidate_region==region:
                    count1[entry.candidate.candidate_party] += 1

            parties=[]
            votes=[]
            for key,value in count1.items():
                parties.append(key)
                votes.append(value)
            data1={
                'labelsdata':parties,
                'defaultdata':votes,
            }
            data.append(data1);
        print(data)
        context = {'data':data}
        return render(request, 'graphs/charts.html', context=context)
    else:
        raise Http404("Election Results dont exist")