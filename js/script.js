
//global variable declaration
var flag=0;
var errorFlag=0;

$(()=>{

//adding event change on programming language combo box
$("#programming_language_comboBox").change(function(){

$("#right_division_bottom_div").html("");


var language=$("#programming_language_comboBox").val();
if(language==-1)
{
$("#code").val("");
}

//if selected language is c then default c code should be visible
if(language==1)
{
var defaultCCode = `
#include <stdio.h>
int main() {
printf("Hello, World!\\n");
return 0;
}
`;
$("#code").val(defaultCCode);
}

//if selected language is c++ then default c++ code should be visible
if(language==2)
{
var defaultCppCode = `#include <iostream>
using namespace std;
int main() {
cout << "Hello, C++ World!" << endl;
return 0;
}`;
$("#code").val(defaultCppCode);
}

//if selected language is java then default java code should be visible
if(language==3)
{
var defaultJavaCode = `public class psp 
{
public static void main(String[] args) 
{
System.out.println("Hello World");
}
}`;
$("#code").val(defaultJavaCode);
}

});
//end of adding change event on programming language combo box


//adding click event on text area you can only write code if you selected any language c,c++,java
$("#code").click(function(){
var language=$("#programming_language_comboBox").val();
if(language==-1)
{
alert("Please select programming language");
return;
}
});
//end of click event on text area

//adding click event of compile button 
$("#compilebtn").click(function(){
var programming_language_comboBox=$("#programming_language_comboBox");
var language=$("#programming_language_comboBox").val();
programming_language_comboBox.css("color","black");;
var code=$("#code").val();
if(code.length==0)
{
alert("Write code .....");
return;
}
if(language==-1)
{
alert("Please select programming language .....");
programming_language_comboBox.css("color","red");
return;
}
if(language==1)
{

 $.ajax({
      url: '/compiler/compiler1',       // your servlet URL
      type: 'POST',
      data: {
        code: code
      },
      success: function(response) {
if(!(response.includes("Error")))
{
flag=1;
errorFlag=0;
}
else
{
errorFlag=1;
}

if(response.includes("Error"))
{
$("#right_division_bottom_div").css("color","red");           
}
else
{
$("#right_division_bottom_div").css("color","green");
} 

$("#right_division_bottom_div").html(response.replace(/\n/g, "<br>")); 
 

        
      },
      error: function(xhr, status, error) {
        console.error("❌ Error occurred:", status, error);
        alert("Something went wrong: " + xhr.responseText);

$("#right_division_bottom_div").text("Something went wrong : " + xhr.responseText);       

      }
    });

}
if(language==2)
{
 $.ajax({
      url: '/compiler/compiler2',       // your servlet URL
      type: 'POST',
      data: {
        code: code
      },
      success: function(response) {
if(!(response.includes("Error")))
{
flag=1;
errorFlag=0;
}
else
{
errorFlag=1;
}
if(response.includes("Error"))
{
$("#right_division_bottom_div").css("color","red");           
}
else
{
$("#right_division_bottom_div").css("color","green");
} 

$("#right_division_bottom_div").html(response.replace(/\n/g, "<br>"));       

    
      },
      error: function(xhr, status, error) {
        console.error("❌ Error occurred:", status, error);
        alert("Something went wrong: " + xhr.responseText);

$("#right_division_bottom_div").text("Something went wrong : " + xhr.responseText);       

      }
    });
}
if(language==3)
{

$.ajax({
      url: '/compiler/compiler3',       // your servlet URL
      type: 'POST',
      data: {
        code: code
      },
      success: function(response) {
if(!(response.includes("Error")))
{
flag=1;
errorFlag=0;
}
else
{
errorFlag=1;
}
if(response.includes("Error"))
{
$("#right_division_bottom_div").css("color","red");           
}
else
{
$("#right_division_bottom_div").css("color","green");
} 

$("#right_division_bottom_div").html(response.replace(/\n/g, "<br>"));           
      },
      error: function(xhr, status, error) {
       $("#right_division_bottom_div").text("Something went wrong : " + xhr.responseText);       

      }
    });





}

});
//end of adding click event to compile button


//adding click event on run button
$("#runbtn").click(function(){
if(errorFlag==1)
{
alert("Fix bug in the code then compile it and then run");
return;
}
if(flag==0)
{
alert("first compile your code");
return;
}
var language=$("#programming_language_comboBox").val();

if(language==1)
{
 $.ajax({
      url: '/compiler/runner1',       // your servlet URL
      type: 'POST',
            success: function(response) {
$("#right_division_bottom_div").html(response.replace(/\n/g, "<br>")); 
flag=0;      
      },
      error: function(xhr, status, error) {
        $("#right_division_bottom_div").text("Something went wrong : " + xhr.responseText);       

      }
    });
}

if(language==2)
{
 $.ajax({
      url: '/compiler/runner2',       // your servlet URL
      type: 'POST',
            success: function(response) {
$("#right_division_bottom_div").html(response.replace(/\n/g, "<br>"));
flag=0;       
      },
      error: function(xhr, status, error) {
        $("#right_division_bottom_div").text("Something went wrong : " + xhr.responseText);       

      }
    });
}
if(language==3)
{

 $.ajax({
      url: '/compiler/runner3',       // your servlet URL
      type: 'POST',
            success: function(response) {
$("#right_division_bottom_div").html(response.replace(/\n/g, "<br>"));
flag=0;       
      },
      error: function(xhr, status, error) {
        $("#right_division_bottom_div").text("Something went wrong : " + xhr.responseText);       

      }
    });
}

});
//end of adding click event on run button

});
