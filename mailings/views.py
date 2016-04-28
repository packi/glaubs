from django.db.models import Max

from rest_framework import viewsets, response, status, views

from mailings.models import Mailing
from mailings.serializers import MailingSerializer


class MailingViewSet(viewsets.ViewSet):
    lookup_field = 'id'
    queryset = Mailing.objects.all()
    serializer_class = MailingSerializer

    def list(self, request, municipality_id=None):
        mailings = self.queryset.filter(municipality=municipality_id)

        if mailings is not None:
            serializer = self.serializer_class(data=mailings, many=True)
            serializer.is_valid()
            return response.Response(serializer.data)

        serializer = self.serializer_class([], many=True)
        serializer.is_valid()
        return response.Response(serializer.data)

    def create(self, request, municipality_id=None):
        data = request.data
        data['municipality'] = municipality_id
        if data['to_number'].startswith('+'):
            data['to_number'] = int(data['to_number'][1:]) + int(data['from_number'])

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            Mailing.objects.create(**serializer.validated_data)

            serializer.validated_data['municipality'] = None

            return response.Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return response.Response({'status': 'Bad request', 'message': 'Couldnt validate'}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, id=None, municipality_id=None):
        mailing = Mailing.objects.all().get(id=id, municipality=municipality_id)
        serializer = self.serializer_class(mailing)
        return response.Response(serializer.data)


class MailingMaxNumber(views.APIView):
    serializer_class = MailingSerializer

    def get(self, request):
        max_number = Mailing.objects.all().aggregate(Max('to_number'));

        return response.Response({'max_number': max_number['to_number__max']})

