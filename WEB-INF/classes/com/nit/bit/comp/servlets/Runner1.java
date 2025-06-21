package com.nit.bit.comp.servlets;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
public class Runner1 extends HttpServlet
{
public void doPost(HttpServletRequest request,HttpServletResponse response)
{
try
{
PrintWriter pw;
response.setContentType("text/plain");
String compiledFilePath=String.join(File.separator,"c:","tomcat9","webapps","compiler","WEB-INF","classes","com","nit","bit","comp","files","cfiles","example");
ProcessBuilder processBuilder=new ProcessBuilder(compiledFilePath);
Process process=processBuilder.start();
BufferedReader bufferedReader;
StringBuffer stringBuffer;
int character;
String line;
int result=process.waitFor();
if(result==0)
{
bufferedReader=new BufferedReader(new InputStreamReader(process.getInputStream()));
stringBuffer=new StringBuffer();
while(true)
{
character=bufferedReader.read();
if(character==-1) break;
stringBuffer.append((char)character);
}
String outputToSend=stringBuffer.toString();
pw=response.getWriter(); 
pw.println(outputToSend);
}else
{
bufferedReader=new BufferedReader(new InputStreamReader(process.getErrorStream()));
stringBuffer=new StringBuffer();
while(true)
{
line=bufferedReader.readLine();
if(line==null) break;
stringBuffer.append(line);
}
line=stringBuffer.toString();
pw=response.getWriter();
pw.println(line);
}
}catch(Exception exception)
{
System.out.println(exception);
}
}
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
doPost(request,response);
}
}