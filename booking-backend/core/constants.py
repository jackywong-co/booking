from enum import Enum


class APPEnvironment(Enum):
    DEVELOPMENT = 'development'
    UAT = 'uat'
    PRODUCTION = 'production'


class HTTPResponseState(Enum):
    # System
    SERVER_ERROR = 'SERVER_ERROR'
    NOT_FOUND = 'NOT_FOUND'
    OK = 'OK'

    # Auth
    AUTH_CREDENTIAL_NOT_FOUND = 'AUTH_CREDENTIAL_NOT_FOUND'
    AUTH_CREDENTIAL_INVALID = 'AUTH_CREDENTIAL_INVALID'
    AUTH_CREDENTIAL_VALID = 'AUTH_CREDENTIAL_VALID'
    AUTH_PASSWORD_CHANGED = 'AUTH_PASSWORD_CHANGED'
    AUTH_PASSWORD_INVALID = 'AUTH_PASSWORD_INVALID'
    AUTH_STATUS_CHANGED = 'AUTH_STATUS_CHANGED'
    AUTH_STATUS_INVALID = 'AUTH_STATUS_INVALID'

    AUTH_PASSWORD_RESET = 'AUTH_PASSWORD_RESET'
    AUTH_CREDENTIAL_EXPIRED = 'AUTH_CREDENTIAL_EXPIRED'
    AUTH_CREDENTIAL_SUSPEND = 'AUTH_CREDENTIAL_SUSPEND'

    # UnionPay Refund
    TXN_UNION_REFUND_SUCCESS = 'TXN_UNION_REFUND_SUCCESS'
    TXN_UNION_REFUND_FAIL = 'TXN_UNION_REFUND_FAIL'
