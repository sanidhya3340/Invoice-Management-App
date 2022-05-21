package com.servelet;

import java.util.*;
import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Add
 */
@WebServlet("/Add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/grey_goose";
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Add() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String USER = "root";
	    String PASS = "sanu@4321";
	     
	     Connection conn = null;
	     
	     try {
	    	//Register JDBC driver
	    	 Class.forName(JDBC_DRIVER);
	    	 
	    	//Open a connection
	    	 conn = DriverManager.getConnection(DB_URL, USER, PASS);
		     
	    	 //reading data from request
	    	 String business_code = request.getParameter("business_code");
	    	 String cust_number = request.getParameter("cust_number");
//	    	 String clear_date = request.getParameter("clear_date");
//	    	 String buisness_year = request.getParameter("buisness_year");
//	    	 double doc_id = request.getParameter("doc_id") != null ? Double.parseDouble(request.getParameter("doc_id")) : 0;
//	    	 String posting_date1 = request.getParameter("posting_date") ;
//	    	 String document_create_date1 = request.getParameter("document_create_date");
//	    	 String due_in_date1 = request.getParameter("due_in_date");
//	    	 
//	    	 String invoice_currency = request.getParameter("invoice_currency");
//	    	 String document_type = request.getParameter("document_type");
//	    	 String posting_id1 = request.getParameter("posting_id");
//	    	 double total_open_amount = request.getParameter("total_open_amount") != null ? Double.parseDouble(request.getParameter("total_open_amount")) : 0;
//	    	 String baseline_create_date1 = request.getParameter("baseline_create_date");
//	    	 String cust_payment_terms = request.getParameter("cust_payment_terms");
//	    	 String invoice_id1 = request.getParameter("invoice_id");
//	    	 
//	    	 
////	    	 SimpleDateFormat formatter1=new SimpleDateFormat("yyyy-MM-dd");
//	    	 
//	    	 Date posting_date =  Date.valueOf(posting_date1);
//	    	 Date document_create_date = Date.valueOf(document_create_date1);
//	    	 Date due_in_date = Date.valueOf(due_in_date1);
//	    	 Date baseline_create_date = Date.valueOf(baseline_create_date1);
//	    	 
//	    	 float posting_id=Float.parseFloat(posting_id1);
//	    	 
//	    	 int invoice_id=Integer.parseInt(invoice_id1);  
	    	 
		   //Execute a query
//	    	 String sql = "INSERT IGNORE INTO winter_internship(business_code,cust_number,clear_date,buisness_year,doc_id"
//	    	 		+ ",posting_date,document_create_date,due_in_date"
//	    	 		+ ",invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,"
//	    	 		+ "invoice_id) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)";
	    	 
	    	 String sql = "INSERT IGNORE INTO winter_internship(business_code,cust_number) VALUES (?, ?)";
	    	 PreparedStatement ps = conn.prepareStatement(sql);
	    	 
	                ps.setString(1, business_code);  
	                ps.setString(2, cust_number); 
//	                ps.setString(3, clear_date);
//	                ps.setString(4, buisness_year);  
//	                ps.setDouble(5, doc_id);  
//	                ps.setDate(6, posting_date);
//	                ps.setDate(7, document_create_date);
//	                ps.setDate(8, due_in_date);
//	                ps.setString(9, invoice_currency);
//	                ps.setString(10, document_type);
//	                ps.setFloat(11, posting_id);
//	                ps.setDouble(12, total_open_amount);
//	                ps.setDate(13, baseline_create_date);
//	                ps.setString(14, cust_payment_terms);
//	                ps.setInt(15, invoice_id);
	                ps.executeUpdate();  
	              
	       	 	
	       	 	ps.close();
	       	 	conn.close();  
	     }
	       	 	catch(Exception e) {
	       	 		
	       	 		e.printStackTrace();
	       	 	}	
	}

}
