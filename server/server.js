Meteor.startup(function () {

  if (Posts.find({}).count() === 0) {
    Posts.insert({
      title: Fake.sentence(),
      body: Fake.paragraph(),
      published: Fake.fromArray([true, false])
    });
  }
	
	ChartData.upsert(
		{ _id: "1000" },
		{ 
			chartDataType: "internal"
		}
	);    
    
	ChartData.upsert(
		{ _id: "2000" },
		{ 
			chartDataType: "external"
		}
	);    
	
	// For Notification
	Triggers.upsert(
		{ trigger: "showDepositAcceptedPopup" },
		{ 
			trigger: "showDepositAcceptedPopup", 
			state: false 
		}
	);


});


Meteor.methods({
	"resetDepositAcceptedPopupVar": function() {
		console.log("HUSSAIN - In resetDepositAcceptedPopupVar()");
	
		Triggers.upsert(
			{ trigger: "showDepositAcceptedPopup" },
			{ 
				trigger: "showDepositAcceptedPopup", 
				state: false 
			}
		);
	},
	
    "fetchChartData": function() {
        console.log("HUSSAIN - In fetchChartData()");    
        
        var response = Meteor.http.get("http://demo5783733.mockable.io/iotaseriesdata");
        if (response && response.statusCode == 200) {
            return JSON.parse(response.content);
        }
        else {
            console.log("Error in fetching chart data");
        }
    },
    
	"insertRegistration": function(data) {
		console.log("KARTHIK - In insertRegistration()");
        
        var id = Farmers.insert(data);
        
        data.id = id;
        
        var response = Meteor.http.post("https://api-eu.clusterpoint.com/2008/iotahackday.json", 
                      { 
                        headers : { 'Authorization':'Basic c2FpLnAyM0BnbWFpbC5jb206OTQ5MTUyODU0OQ==' },
                        data: data
                      }, function(error, result) {
                            
                            if(!error) {
                                console.log("Successful Insert");
                            }
                            else {
                                console.log(result.content);
                            }
                
                      });
        
        return { farmerId: (4346 + Math.floor(Math.random() * (200 - 4) + 4))}
	}
});