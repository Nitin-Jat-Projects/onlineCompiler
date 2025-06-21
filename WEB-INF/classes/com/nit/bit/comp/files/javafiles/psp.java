package com.nit.bit.comp.files.javafiles;
public class psp 
{
public static void main(String[] args) 
{
 try {
            int a = 10;
            int b = 0;
            int result = a / b; // This will throw ArithmeticException
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero.");
        }

        System.out.println("Program continues after the try-catch block.");
}
}