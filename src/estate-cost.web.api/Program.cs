using Serilog;

namespace estate_cost.web.api
{
    internal static class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .CreateBootstrapLogger();

            Log.Information($"Starting application: {typeof(Program).Assembly.GetName().Name}");

            try
            {
                var builder = WebApplication.CreateBuilder(args);

                builder.Host.UseSerilog((ctx, lc) => lc
                    .WriteTo.Console(outputTemplate: "[{Timestamp:u} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}")
                    .Enrich.FromLogContext()
                    .ReadFrom.Configuration(ctx.Configuration));

                var app = builder
                    .ConfigureServices()
                    .ConfigurePipeline();

                app.Run();
            }
            catch (Exception ex) when (ex.GetType().Name is not "StopTheHostException") // https://github.com/dotnet/runtime/issues/60600
            {
                Log.Fatal(ex, "Unhandled exception");
            }
            finally
            {
                Log.Information("Shut down complete");
                Log.CloseAndFlush();
            }
        }
    }
}