

class DevelopmentConfig(object):
  AUTH_USERNAME = "user"
  AUTH_PASSWORD = "test"
  JWT_TOKEN_LOCATION = ["cookies"]
  JWT_COOKIE_SECURE = False
  JWT_SECRET_KEY = "some-secret-key"
