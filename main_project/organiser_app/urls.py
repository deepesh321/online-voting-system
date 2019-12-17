from django.urls import path
from . import views
from evoting import views as user_views

app_name="organiser_app"

urlpatterns=[

        path('index/',views.index,name="index"),
        path('select_region_page/',views.select_region_page,name="select_region_page"),
        path('candidate/',views.candidate_page,name='candidate'),
        path('index1/',views.main_page,name='mainpage'),
        path('election/',views.election,name="election"),
        path('addelection/',views.addelection,name="addelection"),
        path('voter_region_page/search_voter', views.search_voter, name='search_voter'),
        path('voter_region_page/add_voter/', views.add_voter, name='add_voter'),
        path('voter_region_page/<int:pk>', views.voter_region_page, name='voter_region_page'),
        path('view/<int:pk>',views.candidate_view,name='candidate_view'),
        path('edit/<int:pk>',views.candidate_update,name='candidate_edit'),
        path('view1/<int:pk>',views.voter_view,name='voter_view'),
        path('edit1/<int:pk>',views.voter_update,name='voter_update'),
        path('party/',views.party,name="party"),
        path('region-candidate/<int:pk>',views.reg_candidate,name="region-candidate"),
        path('party-candidate/<str:pk>',views.party_candidate,name="party-candidate"),
        path('election-candidate/<int:pk>',views.election_candidate,name="election-candidate"),
        path('election_edit/<int:pk>',views.election_update,name="election_edit"),
        path('candidate-election/<int:pk>',views.candidate_election,name="candidate-election"),
        path('logout/', user_views.user_logout, name='evoting-logout'),
        path('srccandidate/',views.srchcandidate,name='srccandidate')
]
