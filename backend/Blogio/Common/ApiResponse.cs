namespace Blogio.Common
{
    public class ApiResponse<T>
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = string.Empty;
        public int StatusCode { get; set; }
        public List<string>? Errors { get; set; }
        public T? Data { get; set; }

        public static ApiResponse<T> Success(T data, string message = "", int statusCode = 200) =>
            new() { IsSuccess = true, Message = message, StatusCode = statusCode, Data = data };

        public static ApiResponse<T> Fail(List<string> errors, string message = "", int statusCode = 400) =>
            new() { IsSuccess = false, Message = message, StatusCode = statusCode, Errors = errors };

        public static ApiResponse<T> Fail(string error, string message = "", int statusCode = 400) =>
            Fail(new List<string> { error }, message, statusCode);
    }
}
