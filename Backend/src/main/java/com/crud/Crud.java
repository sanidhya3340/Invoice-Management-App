package com.crud;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.pojo.Invoice;

/**
 * Servlet implementation class Crud2
 */
@WebServlet("/Crud")
public class Crud extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Gson gson = new Gson();
	
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/grey_goose";
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Crud() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
		String USER = "root";
	    String PASS = "root";

	     Connection conn = null;
	     
	     try {
	    	//Register JDBC driver
	    	 Class.forName(JDBC_DRIVER);
	    	 
	    	//Open a connection
	    	 conn = DriverManager.getConnection(DB_URL, USER, PASS);
	    	 String invoice_id = request.getParameter("invoice_id");
		   //Execute a query
	    	 String sql = "SELECT name_customer, invoice_id, doc_id, posting_date, due_in_date, invoice_currency, total_open_amount FROM  invoice_details WHERE invoice_id='"+invoice_id+"'";
	    	 PreparedStatement ps = conn.prepareStatement(sql);
	    	 ResultSet rs = ps.executeQuery();  
	    	 ArrayList<Invoice> list = new ArrayList<>();
	    	   
	            while(rs.next()){  
	                Invoice object = new Invoice();
	                object.setname_customer(rs.getString("name_customer"));  
	                object.setinvoice_id(rs.getInt("invoice_id"));
	                object.setdoc_id(rs.getString("doc_id"));
	                object.setposting_date(rs.getDate("posting_date"));
	                object.setdue_in_date(rs.getDate("due_in_date"));
	                object.setinvoice_currency(rs.getString("invoice_currency")); 
	                object.settotal_open_amount(rs.getDouble("total_open_amount"));  
	                
	                
	                list.add(object);  
	                
	                String userJsonString = this.gson.toJson(object);

	    	        PrintWriter out = response.getWriter();
	    	        response.setContentType("application/json");
	    	        response.setCharacterEncoding("UTF-8");
	    	        out.print(userJsonString);
	    	        out.flush();
	            }
	            rs.close();
	            //stmt.close();
	            conn.close();  
	     }
	     catch(Exception e) {
		    	//Handle errors for IO
		    	 e.printStackTrace();
	     }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
