from django.shortcuts import redirect
from django.contrib import messages


def voter_home(func):
    def wrapping_func(request, *args, **kwrds):
        if request.user.is_authenticated:
            if not hasattr(request.user, 'voters_profile'):
                return redirect('organiser_app:mainpage')
            else:
                return func(request, *args, **kwrds)
        else:
            return func(request, *args, **kwrds)

    return wrapping_func


def user_not_logged_in(func):
    def wrapping_func(request, *args, **kwrds):
        if request.user.is_authenticated:
            if hasattr(request.user, 'voters_profile'):
                return redirect('evoting-home')
            else:
                return redirect('organiser_app:mainpage')
        else:
            return func(request, *args, **kwrds)

    return wrapping_func


def user_login_required(func):
    def wrapping_func(request, *args, **kwrds):
        if not request.user.is_authenticated:
            return redirect('evoting-home')
        else:
            return func(request, *args, **kwrds)

    return wrapping_func


def voter_login_required(func):
    def wrapping_func(request, *args, **kwrds):
        if request.user.is_authenticated:
            if not hasattr(request.user, 'voters_profile'):
                return redirect('organiser_app:mainpage')
            else:
                return func(request, *args, **kwrds)
        else:
            return redirect('evoting-home')

    return wrapping_func
