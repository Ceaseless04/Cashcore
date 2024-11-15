# Create your tests here. Code to test the Database Models e.g test CustomUser model class, from models.py import
from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from .models import CustomUser

class CustomUserTestCase(TestCase):
    def setUp(self):
        # Set up initial data for the tests
        CustomUser.objects.create(field1='value1', field2='value2')

    def test_model_creation(self):
        # Test if the model instance is created correctly
        instance = CustomUser.objects.get(field1='value1')
        self.assertEqual(instance.field2, 'value2')

    def test_model_update(self):
        # Test if the model instance is updated correctly
        instance = CustomUser.objects.get(field1='value1')
        instance.field2 = 'new_value'
        instance.save()
        self.assertEqual(instance.field2, 'new_value')

    def test_model_deletion(self):
        # Test if the model instance is deleted correctly
        instance = CustomUser.objects.get(field1='value1')
        instance.delete()
        with self.assertRaises(CustomUser.DoesNotExist):
            CustomUser.objects.get(field1='value1')

# Run the tests using Django's test runner:

# ```sh
# python manage.py test
# ```

# This will execute all the test cases defined in your `tests.py` file and provide you with the results.