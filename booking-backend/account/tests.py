from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from django.urls import reverse

# Create your tests here.
from account.models import User


# class AccountTestCase(APITestCase):
    # def test_login(self):
        # user = User.objects.create_user('testuser', 'testuser')
        # self.assertTrue(self.client.login(username='username', password='Pas$w0rd'))
        # response = self.client.get(reverse('login'))
        # self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_hello_world(self):
    #     self.login()
    # response = self.client.post(reversed('user'))
    # self.assertEqual(response.status_code, status.HTTP_200_OK)
