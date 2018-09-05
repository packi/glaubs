from rest_framework import viewsets

from .models import Person, Committee, Campaign
from .serializers import PersonSerializer, CommitteeSerializer, \
    CampaignSerializer


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class CommitteeViewSet(viewsets.ModelViewSet):
    queryset = Committee.objects.all()
    serializer_class = CommitteeSerializer


class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer