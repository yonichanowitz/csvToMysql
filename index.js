require('dotenv').config();
const csvtojson = require('csvtojson');
const mysql = require("mysql2");
const util = require("util"); 
const nodexlsx = require('node-xlsx');
const fs = require('fs');
// import { resolve } from 'path';
// import { rejects } from 'assert';
// import { getHeapSpaceStatistics } from 'v8';

//column name list array
let colNameList;

// Database credentials
const hostname = process.env.HOSTNAME,
	username = process.env.USERNAME,
	password = process.env.PASSWORD;

// CSV file name
const fileName = process.argv[2];

//check if xlsx or csv
// const isxlsx = process.argv[2].slice(-4);
// //if file is xlsx, convert to csv
// if(isxlsx = 'xlsx') {
  
//     var obj = xlsx.parse(__dirname + '/test.xls'); // parses a file
//     var rows = [];
//     var writeStr = "";

//     //looping through all sheets
//     for(var i = 0; i < obj.length; i++)
//     {
//         var sheet = obj[i];
//         //loop through all rows in the sheet
//         for(var j = 0; j < sheet['data'].length; j++)
//         {
//                 //add the row to the rows array
//                 rows.push(sheet['data'][j]);
//         }
//     }

//     //creates the csv string to write it to a file
//     for(var i = 0; i < rows.length; i++)
//     {
//         writeStr += rows[i].join(",") + "\n";
//     }

//     //writes to a file, but you will presumably send the csv as a      
//     //response instead
//     fs.writeFile(__dirname + "/test.csv", writeStr, function(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("test.csv was saved in the current directory!");
//     });
// }

//helper function to send data from db query to variable. gets list of db columns with lowercase names
function setColNameList(dbNameData) {
	const justColNames = dbNameData.map(colName => colName.COLUMN_NAME);
	const noUppers = justColNames.filter(element => {
	if(element.charAt(1) !== element.charAt(1).toUpperCase()) {
		return element;
		}
	});
	colNameList = noUppers.slice(-332, -1);
	// console.log(colNameList);
	return colNameList;
	
};

// conn.connect(async(err) => {
// 	if (err) {return console.error(
// 			'error: ' + err.message);
// 		}
// conn.query = util.promisify(conn.query).bind(conn);
	// const getColNameStatement = `SELECT COLUMN_NAME  FROM INFORMATION_SCHEMA.COLUMNS`;

	
	// conn.query(getColNameStatement, 
	// 	(err, results) => {
	// 	if (err) {
	// 		return console.log(err);
	// 	};
		
	// 	setColNameList(results);
	// })		

// });


