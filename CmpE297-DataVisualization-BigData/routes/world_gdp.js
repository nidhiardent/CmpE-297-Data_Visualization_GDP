/**
 * New node file
 */

/*
 * GET home page.
 */

exports.getGDPDetails = function(req, res){

	var MongoClient = require('mongodb').MongoClient;
	var format = require('util');
	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/countryTradeDetails", function(err, db) {
		if(err) {
			return console.dir(err);
		}
		else {
			console.log("We are connected");
		}

		var collection = db.collection('GDPData');

		var getYear = {};
		getYear['year.'+req.body.year] = 1;
		console.log("GEt TESTTT :"+JSON.stringify(getYear));


		//Fetch Operation
		collection.find({},getYear).sort({_id:1}).toArray(function(err, items) {
			console.log("Test Query :"+JSON.stringify(items));
			console.log("Demo:: "+JSON.stringify(items[0]));
			console.log("Demo:: "+parseInt(items[0].year[0][req.body.year]));

			if(err || !items){
				console.log("items not found");
				res.render('world_gdp',{AF:null, AL:null});
			} else {
				res.render('world_gdp',{
					year:parseInt(req.body.year),
					AF:parseInt(items[0].year[0][req.body.year]),
					AL:parseInt(items[1].year[0][req.body.year]),
					DZ:parseInt(items[2].year[0][req.body.year]),
					AO:parseInt(items[4].year[0][req.body.year]),
					AR:parseInt(items[7].year[0][req.body.year]),
					AM:parseInt(items[8].year[0][req.body.year]),
					AU:parseInt(items[10].year[0][req.body.year]),
					AT:parseInt(items[11].year[0][req.body.year]),
					AZ:parseInt(items[12].year[0][req.body.year]),
					BH:parseInt(items[14].year[0][req.body.year]),
					BD:parseInt(items[15].year[0][req.body.year]),
					BY:parseInt(items[17].year[0][req.body.year]),
					BE:parseInt(items[18].year[0][req.body.year]),
					BJ:parseInt(items[20].year[0][req.body.year]),
					BT:parseInt(items[22].year[0][req.body.year]),
					BO:parseInt(items[23].year[0][req.body.year]),
					BA:parseInt(items[24].year[0][req.body.year]),
					BW:parseInt(items[25].year[0][req.body.year]),
					BR:parseInt(items[26].year[0][req.body.year]),
					BG:parseInt(items[29].year[0][req.body.year]),
					BF:parseInt(items[30].year[0][req.body.year]),
					BI:parseInt(items[31].year[0][req.body.year]),
					KH:parseInt(items[33].year[0][req.body.year]),
					CM:parseInt(items[34].year[0][req.body.year]),
					CA:parseInt(items[35].year[0][req.body.year]),
					CF:parseInt(items[37].year[0][req.body.year]),
					TD:parseInt(items[38].year[0][req.body.year]),
					CL:parseInt(items[39].year[0][req.body.year]),
					CN:parseInt(items[40].year[0][req.body.year]),
					CO:parseInt(items[43].year[0][req.body.year]),
					KM:parseInt(items[44].year[0][req.body.year]),
					CG:parseInt(items[45].year[0][req.body.year]),
					CR:parseInt(items[47].year[0][req.body.year]),
					HR:parseInt(items[48].year[0][req.body.year]),
					CU:parseInt(items[49].year[0][req.body.year]),
					CY:parseInt(items[50].year[0][req.body.year]),
					DK:parseInt(items[55].year[0][req.body.year]),
					DJ:parseInt(items[56].year[0][req.body.year]),
					DO:parseInt(items[58].year[0][req.body.year]),
					EC:parseInt(items[59].year[0][req.body.year]),
					EG:parseInt(items[60].year[0][req.body.year]),
					SV:parseInt(items[61].year[0][req.body.year]),
					GQ:parseInt(items[62].year[0][req.body.year]),
					ER:parseInt(items[63].year[0][req.body.year]),
					EE:parseInt(items[64].year[0][req.body.year]),
					ET:parseInt(items[65].year[0][req.body.year]),
					FJ:parseInt(items[67].year[0][req.body.year]),
					FI:parseInt(items[68].year[0][req.body.year]),
					FR:parseInt(items[69].year[0][req.body.year]),
					GA:parseInt(items[71].year[0][req.body.year]),
					GM:parseInt(items[72].year[0][req.body.year]),
					GE:parseInt(items[73].year[0][req.body.year]),
					DE:parseInt(items[74].year[0][req.body.year]),
					GH:parseInt(items[75].year[0][req.body.year]),
					GR:parseInt(items[76].year[0][req.body.year]),
					GT:parseInt(items[79].year[0][req.body.year]),
					GN:parseInt(items[80].year[0][req.body.year]),
					GW:parseInt(items[81].year[0][req.body.year]),
					GY:parseInt(items[82].year[0][req.body.year]),
					HT:parseInt(items[83].year[0][req.body.year]),
					HN:parseInt(items[84].year[0][req.body.year]),
					HU:parseInt(items[85].year[0][req.body.year]),
					IS:parseInt(items[86].year[0][req.body.year]),
					IN:parseInt(items[87].year[0][req.body.year]),
					ID:parseInt(items[88].year[0][req.body.year]),
					IR:parseInt(items[89].year[0][req.body.year]),
					IQ:parseInt(items[90].year[0][req.body.year]),
					IE:parseInt(items[91].year[0][req.body.year]),
					IL:parseInt(items[92].year[0][req.body.year]),
					IT:parseInt(items[93].year[0][req.body.year]),
					JM:parseInt(items[94].year[0][req.body.year]),
					JP:parseInt(items[95].year[0][req.body.year]),
					JO:parseInt(items[96].year[0][req.body.year]),
					KE:parseInt(items[98].year[0][req.body.year]),
					KW:parseInt(items[101].year[0][req.body.year]),
					KG:parseInt(items[102].year[0][req.body.year]),
					LV:parseInt(items[103].year[0][req.body.year]),
					LB:parseInt(items[104].year[0][req.body.year]),
					LS:parseInt(items[105].year[0][req.body.year]),
					LR:parseInt(items[106].year[0][req.body.year]),
					LY:parseInt(items[107].year[0][req.body.year]),
					LT:parseInt(items[108].year[0][req.body.year]),
					LU:parseInt(items[110].year[0][req.body.year]),
					MG:parseInt(items[111].year[0][req.body.year]),
					MW:parseInt(items[113].year[0][req.body.year]),
					MY:parseInt(items[114].year[0][req.body.year]),
					ML:parseInt(items[116].year[0][req.body.year]),
					MR:parseInt(items[120].year[0][req.body.year]),
					MU:parseInt(items[121].year[0][req.body.year]),
					MX:parseInt(items[122].year[0][req.body.year]),
					MN:parseInt(items[125].year[0][req.body.year]),
					ME:parseInt(items[126].year[0][req.body.year]),
					MA:parseInt(items[128].year[0][req.body.year]),
					MZ:parseInt(items[129].year[0][req.body.year]),
					MM:parseInt(items[130].year[0][req.body.year]),
					NA:parseInt(items[131].year[0][req.body.year]),
					NP:parseInt(items[133].year[0][req.body.year]),
					NL:parseInt(items[134].year[0][req.body.year]),
					NZ:parseInt(items[137].year[0][req.body.year]),
					NI:parseInt(items[138].year[0][req.body.year]),
					NE:parseInt(items[139].year[0][req.body.year]),
					NG:parseInt(items[140].year[0][req.body.year]),
					OM:parseInt(items[142].year[0][req.body.year]),
					PK:parseInt(items[143].year[0][req.body.year]),
					PA:parseInt(items[145].year[0][req.body.year]),
					PG:parseInt(items[146].year[0][req.body.year]),
					PY:parseInt(items[147].year[0][req.body.year]),
					PE:parseInt(items[148].year[0][req.body.year]),
					PH:parseInt(items[149].year[0][req.body.year]),
					PL:parseInt(items[150].year[0][req.body.year]),
					PT:parseInt(items[151].year[0][req.body.year]),
					PR:parseInt(items[152].year[0][req.body.year]),
					QA:parseInt(items[153].year[0][req.body.year]),
					RO:parseInt(items[156].year[0][req.body.year]),
					RW:parseInt(items[158].year[0][req.body.year]),
					SA:parseInt(items[165].year[0][req.body.year]),
					SN:parseInt(items[166].year[0][req.body.year]),
					RS:parseInt(items[167].year[0][req.body.year]),
					SL:parseInt(items[169].year[0][req.body.year]),
					SG:parseInt(items[170].year[0][req.body.year]),
					SB:parseInt(items[173].year[0][req.body.year]),
					SO:parseInt(items[174].year[0][req.body.year]),
					ZA:parseInt(items[175].year[0][req.body.year]),
					ES:parseInt(items[177].year[0][req.body.year]),
					LK:parseInt(items[178].year[0][req.body.year]),
					SD:parseInt(items[181].year[0][req.body.year]),
					SZ:parseInt(items[184].year[0][req.body.year]),
					SE:parseInt(items[185].year[0][req.body.year]),
					CH:parseInt(items[186].year[0][req.body.year]),
					TJ:parseInt(items[188].year[0][req.body.year]),
					TH:parseInt(items[190].year[0][req.body.year]),
					TG:parseInt(items[192].year[0][req.body.year]),
					TT:parseInt(items[194].year[0][req.body.year]),
					TN:parseInt(items[195].year[0][req.body.year]),
					TR:parseInt(items[196].year[0][req.body.year]),
					TM:parseInt(items[197].year[0][req.body.year]),
					UG:parseInt(items[201].year[0][req.body.year]),
					UA:parseInt(items[202].year[0][req.body.year]),
					AE:parseInt(items[203].year[0][req.body.year]),
					US:parseInt(items[205].year[0][req.body.year]),
					UY:parseInt(items[206].year[0][req.body.year]),
					UZ:parseInt(items[208].year[0][req.body.year]),
					VE:parseInt(items[210].year[0][req.body.year]),
					VN:parseInt(items[211].year[0][req.body.year]),
					YE:parseInt(items[212].year[0][req.body.year]),
					ZM:parseInt(items[215].year[0][req.body.year]),
					ZW:parseInt(items[217].year[0][req.body.year])
					
				});
			}

		});
	});

};

