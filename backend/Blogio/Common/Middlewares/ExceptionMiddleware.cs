using Microsoft.AspNetCore.Mvc;
using System.Net;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            var statusCode = (int)HttpStatusCode.InternalServerError;

            var problem = new ProblemDetails
            {
                Title = "An unexpected error occurred on the server.",
                Status = statusCode,
                Detail = _env.IsDevelopment() ? ex.ToString() : null,
                Instance = context.Request.Path
            };

            _logger.LogError(ex, "An exception occurred. Path: {Path}, Method: {Method}, StatusCode: {StatusCode}",
                context.Request.Path,
                context.Request.Method,
                statusCode);

            context.Response.StatusCode = statusCode;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsJsonAsync(problem);
        }
    }
}
