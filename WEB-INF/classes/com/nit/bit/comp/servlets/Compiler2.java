package com.nit.bit.comp.servlets;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;
public class Compiler2 extends HttpServlet
{
public void doPost(HttpServletRequest request,HttpServletResponse response)
{
try
{


// extracting data sent by client 
String code=request.getParameter("code");


String sourceFilePath=String.join(File.separator,"c:","tomcat9","webapps","compiler","WEB-INF","classes","com","nit","bit","comp","files","cppfiles","example.cpp");



String compiledFilePath=String.join(File.separator,"c:","tomcat9","webapps","compiler","WEB-INF","classes","com","nit","bit","comp","files","cppfiles","example");




File file=new File(sourceFilePath);
RandomAccessFile randomAccessFile=new RandomAccessFile(file,"rw");
randomAccessFile.setLength(0);
randomAccessFile.writeBytes(code);
randomAccessFile.close();

// Compilation code is here 
response.setContentType("text/plain");
PrintWriter pw=response.getWriter();
StringBuffer sb;
String line;
String responseToSend;





ProcessBuilder processBuilder=new ProcessBuilder("g++",sourceFilePath,"-o",compiledFilePath);
Process process=processBuilder.start();
int compilation_result=process.waitFor();
BufferedReader bufferedReader=null;
if(compilation_result!=0)
{
bufferedReader=new BufferedReader(new InputStreamReader(process.getErrorStream()));
sb=new StringBuffer();
line="";
sb.append("Error\n");
sb.append("\n");
while(true)
{
line=bufferedReader.readLine();
if(line==null) break;
sb.append(line+"\n");
}

int index=0;
while(true)
{
index=sb.indexOf(sourceFilePath);
if(index==-1) break;
sb.replace(index,index+sourceFilePath.length(),"");
}
responseToSend=sb.toString();
System.out.println(responseToSend);
pw.println(responseToSend);
}else
{
pw.println("compilation completed ");
}
}catch(Exception exception)
{
System.out.println(exception);
}
}
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
doGet(request,response);
}
}