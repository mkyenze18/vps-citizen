from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class VariableResultsSetPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    max_page_size = 50

# class CustomPagination(pagination.PageNumberPagination):
class CustomPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            # 'links': {
            #     'next': self.get_next_link(),
            #     'previous': self.get_previous_link()
            # },
            'count': self.page.paginator.count,

            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            
            'results': data
        })