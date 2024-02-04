import cryptocode

def encode(text: str, key: str):
    return cryptocode.encrypt(text, key)

def decode(text: str, key: str):
    return cryptocode.decrypt(text, key)