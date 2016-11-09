var myApp = angular.module("myModule",  ['angularUtils.directives.dirPagination']);


   states = {     "AL": "Alabama",     "AK": "Alaska",     "AS": "American Samoa",     "AZ": "Arizona",     "AR": "Arkansas",     "CA": "California",     "CO": "Colorado",     "CT": "Connecticut",     "DE": "Delaware",     "DC": "District Of Columbia",     "FM": "Federated States Of Micronesia",     "FL": "Florida",     "GA": "Georgia",     "GU": "Guam",     "HI": "Hawaii",     "ID": "Idaho",     "IL": "Illinois",     "IN": "Indiana",     "IA": "Iowa",     "KS": "Kansas",     "KY": "Kentucky",     "LA": "Louisiana",     "ME": "Maine",     "MH": "Marshall Islands",     "MD": "Maryland",     "MA": "Massachusetts",     "MI": "Michigan",     "MN": "Minnesota",     "MS": "Mississippi",     "MO": "Missouri",     "MT": "Montana",     "NE": "Nebraska",     "NV": "Nevada",     "NH": "New Hampshire",     "NJ": "New Jersey",     "NM": "New Mexico",     "NY": "New York",     "NC": "North Carolina",     "ND": "North Dakota",     "MP": "Northern Mariana Islands",     "OH": "Ohio",     "OK": "Oklahoma",     "OR": "Oregon",     "PW": "Palau",     "PA": "Pennsylvania",     "PR": "Puerto Rico",     "RI": "Rhode Island",     "SC": "South Carolina",     "SD": "South Dakota",     "TN": "Tennessee",     "TX": "Texas",     "UT": "Utah",     "VT": "Vermont",     "VI": "Virgin Islands",     "VA": "Virginia",     "WA": "Washington",     "WV": "West Virginia",     "WI": "Wisconsin",     "WY": "Wyoming" }

myApp.controller("myController",function($scope) {
	
		$.ajax({
        url: '../main.php',
        type: 'GET',
        dataType: "json",
        data: {},
        success: function(data) {
	        console.log(data);
			resp = data[0]["results"];	
			$scope.people =[];	
			  $(resp).each( function(index, obj){
				  if(obj.district==null) {
					  obj.district="N.A";
				  } else {
					  obj.district="District "+obj.district;
				  }
				  var state=obj.state;
				  var partyImage="http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
				  var chamberImage = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
				  if(obj.party=="D") {
					  partyImage="http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
				  }
				  if(obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1) == "Senate") {
				  var chamberImage = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
				  }
			$scope.$apply(function() {
				 $scope.people.push({
					 "party": obj.party,
					 "firstName": obj.first_name,
					 "lastName": obj.last_name,
					 "chamber": obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1),
					 "district": obj.district,
					 "state": states[state],
					 "partyImage":partyImage,
					 "chamberImage":chamberImage
				 });
				 $scope.orderByState="state";
				 $scope.orderByLastName="lastName";
				 $scope.R="r.jpg";
				 $scope.D="d.jpg";
				 $scope.pageSize = 5;

				 $scope.currentPage = 1;
				});

				 
				 			 
				 
			  });
        },
        error: function(xhr, status, error){
        }
    });

});

