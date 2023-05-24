import secrets


def gen_random_number(length=8):
    RANDOM_STRING_CHARS = '0123456789'
    allowed_chars = RANDOM_STRING_CHARS
    return ''.join(secrets.choice(allowed_chars) for i in range(length))


def gen_random_character(length=8):
    RANDOM_STRING_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    allowed_chars = RANDOM_STRING_CHARS
    return ''.join(secrets.choice(allowed_chars) for i in range(length))


def gen_new_id(latest_id, initial_id):
    if latest_id is None or latest_id == "":
        return initial_id
    id_len = len(latest_id)
    x = latest_id.split('0')
    c = x[0]
    c_len = len(c)
    n_len = id_len - c_len
    n = int(x[-1]) + 1
    new_id = f"{c}{str(n).zfill(n_len)}"
    return new_id
