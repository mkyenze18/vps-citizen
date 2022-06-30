from rest_framework.pagination import PageNumberPagination

class VariableResultsSetPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    max_page_size = 50