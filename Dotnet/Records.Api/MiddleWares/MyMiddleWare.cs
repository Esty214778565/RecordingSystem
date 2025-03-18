namespace Records.Api.MiddleWares
{
    public class MyMiddleWare
    {
        private readonly RequestDelegate _next;
        public MyMiddleWare(RequestDelegate next)
        {
            _next= next;
        }
        public async Task Invoke(HttpContext context)
        {
            Console.WriteLine("in invoke in middleware");
            var flag = false;
            if (flag)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;

            }
            else
            {
                await _next(context);
            }
        }

    }
}
