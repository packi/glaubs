from rest_framework import serializers

from municipalities.models import Municipality


class MunicipalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipality

        fields = ('id', 'name', 'zip_code', 'address', 'phone_number', 'political_municipality', 'comment')
        read_only_fields = ('id', 'created_at', 'updated_at')

