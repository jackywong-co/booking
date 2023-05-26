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


if __name__ == '__main__':
    # test_totp_demo()

    # kml
    # key = 'HTQRGQOFEGL4DCV7CP44UULN3RLNXSLC'

    # app
    # key = 'WIBH42457YLF6J5YUO6Z5ZFPPNCCYEI4'

    # test 5
    # key = 'VUA3H7CJJGQW4CZKXFWKHQ7HAO6KC7VG'

    # test 1
    key = 'JIBBVW4FINUFSI55MGEPYQVV7RKZZCXK'
    simple_totp_code_generator(key)
