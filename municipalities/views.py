from rest_framework import viewsets, response, status

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

