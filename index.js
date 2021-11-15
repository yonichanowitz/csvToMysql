require('dotenv').config();
import csvtojson from 'csvtojson';
import { createConnection } from "mysql";
import xlsx from 'node-xlsx';
import fs from 'fs';
import { resolve } from 'path';
import { rejects } from 'assert';
import { getHeapSpaceStatistics } from 'v8';

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

// Establish connection to the database
let conn = createConnection({
	host: hostname,
	user: username,
	password: password,
	database: process.argv[3],
});


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

conn.connect(async(err) => {
	if (err) {return console.error(
			'error: ' + err.message);
		}
	
	// const getColNameStatement = `SELECT COLUMN_NAME  FROM INFORMATION_SCHEMA.COLUMNS`;

	
	conn.query(getColNameStatement, 
		(err, results) => {
		if (err) {
			return console.log(err);
		};
		
		setColNameList(results);
	})		

});


csvtojson().fromFile(fileName).then(source => {

	let 
	// Fetching the data from each row
	
	for (let i = 0; i < source.length; i++) {
		let clientsTable ={
				first_name: source[i]["FIRST NAME"],
				last_name: source[i]["LAST NAME"],
				dob: source[i]['DOB'],
				// age: source[i]["AGE"],
				gender: source[i]["GENDER"],
				marital_status: source[i]["MARITAL STATUS"],
				deceased_date: source[i]['DECEASED/PASSED AWAY DATE'],
				status_id: queryReturnIdFrom('client_statuses',source[i]['CLIENT STATUS']),
				// EMAIL ADDRESS	
			};
		let doctorsTable = {
			/*take referal string, remove 'dr' from it, split at space create var firstName and var lastName
			on doctors table, first_name = firstName, last_name = lastName
			work_phone = PHONE 1
			if row where first_name and last_name !== firstName and lastName, insert in doctors table, and get doctor id
			else, get doctor id
			on referrals pivot table, add client_id = client.id, and doctor_id = doctor id*/
			
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
				and update person_language pivot table with person_id = client.id, person_type = clients and language_id languages.id
			else update person_language pivot table with person_id = client.id, person_type = clients and language_id languages.id
			 */
			changedLanguageData: () => {var splitUp = source[i]['LANGUAGE'].split(' '|'/'); return splitUp.replace(splitUp.charAt(0),splitUp.charAt(0).toUpperCase())},

			name: conn.query('INSERT IGNORE INTO languages WHERE NAME = ?', changedLanguageData, 
				function(err, result) {
					if(err) {
						console.log(err);
					}

			}),
				
		};
		let clientPhoneNumbersTable = {
			//two insert statements
			client_id = client.id,
			number = source[i]['CELL PHONE #'],
			type = "cell",
			
			client_id = client.id,
			number = source[i]['HOME PHONE #'],
			type = "home",
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
		let clientContactsTable = {
			// two insert statements

			client_id: client.id,
			//split source[i]['CONTACT 1: NAME'] on space. first part of string = firstName, second part of string = lastName
			first_name: firstName,
			last_name: lastName,
			relationship: souurce[i]['CONTACT 1: RELATIONSHIP'],
			phone: source[i]['CONTACT 1: NUMBER'],
			email: source[i]['CONTACT 1: EMAIL ADDRESS'],

			client_id: client.id,
			//split source[i]['CONTACT 2: NAME'] on space. first part of string = firstName, second part of string = lastName
			first_name: firstName,
			last_name: lastName,
			relationship: souurce[i]['CONTACT 2: RELATIONSHIP'],
			phone: source[i]['CONTACT 2: NUMBER'],
			email: source[i]['CONTACT 2: EMAIL ADDRESS'],
		};
		let clientDiagnosesTable = {// DIAGNOSIS 	
			// STAGE	
			// CELL DESCRIPTION (ESTROGEN, PROGESTERONE, PROLIFERATION)	
			// DATE OF DIAGNOSIS	
			// AGE UPON DIAGNOSIS
			// REMISSION Y/N	
			// REMISSION DATE	
			// NOTES:
		}



		function queryReturnIdFrom(table, referenceColumn){
			//query table for id that is same as string in statusName
				
			conn.query('SELECT id FROM ?? WHERE name = ?', [table, referenceColumn], 
				(err, results) => {
				if (err) {
					return console.log(err);
				};
				return results;
			})
		};
				
		
			
			// ACCOMPANIED BY	
			// ACCOMPANIED RELATIONSHIP	
			
			// HAS DONE SCANS, TESTS	

			// SURGERIES	
			// MEDICINES	
			// TREATMENTS	
			// TREATMENT START DATE	
				

			// STAFF MEMBER MEETING WITH FAMILY	
			// DATE CLIENT SPOKE TO STAFF	
			// CHILDREN/ DOB	
			
			// CARING CONNECTION		
			// OFFERING:


		var insertStatement =
		`INSERT INTO sample values(?, ?, ?, ?)`;
		var items = [Name, Email, Age, City];

		// Inserting data of current row
		// into database

		conn.query(`INSERT INTO clients (first_name, last_name) VALUES ('yechi', 'hamelech')`, 
		(err, results) => {
		if (err) {
			console.log(err);
			return;
		};
		console.log("Succesfully added! " + results.insertId);
	})	


	}

	console.log(
"All items stored into database successfully");

    
});

// conn.end();