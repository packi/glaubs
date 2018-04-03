from rest_framework import serializers

from .models import Person, Committee, Campaign


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person

        fields = ('id', 'full_name', 'signature_file', 'phone_number')
        read_only_fields = ('id', 'created_at', 'updated_at')


class CommitteeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Committee

        fields = ('id', 'name', 'address', 'phone_number', 'email')
        read_only_fields = ('id', 'created_at', 'updated_at')


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign

        fields = ('id', 'name', 'address', 'phone_number', 'email')
        read_only_fields = ('id', 'created_at', 'updated_at')
