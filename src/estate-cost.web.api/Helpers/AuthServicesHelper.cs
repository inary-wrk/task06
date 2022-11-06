using estate_cost.web.api.Configuration;

namespace estate_cost.web.api.Helpers
{
    public static class AuthServicesHelper
    {
        public static void RegisterAuthServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddAuthentication("Bearer")
                .AddJwtBearer(options =>
                {
                    options.Authority = builder.Configuration.Get<AppSettings>().AUTHORITY_URL;
                    options.TokenValidationParameters.ValidateAudience = false;
                });

            builder.Services.AddAuthorization(options =>
                options.AddPolicy("ApiScope", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim("scope", "api1");
                })
            );
        }
    }
}
