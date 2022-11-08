using Duende.Bff.Yarp;
using estate_cost.web.bff.Configuration;
using IdentityModel;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Serilog;

namespace estate_cost.web.bff
{
    internal static class HostingExtensions
    {
        public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.Configure<AppSettings>(builder.Configuration);

            var appSettings = builder.Configuration.Get<AppSettings>();

            builder.Services.AddControllers();
            builder.Services.AddSpaStaticFiles(opt => opt.RootPath = "wwwroot");
            builder.Services.AddRazorPages();

            // add BFF services and server-side session management
            builder.Services.AddBff();

            builder.AddYarpReverseProxy();

            builder.Services.AddAuthentication(options =>
                {
                    options.DefaultScheme = "cookie";
                    options.DefaultChallengeScheme = "oidc";
                    options.DefaultSignOutScheme = "oidc";
                })
                .AddCookie("cookie", options =>
                {
                    options.ExpireTimeSpan = TimeSpan.FromHours(8);
                    options.Cookie.Name = "__Host-bff";
                    //options.Cookie.SameSite = SameSiteMode.Strict;
                })
                .AddOpenIdConnect("oidc", options =>
                {
                    options.Authority = appSettings.AUTHORITY_URL;
                    options.ClientId = "estate-cost.web.bff";
                    options.ClientSecret = "49C1A7E1-0C79-4A89-A3D6-A37998FB86B0";
                    options.ResponseType = "code";
                    options.ResponseMode = "query";

                    options.RequireHttpsMetadata = false;

                    options.GetClaimsFromUserInfoEndpoint = true;
                    options.SaveTokens = true;
                    options.MapInboundClaims = false;

                    options.Scope.Clear();
                    options.Scope.Add("openid");
                    options.Scope.Add("profile");
                    options.Scope.Add("api");
                    options.Scope.Add("offline_access");

                    options.TokenValidationParameters.NameClaimType = "name";
                    options.TokenValidationParameters.RoleClaimType = "role";
                });

            return builder.Build();
        }

        public static WebApplication ConfigurePipeline(this WebApplication app)
        {
            var appSettings = app.Configuration.Get<AppSettings>();

            app.UseHsts();
            app.UseHttpsRedirection();

            app.UseSerilogRequestLogging();

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseSpaStaticFiles();
                app.UseSpa(conf =>
                {
                });
            }

            app.UseAuthentication();
            app.UseRouting();

            if (app.Environment.IsDevelopment())
            {
                app.UseCors(conf =>
                {
                    conf.AllowAnyOrigin();
                    conf.AllowAnyHeader();
                });
            }

            // add CSRF protection and status code handling for API endpoints
            app.UseBff();

            app.UseAuthorization();

            app.MapBffManagementEndpoints();

            // Anti-forgery protection
            app.MapBffReverseProxy();

            return app;
        }
    }
}