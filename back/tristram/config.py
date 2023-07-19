from pydantic import Field, BaseSettings

class Settings(BaseSettings):
    AUTH_USERNAME: str = Field("USER", env="AUTH_USERNAME")
    AUTH_PASSWORD: str = Field("test", env="AUTH_PASSWORD")
    JWT_SECRET_KEY: str = Field("super-secret", env="JWT_SECRET_KEY")

    class Config:
        """
        A definition for checking local environment variables
        """

        env_file_encoding = "utf-8"
        case_sensitive = True
        env_file = "../.env"

settings = Settings()