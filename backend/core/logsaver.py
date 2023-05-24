import logging as logger


def save_server_error(location, message):
    logger.error(f'\n>>>>>>>>>>\nLOCATION: {location} -> {message}\n<<<<<<<<<<')


def save_db_error(location, message):
    logger.error(f'\n>>>>>>>>>>\nLOCATION: {location} -> {message}\n<<<<<<<<<<')


def save_db_error_instance_not_exist_log(location, instance):
    logger.error(f'\n>>>>>>>>>>\nLOCATION: {location} -> Object {instance} does not exist\n<<<<<<<<<<')