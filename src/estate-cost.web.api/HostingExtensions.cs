using FluentValidation.AspNetCore;
using MicroElements.Swashbuckle.FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using Serilog;
using tusdotnet;
using tusdotnet.Models;
using estate_cost.web.api.Configuration;
using tusdotnet.Stores;
using tusdotnet.Interfaces;
using tusdotnet.Models.Expiration;
using estate_cost.application.Common;
using estate_cost.web.api.Helpers;
using tusdotnet.Models.Configuration;

namespace estate_cost.web.api
{
    internal static class HostingExtensions
    {
        public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.Configure<AppSettings>(builder.Configuration);

            builder.RegisterApiServices();
            builder.RegisterAuthServices();

            builder.Services.AddFluentValidationAutoValidation();

            builder.Services.RegisterApplicationLayer(builder.Configuration);

            builder.WebHost.ConfigureKestrel((context, options) =>
            options.Limits.MaxRequestBodySize = 52428800
            );

            return builder.Build();
        }

        public static WebApplication ConfigurePipeline(this WebApplication app)
        {
            app.UseHsts();
            app.UseHttpsRedirection();

            if (app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "estate-cost.web.api v1"));
                app.UseDeveloperExceptionPage();
            }

            app.UseSerilogRequestLogging();

            app.UseRouting();

            // TODO: @Semyon CORS?
            app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin()
                .WithExposedHeaders(tusdotnet.Helpers.CorsHelper.GetExposedHeaders()));

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endp =>
            {
                endp.MapControllers();
            });

            return app;
        }
    }
}