import logging as logger
from rest_framework import status

from core.constants import HTTPResponseState
from utils.generator import gen_random_number


def response_http(response_message_object, response_status):
    return {
        'data': response_message_object,
        'status': response_status
    }


def response_http_ok(data):
    return response_http(data, status.HTTP_200_OK)


def response_http_bad_request(data):
    return response_http(data, status.HTTP_400_BAD_REQUEST)


def response_server_error(location, traceback):
    code = gen_random_number()
    logger.error(f'\nERROR CODE: {code}\nLOCATION: {location}\n>>>>>>>>>>\n{traceback}<<<<<<<<<<')
    return response_http({'error': HTTPResponseState.SERVER_ERROR.value, 'code': code}, status.HTTP_500_INTERNAL_SERVER_ERROR)


def response_instance_not_exist_error(location, instance):
    code = gen_random_number()
    logger.error(f'\nERROR CODE: {code}\n>>>>>>>>>>\nLOCATION: {location} -> Object {instance} does not exist\n<<<<<<<<<<')
    return response_http({'error': HTTPResponseState.NOT_FOUND.value, 'code': code}, status.HTTP_400_BAD_REQUEST)


# Auth
def response_auth_credential_not_found():
    return response_http({'error': HTTPResponseState.AUTH_CREDENTIAL_NOT_FOUND.value}, status.HTTP_400_BAD_REQUEST)


def response_auth_credential_invalid():
    return response_http({'error': HTTPResponseState.AUTH_CREDENTIAL_INVALID.value}, status.HTTP_400_BAD_REQUEST)


def response_auth_credential_valid():
    return response_http({'message': HTTPResponseState.AUTH_CREDENTIAL_VALID.value}, status.HTTP_200_OK)


def response_auth_credential_suspend():
    return response_http({'message': HTTPResponseState.AUTH_CREDENTIAL_SUSPEND.value}, status.HTTP_400_BAD_REQUEST)


def response_auth_credential_expired():
    return response_http({'message': HTTPResponseState.AUTH_CREDENTIAL_EXPIRED.value}, status.HTTP_400_BAD_REQUEST)


def response_auth_password_changed():
    return response_http({'message': HTTPResponseState.AUTH_PASSWORD_CHANGED.value}, status.HTTP_200_OK)


def response_auth_password_reset():
    return response_http({'message': HTTPResponseState.AUTH_PASSWORD_RESET.value}, status.HTTP_200_OK)


def response_auth_password_invalid():
    return response_http({'error': HTTPResponseState.AUTH_PASSWORD_INVALID.value}, status.HTTP_400_BAD_REQUEST)


def response_auth_status_changed():
    return response_http({'message': HTTPResponseState.AUTH_STATUS_CHANGED.value}, status.HTTP_200_OK)


def response_auth_status_invalid():
    return response_http({'error': HTTPResponseState.AUTH_STATUS_INVALID.value}, status.HTTP_400_BAD_REQUEST)