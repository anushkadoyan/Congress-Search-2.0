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
			legislators = data[0]["results"];	
			billsOld = data[2]["results"];
			billsNew= data[3]["results"];
			committees = data[1]["results"];
			$scope.people =[];	
			$scope.billsNew =[];	
			$scope.billsOld =[];	
			$scope.committees =[];	
			
			//get legislators
			$(legislators).each( function(index, obj){
				if(obj.district==null) {
					obj.district="N.A";
				} else {
					obj.district="District "+obj.district;
				}
				var state=obj.state;
				var partyImage="http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
				var chamberImageForLegislators = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
				if(obj.party=="D") {
					partyImage="http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
				}
				if(obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1) == "Senate") {
					chamberImageForLegislators = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
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
						"chamberImage":chamberImageForLegislators
					});
				
				}); 
			});
			//new bills
			
			// fields=bill_id,bill_type,chamber,introduced_on,official_title,sponsor
			
			$(billsNew).each( function(index, obj){
				if(obj.district==null) {
					obj.district="N.A";
				} else {
					obj.district="District "+obj.district;
				}
				var state=obj.state;
				var chamberImageForBills = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
				if(obj.party=="D") {
					partyImage="http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
				}
				if(obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1) == "Senate") {
					chamberImageForBills = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
				}
				$scope.$apply(function() {
					$scope.billsNew.push({
						"id": obj.bill_id,
						"type": obj.bill_type,
						"title": obj.official_title,
						"chamber": obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1),
						"introduced": obj.introduced_on,
						"sponsor": obj.sponsor,
						"chamberImage":chamberImageForBills
					});
				
				}); 
			});
			//old bills
			$(billsOld).each( function(index, obj){
				if(obj.district==null) {
					obj.district="N.A";
				} else {
					obj.district="District "+obj.district;
				}
				var state=obj.state;
				var chamberImageForBills = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
				if(obj.party=="D") {
					partyImage="http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
				}
				if(obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1) == "Senate") {
					chamberImageForBills = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
				}
				$scope.$apply(function() {
					$scope.billsOld.push({
						"id": obj.bill_id,
						"type": obj.bill_type,
						"title": obj.official_title,
						"chamber": obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1),
						"introduced": obj.introduced_on,
						"sponsor": obj.sponsor,
						"chamberImage":chamberImageForBills
					});
				
				}); 
			});	
			$(committees).each( function(index, obj){
				if(obj.office==null) {
					obj.office="N.A";
				}
				if(obj.phone==null) {
					obj.phone="N.A";
				}
				if(obj.parent_committee_id==null) {
					obj.parent_committee_id="N.A";
				}
				if(obj.name==null) {
					obj.name="N.A";
				}
				var chamberImageForCommittees = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
				
				if(obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1) == "Senate") {
					chamberImageForCommittees = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
				}
				$scope.$apply(function() {
					$scope.committees.push({
						"name": obj.name,
						"parent": obj.parent_committee_id,
						"id": obj.committee_id,
						"chamber": obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1),
						"contact": obj.phone,
						"office": obj.office,

						"chamberImage":chamberImageForCommittees
					});
									console.log($scope);

				}); 
			});			  
			  
			  
			  
        },
        error: function(xhr, status, error){
        }
    });
	$scope.orderByState="state";
	$scope.orderByLastName="lastName";
	$scope.R="r.jpg";
	$scope.D="d.jpg";
	$scope.pageSize = 5;
	$scope.currentPage = 1;
	$scope.customFilter = '';
	$('#myTabs a').click(function (e) {
		e.preventDefault();
		var filterBy = $(this).attr('id');
		$scope.$apply(function() {
			$scope.customFilter = filterBy;
			});
// 		$(this).tab('show')
	})
});

