import pyotp


def totp_key_generate():
    secret_key = pyotp.random_base32()
    return secret_key


def totp_url(secret_key, name):
    totp = pyotp.TOTP(secret_key)
    url = totp.provisioning_uri(name=name, issuer_name='App')
    return url


def totp_verify(secret_key, value):
    totp = pyotp.TOTP(secret_key)
    result = totp.verify(value)
    return result


def totp_now(secret_key):
    totp = pyotp.TOTP(secret_key)
    value = totp.now()
    return value


def test_totp_demo():
    totp_key = totp_key_generate()
    print(totp_key)

    username = 'Admin'
    output_url = totp_url(totp_key, username)
    print(output_url)

    num = totp_now(totp_key)
    print(num)


def simple_totp_code_generator(key):
    num = totp_now(key)
    print(num)
    output_res = totp_verify(key, num)
    print(output_res)
