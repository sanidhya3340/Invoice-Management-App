package com.servelet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.pojo.Invoice;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Servlet implementation class Fetchten
 */
@WebServlet("/Fetchten")
public class Fetchten extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private Gson gson = new Gson();
	
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/grey_goose";
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Fetchten() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    @SuppressWarnings("null")
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
    	String USER = "root";
	    String PASS = "sanu@4321";

	    Connection conn = null;
	    PreparedStatement ps = null;
	    
	    int startParameter = 1, pageCount=1;
	    int limitParameter = 10;
	    pageCount = Integer.parseInt(request.getParameter("page"));
	    startParameter = pageCount * limitParameter - limitParameter;
	    
	     try {
	    	//Register JDBC driver
	    	 Class.forName(JDBC_DRIVER);
	    	 
	    	//Open a connection
	    	 conn = DriverManager.getConnection(DB_URL, USER, PASS);
		     
		   //Execute a query
	    	
	    	 
	    	 String sql =  "select  sl_no,business_code,cust_number, clear_date, buisness_year,doc_id,posting_date,document_create_date"
	    	 		+ ", due_in_date, invoice_currency,invoice_id,aging_bucket,total_open_amount,cust_payment_terms from winter_internship LIMIT ?, ?;";
	    	
				
	    	 ps = conn.prepareStatement(sql);
	    	 HashMap<Object, Object> Response = new HashMap<Object,Object>();
	    	 ArrayList<Invoice> list = new ArrayList<>();
	    	 ps.setInt(1, startParameter);
	    	 ps.setInt(2, limitParameter);
	    	 ResultSet rs = ps.executeQuery();  
	            while(rs.next()){  
	                Invoice object = new Invoice();
	                object.setSlno(rs.getInt("sl_no"));
	                object.setbusiness_code(rs.getString("business_code"));
	                object.setcust_number(rs.getString("cust_number"));
	                object.setclear_date(rs.getString("clear_date"));
	                object.setbusiness_year(rs.getInt("buisness_year"));
	                object.setdoc_id(rs.getString("doc_id"));
	                object.setposting_date(rs.getDate("posting_date"));
	                object.setdocument_create_date(rs.getDate("document_create_date"));
	                object.setdue_in_date(rs.getDate("due_in_date"));
	                object.setinvoice_currency(rs.getString("invoice_currency"));
	                object.setinvoice_id(rs.getInt("invoice_id"));
	                object.setAgingBucket(rs.getString("aging_bucket"));
	                object.setAgingBucket(rs.getString("aging_bucket"));
	                object.settotal_open_amount(rs.getDouble("total_open_amount"));
	                object.setcust_payment_terms(rs.getString("cust_payment_terms"));
//	                object.setname_customer(rs.getString("name_customer"));
//	                object.setinvoice_id(rs.getString("invoice_id"));  
//	                object.settotal_open_amount(rs.getDouble("total_open_amount"));  
//	                object.setdue_in_date(rs.getDate("due_in_date"));
//	                object.setNotes(rs.getString("notes"));
	                list.add(object);  
	                Response.put("data",list);
//	                String userJsonString = this.gson.toJson(Response);

//	    	        PrintWriter out = response.getWriter();
//	    	        response.setContentType("application/json");
//	    	        response.setCharacterEncoding("UTF-8");
//	    	        out.print(userJsonString);
//	    	        out.flush();
	                
	            } 
	            String userJsonString = this.gson.toJson(Response);
//	            response.setHeader("Access-Control-Allow-Origin", "*");
    	        PrintWriter out = response.getWriter();
    	        response.setContentType("application/json");
    	        response.setCharacterEncoding("UTF-8");
    	        out.print(userJsonString);
    	        out.flush();
	              
	            rs.close();
	            ps.close();
	            conn.close();  
	     }
	     catch(Exception e) {
		    	//Handle errors for IO
		    	 e.printStackTrace();
	     }
	     
//	     String userJsonString = this.gson.toJson(Response);
//
//	        PrintWriter out = response.getWriter();
//	        response.setContentType("application/json");
//	        response.setCharacterEncoding("UTF-8");
//	        out.print(userJsonString);
//	        out.flush();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