exports.getDefaultGDP = function(req, res){

	var MongoClient = require('mongodb').MongoClient;
	var format = require('util');
	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/countryTradeDetails", function(err, db) {
		if(err) {
			return console.dir(err);
		}
		else {
			console.log("We are connected");
		}

		var collection = db.collection('GDPData');


		//Fetch Operation
		collection.find({},{'year.2012':1}).sort({_id:1}).toArray(function(err, items) {

			if(err || !items){
				console.log("items not found");
				res.render('world_gdp',{AF:null, AL:null});
			} else {
				res.render('world_gdp',{
					year:2012,
					AF:parseInt(items[0].year[0][2012]),
					AL:parseInt(items[1].year[0][2012]),
					DZ:parseInt(items[2].year[0][2012]),
					AO:parseInt(items[4].year[0][2012]),
					AR:parseInt(items[7].year[0][2012]),
					AM:parseInt(items[8].year[0][2012]),
					AU:parseInt(items[10].year[0][2012]),
					AT:parseInt(items[11].year[0][2012]),
					AZ:parseInt(items[12].year[0][2012]),
					BH:parseInt(items[14].year[0][2012]),
					BD:parseInt(items[15].year[0][2012]),
					BY:parseInt(items[17].year[0][2012]),
					BE:parseInt(items[18].year[0][2012]),
					BJ:parseInt(items[20].year[0][2012]),
					BT:parseInt(items[22].year[0][2012]),
					BO:parseInt(items[23].year[0][2012]),
					BA:parseInt(items[24].year[0][2012]),
					BW:parseInt(items[25].year[0][2012]),
					BR:parseInt(items[26].year[0][2012]),
					BG:parseInt(items[29].year[0][2012]),
					BF:parseInt(items[30].year[0][2012]),
					BI:parseInt(items[31].year[0][2012]),
					KH:parseInt(items[33].year[0][2012]),
					CM:parseInt(items[34].year[0][2012]),
					CA:parseInt(items[35].year[0][2012]),
					CF:parseInt(items[37].year[0][2012]),
					TD:parseInt(items[38].year[0][2012]),
					CL:parseInt(items[39].year[0][2012]),
					CN:parseInt(items[40].year[0][2012]),
					CO:parseInt(items[43].year[0][2012]),
					KM:parseInt(items[44].year[0][2012]),
					CG:parseInt(items[45].year[0][2012]),
					CR:parseInt(items[47].year[0][2012]),
					HR:parseInt(items[48].year[0][2012]),
					CU:parseInt(items[49].year[0][2012]),
					CY:parseInt(items[50].year[0][2012]),
					DK:parseInt(items[55].year[0][2012]),
					DJ:parseInt(items[56].year[0][2012]),
					DO:parseInt(items[58].year[0][2012]),
					EC:parseInt(items[59].year[0][2012]),
					EG:parseInt(items[60].year[0][2012]),
					SV:parseInt(items[61].year[0][2012]),
					GQ:parseInt(items[62].year[0][2012]),
					ER:parseInt(items[63].year[0][2012]),
					EE:parseInt(items[64].year[0][2012]),
					ET:parseInt(items[65].year[0][2012]),
					FJ:parseInt(items[67].year[0][2012]),
					FI:parseInt(items[68].year[0][2012]),
					FR:parseInt(items[69].year[0][2012]),
					GA:parseInt(items[71].year[0][2012]),
					GM:parseInt(items[72].year[0][2012]),
					GE:parseInt(items[73].year[0][2012]),
					DE:parseInt(items[74].year[0][2012]),
					GH:parseInt(items[75].year[0][2012]),
					GR:parseInt(items[76].year[0][2012]),
					GT:parseInt(items[79].year[0][2012]),
					GN:parseInt(items[80].year[0][2012]),
					GW:parseInt(items[81].year[0][2012]),
					GY:parseInt(items[82].year[0][2012]),
					HT:parseInt(items[83].year[0][2012]),
					HN:parseInt(items[84].year[0][2012]),
					HU:parseInt(items[85].year[0][2012]),
					IS:parseInt(items[86].year[0][2012]),
					IN:parseInt(items[87].year[0][2012]),
					ID:parseInt(items[88].year[0][2012]),
					IR:parseInt(items[89].year[0][2012]),
					IQ:parseInt(items[90].year[0][2012]),
					IE:parseInt(items[91].year[0][2012]),
					IL:parseInt(items[92].year[0][2012]),
					IT:parseInt(items[93].year[0][2012]),
					JM:parseInt(items[94].year[0][2012]),
					JP:parseInt(items[95].year[0][2012]),
					JO:parseInt(items[96].year[0][2012]),
					KE:parseInt(items[98].year[0][2012]),
					KW:parseInt(items[101].year[0][2012]),
					KG:parseInt(items[102].year[0][2012]),
					LV:parseInt(items[103].year[0][2012]),
					LB:parseInt(items[104].year[0][2012]),
					LS:parseInt(items[105].year[0][2012]),
					LR:parseInt(items[106].year[0][2012]),
					LY:parseInt(items[107].year[0][2012]),
					LT:parseInt(items[108].year[0][2012]),
					LU:parseInt(items[110].year[0][2012]),
					MG:parseInt(items[111].year[0][2012]),
					MW:parseInt(items[113].year[0][2012]),
					MY:parseInt(items[114].year[0][2012]),
					ML:parseInt(items[116].year[0][2012]),
					MR:parseInt(items[120].year[0][2012]),
					MU:parseInt(items[121].year[0][2012]),
					MX:parseInt(items[122].year[0][2012]),
					MN:parseInt(items[125].year[0][2012]),
					ME:parseInt(items[126].year[0][2012]),
					MA:parseInt(items[128].year[0][2012]),
					MZ:parseInt(items[129].year[0][2012]),
					MM:parseInt(items[130].year[0][2012]),
					NA:parseInt(items[131].year[0][2012]),
					NP:parseInt(items[133].year[0][2012]),
					NL:parseInt(items[134].year[0][2012]),
					NZ:parseInt(items[137].year[0][2012]),
					NI:parseInt(items[138].year[0][2012]),
					NE:parseInt(items[139].year[0][2012]),
					NG:parseInt(items[140].year[0][2012]),
					OM:parseInt(items[142].year[0][2012]),
					PK:parseInt(items[143].year[0][2012]),
					PA:parseInt(items[145].year[0][2012]),
					PG:parseInt(items[146].year[0][2012]),
					PY:parseInt(items[147].year[0][2012]),
					PE:parseInt(items[148].year[0][2012]),
					PH:parseInt(items[149].year[0][2012]),
					PL:parseInt(items[150].year[0][2012]),
					PT:parseInt(items[151].year[0][2012]),
					PR:parseInt(items[152].year[0][2012]),
					QA:parseInt(items[153].year[0][2012]),
					RO:parseInt(items[156].year[0][2012]),
					RW:parseInt(items[158].year[0][2012]),
					SA:parseInt(items[165].year[0][2012]),
					SN:parseInt(items[166].year[0][2012]),
					RS:parseInt(items[167].year[0][2012]),
					SL:parseInt(items[169].year[0][2012]),
					SG:parseInt(items[170].year[0][2012]),
					SB:parseInt(items[173].year[0][2012]),
					SO:parseInt(items[174].year[0][2012]),
					ZA:parseInt(items[175].year[0][2012]),
					ES:parseInt(items[177].year[0][2012]),
					LK:parseInt(items[178].year[0][2012]),
					SD:parseInt(items[181].year[0][2012]),
					SZ:parseInt(items[184].year[0][2012]),
					SE:parseInt(items[185].year[0][2012]),
					CH:parseInt(items[186].year[0][2012]),
					TJ:parseInt(items[188].year[0][2012]),
					TH:parseInt(items[190].year[0][2012]),
					TG:parseInt(items[192].year[0][2012]),
					TT:parseInt(items[194].year[0][2012]),
					TN:parseInt(items[195].year[0][2012]),
					TR:parseInt(items[196].year[0][2012]),
					TM:parseInt(items[197].year[0][2012]),
					UG:parseInt(items[201].year[0][2012]),
					UA:parseInt(items[202].year[0][2012]),
					AE:parseInt(items[203].year[0][2012]),
					US:parseInt(items[205].year[0][2012]),
					UY:parseInt(items[206].year[0][2012]),
					UZ:parseInt(items[208].year[0][2012]),
					VE:parseInt(items[210].year[0][2012]),
					VN:parseInt(items[211].year[0][2012]),
					YE:parseInt(items[212].year[0][2012]),
					ZM:parseInt(items[215].year[0][2012]),
					ZW:parseInt(items[217].year[0][2012])

				});
			}

		});
	});

};