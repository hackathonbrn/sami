using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace YOLOAnalytics
{
    public class HTTPRequets
    {
        public static string SendData(string data)
        {
            HttpWebRequest myHttpWebRequest = (HttpWebRequest)HttpWebRequest.Create("https://10.8.0.10/api/uploadData");
            myHttpWebRequest.Method = "POST";
            myHttpWebRequest.Referer = "http://10.8.0.23";
            myHttpWebRequest.UserAgent = "Mozila/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; MyIE2;";
            myHttpWebRequest.Accept = "image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/x-shockwave-flash, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*";
            myHttpWebRequest.Headers.Add("Accept-Language", "ru");

            myHttpWebRequest.ContentType = "application/x-www-form-urlencoded";

            string sQueryString = data;

            byte[] ByteArr = System.Text.Encoding.GetEncoding(1251).GetBytes(sQueryString);

            myHttpWebRequest.ContentLength = ByteArr.Length;
            myHttpWebRequest.GetRequestStream().Write(ByteArr, 0, ByteArr.Length);
            HttpWebResponse myHttpWebResponse = (HttpWebResponse)myHttpWebRequest.GetResponse();
            StreamReader myStreamReader = new StreamReader(myHttpWebResponse.GetResponseStream(), System.Text.Encoding.GetEncoding(1251));

            return myStreamReader.ReadToEnd().ToString();
        }
    }
}