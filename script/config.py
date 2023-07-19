from pydantic import Field, BaseSettings

class Settings(BaseSettings):
    API_BASE_URL: str = Field("http://localhost:5000", env="API_BASE_URL")
    API_AUTH_TOKEN: str = Field("secret-auth-token", env="API_AUTH_TOKEN")

    class Config:
        """
        A definition for checking local environment variables
        """

        env_file_encoding = "utf-8"
        case_sensitive = True
        env_file = ".env"

settings = Settings()