from django.db.models import Q

from rest_framework import viewsets, response, status
from rest_framework.views import APIView

from municipalities.models import Municipality
from municipalities.serializers import MunicipalitySerializer

class MunicipalityViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = Municipality.objects.all()
    serializer_class = MunicipalitySerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Municipality.objects.create(**serializer.validated_data)

            return response.Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return response.Response({'status': 'Bad request', 'message': 'Couldnt validate'}, status=status.HTTP_400_BAD_REQUEST)



class SearchMunicipality(APIView):

    serializer_class = MunicipalitySerializer

    def get(self, request):
        q = request.query_params['q']
        zip_code = None
        name = None
        try:
            zip_code = int(q)
        except ValueError:
            name = q

        try:
            municipalities = []
            if zip_code is not None:
                municipalities = Municipality.objects.filter(zip_code=zip_code)
            elif name is not None:
                municipalities = Municipality.objects.filter(Q(name__startswith=name))

            serializer = self.serializer_class(data=municipalities, many=True)
            serializer.is_valid()
            return response.Response(serializer.data)
        except Municipality.DoesNotExist:
            serializer = self.serializer_class(data=[], many=True)
            serializer.is_valid()
            return response.Response(serializer.data)
