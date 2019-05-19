using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YOLOAnalytics
{
    /// <summary>
    /// Сводное описание для CameraThread
    /// </summary>
    public class CameraThread : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var q = context.Request.QueryString;
            string[] url = new string[] { "" };
            foreach (var key in q)
            {
                url = q.GetValues("url");
            }

            if (url[0] == "")
            {
                return;
            }

            int frame = 0;

            //coming_soon
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}