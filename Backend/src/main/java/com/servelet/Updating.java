package com.servelet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class Updating
 */
@WebServlet("/Updating")
public class Updating extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Updating() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			HashMap<Object,Object> Response = new HashMap<Object,Object>();
			
			String invoice_currency = request.getParameter("invoice_currency");
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			String sl_no = request.getParameter("sl_no");
//			double cust_payment_terms = request.getParameter("cust_payment_terms") != null ? Double.parseDouble(request.getParameter("cust_payment_terms")) : 0;
			Class.forName("com.mysql.jdbc.Driver");
	    	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","sanu@4321");
	    	
	    	String sql="UPDATE winter_internship set invoice_currency = ? ,cust_payment_terms=? WHERE sl_no=?";
	    	PreparedStatement ps = conn.prepareStatement(sql);
	    	ps.setString(1, invoice_currency);
	    	ps.setString(2, cust_payment_terms);
	    	ps.setString(3, sl_no);
//	    	ps.setDouble(3, cust_payment_terms);
	    	
	    	if(ps.executeUpdate()>0) {
	    		 Response.put("update",true);
	    	 }else {
	    		 Response.put("update",false);
	    	 }
			Gson gson = new Gson();
			String JSONresponse = gson.toJson(Response);
			response.getWriter().append(JSONresponse);
		}catch(Exception e) {
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
