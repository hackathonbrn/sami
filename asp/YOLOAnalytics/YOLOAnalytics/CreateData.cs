using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using YOLOAnalytics.yolo;

namespace YOLOAnalytics
{
    public class CreateData
    {
        string path = "";

        public CreateData(string path)
        {
            this.path = path;
        }

        byte[][] GetFrames()
        {
            string args = "-i " + path + " " + Global.path + "\\img\\img%d.png";
            ProcessStartInfo info = new ProcessStartInfo(Global.path + "\\ffmpeg\\ffmpeg.exe", args);
            info.CreateNoWindow = true;
            Process processChild = Process.Start(info);
            string[] files = Directory.GetFiles(Global.path + "\\img\\");
            byte[][] frames = new byte[files.Length / 10][];
            for (int i = 0, j = 0, k = 0; i < files.Length; i++, j++)
            {
                if (j == 10)
                {
                    using (MemoryStream ms = new MemoryStream())
                    {
                        Bitmap bitmap = new Bitmap(files[i]);
                        bitmap.Save(ms, ImageFormat.Png);
                        frames[k] = ms.ToArray();
                        bitmap.Dispose();
                    }
                    k++;
                }
            }
            return frames;
        }

        public YoloItem[][] GetRecognitionData()
        {
            byte[][] frames = GetFrames();
            YoloItem[][] result = new YoloItem[frames.Length][];
            for (int i = 0;i < frames.Length; i++)
            {
                result[i] = Global.Detect(frames[i]);
            }
            return result;
        }
    }
}