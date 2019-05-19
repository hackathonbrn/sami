using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;
using YOLOAnalytics.yolo;

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
            CreateData createData = new CreateData(allData[n]);
            YoloItem[][] data = createData.GetRecognitionData();
            string resultData = JsonConvert.SerializeObject(data);
            File.AppendAllText(Global.path + "recognitionData\\" + n + ".json", resultData);
            HTTPRequets.SendData(resultData);
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