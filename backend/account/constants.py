from enum import Enum


class UserAuthState(Enum):
    NOT_FOUND = 'NOT_FOUND'
    AUTH_FAIL = 'AUTH_FAIL'
    SUSPEND = 'SUSPEND'
    EXPIRED = 'EXPIRED'
    SUCCESS = 'SUCCESS'


class UserRole(Enum):
    MEDICAL_STAFF = 0
    SYSTEM_ADMIN = 1


class UserStatus(Enum):
    INACTIVE = 0
    ACTIVE = 1
