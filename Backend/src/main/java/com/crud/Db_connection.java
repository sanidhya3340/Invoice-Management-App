package com.crud;

import java.sql.Connection;
import java.sql.DriverManager;

public class Db_connection {
	public Connection getconnection() {
		String url = "jdbc:mysql://localhost:3306/grey_goose";
		String uname = "root";
		String pwd = "sanu@4321";
		Connection con = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection(url, uname, pwd);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return con;
	}
}