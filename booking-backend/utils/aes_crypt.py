import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad


class AesCrypt:
    def _init(self, model, iv, encode, key='abcdefghijklmnop'):
        self.encrypt_text = ''
        self.decrypt_text = ''

        self.encode_ = encode_

        self.key = self.add_16(key)
        self.iv = self.add_16(iv)
        self.model = {'ECB': AES.MODE_ECB, 'CBC': AES.MODE_CBC}[model]

        if model == 'ECB':
            self.aes = AES.new(self.key, self.model)  # Create an aes object
        elif model == 'CBC':
            self.aes = AES.new(self.key, self.model, self.iv)  # Create an aes object

    # Here the key length must be 16, 24 or 32, and the current 16-bit is enough.
    def add_16(self, par):
        par = par.encode(self.encode_)
        while len(par) % 16 != 0:
            par += b'\x00'
        return par

    # encryption
    def aes_encrypt(self, text):
        text = pad(text.encode('utf-8'), AES.block_size, style='pkcs7')
        self.encrypt_text = self.aes.encrypt(text)
        return base64.encodebytes(self.encrypt_text).decode().strip()

    # Decrypt
    def aes_decrypt(self, text):
        text = base64.b64decode(text)

        pt = unpad(self.aes.decrypt(text), AES.block_size)
        result = pt.decode("utf-8")

        return result


def aes_ecb_decrypt(text, key):
    try:
        text = base64.b64decode(text)
        key = key.encode("utf-8")

        while len(key) % 16 != 0:
            key += b'\x00'

        cipher = AES.new(key, AES.MODE_ECB)

        # AES.block_size = 16
        pt = unpad(cipher.decrypt(text), AES.block_size)
        result = pt.decode("utf-8")

        return result

    except ValueError as error:
        print("Incorrect Decryption: ", error)


def aes_ecb_encrypt(text, key):
    text = text.encode('utf-8')
    key = key.encode("utf-8")

    while len(key) % 16 != 0:
        key += b'\x00'

    cipher = AES.new(key, AES.MODE_ECB)

    ct_bytes = cipher.encrypt(pad(text, AES.block_size, style='pkcs7'))

    return base64.encodebytes(ct_bytes).decode().strip()


def aes_cbc_encrypt(text, key, iv):
    text = text.encode('utf-8')
    key = key.encode("utf-8")
    iv = iv.encode("utf-8")

    while len(key) % 16 != 0:
        key += b'\x00'

    while len(iv) % 16 != 0:
        iv += b'\x00'

    cipher = AES.new(key, AES.MODE_CBC, iv)

    ct_bytes = cipher.encrypt(pad(text, AES.block_size, style='pkcs7'))

    return base64.encodebytes(ct_bytes).decode().strip()


def aes_cbc_decrypt(text, key, iv):
    try:
        text = base64.b64decode(text)
        key = key.encode("utf-8")
        iv = iv.encode("utf-8")

        while len(key) % 16 != 0:
            key += b'\x00'

        while len(iv) % 16 != 0:
            iv += b'\x00'

        cipher = AES.new(key, AES.MODE_CBC, iv)

        # AES.block_size = 16
        pt = unpad(cipher.decrypt(text), AES.block_size)
        result = pt.decode("utf-8")

        return result

    except ValueError as error:
        print("Incorrect Decryption: ", error)


def pw_aes_cbc_encrypt(text, key, iv):
    text_len = len(text) % 4
    if text_len == 1:
        text = f'{text}1=='
    if text_len == 2:
        text = f'{text}=='
    if text_len == 3:
        text = f'{text}='
    key = key.encode('utf-8')
    iv = iv.encode('utf-8')
    text_base64 = base64.b64decode(text)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ct_bytes = cipher.encrypt(pad(text_base64, AES.block_size, style='pkcs7'))
    base64_str = base64.encodebytes(ct_bytes).decode().strip()
    return base64_str
