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
 * Servlet implementation class Deleting
 */
@WebServlet("/Deleting")
public class Deleting extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Deleting() {
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
			
			String sl_no = request.getParameter("sl_no");
			Class.forName("com.mysql.jdbc.Driver");
	    	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","sanu@4321");
	    	String sql="DELETE FROM winter_internship WHERE sl_no=?";
	    	PreparedStatement ps = conn.prepareStatement(sql);
	    	
	    	ps.setString(1, sl_no);
	    	
	    	if(ps.executeUpdate()>0) {
	    		 Response.put("delete",true);
	    	 }else {
	    		 Response.put("delete",false);
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
