using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;

namespace YOLOAnalytics
{
    /// <summary>
    /// Сводное описание для CreateFromVideo
    /// </summary>
    public class CreateFromVideo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string[] allData = Directory.GetFiles(Global.path + "\\video\\");
            var q = context.Request.QueryString;
            string[] num = new string[] { "0" };
            foreach (var key in q)
            {
                num = q.GetValues("num");
            }
            int n = Convert.ToInt32(num[0]);
            if (n < allData.Length)
            {
                Directory.CreateDirectory(Global.path + "\\img\\" + n);
                string args = "-i " + allData[n] + " " + Global.path + "\\img\\" + n + "\\img%d.png";
                ProcessStartInfo info = new ProcessStartInfo(Global.path + "\\ffmpeg\\ffmpeg.exe", "-i " + allData[n] + " " + Global.path +  "\\img\\" + n + "\\img%d.png");
                info.CreateNoWindow = false;
                Process processChild = Process.Start(info);
            }
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