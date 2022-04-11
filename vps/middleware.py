from django.core.exceptions import MiddlewareNotUsed

# TODO https://stackoverflow.com/questions/36099244/how-to-add-an-http-header-to-all-django-responses
# TODO https://docs.djangoproject.com/en/4.0/topics/http/middleware/#writing-your-own-middleware
class SimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.
        raise MiddlewareNotUsed # TODO https://docs.djangoproject.com/en/4.0/topics/http/middleware/#marking-middleware-as-unused

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)

        response['cache-control'] = "public, max-age=31536000" # TODO https://www.imperva.com/learn/performance/cache-control/
        # print(response.headers) # TODO https://docs.djangoproject.com/en/4.0/ref/request-response/#django.http.HttpRequest.headers

        # Code to be executed for each request/response after
        # the view is called.

        return response