csvtojson().fromFile(fileName).then(source => {

	//helper function to get words with uppercase
	function changedLanguageData(columField) {
		var splitUp = columField.split(/\/|\s/); 
		return splitUp.forEach(word => {
			word.replace(word.charAt(0),word.charAt(0).toUpperCase())
		})
	};
	function convertDateToMysql(csvDate) {
		if(csvDate.length < 8) {
			return null;
		};
		var splitArr = csvDate.split("/");
		var monthAddedZero = splitArr[0] < 10 ? '0'.concat(splitArr[0]) : splitArr[0];
		var dayAddedZero = splitArr[1] < 10 ? '0'.concat(splitArr[1]) : splitArr[1];
		var yearAdd = splitArr[2] < 100 ? '20'.concat(splitArr[2]) : splitArr[2];
		var returnArr = [yearAdd,monthAddedZero,dayAddedZero].join("-");

		return returnArr;
	};
	// function queryReturnIdFrom(table, referenceColumn){
	// 	//query table for id that is same as string in statusName
	// 		return new Promise(	function (resolve, reject){
	// 			conn.query('SELECT id FROM ?? WHERE name = ?', [table, referenceColumn], 
	// 			(err, results) => {
	// 			if (err) {
	// 				reject(err);
	// 			};
	// 				resolve(results);
	// 			})
	// 		}
	// 	);
	// };

	//establish DB connection
	const conn = mysql.createConnection({
		host: hostname,
		user: username,
		password: password,
		database: process.argv[3],
		multipleStatements: true,
	});

	// Fetching the data from each row
	
	for (let i = 0; i < source.length; i++) {
		let clientId = [];
		let clientsTable ={
				first_name: source[i]["FIRST NAME"],
				last_name: source[i]["LAST NAME"],
				dob: source[i]["DOB"] === '' ? '1000-01-01' : convertDateToMysql(source[i]["DOB"]) ,
				// age: source[i]["AGE"],
				gender: source[i]["GENDER"],
				marital_status: source[i]["MARITAL STATUS"],
				deceased_date: source[i]['DECEASED/PASSED AWAY DATE'] === '' ? '1000-01-01' : convertDateToMysql(source[i]['DECEASED/PASSED AWAY DATE'].slice(12)),
				// EMAIL ADDRESS	
			};
		let doctorsTable = {
			/*take referal string, remove 'dr' from it, split at space create var firstName and var lastName
			on doctors table, first_name = firstName, last_name = lastName
			work_phone = PHONE 1
			if row where first_name and last_name !== firstName and lastName, insert in doctors table, and get doctor id
			else, get doctor id
			on referrals pivot table, add client_id = clientId, and doctor_id = doctor id*/
			
			//need distinction between current doctor and refferal doctor

			// ['CURRENT DOCTOR/SPECIALIST']

			// ['REFERRAL 1']	
			// ['REFERRAL 1 PHONE']	
			// ['REFERRAL 2']	
			// ['REFERRAL 2 PHONE']
		};
		let languagesTable = {
			/*split csv LANGUAGE string at spaces
			capitalize each word
			check if any of the string is === one of the languages on languages table
			if false, add language to language table, 
				and update person_language pivot table with person_id = clientId, person_type = clients and language_id languages.id
			else update person_language pivot table with person_id = clientId, person_type = clients and language_id languages.id
			 */

			name: source[i]['LANGUAGE']
				
		};
		let clientPhoneNumbersTable = {
			//two insert statements
			number: source[i]['CELL PHONE #'],
			type: "cell",
			
			number: source[i]['HOME PHONE #'],
			type: "home",
		};
		let clientAddressesTable = {
			address_line_1: source[i]['ADDRESS'],
			city: source[i]['CITY'],
			state: source[i]['STATE'],
			zip: source[i]['ZIP']
		};
		let insurancePlansTable = {
			//if  company doesnt exist insert company, set client_id to clientId and insurance_plan_id to company.id on client_insurance_plan table
			//else
			company: source[i]['INSURANCE PLAN'],
			type: source[i]['TYPE']	
		};
		let clientContactsTable1 = {

			//split source[i]['CONTACT 1: NAME'] on space. first part of string = firstName, second part of string = lastName
			first_name: source[i]['CONTACT 1: NAME'].split(' ')[0],
			last_name: source[i]['CONTACT 1: NAME'].split(' ')[1],
			relationship: source[i]['CONTACT 1: RELATIONSHIP'],
			phone: source[i]['CONTACT 1: NUMBER'],
			email: source[i]['CONTACT 1: EMAIL ADDRESS'],

		};
		let clientContactsTable2 = {

			//split source[i]['CONTACT 2: NAME'] on space. first part of string = firstName, second part of string = lastName
			first_name: source[i]['CONTACT 2: NAME'].split(' ')[0],
			last_name: source[i]['CONTACT 2: NAME'].split(' ')[1],
			relationship: source[i]['CONTACT 2: RELATIONSHIP'],
			phone: source[i]['CONTACT 2: NUMBER'],
			email: source[i]['CONTACT 2: EMAIL ADDRESS'],
		};
		let clientDiagnosesTable = {

			diagnosis: source[i]['DIAGNOSIS'], 	
			stage: source[i]['STAGE	'],
			cell_description: source[i]['CELL DESCRIPTION (ESTROGEN, PROGESTERONE, PROLIFERATION)'],	
			diagnosis_date: source[i]['DATE OF DIAGNOSIS'],	


			age_upon_remission: source[i]['AGE UPON DIAGNOSIS'],
			// REMISSION Y/N	
			remission_date: source[i]['REMISSION DATE'],	
			notes: source[i]['NOTES:']
		};
		let clientTreatmentsTable = {
			// TREATMENTS	
			start_date: source[i]['TREATMENT START DATE'],	
			// SURGERIES	
			type: source[i]['MEDICINES']
		}
		let clientChildrenTable = {
			dob: source[i]['CHILDREN/ DOB']
		};		
			
			// ACCOMPANIED BY	
			// ACCOMPANIED RELATIONSHIP	
			
			// HAS DONE SCANS, TESTS	
				
			// STAFF MEMBER MEETING WITH FAMILY	
			// DATE CLIENT SPOKE TO STAFF	
			
			// CARING CONNECTION		
			// OFFERING:

		function assembleQueryFromObject (firstTable, firstObject){
			let tableName = firstTable;

			let columns = Object.keys(firstObject);  // create array of column names
			let values = Object.values(firstObject); //create array of values
			columns = columns.join(", "); //join coulmns into string 
			values = "'" + values.join("', '") + "'"; //join values to string
			return `START TRANSACTION; INSERT IGNORE INTO ${tableName} (${columns}, status_id) VALUE (${values}, (SELECT id FROM client_statuses WHERE name='${source[i]['CLIENT STATUS']}')) ON DUPLICATE KEY UPDATE first_name=first_name; SELECT LAST_INSERT_ID() INTO @csvToMysqlTempId;` 
	
		
		};
		function secondQueries(tname, tableobject){
			let tableName = tname;

			let columns = Object.keys(tableobject);  // create array of column names
			let values = Object.values(tableobject); //create array of values
			columns = columns.join(", "); //join coulmns into string 
			values = "'" + values.join("', '") + "'"; //join values to string
			return `INSERT IGNORE INTO ${tableName} (client_id, ${columns}) VALUE (@csvToMysqlTempId, ${values}) ON DUPLICATE KEY UPDATE id=id`;
		};


		conn.promise().query(assembleQueryFromObject('clients', clientsTable) 
		+ secondQueries('client_phone_numbers', clientPhoneNumbersTable)
		+ secondQueries('client_addresses', clientAddressesTable)
		+ secondQueries('insurance_plans', insurancePlansTable)
		+ secondQueries('client_contacts', clientContactsTable1)
		+ secondQueries('client_contacts', clientContactsTable2)
		+ secondQueries('client_diagnoses', clientDiagnosesTable)
		+ secondQueries('client_treatments', clientTreatmentsTable)
		+ secondQueries('client_children', clientChildrenTable) + ` COMMIT;`
		
		, 
			
		
		).then((response) => {clientId = response; console.log(clientId[0].insertId)}).then(console.log(clientId))

		
		.catch(err => {
			console.error(err);
			conn.end();
			return;
		});

	}

	console.log(
"All items stored into database successfully");

    
});