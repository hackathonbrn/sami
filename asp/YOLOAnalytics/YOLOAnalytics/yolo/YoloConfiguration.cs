using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YOLOAnalytics.yolo
{
    public class YoloConfiguration
    {
        public string ConfigFile { get; set; }
        public string WeightsFile { get; set; }
        public string NamesFile { get; set; }

        public YoloConfiguration(string configFile, string weightsFile, string namesFile)
        {
            this.ConfigFile = configFile;
            this.WeightsFile = weightsFile;
            this.NamesFile = namesFile;
        }
    }
}