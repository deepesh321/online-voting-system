from django import forms
from django.contrib.auth.models import User
from evoting.models import Voters_Profile


class Registration_form1(forms.ModelForm):
    password = forms.CharField(
        label='',
        widget=forms.PasswordInput(
            attrs={
                'class': 'input_boxes',
                'placeholder': 'Password',
                'name': 'password',
            }
        )
    )

    username = forms.CharField(
        label='',
        widget=forms.TextInput(
            attrs={
                'class': 'input_boxes',
                'placeholder': 'Username',
                'name': 'username',
            }
        )
    )

    email = forms.EmailField(
        label='',
        widget=forms.EmailInput(
            attrs={
                'class': 'input_boxes',
                'placeholder': 'Email (abc@gmail.com)',
                'oninvalid': 'this.setCustomValidity("Email must be in (example@email.com) format")',
                'name': 'email',
            }
        )
    )

    class Meta:
        model = User
        fields = ('username', 'email', 'password')


class Registration_form2(forms.ModelForm):
    voter_dob = forms.DateField(
        label='',
        widget=forms.SelectDateWidget(
            years=range(1900, 2002),
            attrs={
                'class': 'date_box',
                'name': 'dob',
            }
        )
    )

    fullname = forms.CharField(
        label='',
        widget=forms.TextInput(
            attrs={
                'class': 'input_boxes',
                'placeholder': 'Fullname',
            }
        )
    )

    voterId = forms.CharField(
        label='',
        widget=forms.TextInput(
            attrs={
                'class': 'input_boxes',
                'placeholder': 'Voter Id',
                'name': 'voterId'
            }
        )
    )

    class Meta:
        model = Voters_Profile
        fields = ('fullname', 'voterId', 'voter_dob',)
