using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using YOLOAnalytics.yolo;

namespace YOLOAnalytics
{
    public class Global : System.Web.HttpApplication
    {
        public static string path = HttpContext.Current.Server.MapPath(".");

        private static YoloWrapper _yoloWrapper;

        private bool usingYolo = true;

        protected void Application_Start(object sender, EventArgs e)
        {
            System.Environment.SetEnvironmentVariable("Path", path + "\\yoloData\\accord\\");
            yoloInit();
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {
            yoloDispose();
        }

        private void yoloInit()
        {
            if (usingYolo)
            {
                
                    Initialize(path);
                
            }
        }

        private void yoloDispose()
        {
            if (usingYolo)
            {
                _yoloWrapper.Dispose();
            }
        }

        public static string Detect()
        {
            if (_yoloWrapper == null)
            {
                return "wrapper error";
            }

            var memoryTransfer = true;
            string p = path + "\\yoloData\\test.jpg";

            var imageData = File.ReadAllBytes(p);

            var sw = new Stopwatch();
            sw.Start();
            List<YoloItem> items;
            if (memoryTransfer)
            {
                items = _yoloWrapper.Detect(imageData).ToList();
            }
            else
            {
                items = _yoloWrapper.Detect(p).ToList();
            }
            sw.Stop();

            string s = "";
            for (int i = 0; i < items.Count; i++)
            {
                YoloItem item = items.ElementAt(i);
                s += item.Type + " - " + item.Width + " : " + item.Height + "<br><br>";
            }

            return s;
        }

        public static YoloItem[] Detect(string path)
        {
            var memoryTransfer = true;
            string p = path;

            var imageData = File.ReadAllBytes(p);

            var sw = new Stopwatch();
            sw.Start();
            List<YoloItem> items;
            if (memoryTransfer)
            {
                items = _yoloWrapper.Detect(imageData).ToList();
            }
            else
            {
                items = _yoloWrapper.Detect(p).ToList();
            }
            sw.Stop();

            return items.ToArray();
        }

        public static YoloItem[] Detect(byte[] image)
        {
            List<YoloItem> items;
            items = _yoloWrapper.Detect(image).ToList();

            return items.ToArray();
        }

        private static void Initialize(string path)
        {
            var configurationDetector = new ConfigurationDetector();
            var config = configurationDetector.Detect(path + "\\yoloData\\");

            if (config == null)
            {
                return;
            }

            Initialize(config);
        }

        private static void Initialize(YoloConfiguration config)
        {
            
                if (_yoloWrapper != null)
                {
                    _yoloWrapper.Dispose();
                }

                _yoloWrapper = new YoloWrapper(config.ConfigFile, config.WeightsFile, config.NamesFile, 0);
            
        }
    }
}