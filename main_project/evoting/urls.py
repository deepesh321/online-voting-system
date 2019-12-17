from django.urls import path
from evoting import views as user_views
from django.contrib.auth import views as auth_views


urlpatterns = [

    path('home/', user_views.home, name='evoting-home'),
    path('register/', user_views.register, name='evoting-register'),
    path('voter_login/', user_views.voter_login, name='evoting-voter-login'),
    path('organiser_login/', user_views.orgainser_login, name='evoting-organiser-login'),
    path('logout/', user_views.user_logout, name='evoting-logout'),
    path('profile/', user_views.profile, name='evoting-user-profile'),
    path('activate/<uidb64>/<token>', user_views.activate, name='activate'),
    path('edit_username/', user_views.edit_username, name='edit-username'),

    path('password_reset/', auth_views.PasswordResetView.as_view(
        template_name='voters/password_reset.html', email_template_name="voters/password_reset_email.html", subject_template_name="voters/subject.txt"),
         name='password_reset'
    ),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(
       template_name='voters/password_reset_done.html'),
         name='password_reset_done'
    ),
    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
       template_name='voters/password_reset_confirm.html'),
         name='password_reset_confirm'
    ),
    path('reset/done', auth_views.PasswordResetCompleteView.as_view(
        template_name='voters/password_reset_complete.html'),
         name='password_reset_complete'
    ),

    path('candidate_details/<int:pk>', user_views.candidate_details, name='candidate_details'),
    path('election/<int:pk>', user_views.election, name='trail.election'),
    path('vote/<int:eid>/<int:cid>', user_views.vote, name='trail.vote'),
    path('result/<int:eid>', user_views.resultpage, name='resultpage'),


]
