import axios from "axios";

export const addDatatoBackend = async(
  businessCode,
  custNumber,
  clearDate,
  buisnessYear,
  docId,
  postingDate,
  documentCreateDate,
  dueInDate,
  invoiceCurrency,
  documentType,
  postingId,
  totalOpenAmount,
  baselineCreateDate,
  custPaymentTerms,
  invoiceId,
) => {
    let data =
      "business_code=" +
      businessCode +
      "&cust_number=" +
      custNumber +
      "&clear_date=" +
      clearDate +
      "&buisness_year=" +
      buisnessYear +
      "&doc_id=" +
      docId +
      "&posting_date=" +
      postingDate +
      "&document_create_date=" +
      documentCreateDate +
      "&due_in_date=" +
      dueInDate +
      "&invoice_currency=" +
      invoiceCurrency +
      "&document_type=" +
      documentType +
      "&posting_id=" +
      postingId +
      "&total_open_amount=" +
      totalOpenAmount +
      "&baseline_create_date=" +
      baselineCreateDate +
      "&cust_payment_terms=" +
      custPaymentTerms +
      "&invoice_id=" +
      invoiceId;


      let response = await axios.get(
        "http://localhost:8080/Main_backend/Adding?" + data
      );

      return response.data;
};

export const updateData = async(slNo, invoiceCurrency, custPaymentTerms) => {
  // console.log(invoiceCurrency,custPaymentTerms,slNo);
  let data =  "invoice_currency="+invoiceCurrency+
              "&cust_payment_terms="+custPaymentTerms+
              "&sl_no=" +slNo ;

  let response = await axios.get(
    "http://localhost:8080/Main_backend/Updating?" + data
  );

  return response.data;
};

export const deleteData = async(slNo) => {
  let data =
    "sl_no=" +
    slNo;

  let response = await axios.get(
    "http://localhost:8080/Main_backend/Deleting?" + data
  );

  return response.data;
}


export const searchbycustid = (searchTerm, resdata) => {
  let newarray = resdata.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.cust_number.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return val;
    }
    return null;
  });

  return newarray;
};