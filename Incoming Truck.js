function fetchDataFromShopee() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var url = 'https://spx.shopee.vn/mgmt/api/pc/forward/data/api_mart/mgmt_app/data_api/operation__soc_facility__incoming_lh_trips__10m';
  
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': {
      'X-CSRFToken': '0d58f6896fab44e6acdefde055ae752d',
      'Cookie': '_fbp=fb.1.1717854295257.817111331449249255; _ga_ZX45B0LRFV=GS1.1.1718710876.2.1.1718711289.60.0.0; _gcl_au=1.1.557144583.1719769464; SPC_T_ID=9qcnxGRsm6IcFcq8jt4rZKh3bGdlmZWsxMsA4au3bmKPl5W43Er6lBImqwIJd/Htsqn6xSrL0VFYTO/FpwTLrGzAQB7X9c+1YDex0LNCgrePR0QrIkfd2CsxdVbPv32yw0Ea6gYrEraML0iUECoPtjR22FmUwPs+c2h9jF3F0h0=; SPC_T_IV=d250RFdWVmE3Y3FaZWJjSA==; SPC_F=okfarSLujLuWf4rK8WrUHMOOiwt5vM3l; REC_T_ID=64674e8d-3708-11ef-87dd-063e593d6fa3; SPC_R_T_ID=9qcnxGRsm6IcFcq8jt4rZKh3bGdlmZWsxMsA4au3bmKPl5W43Er6lBImqwIJd/Htsqn6xSrL0VFYTO/FpwTLrGzAQB7X9c+1YDex0LNCgrePR0QrIkfd2CsxdVbPv32yw0Ea6gYrEraML0iUECoPtjR22FmUwPs+c2h9jF3F0h0=; SPC_R_T_IV=d250RFdWVmE3Y3FaZWJjSA==; _hjSessionUser_868286=eyJpZCI6ImI0MTM4ZWNlLTVmM2ItNWMzNS05NjU3LTA1NDA2YzQ5OWJiMiIsImNyZWF0ZWQiOjE3MTk3Njk0NjY1NzksImV4aXN0aW5nIjpmYWxzZX0=; _ga=GA1.2.1143980277.1717854295; _ga_4GPP1ZXG63=GS1.1.1719769466.1.1.1719771096.60.0.0; google_auth_redirect=https://spx.shopee.vn/; csrftoken=0d58f6896fab44e6acdefde055ae752d; fms_user_id=1548; fms_user_skey=vCj3dDMy6OiPZKoYRBAiZ4rMTwa4xHdx2eZdmSBBjBt330QkOM8hrW27o0MoN0yw; fms_display_name=kiet.trantuan; spx_st=1; spx_cid=VN; spx_uid=1548; spx_uk=vCj3dDMy6OiPZKoYRBAiZ4rMTwa4xHdx2eZdmSBBjBt330QkOM8hrW27o0MoN0yw; spx_dn=kiet.trantuan; spx-admin-lang=en; spx-lang=en; spx-admin-device-id=01538a6e5caf2d9c36d40cb47e3ab313'
    }
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var content = response.getContentText();
    Logger.log(content); // Log the response content for debugging

    var responseData = JSON.parse(content);
    var data = responseData.data.list; // Adjust to the correct nested structure
    Logger.log(data); // Log the parsed data for debugging

    // Check if data is an array and not empty
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Data is not in expected format or empty");
    }

    // Clear the sheet before adding new data
    sheet.clear();

    // Add headers to the sheet (Assuming data is an array of objects)
    var headers = Object.keys(data[0]);
    for (var i = 0; i < headers.length; i++) {
      sheet.getRange(1, i + 1).setValue(headers[i]);
    }

    // Add data to the sheet
    for (var j = 0; j < data.length; j++) {
      for (var k = 0; k < headers.length; k++) {
        sheet.getRange(j + 2, k + 1).setValue(data[j][headers[k]]);
      }
    }
  } catch (error) {
    Logger.log("Error: " + error.message);
  }
}

function createTrigger() {
  ScriptApp.newTrigger('fetchDataFromShopee')
    .timeBased()
    .everyHours(1)
    .create();
}
